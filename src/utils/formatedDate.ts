export const formatDate = (newDate: string) => {
  const date = new Date(newDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
