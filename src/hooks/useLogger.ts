import { useEffect, useRef } from 'react';
import { diffLogger } from '~/util/diffLogger';

const usePrev = <T>(value: T): T => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const createTimestamp = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString();

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

const useLogger = <T>(label: string, value: T): void => {
  const prev = usePrev(value);

  if (typeof window === 'undefined') {
    return;
  }

  const timestamp = createTimestamp();

  console.group(`%c ${label} %c@ ${timestamp}`, 'color: inherit', 'color: gray; font-weight: lighter');
  console.log('%c prev', 'color: #9e9e9e', prev);
  console.log('%c next', 'color: #4caf50', value);
  diffLogger(prev, value);
  console.groupEnd();
};

export {
  createTimestamp,
  useLogger,
  usePrev
};
