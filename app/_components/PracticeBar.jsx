export default function PracticeBar({Name, Description}) {
    return (
        <button className="p-5 duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-[#5F2727] hover:text-white bg-[#500000] h-16 flex items-center w-4/5 rounded-2xl mx-auto">
            <h2 className="px-10">{Name}</h2>
            <h1>{Description}</h1>
        </button>
    );
}