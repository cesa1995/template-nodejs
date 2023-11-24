import { Browser, ElementHandle } from "puppeteer";

export const getInfoFlorida = async (
  element: ElementHandle<HTMLDivElement>,
  browser: Browser
) => {
  const elementa = await element.$$eval("td>a", (a) => {
    return a.map((ele) => {
      return ele.href;
    });
  });
  const page = await browser.newPage();
  await page.goto(elementa[0], { waitUntil: "networkidle0" });

  const name = await page.$$eval("div.corporationName>p", (dd) => {
    return dd.map((ele) => {
      return ele.innerText;
    });
  });

  const labels = await page.$$eval(
    "div.filingInformation>span>div>label",
    (dd) => {
      return dd.map((ele) => {
        return ele.innerText;
      });
    }
  );

  const spans = await page.$$eval(
    "div.filingInformation>span>div>span",
    (dd) => {
      return dd.map((ele) => {
        return ele.innerText;
      });
    }
  );

  const details = await page.$$eval("div.detailSection>span", (dd) => {
    return dd.map((ele) => {
      return ele.innerText;
    });
  });

  const entries = labels.map((e, index) => {
    return [e, spans[index].replace("\n", " ")];
  });

  const obj = Object.fromEntries(entries);

  const entriesAddress: Array<string[]> = [];

  const cleanCharger = details.filter((text) => !text.includes("Changed"));

  for (let i = 0; i < cleanCharger.length; i = i + 2) {
    entriesAddress.push([cleanCharger[i], cleanCharger[i + 1]]);
  }

  const obj2 = Object.fromEntries(entriesAddress);

  return {
    regNumber: obj["Document Number"],
    redPills: obj["Status"],
    businessName: name[1] ?? name[0],
    locationAddress: obj2["Mailing Address"],
    agent: obj2["Registered Agent Name & Address"],
  };
};
