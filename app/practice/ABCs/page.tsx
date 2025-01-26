'use client';

import React, { useState } from 'react';
import NavigationBar from '../../_components/NavigationBar';

const ABCs = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
  ];

  const pickRandLetter = () => {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setSelectedLetter(randomLetter);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    pickRandLetter();
  };

  return (
    <div className="min-h-screen bg-[#2F394D]">
      <NavigationBar />
      <div className="h-16"></div>
      <div className="space-y-16 justify-content-center items-center flex flex-col">
        <div className="flex w-7/12 bg-[#D8A1CA] justify-center rounded-2xl p-5 text-5xl text-[#330036] font-bold">
          <h1 className="">Sign The Letter</h1>
        </div>
        <div className="flex w-1/2 justify-center bg-[#56666B] h-64 items-center rounded-2xl">
          <img src="http://localhost:5000/video_feed" alt="ASL Video Stream" />
        </div>
        <button
          onClick={toggleVisibility}
          className="flex-column w-1/5 justify-self-center bg-[#330036] justify-center rounded-2xl duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-[#6b0c70] text-[#EEE1B3] p-5"
        >
          <h1 className="font-bold text-3xl">{selectedLetter}</h1>
          <h2>Click To See Sign</h2>
        </button>
      </div>
    </div>
  );
};

export default ABCs;
