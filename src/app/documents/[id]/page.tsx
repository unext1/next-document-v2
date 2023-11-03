"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DocumentPage = () => {
  const params = useParams();
  const documentId = params.id;

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
        <Link
          href={`/documents/${documentId}/edit`}
          className="bg-blue-400 my-auto px-4 py-1 rounded-xl uppercase font-semibold text-xs text-white"
        >
          Edit
        </Link>
      </div>
      {singleDoc && (
        <div className="bg-slate-900 rounded-xl p-4">
          <h1 className="font-bold mb-4">Id: {documentId}</h1>
          <div className="mt-4 uppercase text-xs text-gray-400">Title:</div>
          <p> {singleDoc.title}</p>
          <div className="mt-4 uppercase text-xs text-gray-400">Author:</div>
          <p>{singleDoc.author}</p>
          <div className="mt-4 uppercase text-xs text-gray-400">Content:</div>
          <div
            className="text-sm mt-1 prose-sm"
            dangerouslySetInnerHTML={{ __html: singleDoc.content }}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
