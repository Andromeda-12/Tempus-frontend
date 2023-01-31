export const formatDate = (date: Date) => {
    const [dateStr] = new Date(date).toISOString().split("T");
    const result = dateStr.split('-').reverse().join('.')
    return result;
  };
  