import React, { useState } from "react";

import { format } from "date-fns";
import Link from "next/link";

import { TH } from "../../components/table";
import { Meta } from "../../layout/Meta";
import { IDividend } from "../../models/dividend";
import { Main } from "../../templates/New";
import { getDataService } from "../../services/idataservice";

type IRegionProps = {
  readonly region: string;
  readonly dividends: IDividend[];
};

const formatters: { [key: string]: Intl.NumberFormat } = {};

const getFormatter = (ccy: string): Intl.NumberFormat => {
  if(formatters[ccy] !== undefined) {
    return formatters[ccy];
  }

  formatters[ccy] = new Intl.NumberFormat('en-GB', { style: 'currency', currency: ccy });
  return formatters[ccy];
}

const Region = ({ region, dividends }: IRegionProps) => {
  const reg = region.toUpperCase();
  const meta = <Meta title={reg} description="2" />;

  const [searchTerm, setSearchTerm] = useState("");

  const sorted = dividends
    .filter((d) =>
      searchTerm.length > 0
        ? d.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
          d.ticker.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
        : true
    )
    .sort((a, b) => {
      if (a.exDividendDate - b.exDividendDate === 0) {
        return b.dividendYield - a.dividendYield;
      }
      return a.exDividendDate - b.exDividendDate;
    });

  return (
    <Main meta={meta} title={`Upcoming ${reg} Dividends`} link={`/${region}/`}>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900"></h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:hidden border-gray-300"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                name="search"
                id="search"
                className="hidden focus:ring-indigo-500 focus:border-indigo-500 w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
              </svg>
              <span className="ml-2">Sort</span>
              <svg
                className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <TH>Name</TH>
                    <TH>Symbol</TH>
                    <TH>Dividends</TH>
                    <TH>Yield</TH>
                    <TH>Ex-Dividend Date</TH>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sorted.map((d) => (
                    <tr key={`${d.id}`} title={JSON.stringify(d.raw)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <Link
                            href={`/${region}/${encodeURIComponent(
                              d.ticker.toLowerCase()
                            )}`}
                            passHref
                          >
                            <a className="text-indigo-600 hover:text-indigo-900">
                              {d.name}
                            </a>
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {d.flag}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {d.ticker}
                            </div>
                            <div className="text-sm text-gray-500">
                              {d.market}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getFormatter(d.dividendCcy).format(d.nextAmount)}
                        </div>
                        <div className="text-sm text-gray-500">
                        {getFormatter(d.dividendCcy).format(d.previousAmount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {`${(d.dividendYield * 100).toFixed(2)}%`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(d.exDividendDate, "EE MMM dd yyyy")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export const getStaticProps = async ({ params }: any) => {
  const { region } = params;

  const dataService = getDataService();
  const dividends = await dataService.getDataForRegion(region);

  return {
    props: {
      region,
      dividends,
    },
    revalidate: 360, // In seconds
  };
};

export const getStaticPaths = async () => {
  const regions = ["uk", "us", "eu"];

  // Get the paths we want to pre-render based on posts
  const paths = regions.map((region) => ({
    params: { region },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
};

export default Region;
