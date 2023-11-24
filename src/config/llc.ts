import { State, configType } from "../types/llc";

export const pages: Array<configType> = [
  {
    url: "https://service.ct.gov/business/s/onlinebusinesssearch?language=en_US",
    button: "span.search-icon",
    searchClass: ".slds-input",
    itemSelector: "div.business-card",
    state: State.connecticut,
    start: 0,
  },
  {
    url: "https://hbe.ehawaii.gov/documents/search.html",
    button: "button.doSearch",
    searchClass: "#query",
    itemSelector: "tr",
    state: State.hawaii,
    start: 1,
  },
  {
    url: "https://bizfileonline.sos.ca.gov/search/business",
    button: "button.search-button",
    itemSelector: "tr.div-table-row",
    searchClass: ".search-input",
    start: 1,
    state: State.california,
  },
  {
    url: "http://search.sunbiz.org/Inquiry/CorporationSearch/ByName",
    button: "input:nth-child(1)",
    itemSelector: "tr",
    searchClass: "#SearchTerm",
    start: 1,
    state: State.florida,
  },
];
