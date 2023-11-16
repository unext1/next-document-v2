import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutBtn from "../components/logoutBtn";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  return (
      <div className="bg-slate-900 p-6 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Hey {session?.user.name}!</h1>
        <div className="mb-4">
          <strong>Email:</strong> {session?.user.email}
        </div>
        <div className="mb-4">
          <strong>User ID:</strong> {session?.user.id}
        </div>
        <div className="mb-4">
          <strong>Role:</strong> {session?.user.role}
        </div>
        <LogoutBtn />
      </div>
  );
};

export default ProfilePage;
