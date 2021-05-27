import React from "react";

import * as accounting from "accounting";
import { format } from "date-fns";
import Link from "next/link";

import { TH } from "../../components/table";
import { Meta } from "../../layout/Meta";
import { IDividend, IDividendMax, map } from "../../models/dividend";
import { Main } from "../../templates/New";

type IRegionProps = {
  readonly region: string;
  readonly dividends: IDividend[];
};

const Region = ({ region, dividends }: IRegionProps) => {
  const reg = region.toUpperCase();
  const meta = <Meta title={reg} description="2" />;

  const sorted = dividends.sort((a, b) => {
    if (a.exDividendDate - b.exDividendDate === 0) {
      return b.dividendYield - a.dividendYield;
    }
    return a.exDividendDate - b.exDividendDate;
  });

  return (
    <Main meta={meta} title={reg} link={`/${region}/`}>
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
                    <tr key={`${d.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <Link
                            href={`/${region}/${encodeURIComponent(d.ticker.toLowerCase())}`}
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
                          {accounting.formatMoney(d.nextAmount, d.ccy)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {accounting.formatMoney(d.previousAmount, d.ccy)}
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
  // eslint-disable-next-line no-nested-ternary
  const id = region === "uk" ? 1 : region === "us" ? 6 : 7;
  const res = await fetch(
    `https://www.dividendmax.com/dividends/declared.json?region=${id}`
  );
  const data: IDividendMax[] = await res.json();
  const dividends = data.map((d, i) => map(d, i)); // .find((d) => d.ticker === params.id);

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
  return { paths, fallback: "blocking" };
};

export default Region;
