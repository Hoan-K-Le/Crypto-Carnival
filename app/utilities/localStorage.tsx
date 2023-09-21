"use client";
export const getLocalStorage = (str: string) => {
  try {
    const item = localStorage.getItem(str);
    if (item !== "undefined" && item !== null) {
      return item;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const setLocalStorage = (str: string, value: string) => {
  localStorage.setItem(str, JSON.stringify(value));
};
