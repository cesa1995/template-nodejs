import puppeteer from "puppeteer-extra";

import { pages } from "../config/llc";
import { State } from "../types/llc";
import { getElementData } from "./strategics";

export const getllcsFromState = async ({
  query,
  state,
}: {
  query: string;
  state: String;
}) => {
  const queryState = State[state as keyof typeof State];
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  try {
    const pg = pages.find((p) => {
      return p.state === queryState;
    });
    if (!pg) {
      throw new Error("Not state found!");
    }
    await page.goto(pg.url, { waitUntil: "networkidle0", timeout: 90000 });
    await page.waitForSelector(pg.searchClass);
    await page.type(pg.searchClass, query);
    await page.$eval(pg.button, (e: any) => {
      if (typeof e.click === "function") {
        e.click();
      }
      if (typeof e.submit === "function") {
        e.submit();
      }
    });
    await page.waitForSelector(`${pg.itemSelector}`, { timeout: 20000 });

    const els: any = await page.$$(`${pg.itemSelector}`);

    const result = await getElementData(
      els.slice(0, 4),
      pg,
      queryState,
      browser,
      page
    );

    await browser.close();

    return result;
  } catch (e) {
    console.log(e);
    await browser.close();
    return [];
  }
};
