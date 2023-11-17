import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutBtn from "../components/logoutBtn";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-center">
      <div className="bg-slate-900 p-6 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Hey {session?.user.name} !</h1>
        <div className="mb-4">
          <strong>User ID:</strong> {session?.user.id}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {session?.user.email}
        </div>

        <div className="">
          <strong>Role:</strong> {session?.user.role}
        </div>
        <div className="flex justify-between">
          {session?.user.role === "admin" && (
            <Link
              href="/create-user"
              className="relative mt-8 py-1.5 px-6 w-fit bg-blue-400 rounded-xl "
            >
              Create User
            </Link>
          )}
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
