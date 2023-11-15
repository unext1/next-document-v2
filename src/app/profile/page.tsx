import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const ProfilePage = async () => {
  const sesion = await getServerSession();
  console.log(sesion);
  return (
    <div>
      <h1>Hey {sesion?.user.name} !</h1>
    </div>
  );
};

export default ProfilePage;
