const formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export function formatDate(date: string) {
  const d = new Date(date);
  return formatter.format(d);
}
