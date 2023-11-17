"use client";

import { DocType } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DocumentPage = () => {
  const params = useParams();
  const documentId = params.id;
  const { data: session } = useSession();

  const [singleDoc, setSingleDoc] = useState<DocType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSingleDoc = async () => {
      try {
        const result = await fetch(`/api/${documentId}`);
        if (!result.ok) {
          throw new Error("Failed to fetch document");
        }
        const document = await result.json();
        setSingleDoc(document);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSingleDoc();
  }, [documentId]);

  if (isLoading) {
    return <p>Loading Data...</p>;
  }

  return (
    <div>
      <div className="flex justify-between w-full  mb-4">
        <h1 className="uppercase font-semibold tracking-wider">
          <Link href="." className="text-gray-400">
            All Documents{" "}
          </Link>
          / Document {documentId}
        </h1>
        {session?.user.id == singleDoc?.user_id ? (
          <Link
            href={`/documents/${documentId}/edit`}
            className="bg-blue-400 my-auto px-4 py-1 rounded-xl uppercase font-semibold text-xs text-white"
          >
            Edit
          </Link>
        ) : null}
      </div>
      {singleDoc && (
        <div className="bg-slate-900 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold mb-4">Id: {documentId}</h1>
            {singleDoc.is_public ? (
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
          </div>
          <div className="mt-4 uppercase text-xs text-gray-400">Title:</div>
          <p> {singleDoc.title}</p>

          <div className="mt-4 uppercase text-xs text-gray-400">Author:</div>
          <div className="flex space-x-1">
            <p className="capitalize">{singleDoc.user.username} /</p>
            <p>{singleDoc.user.email}</p>
          </div>
          <div className="mt-4 uppercase text-xs text-gray-400 ">Category:</div>
          <p className="capitalize">
            {singleDoc.categories ? singleDoc.categories.name : null}
          </p>
          <div className="mt-4 uppercase text-xs text-gray-400 ">
            Updated At:
          </div>
          {new Date(singleDoc.updated_at).toLocaleDateString() +
            " " +
            new Date(singleDoc.updated_at).toLocaleTimeString()}
          <div className="mt-4 uppercase text-xs text-gray-400">Content</div>
          <div
            className="mt-1 "
            dangerouslySetInnerHTML={{ __html: singleDoc.content }}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
