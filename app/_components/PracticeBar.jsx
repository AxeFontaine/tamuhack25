export default function PracticeBar({Name, Description}) {
    return (
        <a href={`../practice/${Name}`} className="p-5 duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-[#6b0c70] hover:text-white bg-[#330036] h-16 flex items-center w-4/5 rounded-2xl mx-auto">
            <h2 className="px-10 text-[#EEE1B3] text-3xl font-bold">{Name}</h2>
            <h1 className="text-[#EEE1B3]">{Description}</h1>
        </a>
    );
}