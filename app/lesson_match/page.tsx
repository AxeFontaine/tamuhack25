'use client';

// import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Match = () => {
  const router = useRouter();
  const [match_data, setMatch_data] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const initialData = ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6'];
    setMatch_data(shuffle([...initialData]));
  }, []);

  useEffect(() => {
    if (selected.length === 2) {
      if (match_data[selected[0]] === match_data[selected[1]]) {
        setMatched([...matched, selected[0], selected[1]]);
      }
      setSelected([]);
    }
    if (match_data.length != 0 && match_data.length == matched.length) {
      setMatch_data(shuffle(match_data));
      setMatched([]);
      router.back();
    }
  }, [selected, match_data, matched, router]);

  const handleClick = (index: number) => {
    if (selected.length < 2 && !selected.includes(index) && !matched.includes(index)) {
      setSelected([...selected, index]);
    }
  };

  return (
    <div className="h-full w-full flex bg-[#2F394D] justify-center items-center">
      <div className="w-3/4 h-3/4 grid grid-cols-4 grid-rows-3 gap-0">
        {match_data.map((x, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={matched.includes(i)}
            style={{ visibility: matched.includes(i) ? 'hidden' : 'visible' }}
            className="flex h-full border-4 border-[#3E4C51] bg-[#111621] justify-center items-center hover:bg-[#e9c9e1]"
          >
            {/* <Image src="globe.svg" alt="" width={0} height={0} className="w-full h-full" /> */}
            <p className="font-bold text-white text-3xl">{x}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Match;
