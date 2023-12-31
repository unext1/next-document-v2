"use client";
import { Category, DocType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllDocumentsPage() {
  const [docs, setDocs] = useState<DocType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docResult, categoriesResult] = await Promise.all([
          fetch("/api"),
          fetch("/api/categories"),
        ]);

        if (!docResult.ok) {
          throw new Error("Failed to fetch document");
        }
        const allDocs = await docResult.json();

        const filteredDocs = allDocs
          .filter((doc: DocType) =>
            doc.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((doc: DocType) =>
            selectedCategory ? doc.categories.id === selectedCategory : true
          )
          .sort((a: any, b: any) =>
            (b.updated_at || b.created_at).localeCompare(
              a.updated_at || a.created_at
            )
          );

        setDocs(filteredDocs);

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
  }, [searchTerm, selectedCategory]);

  const handleDelete = async ({ id }: { id: number }) => {
    const response = await fetch(`/api/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setDocs((prevDocs) => {
        const isDeleted = prevDocs.some((doc) => doc.id === id && doc.deleted);

        if (isDeleted) {
          return prevDocs.filter((doc) => doc.id !== id);
        } else {
          return prevDocs.map((doc) =>
            doc.id === id ? { ...doc, deleted: true } : doc
          );
        }
      });
    }
  };

  if (isLoading) {
    return <div>Loading Data...</div>;
  }
  if (!session || !session.user) {
    return <div className="font-semibold">Please login to view this page</div>;
  }

  return (
    <>
      <h2 className="uppercase font-semibold tracking-wider">
        {docs.length >= 1 ? "All Documents" : "No documents Found"}
      </h2>
      <div className="md:flex md:space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block mb-4 mt-4 w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
        />
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
          className=" bg-white block mb-4 mt-4 w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="text-gray-600"
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((i) => (
          <div key={i.id}>
            <div className="hover:scale-105 transition-all bg-slate-900 p-6 rounded-xl content-container overflow-hidden ">
              <div className="flex space-x-4">
                {i.is_public ? (
                  <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-200">
                    <svg
                      className="h-1.5 w-1.5 fill-green-400"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    Public
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-200">
                    <svg
                      className="h-1.5 w-1.5 fill-red-400"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    Private
                  </span>
                )}
                {i.categories ? (
                  <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-200 capitalize">
                    <svg
                      className="h-1.5 w-1.5 fill-blue-400"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    {i.categories ? i.categories.name : null}
                  </span>
                ) : null}
                {i.deleted ? (
                  <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-200">
                    <svg
                      className="h-1.5 w-1.5 fill-red-400"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    Deleted
                  </span>
                ) : null}
              </div>

              <div className="flex mt-4 justify-between">
                <Link
                  href={`/documents/${i.id}`}
                  className="text-xl font-bold capitalize"
                >
                  {i.title}
                </Link>
                {session && session.user.id == i.user.id && (
                  <div
                    className="bg-red-500  cursor-pointer rounded-xl px-2 py-1 z-50 text-xs my-auto"
                    onClick={() => handleDelete({ id: i.id })}
                  >
                    X
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(i.created_at).toDateString()}
              </div>

              <div className="mb-3 font-semibold ">
                <Link
                  href={`/documents/${i.id}`}
                  className="text-sm text-gray-400 "
                >
                  {i.user.username}
                </Link>
              </div>

              <div className="w-full mb-3 bg-slate-700 h-0.5 rounded-full" />
              <Link
                href={`/documents/${i.id}`}
                className="text-sm text-gray-400 "
                dangerouslySetInnerHTML={{
                  __html: i.content.slice(0, 120),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
