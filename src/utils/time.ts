/** Convert timestamp in ms to Date */
export function toDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}
