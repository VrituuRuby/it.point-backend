enum UserRoles {
  admin = "admin",
  service = "service",
  user = "user",
}

interface CreateUserDTO {
  id?: string;
  name: string;
  username: string;
  password: string;
  email: string;
  role: UserRoles;
  branch_id: string;
}

export { CreateUserDTO, UserRoles };
