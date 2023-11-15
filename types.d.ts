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
  deleted: number;
  updated_at: Date;
};
