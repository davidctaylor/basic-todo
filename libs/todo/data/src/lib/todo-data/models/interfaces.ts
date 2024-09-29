export interface TodoEntry {
  note?: string;
  completed: boolean;
  createdTimestamp: number;
  title: string;
  id?: number
}