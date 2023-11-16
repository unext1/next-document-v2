"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

export interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function NewDocumentPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.username || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    const response = await fetch("/api/user/create", {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setError("");
      console.log("Document added successfully!");
    } else {
      console.log(response);
      console.error("Error adding the document");
    }
  };

  return (
    <div>
      <h1 className="uppercase font-semibold tracking-wider">
        Create Document
      </h1>

      <div>{error && <p className="text-red-500">{error}</p>}</div>
      <form>
        <label
          htmlFor="username"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
        >
          username
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            aria-label="username"
          />
        </div>
        <label
          htmlFor="email"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
        >
          email
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            aria-label="email"
          />
        </div>
        <label
          htmlFor="password"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
        >
          password
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            aria-label="password"
          />
        </div>

        <button
          type="submit"
          className="relative mt-8 py-2 px-6 w-fit bg-blue-400 text-sm uppercase font-semibold rounded-xl"
          onClick={handleSubmit}
        >
          Add New Document
        </button>
      </form>
    </div>
  );
}
