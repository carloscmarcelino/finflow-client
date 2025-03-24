export type Entry = {
  value: number;
  date: string;
  id: string;
  description: string;
};

export type TotalEntries = {
  total: number;
};

export type CreateEntryBody = {
  value: number;
  date: string;
  description: string;
};

export type EditEntryBody = {
  value: number;
  date: string;
  description: string;
};
