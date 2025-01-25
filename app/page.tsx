

export default function Home() {
  return (
    <div className="flex flex-col bg-[#2F394D] min-h-screen h-full justify-center items-center">
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

        <div className="flex bg-[#56666B] w-[70%] rounded-xl h-fit p-1 text-l  justify-evenly " >
            <div>
            g
            </div>
          <div className="">
            Sign in with google
          </div>
        </div>

      </div>
    </div>
  );
}
