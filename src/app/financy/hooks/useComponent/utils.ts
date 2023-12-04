import moment from "moment";
import { Months } from "../../../../@types";

export function getLastsSixMonths(): Months[] {
  let months: Months[] = [];
  for (let i = 0; i < 6; i++) {
    const monthName = moment().subtract(i, "months").format("MMM");
    months.push(
      (monthName.charAt(0).toUpperCase() + monthName.slice(1)) as Months
    );
  }
  return months.reverse();
}

export const defaultChartData = {
  label: '',
  spacing: 2,
  labelWidth: 30,
  labelTextStyle: { color: 'gray' },
}