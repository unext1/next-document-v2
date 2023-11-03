"use client";
import React, { useState, ChangeEvent, FormEvent, useMemo } from "react";
import dynamic from "next/dynamic";

export interface FormData {
  author: string;
  title: string;
}

export default function NewDocumentPage() {
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState<FormData>({
    author: "",
    title: "",
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !content) {
      setError("Please fill in all required fields.");
      return;
    }

    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ ...formData, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setFormData({
        author: "",
        title: "",
      });
      setContent("");
      setError("");
      console.log("Document added successfully!");
    } else {
      console.error("Error adding the document");
    }
  };

  console.log(error);

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
          htmlFor="author"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
        >
          Author
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
            aria-label="Author"
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
