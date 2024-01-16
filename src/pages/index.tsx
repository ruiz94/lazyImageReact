import { useState } from 'react';
import type { MouseEventHandler } from 'react';
import { LazyImage } from '@/components/LazyImage';

const random = () => Math.floor(Math.random() * 123) + 1;
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = event => {
    const newImgItem: ImageItem = {
      id: generateId(),
      url: `https://randomfox.ca/images/${random()}.jpg`,
    };
    setImages([...images, newImgItem]);
  };

  return (
    <main className='w-full flex flex-col items-center'>
      <h1 className='text-6xl mb-6'>
        Hello <span className='font-bold'>Fox</span>
      </h1>
      <button
        onClick={addNewFox}
        className='bg-blue-200 py-2 px-8 rounded mb-4 font-bold'
      >
        Add Fox
      </button>
      <div className='w-3/4 flex flex-col items-center'>
        {images.map(img => (
          <LazyImage
            key={img.id}
            image={img.url}
            width={320}
            height='auto'
            className='rounded-lg mb-8 bg-slate-400'
            onClick={() => console.log('click')}
          />
        ))}
      </div>
      <div className='w-3/4 text-center'>
        {images.length <= 0 ? <span>No foxes found</span> : null}
      </div>
    </main>
  );
}
