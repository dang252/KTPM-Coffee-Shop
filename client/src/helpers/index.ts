// Example: 2023-12-30T18:31:45.365Z
export const formatDay = (date: string) => {
  const d = date.split("T")[0].split("-");
  const [year, month, day] = d;
  const format = day + "/" + month + "/" + year;

  return format;
};
