import React from "react";

import * as accounting from "accounting";
import { format } from "date-fns";

import { TH } from "../../components/table";
import { Meta } from "../../layout/Meta";
import { IDividend } from "../../models/dividend";
import { Main } from "../../templates/New";
import { getDataService } from "../../services/idataservice";

type ISymbolProps = {
  readonly symbol: string;
  readonly region: string;
  readonly dividends: IDividend[];
};

const Symbol = ({ symbol, region, dividends }: ISymbolProps) => {
  const meta = <Meta title={symbol} description="2" />;
  const sym = symbol.toUpperCase();

  const sorted = dividends.sort((a, b) => {
    if (a.exDividendDate - b.exDividendDate === 0) {
      return b.dividendYield - a.dividendYield;
    }
    return a.exDividendDate - b.exDividendDate;
  });

  return (
    <Main meta={meta} title={sym} link={`/${region}/${symbol}/`}>
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
                    <tr key={`${d.exDividendDate}-${d.market}-${d.ticker}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {d.name}
                          </a>
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
  const { region, symbol } = params;

  const dataService = getDataService();
  const data = await dataService.getDataForRegion(region);
  const dividends = data
    .filter((d) => d.ticker.toLowerCase() === symbol);

  return {
    props: {
      ...params,
      dividends,
    },
    revalidate: 360, // In seconds
  };
};

export const getStaticPaths = async () => {
  const regions = ["uk", "us", "eu"];

  const dataService = getDataService();

  const data = regions.map(async (r) => {
    const dividends = await dataService.getDataForRegion(r);

    return dividends.map((d) => ({
      params: { symbol: d.ticker, region: r },
    }));
  });

  const pathOfPaths = await Promise.all(data);

  const paths = Array.prototype.concat.apply([], pathOfPaths);


  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
};

export default Symbol;
