import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      role: string;
    } & DefaultSession["user"];
  }
}

type DocType = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: Date;
  is_public: number;
  deleted: boolean | number;
  updated_at: Date;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  categories: {
    id: number;
    name: string;
  };
};

type Category = {
  id: number;
  name: string;
};
