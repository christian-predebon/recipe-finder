import { useRef, useState } from "react";

export enum ScrollDirection {
  LEFT = "left",
  RIGHT = "right",
}
const SCROLL_AMOUNT = 400;

export function useRecipeCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hasScrollableContent, setHasScrollableContent] = useState(false);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      setHasScrollableContent(scrollWidth > clientWidth);
    }
  };

  const scroll = (direction: ScrollDirection) => {
    if (carouselRef.current) {
      const scrollAmount =
        direction === ScrollDirection.LEFT ? -SCROLL_AMOUNT : SCROLL_AMOUNT;

      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return {
    carouselRef,
    showLeftArrow,
    showRightArrow,
    handleScroll,
    scroll,
    hasScrollableContent,
  };
}
