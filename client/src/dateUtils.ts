export function getDefaultDateFormat(dt: Date) {
  return dt.toISOString().split("T")[0];
}
