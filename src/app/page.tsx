"use client";

import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";

export default function Home() {
  return (
    <>
      <div className="mx-auto flex flex-col items-center py-32 ">
        <h1 className="text-center text-white font-semibold tracking-tighter text-4xl md:text-6xl">
          Welcome To
        </h1>
        <h1 className="text-center text-blue-400 font-semibold md:text-6xl tracking-tighter text-4xl">
          The Document Manager
        </h1>
        <p className="mt-4 text-gray-400 text-sm">
          Create, edit, and manage your documents with ease.
        </p>
        <Link
          href="/documents"
          className="relative mt-8 py-2 px-6 w-fit bg-slate-900 rounded-xl "
        >
          <span className="text-gray-300 text-sm ">View All Documents</span>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto ">
        <h3 className="mt-20 mb-8 capitalize font-semibold text-3xl text-left">
          This is where we <span className="text-blue-400">shine.</span>
        </h3>

        <div className=" pb-20 grid grid-cols-5 gap-4">
          <div className="bg-blue-400 rounded-xl col-span-3 row-span-2 p-6">
            <h3 className="text-white font-semibold uppercase text-lg md:text-2xl ">
              CREATE
            </h3>
            <p className="text-white text-sm mt-2 ">
              Craft new documents with ease, tailoring them to your needs. Our
              intuitive editor allows you to compose content effortlessly,
              making the creation process a breeze.
            </p>
            <img
              src="https://i.pinimg.com/originals/cb/cb/db/cbcbdb6c48a5f2d423e87f2356540bc8.png"
              alt="illustration"
              className="w-64 mx-auto"
            />
          </div>
          <div className="bg-slate-900 col-span-2 rounded-xl p-6">
            <h3 className="text-white font-semibold uppercase text-lg md:text-2xl ">
              Edit
            </h3>
            <p className="text-white text-sm mt-2">
              Precision is key, and our app ensures you can fine-tune your
              documents to perfection. Edit your work with precision and
              confidence, thanks to our robust editing tools
            </p>
          </div>
          <div className="bg-slate-900 col-span-2 rounded-xl p-6">
            <h3 className="text-white font-semibold uppercase text-lg md:text-2xl ">
              Share
            </h3>
            <p className="text-white text-sm mt-2">
              Collaborate seamlessly by sharing your documents with colleagues,
              friends, or the world. Sharing is made simple, whether you&apos;re
              working on a project or expressing your thoughts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
