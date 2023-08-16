import { useCallback, useState } from 'react';

function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);
  const onToggle = useCallback(() => {
    setValue(!value);
  }, [value]);
  return [value, onToggle] as [boolean, typeof onToggle];
}

export default useToggle;
