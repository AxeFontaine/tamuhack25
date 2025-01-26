'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Sentence = () => {
  const [timer, setTimer] = useState(10);
  const [signs, setSigns] = useState(['I am', 'hungry']);
  const [currSignIdx, setCurrSignIdx] = useState(0);

  const [currActivity, setCurrActivity] = useState<number>(() => {
    // Initialize currActivity from localStorage
    const savedActivity = localStorage.getItem('currActivity');
    return savedActivity ? parseInt(savedActivity, 10) : 1;
  });
  const router = useRouter();

  useEffect(() => {
    // Update localStorage whenever currActivity changes
    localStorage.setItem('currActivity', currActivity.toString());
  }, [currActivity]);

  useEffect(() => {
    setTimeout(() => {
      if (timer == 0) {
        if (currSignIdx < signs.length - 1) {
          setCurrSignIdx(currSignIdx + 1);
          setTimer(10);
        } else {
          setCurrActivity(currActivity - 1);
          router.back();
        }
        return;
      }
      setTimer(timer - 1);
    }, 1000);
  }, [timer]);

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
          CAMERA
        </div>
      </div>
    </div>
  );
};

export default Sentence;
