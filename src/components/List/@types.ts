export type ListContent = {
  pacientName: string;
  sessionHour: string;
  id: string | number;
};

export interface Props {
  date: string;
  content: ListContent[];
  sessionId: string;
}
