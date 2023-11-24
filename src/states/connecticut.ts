import { ElementHandle } from "puppeteer";

export const getInfoConnecticut = async (
  element: ElementHandle<HTMLDivElement>
) => {
  const elementp = await element.$$eval("p", (p) => {
    return p.map((ele) => {
      return ele.textContent;
    });
  });

  const elementSpan = await element.$$eval("span", (p) => {
    return p.map((ele) => {
      return ele.textContent;
    });
  });

  const elementH6 = await element.$$eval("h6", (p) => {
    return p.map((ele) => {
      return ele.textContent;
    });
  });
  return {
    regNumber: elementp[0],
    redPills: elementSpan[1],
    businessName: elementH6[0],
    locationAddress: elementp[1],
    principals: elementp[3],
    agent: elementp[5],
  };
};
