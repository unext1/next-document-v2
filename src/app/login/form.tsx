"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <div>
      <h1 className="text-center text-white font-semibold tracking-tighter text-4xl md:text-5xl">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mx-auto max-w-md mt-10"
      >
        <input
          name="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
          type="email"
        />
        <input
          name="password"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
          type="password"
        />
        <button
          type="submit"
          className="relative mt-8 py-2 px-6 w-full bg-blue-400 rounded-xl "
        >
          Login
        </button>
      </form>
    </div>
  );
}
