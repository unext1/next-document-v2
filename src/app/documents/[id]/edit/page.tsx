"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useMemo,
  useEffect,
} from "react";

export interface FormData {
  author: string;
  title: string;
}

const EditDocumentPage = () => {
  const params = useParams();
  const documentId = params.id;
  const router = useRouter();
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState<FormData>({
    author: "",
    title: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getSingleDoc = async () => {
      try {
        const result = await fetch(`/api/${documentId}`);
        if (!result.ok) {
          throw new Error("Failed to fetch document");
        }
        const document = await result.json();
        setFormData({
          author: document.author,
          title: document.title,
        });
        setContent(document.content);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSingleDoc();
  }, [documentId]);

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

    if (isEditing) {
      return;
    }

    setIsEditing(true);

    try {
      const response = await fetch(`/api/${documentId}`, {
        method: "PATCH",
        body: JSON.stringify({ ...formData, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to edit the document");
      }

      router.push(`/documents/${documentId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the document");
      }

      router.push("/documents");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading Data...</p>;
  }

  return (
    <div>
      <div className="flex justify-between w-full  mb-4">
        <div className="flex space-x-4">
          <h1 className="uppercase font-semibold tracking-wider">
            <Link href=".." className="text-gray-400">
              All Documents /
            </Link>{" "}
            <Link href="." className="text-gray-400">
              Document {documentId} /
            </Link>{" "}
            Edit Document
          </h1>
          <div
            className="bg-red-500 cursor-pointer rounded-xl px-2 py-1 text-xs my-auto"
            onClick={handleDelete}
          >
            X
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-blue-400 my-auto px-4 py-1 rounded-xl uppercase font-semibold text-xs text-white"
        >
          {"<"}
        </button>
      </div>

      <form className="bg-slate-900 rounded-xl p-4">
        <h1 className="font-bold mb-4">Id: {documentId}</h1>
        <div className="mt-4 uppercase text-xs text-gray-400">Title:</div>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mt-4 uppercase text-xs text-gray-400">Author:</div>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mt-4 uppercase text-xs text-gray-400">Content:</div>
        <div>
          <ReactQuill
            theme="snow"
            className="bg-gray-50 text-black rounded-xl"
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
          disabled={isEditing}
        >
          {isEditing ? "Editing..." : "Edit Document"}
        </button>
      </form>
    </div>
  );
};

export default EditDocumentPage;
