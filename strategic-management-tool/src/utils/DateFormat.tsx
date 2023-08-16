export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const ordinal = (d: number) =>
    d +
    (31 == d || 21 == d || 1 == d
      ? "st"
      : 22 == d || 2 == d
      ? "nd"
      : 23 == d || 3 == d
      ? "rd"
      : "th");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${ordinal(day)} ${months[month]}, ${year}`;
};
