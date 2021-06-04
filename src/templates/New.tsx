import React, { ReactNode } from "react";

import Link from "next/link";

import { Footer } from "../components/footer";
import { Header } from "../components/header";

// import { Config } from '../utils/Config';

type IMainProps = {
  title: string;
  link: string;
  meta: ReactNode;
  children: ReactNode;
};

type ILink = {
  title: string;
  link: string;
};

const links: ILink[] = [
  { title: "Dashboard", link: "/" },
  { title: "UK", link: "/uk" },
  { title: "US", link: "/us" },
  { title: "EU", link: "/eu" },
];

const Main = ({ title, link, children, meta }: IMainProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {meta}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {links.map((l) => {
                  const classes =
                    l.link === link
                      ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
                  return (
                    <Link key={l.link} href={l.link} passHref>
                      <a
                        className={classes}
                        aria-current={l.link === link ? "page" : undefined}
                      >
                        {l.title}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="sm:hidden" id="mobile-menu">
            <div className="pt-2 pb-3 space-y-1">
              {links.map((l) => {
                const classes =
                  l.link === link
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium";
                return (
                  <Link key={l.link} href={l.link} passHref>
                    <a
                      className={classes}
                      aria-current={l.link === link ? "page" : undefined}
                    >
                      {l.title}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      <div className="py-10">
        <Header>{title}</Header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="rounded-lg">{children}</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export { Main };
