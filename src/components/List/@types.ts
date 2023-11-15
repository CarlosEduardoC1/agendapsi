export type ListContent = {
  pacientName: string;
  sessionHour: string;
};

export interface Props {
  date: string;
  content: ListContent[];
}
