
export function formatCurrentDate(): string {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'short' }); // e.g. "Nov"
  const year = today.getFullYear();

  return `${day} ${month} ${year}`;
}
