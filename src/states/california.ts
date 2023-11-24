import { ElementHandle, Page } from "puppeteer";

export const getInfoCalifornia = async (
  element: ElementHandle<HTMLDivElement>,
  page: Page
) => {
  await element.$$eval("div.interactive-cell-button", (a) => {
    return a.map((ele) => {
      return ele.click();
    });
  });

  await delay(2000);

  const elementdd = await page.$$eval("td.value", (tr) => {
    return tr.map((ele) => {
      return ele.innerText;
    });
  });

  const elementd = await page.$$eval("td.label", (tr) => {
    return tr.map((ele) => {
      return ele.innerText;
    });
  });

  const entries = elementd.map((e, index) => {
    return [e, elementdd[index].replace("\n", " ")];
  });

  const obj = Object.fromEntries(entries);

  const ele = await element.$$eval("span.cell", (tr) => {
    return tr.map((ele) => {
      return ele.innerText;
    });
  });

  return {
    redPills: obj["Status"],
    businessName: ele[0].replace("\n", "").replace('"', ""),
    locationAddress: obj["Mailing Address"].replace("\n", ""),
    agent: obj["Agent"],
  };
};

const delay = (delayInms: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};
