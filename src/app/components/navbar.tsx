"use client";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Disclosure as="header" className="shadow fixed w-full py-2 z-50">
      {({ open }) => (
        <div className=" mx-6 md:mx-20 mt-3 bg-slate-900/80 py-2 px-6 rounded-xl">
          <div className="flex h-12 justify-between">
            <div className="flex my-auto">
              <Link
                href="/"
                className="text-xl uppercase font-semibold tracking-widest text-blue-400"
              >
                Doc<span className="text-white">uments</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 text-sm"
              >
                Home
              </Link>
              <Link
                href="/documents"
                className="inline-flex items-center px-1 pt-1 text-sm"
              >
                Documents
              </Link>
              <Link
                href="/documents/new"
                className="inline-flex items-center px-1 pt-1 text-sm"
              >
                Add Document
              </Link>
            </div>

            <div className="flex  items-center sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-neutral-content hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-focus">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-6 pb-3 pt-2">
              <Link href="/" className="w-full">
                <Disclosure.Button className="block w-full py-1 pl-3 pr-4 text-base text-left font-medium ">
                  Home
                </Disclosure.Button>
              </Link>
              <Link href="/documents" className="w-full">
                <Disclosure.Button className="block w-full py-1 pl-3 pr-4 text-base text-left font-medium ">
                  Documents
                </Disclosure.Button>
              </Link>
              <Link href="/documents/new" className="w-full">
                <Disclosure.Button className="block w-full py-1 pl-3 pr-4 text-base text-left font-medium ">
                  Add Document
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
