"use client";

import React, { useState } from 'react';
import NavigationBar from "../../_components/NavigationBar";

const Words = () => {
    const pickRandWord = ({words}: {words: Object[]}) => {
        return words[Math.floor(Math.random() * words.length)];
    };

    const [isVisible, setIsVisible] = useState(true);

    const pickRandLetter = ({letters}: {letters: Object[]}) => {
        return letters[Math.floor(Math.random() * letters.length)];
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="min-h-screen bg-[#2F394D] items-center">
            <NavigationBar />
            <div className="h-52"></div>
            <div className="flex w-7/12 h-48 items-center bg-[#D8A1CA] justify-self-center justify-center rounded-2xl p-5 text-5xl text-[#330036] font-bold">
                <h1 className="">
                    Coming Soon!
                </h1>
            </div>
        </div>
    );
};

export default Words;