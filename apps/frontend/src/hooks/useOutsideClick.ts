import { RefObject, useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  isActive: boolean = true,
) => {
  useEffect(() => {
    if (isActive) {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [ref, callback, isActive]);
};
