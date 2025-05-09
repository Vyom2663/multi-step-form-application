
const STORAGE_KEY = "multiStepFormData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormData = (): Record<string, any> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStepData = (formName: string): any => {
  const allData = getFormData();
  return allData[formName];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setStepData = (formName: string, data: any) => {
  const allData = getFormData();
  allData[formName] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
};

export const resetFormData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
