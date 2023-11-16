"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DocType } from "@/types";
import { useSession } from "next-auth/react";

export default function AllDocs() {
  const [docs, setDocs] = useState<DocType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(true);
    const getAllDocuments = async () => {
      try {
        const res = await fetch("/api");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const allDocs = await res.json();

        // const filteredDocs = allDocs.filter(
        //   (doc: DocType) => doc.deleted !== 1
        // );

        setDocs(allDocs);
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
      setDocs((prevDocs) =>
        prevDocs.map((doc) => (doc.id === id ? { ...doc, deleted: true } : doc))
      );
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
                  {i.user.email}
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
