export function getTimezone() {
  return new Date().toLocaleDateString('en-US', { timeZoneName: 'short' }).split(', ')[1].trim();
}
