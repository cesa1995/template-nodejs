export type configType = {
  url: string;
  button: string;
  searchClass: string;
  itemSelector: string;
  state: State;
  start: number;
};

export enum State {
  connecticut,
  hawaii,
  california,
  florida,
}

export type info = Array<{
  redPills?: string | null;
  regNumber?: string | null;
  businessName?: string | null;
  locationAddress?: string | null;
  principals: string | null;
  agent: string | null;
}>;
