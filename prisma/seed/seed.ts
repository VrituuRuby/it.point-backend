import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import {
  Branch,
  Category,
  PrismaClient,
  SubCategory,
  User,
} from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Internet",
    subcategories: [
      {
        name: "Rede cabeada",
        titles: [
          "Sem acesso à rede",
          "Problemas na conexão cabeada",
          "Lentidão na rede cabeada",
        ],
      },
      {
        name: "WiFi",
        titles: [
          "Sem acesso ao WiFi",
          "Senha incorreta",
          "Problemas de sinal WiFi",
          "Lentidão do WiFi",
        ],
      },
      {
        name: "Site bloqueado",
        titles: [
          "Site inacessível",
          "Erro de acesso ao site",
          "Site bloqueado pelo firewall",
        ],
      },
      {
        name: "Lentidão",
        titles: [
          "Navegação lenta na internet",
          "Lentidão geral da internet",
          "Problemas com a velocidade da internet",
        ],
      },
    ],
  },
  {
    name: "Equipamento",
    subcategories: [
      {
        name: "Notebook",
        titles: ["Notebook não liga", "Tela preta", "Problemas de hardware"],
      },
      {
        name: "Desktop",
        titles: [
          "Desktop não liga",
          "Problemas de hardware",
          "Erro de sistema operacional",
        ],
      },
      {
        name: "Mouse",
        titles: [
          "Mouse não funciona",
          "Cliques errados",
          "Desconfiguração do mouse",
        ],
      },
      {
        name: "Teclado",
        titles: [
          "Teclado não funciona",
          "Teclas travadas",
          "Desconfiguração do teclado",
        ],
      },
      {
        name: "Fone de Ouvido",
        titles: [
          "Sem som",
          "Mau funcionamento do microfone",
          "Problemas com conexão Bluetooth",
        ],
      },
    ],
  },
  {
    name: "Software",
    subcategories: [
      {
        name: "LibreOffice",
        titles: [
          "Erro de instalação",
          "Problemas na abertura de arquivos",
          "Crashes frequentes",
        ],
      },
      {
        name: "Navegador de Internet",
        titles: [
          "Erro de navegação",
          "Problemas com extensões",
          "Problemas de segurança",
        ],
      },
      {
        name: "Skype",
        titles: [
          "Sem conexão",
          "Problemas com a qualidade de áudio/vídeo",
          "Crashes frequentes",
        ],
      },
      {
        name: "Microsoft Teams",
        titles: [
          "Sem conexão",
          "Problemas com a qualidade de áudio/vídeo",
          "Crashes frequentes",
        ],
      },
      {
        name: "Sistema Financeiro",
        titles: [
          "Erro de processamento",
          "Acesso negado",
          "Relatórios incorretos",
        ],
      },
    ],
  },
  {
    name: "Usuários",
    subcategories: [
      {
        name: "Criar Usuário",
        titles: [
          "Criação de usuário com erro",
          "Problemas na autenticação do usuário",
          "Permissões de acesso incorretas",
        ],
      },
      {
        name: "Reset de senha",
        titles: [
          "Senha não resetada",
          "Erro no reset de senha",
          "Problemas de autenticação",
        ],
      },
      {
        name: "Trocar de unidade",
        titles: [
          "Erro na mudança de unidade",
          "Problemas de acesso à nova unidade",
          "Permissões de acesso incorretas",
        ],
      },
    ],
  },
];

const categories_id: (Category & {
  subcategories: SubCategory[];
})[] = [];
const users_id: string[] = [];
const branches_id: Branch[] = [];

async function createCategories() {
  await Promise.all(
    categories.map(async (category) => {
      const newCat = await prisma.category.create({
        data: {
          name: category.name,
          subcategories: {
            create: category.subcategories.map((sub) => ({ name: sub.name })),
          },
        },
        include: {
          subcategories: true,
        },
      });

      categories_id.push(newCat);
    })
  );
}

async function createTickets(quantity: number) {
  Array.from({ length: quantity }).map(async () => {
    const category_index = Math.floor(Math.random() * categories_id.length);
    const subcategory_index = Math.floor(
      Math.random() * categories_id[category_index].subcategories.length
    );
    const user_index = Math.floor(Math.random() * users_id.length);

    const random_category = categories_id[category_index];
    const random_subcategory = random_category.subcategories[subcategory_index];

    await prisma.ticket.create({
      data: {
        description: faker.lorem.paragraphs(),
        phone: faker.phone.number(),
        title: faker.hacker.phrase(),
        category_id: random_category.id,
        subcategory_id: random_subcategory.id,
        user_id: users_id[user_index],
      },
    });
  });
}

async function createBranches(quantity: number) {
  await Promise.all(
    Array.from({ length: quantity }).map(async () => {
      const branchName = faker.address.cityName();

      const branch = await prisma.branch.create({
        data: {
          name: branchName,
        },
      });

      branches_id.push(branch);
    })
  );
}

async function createUsers(quantity: number) {
  const userData = Array.from({ length: quantity }).map(() => ({
    email: faker.internet.email(),
    name: faker.name.fullName(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    branch_id: branches_id[Math.floor(Math.random() * branches_id.length)].id,
  }));

  await prisma.user.createMany({ data: userData });

  const users: User[] = await prisma.user.findMany();

  users.map((user) => users_id.push(user.id));

  const admin = await prisma.user.upsert({
    where: { email: "user@admin.com" },
    update: {},
    create: {
      email: "user@admin.com",
      name: "AdminUser",
      password: await hash("admin", 8),
      username: "admin",
      role: "ADMIN",
    },
  });
  const serviceEmail = faker.internet.email();
  const branch_id =
    branches_id[Math.floor(Math.random() * branches_id.length)].id;
  const service = await prisma.user.upsert({
    where: { email: serviceEmail },
    update: {},
    create: {
      email: serviceEmail,
      name: faker.name.fullName(),
      password: await hash("service", 8),
      username: "user.service",
      role: "SERVICE",
      branch_id,
    },
  });
  console.log({ admin, service });
}

export async function create() {
  await createBranches(5);
  await createCategories();
  await createUsers(20);
  await createTickets(25);
}

create()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
