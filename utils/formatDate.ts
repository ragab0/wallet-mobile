const formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export function formatDate(date?: string) {
  if (!date) return null;
  try {
    const d = new Date(date);
    return formatter.format(d);
  } catch (_) {
    return null;
  }
}
