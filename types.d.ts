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
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  }
}
