export function formatMsgTime(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",  // "May"
    day: "numeric",  // "25"
    year: "numeric", // "2025"
  });

  const formattedTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,  // 12-hour format
  });

  return `${formattedDate}, ${formattedTime}`;
}
