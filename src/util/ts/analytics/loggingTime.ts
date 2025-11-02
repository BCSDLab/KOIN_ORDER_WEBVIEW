export const setStartLoggingTime = (key: string) => {
  sessionStorage.setItem(key, Date.now().toString());
};

export const getLoggingTime = (key: string) => {
  const startTime = sessionStorage.getItem(key);
  if (!startTime) {
    return 0;
  }
  return (Date.now() - Number(startTime)) / 1000;
};
