'use client';

import Image from 'next/image';
import { useState } from 'react';

const Dashboard = () => {
  const currUser = false;
  const [currActivity, setCurrActivity] = useState(1);

  const ActivityButton: React.FC<{ idx: number}> = ({ idx }) => {
    let position;
    switch (idx % 3) {
      case 0:
        position = 'place-self-start';
        break;
      case 1:
        position = 'place-self-center';
        break;
      case 2:
        position = 'place-self-end';
        break;
    }

    let bg_color;
    let file_name;
    if (idx + 1 > currActivity) {
      bg_color = 'bg-[#56666B]';
      file_name = 'lock.svg';
    } else if (idx + 1 < currActivity) {
      bg_color = 'bg-[#330036]';
      file_name = 'check.svg';
    } else {
      bg_color = 'bg-[#D8A1CA]';
      file_name = 'circle.svg';
    }

    const handleClick = () => {
        if (idx + 1 <= currActivity) {
            setCurrActivity(currActivity + 1);
            console.log(currActivity);
        }
    }

    return (
      <button onClick={handleClick} className={`w-1/4 h-24 ${bg_color} rounded-xl mx-2 ${position} shrink-0 flex justify-center items-center`}>
        <Image src={file_name} alt="" width={60} height={40} />
      </button>
    );
  };

  return (
    <div className="h-full w-full flex bg-[#2F394D]">
      <div className="w-3/4 h-full flex flex-col mx-12 overflow-y-scroll">
        <h2 className="w-full text-center border-b-2 border-[#EEE1B3] leading-[0.1em] my-12">
          <span className="bg-[#2F394D] p-2 font-bold text-[#EEE1B3] text-2xl leading-[0.1em]"> LESSON 1 </span>
        </h2>
        {[...Array(10)].map((x, i) => (
          <ActivityButton key={i} idx={i} />
        ))}
      </div>
      <div className="w-1/2 h-full flex flex-col items-center justify-around">
        {!currUser && (
          <div className="w-10/12 h-fit py-5 border-[#56666B] border-8 rounded-lg items-center flex flex-col gap-3 font-extrabold">
            <p className="text-[#EEE1B3] text-lg text-center"> Use an account to track your progress!</p>
            <button className="px-32 py-2 bg-[#D8A1CA] rounded-md"> Sign up </button>
            <button className="px-32 py-2 bg-[#2CDE9A] rounded-md"> Sign in </button>
          </div>
        )}
        <div className="w-10/12 h-96 border-[#56666B] border-8 rounded-lg flex flex-col">
          <div className="w-full h-fit flex flex-row p-8 justify-between">
            <div className="font-bold text-2xl text-[#EEE1B3] flex flex-row gap-2 items-center">
              <Image src="novice_badge.svg" alt="" width={40} height={40} />
              Novice
            </div>
            <div className="font-bold text-2xl text-[#2CDE9A] flex flex-row gap-2 items-center">
              <Image src="flame.svg" alt="" width={30} height={30} />2
            </div>
          </div>

          <div className="p-10">
            <h2 className="font-bold text-2xl text-white"> Daily Challenge </h2>
            <div className="text-[#EEE1B3] font-bold text-md pl-5">
              Finish 5 activities
              <div className="relative w-full h-5 bg-slate-500 rounded-lg">
                <p className="absolute h-full left-0 right-0 me-auto ms-auto w-fit">{currActivity}/5</p>
                <div className="h-full bg-[#D8A1CA] rounded-lg max-w-full" style={{ width: `${(currActivity / 5) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
