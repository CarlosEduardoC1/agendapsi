export function parseMonths(direction: "toMonth" | "byMonth", param: any) {
  if (direction === "byMonth") return byMonth[param];
  return toMonth[param];
}

const toMonth: any = {
  "1": "Jan",
  "2": "Fev",
  "3": "Mar",
  "4": "Abr",
  "5": "Mai",
  "6": "Jun",
  "7": "Jul",
  "8": "Ago",
  "9": "Set",
  "10": "Out",
  "11": "Nov",
  "12": "Dez",
};

const byMonth: any = {
  Jan: "1",
  Fev: "2",
  Mar: "3",
  Abr: "4",
  Mai: "5",
  Jun: "6",
  Jul: "7",
  Ago: "8",
  Set: "9",
  Out: "10",
  Nov: "11",
  Dez: "12",
};
