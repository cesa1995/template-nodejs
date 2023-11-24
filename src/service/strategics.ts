import { Browser, ElementHandle, Page } from "puppeteer";
import { getInfoHawaii } from "../states/hawaii";
import { State, configType, info } from "../types/llc";
import { getInfoConnecticut } from "../states/connecticut";
import { getInfoCalifornia } from "../states/california";
import { getInfoFlorida } from "../states/florida";

export const getDataByState: Record<
  string,
  (els: ElementHandle<HTMLDivElement>, blowser: Browser, page: Page) => any
> = {
  [State.connecticut]: (els, _, __) => {
    return getInfoConnecticut(els);
  },
  [State.hawaii]: (els, browser, _) => {
    return getInfoHawaii(els, browser);
  },
  [State.california]: (els, _, page) => {
    return getInfoCalifornia(els, page);
  },
  [State.florida]: (els, browser, _) => {
    return getInfoFlorida(els, browser);
  },
};

export const getElementData = async (
  element: ElementHandle<HTMLDivElement>[],
  config: configType,
  state: State,
  browser: Browser,
  page: Page
) => {
  const result: info = [];
  const handler = getDataByState[state];
  for (let i = config.start; i < element.length; i++) {
    const info = await handler(element[i], browser, page);
    result.push(info);
  }
  return result;
};
