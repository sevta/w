type Template = {
  name: string;
  price: number;
  userId?: string;
};

type User = {
  name: string;
  email: string;
  role?: string;
  password?: string;
  templateId?: string;
};

type Response = {
  message: string;
  data?: [] | {} | undefined;
};

type Wedding = {
  groom: string;
  bride: string;
  weddingDate: string;
};

enum Role {
  ADMIN,
  USER,
}

export type { Template, Wedding, Role, User, Response };
