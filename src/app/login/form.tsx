"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response?.status == 401) {
      setError("Wrong Credentials");
    }

    if (!response?.error) {
      router.push("/documents");
      router.refresh();
    }
  };
  return (
    <div>
      <h1 className="text-center text-white font-semibold tracking-tighter text-4xl ">
        Login Page
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 mx-auto max-w-md mt-10"
      >
        <label className="block text-xs mb-0.5 mt-2 uppercase font-semibold leading-6 text-gray-400">
          Name
        </label>
        <input
          name="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
          type="email"
        />
        <label className="block text-xs mb-0.5 mt-2 uppercase font-semibold leading-6 text-gray-400">
          Password
        </label>
        <input
          name="password"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
          type="password"
        />
        {error && <p className="text-red-400 mt-2 ">{error}</p>}
        <button
          type="submit"
          className="relative mt-8 py-2 px-6 w-full bg-blue-400 rounded-xl transition hover:bg-blue-500 "
        >
          Login
        </button>
      </form>
    </div>
  );
}
