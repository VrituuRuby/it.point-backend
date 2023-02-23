import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { Branch, PrismaClient, Status, User } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Internet",
    id: uuidV4(),
    subcategories: [
      {
        name: "Rede cabeada",
        id: uuidV4(),
        titles: [
          "Estou sem acesso à rede",
          "Cabo de rede não está conectando",
          "Lentidão na rede cabeada",
        ],
      },
      {
        name: "WiFi",
        id: uuidV4(),
        titles: [
          "Estou sem acesso ao WiFi",
          "Não consigo entrar no WiFi, está dizendo senha incorreta",
          "WiFi não alcança a sala do refeitório",
          "Lentidão do WiFi",
        ],
      },
      {
        name: "Site bloqueado",
        id: uuidV4(),
        titles: [
          "Sem acesso ao YouTube para conteúdos didáticos",
          "Erro de acesso ao site do governo",
          "Site bloqueado pelo firewall",
        ],
      },
    ],
  },
  {
    name: "Equipamento",
    id: uuidV4(),
    subcategories: [
      {
        name: "Notebook",
        id: uuidV4(),
        titles: [
          "Notebook não liga",
          "Tela preta",
          "Problemas de hardware",
          "Notebook apresenta lentidão",
        ],
      },
      {
        name: "Desktop",
        id: uuidV4(),
        titles: [
          "Desktop não liga",
          "Problemas de hardware",
          "Erro de sistema operacional",
          "Desktop muito lento",
        ],
      },
      {
        name: "Mouse",
        id: uuidV4(),
        titles: [
          "Mouse não funciona",
          "Cliques errados",
          "Desconfiguração do mouse",
        ],
      },
      {
        name: "Teclado",
        id: uuidV4(),
        titles: [
          "Teclado não funciona",
          "Teclas travadas",
          "Desconfiguração do teclado",
        ],
      },
      {
        name: "Fone de Ouvido",
        id: uuidV4(),
        titles: [
          "As pessoas não me escutam no Teams",
          "Mau funcionamento do microfone",
          "Fone não sai som",
        ],
      },
    ],
  },
  {
    name: "Software",
    id: uuidV4(),
    subcategories: [
      {
        name: "LibreOffice",
        id: uuidV4(),
        titles: [
          "Erro de instalação do libre office",
          "Problemas na abertura de arquivos do lirbe office",
          "Libre office fechando sozinho",
        ],
      },
      {
        name: "Navegador de Internet",
        id: uuidV4(),
        titles: [
          "Erro de navegação",
          "Problemas com extensões para acessar site do governo",
          "Problemas de segurança",
        ],
      },
      {
        name: "Skype",
        id: uuidV4(),
        titles: [
          "Skype não conecta",
          "Skype está com qualidade de video e som muito ruim",
          "Skype travando",
        ],
      },
      {
        name: "Microsoft Teams",
        id: uuidV4(),
        titles: [
          "Microsoft Teams não conecta",
          "Qualidade da call teams muito baixa",
          "O Microsoft Teams está travando constantemente",
        ],
      },
      {
        name: "Sistema Financeiro",
        id: uuidV4(),
        titles: [
          "Erro de processamento da nota fiscal",
          "Acesso negado ao sistema financeiro",
          "Relatórios incorretos sistema financeiro",
        ],
      },
    ],
  },
  {
    name: "Usuários",
    id: uuidV4(),
    subcategories: [
      {
        name: "Criar Usuário",
        id: uuidV4(),
        titles: [
          "Criação de usuário com erro",
          "Problemas na autenticação do usuário",
          "Permissões de acesso incorretas",
        ],
      },
      {
        name: "Reset de senha",
        id: uuidV4(),
        titles: [
          "Senha não resetada",
          "Erro no reset de senha",
          "Problemas de autenticação",
        ],
      },
      {
        name: "Trocar de unidade",
        id: uuidV4(),
        titles: [
          "Erro na mudança de unidade",
          "Problemas de acesso à nova unidade",
          "Permissões de acesso incorretas",
        ],
      },
    ],
  },
];

const users_id: string[] = [];
const branches_id: Branch[] = [];

async function createCategories() {
  await Promise.all(
    categories.map(async (category) => {
      await prisma.category.create({
        data: {
          name: category.name,
          id: category.id,
          subcategories: {
            createMany: {
              data: category.subcategories.map((sub) => ({
                name: sub.name,
                id: sub.id,
              })),
            },
          },
        },
      });
    })
  );
}

async function createTickets(quantity: number) {
  const status: Status[] = ["IN_PROGRESS", "OPEN", "PENDING"];
  Array.from({ length: quantity }).map(async () => {
    const category_index = Math.floor(Math.random() * categories.length);
    const random_category = categories[category_index];

    const subcategory_index = Math.floor(
      Math.random() * random_category.subcategories.length
    );
    const random_subcategory = random_category.subcategories[subcategory_index];

    const user_index = Math.floor(Math.random() * users_id.length);
    const randomTitleIndex = Math.floor(
      Math.random() * random_subcategory.titles.length
    );
    const randomTitle = random_subcategory.titles[randomTitleIndex];

    const randomStatus = status[Math.floor(Math.random() * status.length)];
    await prisma.ticket.create({
      data: {
        status: randomStatus,
        description: faker.lorem.paragraphs(),
        phone: faker.phone.number(),
        title: randomTitle,
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
  await createBranches(3);
  await createCategories();
  await createUsers(50);
  await createTickets(100);
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
