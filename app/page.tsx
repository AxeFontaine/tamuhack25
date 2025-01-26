'use client';
import { signInWithGoogle } from "./_config/auth";
import { onAuthStateChanged , User} from "firebase/auth";
import { auth } from "./_config/firebaseConfig";
import { useEffect, useState } from "react";

export default function Home() {

  const [user, setUser] = useState<User | null>(null);

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

      try{
        await signInWithGoogle();
      }
      catch(error){
        console.error("Error signing in with Google", error);
      }
      //check log in status
      
  };
  
  return (
    <div className="flex flex-col  bg-[#2F394D]  min-h-screen">
      <div className="flex justify-between pl-5 pr-5 items-center">
          <img src = "Back.png"></img>
          <div className="bg-[#330036] text-xl p-2 rounded-md">
            SIGN UP
          </div>

      </div>
        <div className="flex flex-col  h-full justify-center items-center">
      
      <div className="flex flex-col bg-[#330036] w-[30%] h-[70vh] items-center justify-evenly rounded-2xl ">
        <div className="font-bold text-2xl">
          Sign in
        </div>
        <div className="flex flex-col  h-[47%] w-[70%] justify-between">
          <div className="flex flex-col">
            <div className="font-semibold text-xl">
              Username
            </div>
            <input className="bg-white rounded-xl h-fit text-black p-1 text-lg">

            </input>
          </div>
          <div className="flex flex-col ">
            <div className="font-semibold text-xl">
              Password
            </div>
            <input type="password" className="bg-white rounded-xl h-fit p-1 text-xl">
            </input>
            <div className="text-sm">
              Forgot password?
            </div>
          </div>
          <div className=" bg-[#56666B] rounded-xl h-fit p-1 text-l text-center">
            Sign in
          </div>
        </div>
        <div className="font-semibold">
          OR
        </div>

        <button className="flex bg-[#56666B] w-[70%] rounded-xl h-fit p-1 text-l  justify-evenly items-center" 
        onClick={handleSignIn}>
            <img src = "googlelogo.png" className="h-8 w-8">
            
            </img>
          <div className="" >
            Sign in with google
          </div>
        </button>

      </div>
    </div>

    </div>
    
  );
}
