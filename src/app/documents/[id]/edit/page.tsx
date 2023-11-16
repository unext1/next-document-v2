"use client";

import { Category, DocType } from "@/types";
import { useSession } from "next-auth/react";
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
  userId: string;
  title: string;
  isPublic: boolean;
  isDeleted: boolean;
  categoryId: number | null;
}

const EditDocumentPage = () => {
  const { data: session } = useSession();
  const params = useParams();
  const documentId = params.id;
  const router = useRouter();
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState<FormData>({
    userId: "",
    title: "",
    isPublic: false,
    isDeleted: false,
    categoryId: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docResult, categoriesResult] = await Promise.all([
          fetch(`/api/${documentId}`),
          fetch("/api/categories"),
        ]);

        if (!docResult.ok) {
          throw new Error("Failed to fetch document");
        }

        const document = await docResult.json();
        setFormData({
          userId: document.user_id,
          title: document.title,
          isPublic: document.is_public || false,
          isDeleted: document.deleted || false,
          categoryId: document.category_id || null,
        });
        setContent(document.content);

        if (!categoriesResult.ok) {
          throw new Error("Failed to fetch categories");
        }

        const categoryArray: Category[] = await categoriesResult.json();
        setCategories(categoryArray);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkboxValue = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checkboxValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

  const hanldeUnDelete = async () => {
    try {
      const response = await fetch(`/api/${documentId}`, {
        method: "PATCH",
        body: JSON.stringify({ ...formData, content, unDelete: 0 }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to Undelete the document");
      }

      router.push("/documents");
    } catch (error) {
      console.error(error);
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

  if (String(session?.user.id) !== String(formData.userId)) {
    return <p>You are not authorized to Edit this document</p>;
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
            Delete Document
          </div>

          {formData.isDeleted ? (
            <div
              className="bg-blue-400 cursor-pointer rounded-xl px-2 py-1 text-xs my-auto"
              onClick={hanldeUnDelete}
            >
              Undelete Document
            </div>
          ) : null}
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
        <div className="mt-4">
          <label
            htmlFor="categoryId"
            className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
            value={formData.categoryId || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-400">
            <input
              type="checkbox"
              className="mr-2"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleInputChange}
            />
            Make Document Public
          </label>
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
