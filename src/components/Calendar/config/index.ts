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

  if (todayInNumber < 6) {
    for (let i = todayInNumber; i < 6; i++) {
      days.push(today.add(6 - i, "day").format("D"));
    }
  }

  return days;
}
