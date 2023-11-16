"use client";
import React, { useState, ChangeEvent, FormEvent, useMemo } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

export interface FormData {
  title: string;
  isPublic: boolean;
}

export default function NewDocumentPage() {
  const { data: session } = useSession();

  const [content, setContent] = useState("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    isPublic: false,
  });
  const [error, setError] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !content) {
      setError("Please fill in all required fields.");
      return;
    }

    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        content,
        userId: session?.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setFormData({
        title: "",
        isPublic: false,
      });
      setContent("");
      setError("");
      console.log("Document added successfully!");
    } else {
      console.log(response);
      console.error("Error adding the document");
    }
  };
  if (!session?.user) {
    return <p>You are not authorized to create documents</p>;
  }

  return (
    <div>
      <h1 className="uppercase font-semibold tracking-wider">
        Create Document
      </h1>

      <div>{error && <p className="text-red-500">{error}</p>}</div>
      <form>
        <label
          htmlFor="title"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            aria-label="Title"
          />
        </div>

        <label
          htmlFor="content"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
        >
          Content:
        </label>
        <div>
          <ReactQuill
            theme="snow"
            className="bg-gray-50  text-black rounded-xl"
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ header: 1 }, { header: 2 }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ["clean"],
              ],
            }}
            value={content}
            onChange={setContent}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-400">
            <input
              type="checkbox"
              className="mr-2"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleCheckboxChange}
            />
            Make Document Public
          </label>
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
