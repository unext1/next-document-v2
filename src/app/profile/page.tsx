import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutBtn from "../components/logoutBtn";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>Hey {session?.user.name} !</h1>
      <span>{JSON.stringify(session, null, 4)}</span>
      <LogoutBtn />
    </div>
  );
};

export default ProfilePage;
