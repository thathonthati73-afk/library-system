import { useState, useEffect } from "react";

// works like useState but saves the value in local storage
function useLocalStorage(key, startValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : startValue;
  });

  // runs every time the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
