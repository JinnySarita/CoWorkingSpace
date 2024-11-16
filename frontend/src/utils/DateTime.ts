export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(new Date(date)); // en-GB formats as DD/MM/YY
}

export function formatDateTime(date: string) {
  const datePart = formatDate(date);
  const timePart = new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${datePart} ${timePart}`;
}
