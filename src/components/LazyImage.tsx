import { useEffect, useRef, useState } from 'react';
import { ImgHTMLAttributes } from 'react';

interface LazyImage {
  image: string;
  onLazyLoad?: (node: HTMLImageElement) => void;
}

type ImageNativeTypes = ImgHTMLAttributes<HTMLImageElement>;

export type PropsLazyImage = LazyImage & ImageNativeTypes;

export const LazyImage = ({ image, ...props }: PropsLazyImage) => {
  const node = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState(
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=',
  );

  //nuevo observador
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSrc(image);
        }
      });
    });
    //observador esta observando el nodo
    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [image]);

  //desconectarnos cuando el componente se desmonta

  return <img ref={node} src={src} {...props} />;
};
