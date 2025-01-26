'use client';
import { signInWithGoogle, signOut } from '../_config/auth';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../_config/firebaseConfig';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    console.log('Signing in with Google');
    try {
      const result = await signInWithGoogle();
      if (result) {
        router.push('dashboard');
      } else {
        console.error('Sign in was not successful');
      }
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('Sign out successful');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div className="flex flex-col text-white bg-[#2F394D]  min-h-screen">
      <div className="flex justify-between pl-5 pr-5 items-center">
        <button onClick={() => router.back()}>
          <Image src="Back.png" alt="" width={60} height={60} unoptimized></Image>
        </button>

        <div className="bg-[#330036] text-xl p-2 rounded-md ">SIGN UP</div>
      </div>
      <div className="flex flex-col  h-full justify-center items-center">
        <div className="flex flex-col bg-[#330036] w-[30%] h-[70vh] items-center justify-evenly rounded-2xl ">
          <div className="font-bold text-2xl">Sign in</div>
          <div className="flex flex-col  h-[47%] w-[70%] justify-between">
            <div className="flex flex-col">
              <div className="font-semibold text-xl">Username</div>
              <input className="bg-white rounded-xl h-fit text-black p-1 text-lg"></input>
            </div>
            <div className="flex flex-col ">
              <div className="font-semibold text-xl">Password</div>
              <input type="password" className="bg-white rounded-xl h-fit p-1 text-xl"></input>
              <div className="text-sm">Forgot password?</div>
            </div>
            <div className=" bg-[#56666B] rounded-xl h-fit p-1 text-l text-center">Sign in</div>
          </div>
          <div className="font-semibold">OR</div>

          <button
            className="flex bg-[#56666B] w-[70%] rounded-xl h-fit p-1 text-l  justify-evenly items-center"
            onClick={handleSignIn}
          >
            <img src="googlelogo.png" className="h-8 w-8"></img>
            <div className="">Sign in with google</div>
          </button>
        </div>
      </div>
    </div>
  );
}
