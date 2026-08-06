import { useEffect, useRef } from "react";

export const useInfiniteScroll = ({ fetchNextPage, hasNextPage }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" } // prefetch earlier
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return ref;
};
