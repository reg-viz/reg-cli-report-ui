import { useState, useEffect } from 'react';

export const useMedia = (query: string) => {
  const [state, setState] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    let mounted = true;

    const mql = window.matchMedia(query);

    const handleChange = () => {
      if (mounted) {
        setState(mql.matches);
      }
    };

    mql.addListener(handleChange);

    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(handleChange);
    };
  }, [query]);

  return state;
};
