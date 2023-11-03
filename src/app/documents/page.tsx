"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AllDocs() {
  const [docs, setDocs] = useState<DocType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getAllDocuments = async () => {
      try {
        const res = await fetch("/api");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const allDocs = await res.json();

        const filteredDocs = allDocs.filter(
          (doc: DocType) => doc.deleted !== 1
        );

        setDocs(filteredDocs);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getAllDocuments();
  }, []);

  const handleDelete = async ({ id }: { id: number }) => {
    const response = await fetch(`/api/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setDocs((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    }
  };

  if (isLoading) {
    return <div>Loading Data...</div>;
  }

  return (
    <>
      <h2 className="uppercase font-semibold tracking-wider">
        {docs.length >= 1 ? "All Documents" : "No documents Found"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((i) => (
          <div key={i.id}>
            <div className="hover:scale-105  transition-all bg-slate-900 p-6 rounded-xl content-container overflow-hidden ">
              <div className="flex justify-between ">
                <Link
                  href={`/documents/${i.id}`}
                  className="text-xl font-bold capitalize"
                >
                  {i.title}
                </Link>
                <div
                  className="bg-red-500  cursor-pointer rounded-xl px-2 py-1 z-50 text-xs my-auto"
                  onClick={() => handleDelete({ id: i.id })}
                >
                  X
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(i.createdAt).toDateString()}
              </div>

              <div className="mb-3 font-semibold capitalize">
                <Link
                  href={`/documents/${i.id}`}
                  className="text-sm text-gray-400 capitalize"
                >
                  {i.author}
                </Link>
              </div>
              <div className="w-full mb-3 bg-slate-700 h-0.5 rounded-full" />
              <Link
                href={`/documents/${i.id}`}
                className="text-sm   text-gray-400 "
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
