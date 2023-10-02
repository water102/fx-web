export const setItem = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = (key: string) => {
  const json = localStorage.getItem(key);
  if (json) return JSON.parse(json);
  return null;
};
