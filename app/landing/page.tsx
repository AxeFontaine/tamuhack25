import Image from 'next/image';
import Link from 'next/link';

const Landing = () => {
  return (
    <div className="flex flex-col bg-white w-full h-full">
      <div className="w-full h-20 items-center flex flex-row justify-between">
        <h1 className="text-4xl text-[#330036] font-bold ml-20">gesture</h1>
        <Link href={'https://github.com/AxeFontaine/tamuhack25'} className="h-3/5 w-auto mr-20">
          <Image src="github.svg" alt="" width={0} height={0} className="h-full w-full"></Image>
        </Link>
      </div>

      <div className="flex flex-row items-center justify-center h-5/6 w-full">
        <Image
          src="hand.png"
          alt=""
          width={0}
          height={0}
          className="w-fit h-full"
          objectFit="contain"
          unoptimized={true}
        ></Image>
        <div className='flex flex-col items-center justify-center w-1/2 h-full'>
          <p className="font-bold text-3xl text-[#330036] w-3/4 text-center">
            The newest way to learn how to sign fast and easy!
          </p>
          <Link href={'lesson_match'} className="bg-[#330036] text-white font-bold text-2xl w-72 h-16 rounded-xl mt-10 flex items-center justify-center">
            Get Started!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
