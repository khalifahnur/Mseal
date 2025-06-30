"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FieldProps } from "formik";

interface DateOfBirthPickerProps extends FieldProps {
  label?: string;
}

export function DateOfBirthPicker({ field, form, label = "Date of Birth" }: DateOfBirthPickerProps) {
  const [month, setMonth] = React.useState<string>("");
  const [day, setDay] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 18;

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => (maxYear - i).toString());
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = month && year ? getDaysInMonth(Number.parseInt(month), Number.parseInt(year)) : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

  // Sync internal state with Formik field value (if provided)
  React.useEffect(() => {
    if (field.value && !month && !day && !year) { // Only sync if internal state is empty
      const date = new Date(field.value);
      if (!isNaN(date.getTime())) {
        setYear(date.getFullYear().toString());
        setMonth((date.getMonth() + 1).toString());
        setDay(date.getDate().toString());
      }
    }
  }, [field.value,month,day,year]);

  // Update Formik field value and validate age
  const updateDob = React.useCallback(() => {
    if (month && day && year) {
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      const currentValue = field.value;

      // Only update if the value has changed to prevent loops
      if (formattedDate !== currentValue) {
        form.setFieldValue(field.name, formattedDate);
      }

      //const birthDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day));
      // const today = new Date();
      // let age = today.getFullYear() - birthDate.getFullYear();
      // const monthDiff = today.getMonth() - birthDate.getMonth();

      // if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      //   age--;
      // }

      // if (age < 18) {
      //   setError("You must be at least 18 years old.");
      //   form.setFieldError(field.name, "You must be at least 18 years old.");
      // } 
      if (error || form.errors[field.name]) {
        setError("");
        form.setFieldError(field.name, undefined);
      }
    } else if (field.value) {
      form.setFieldValue(field.name, ""); // Clear if incomplete
    }
  }, [month, day, year, field.name, field.value, form, error]);

  React.useEffect(() => {
    updateDob();
  }, [updateDob]);

  // Adjust day if it exceeds days in month
  React.useEffect(() => {
    if (month && year && day) {
      const maxDays = getDaysInMonth(Number.parseInt(month), Number.parseInt(year));
      if (Number.parseInt(day) > maxDays) {
        setDay(maxDays.toString()); // Adjust to max valid day
      }
    }
  }, [month, year, day]);

  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger id="month">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={day} onValueChange={setDay} disabled={!month || !year}>
            <SelectTrigger id="day">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {/* <p className="text-sm text-muted-foreground">You must be at least 18 years old to register.</p> */}
    </div>
  );
}