const Words = () => {
    const pickRandWord = ({words}: {words: Object[]}) => {
        return words[Math.floor(Math.random() * words.length)];
    };

    return (
        <div className="min-h-screen bg-[#2F394D]">
            <div className="h-16"></div>
            <div className="space-y-16">
                <div className="flex w-7/12 justify-self-center bg-[#D8A1CA] justify-center rounded-2xl p-5 text-5xl text-[#330036] font-bold">
                    <h1 className="">
                        Sign the Word
                    </h1>
                </div>
                <div className="flex w-1/2 justify-self-center justify-center bg-[#56666B] h-64 items-center rounded-2xl">
                    <div>
                        hi
                    </div>
                </div>
                <div className="flex-column w-1/5 justify-self-center bg-[#330036] justify-items-center rounded-2xl duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-[#6b0c70] text-[#EEE1B3] p-5">
                    <h1 className="font-bold text-3xl">
                        Word
                    </h1>
                    <h2>
                        Click To See Sign
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Words;