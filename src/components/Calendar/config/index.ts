import dayjs from "dayjs";
import { WeekDays } from "../@types";

export function weekDays(): WeekDays {
  return { week: ["D", "S", "T", "Q", "Q", "S", "S"] };
}

export function weekDates(): string[] {
  const days: string[] = [];
  const todayInNumber = dayjs().day();
  const today = dayjs();

  for (let i = 0; i <= todayInNumber; i++) {
    days.push(today.subtract(todayInNumber - i, "day").format("D"));
  }

  const daysToAdd = 7 - days.length;

  if (todayInNumber < 6) {
    for (let i = 1; i <= daysToAdd; i++) {
      days.push(today.add(i, "day").format("D"));
    }
  }
  return days;
}
