import React, { ReactNode } from 'react';

import Link from 'next/link';

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
  { title: 'Dashboard', link: '/' },
  { title: 'UK', link: '/uk' },
  { title: 'US', link: '/us' },
  { title: 'EU', link: '/eu' },
];

const Main = (props: IMainProps) => (
  <div className="min-h-screen bg-gray-100">
    {props.meta}
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
                const classes = l.link === props.link
                  ? 'border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium';
                return (
                  <Link key={l.link} href={l.link} passHref>
                    <a
                      className={classes}
                      aria-current={l.link === props.link ? 'page' : undefined}
                    >
                      {l.title}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              type="button"
              className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixqx=RqTr5PIMpH&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                    alt=""
                  />
                </button>
              </div>

              {/*
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            */}
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex={-1}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-1"
                >
                  Settings
                </a>

                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/*
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/*
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {links.map((l) => {
            const classes = l.link === props.link
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium';
            return (
              <Link key={l.link} href={l.link} passHref>
                <a className={classes} aria-current={l.link === props.link ? 'page' : undefined}>
                  {l.title}
                </a>
              </Link>
            );
          })}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&mp;ixqx=RqTr5PIMpH&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">Tom Cook</div>
              <div className="text-sm font-medium text-gray-500">tom@example.com</div>
            </div>
            <button
              type="button"
              className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">View notifications</span>

              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          <div className="mt-3 space-y-1">
            <a
              href="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Your Profile
            </a>

            <a
              href="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Settings
            </a>

            <a
              href="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">{props.title}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="rounded-lg h-96">
              {props.children}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

export { Main };
