import { Browser, ElementHandle } from "puppeteer";

export const getInfoHawaii = async (
  element: ElementHandle<HTMLDivElement>,
  browser: Browser
) => {
  const elementa = await element.$$eval("a", (a) => {
    return a.map((ele) => {
      return ele.href;
    });
  });
  const page = await browser.newPage();
  await page.goto(elementa[0], { waitUntil: "networkidle0" });

  const elementdd = await page.$$eval("dd", (dd) => {
    return dd.map((ele) => {
      return ele.innerText;
    });
  });

  const elementdt = await page.$$eval("dt", (dt) => {
    return dt.map((ele) => {
      return ele.innerText;
    });
  });

  const entries = elementdt.map((e, index) => {
    return [e, elementdd[index].replace("\n", " ")];
  });

  const obj = Object.fromEntries(entries);

  return {
    regNumber: obj["Certificate Number"],
    redPills: obj["Status"],
    businessName: obj["Trade Name"] ?? obj["MASTER NAME"],
    locationAddress: obj["Mailing Address"],
    principals: obj["Registrant"],
    agent: obj["AGENT NAME"],
  };
};
