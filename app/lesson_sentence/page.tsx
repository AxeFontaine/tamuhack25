'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Sentence = () => {
  const [timer, setTimer] = useState(10);
  const [signs, setSigns] = useState(['I', 'a', 'm', 'h', 'u', 'n', 'g', 'r', 'y']);
  const [currSignIdx, setCurrSignIdx] = useState(0);
  const [currWord, setCurrWord] = useState('');

  const [currActivity, setCurrActivity] = useState<number>(() => {
    // Initialize currActivity from localStorage
    const savedActivity = localStorage.getItem('currActivity');
    return savedActivity ? parseInt(savedActivity, 10) : 1;
  });
  const router = useRouter();

  useEffect(() => {
    const fetchCurrWord = async () => {
      try {
        const response = await fetch('http://localhost:5000/curr_word');
        const data = await response.json();
        setCurrWord(data.curr_word);
        if (data.curr_word == signs[currSignIdx].toLowerCase()) {
          setCurrSignIdx(currSignIdx + 1);
          setTimer(10);
        }
      } catch (error) {
        console.error('Error fetching current word:', error);
      }
    };

    const interval = setInterval(fetchCurrWord, 500); // Poll every 500ms
    return () => clearInterval(interval);
  }, [currSignIdx, signs]);

  useEffect(() => {
    // Update localStorage whenever currActivity changes
    localStorage.setItem('currActivity', currActivity.toString());
  }, [currActivity]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timer == 0) {
        if (currActivity > 1) {
          setCurrActivity(currActivity - 1);
        }
        router.back();
        return;
      }
      setTimer(timer - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currActivity, router, timer]);

  return (
    <div className="h-full w-full flex bg-[#2F394D] justify-center items-center">
      <div className="flex w-1/2 h-5/6 justify-center items-center flex-col gap-5">
        <div className="w-3/4 h-20 bg-[#D8A1CA] flex justify-center items-center text-3xl font-bold text-[#330036]">
          Sign the Sentence!
        </div>

        <div className="flex flex-row w-full h-16 justify-between items-center">
          <div className="text-2xl text-white font-bold">
            {signs.map((sign, i) => (
              <span key={i} className="mx-1" style={{ color: i == currSignIdx ? '#2CDE9A' : '' }}>
                {sign}
              </span>
            ))}
          </div>

          <p className="text-[#EEE1B3] text-2xl font-bold">{timer}s</p>
        </div>

        <div className="w-full h-5/6 bg-[#330036] flex flex-col justify-evenly items-center font-black text-3xl text-white">
          <img src="http://localhost:5000/video_feed" alt="ASL Video Stream" />
        </div>
        <div className="text-2xl text-white font-bold">{currWord}</div>
      </div>
    </div>
  );
};

export default Sentence;
