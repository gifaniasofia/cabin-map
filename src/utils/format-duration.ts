export const formatDurationFromDecimal = (hoursDecimal: number) => {
  const hours = Math.floor(hoursDecimal);
  const minutes = Math.round((hoursDecimal - hours) * 60);

  const parts = [];
  if (hours > 0) parts.push(`${hours} hrs`);
  if (minutes > 0) parts.push(`${minutes} mins`);

  return parts.join(' ');
};