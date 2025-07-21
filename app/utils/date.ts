const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const RELATIVE_FORMATTER = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
});

/**
 * Format a date to a readable string (e.g., "Jan 15, 2024, 3:30 PM")
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return DATE_FORMATTER.format(dateObj);
}

/**
 * Format a date to a relative string (e.g., "2 days ago", "just now")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();

  const diffMs  = dateObj.getTime() - now.getTime();

  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const rtf = RELATIVE_FORMATTER;

  if (Math.abs(diffMs) < 45 * 1000) {
    return "just now";
  }

  if (Math.abs(diffMs) < HOUR) {
    const minutes = Math.round(diffMs / MINUTE);
    return rtf.format(minutes, "minute");
  }

  if (Math.abs(diffMs) < DAY) {
    const hours = Math.round(diffMs / HOUR);
    return rtf.format(hours, "hour");
  }

  if (Math.abs(diffMs) < 30 * DAY) {
    const days = Math.round(diffMs / DAY);
    return rtf.format(days, "day");
  }

  return formatDate(dateObj);


  // const diffInSeconds = Math.floor((dateObj.getTime() - now.getTime()) / 1000);
  // const diffInMinutes = Math.floor(diffInSeconds / 60);
  // const diffInHours = Math.floor(diffInMinutes / 60);
  // const diffInDays = Math.floor(diffInHours / 24);
  //
  // if (Math.abs(diffInDays) > 30) {
  //   return formatDate(dateObj);
  // }
  //
  // if (Math.abs(diffInDays) > 0) {
  //   return RELATIVE_FORMATTER.format(diffInDays, "day");
  // }
  //
  // if (Math.abs(diffInHours) > 0) {
  //   return RELATIVE_FORMATTER.format(diffInHours, "hour");
  // }
  //
  // if (Math.abs(diffInMinutes) > 0) {
  //   return RELATIVE_FORMATTER.format(diffInMinutes, "minute");
  // }
  //
  // return "just now";
}
