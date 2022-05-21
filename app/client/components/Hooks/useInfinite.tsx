import { useCallback, useRef, useState } from 'react';

const useInfinite = ({ ignore = false } = {}) => {
  const [show, setShow] = useState(false);

  const lastDivRef: any = useRef();
  const isInViewRef = useCallback((node) => {
    if (ignore) {
      return;
    }
    lastDivRef.current = new IntersectionObserver(
      async (entries, observerInst) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          lastDivRef?.current?.disconnect(node);
          observerInst?.unobserve(entries[0].target);
        }
      }
    );
    if (node) lastDivRef?.current?.observe(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isInViewRef, show };
};

export default useInfinite;
