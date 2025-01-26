import PracticeBar from "../_components/PracticeBar.jsx";
import NavigationBar from "../_components/NavigationBar.jsx";

const Practice = () => {
  return (
    <div className="bg-[#2F394D] min-h-screen">
      <NavigationBar />
      <h3 className="p-10 text-white justify-self-center text-5xl">Choose Your Practice</h3>
      <div className="space-y-4">
        <PracticeBar Name="ABCs" Description="Practice Signing The Alphabet" />
        <PracticeBar Name="Words" Description="Practice Words You Know" />
        <div className="p-5 duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-[#6b0c70] hover:text-white bg-[#330036] h-16 flex items-center w-4/5 rounded-2xl mx-auto justify-center">
            <h2 className="px-10 text-[#EEE1B3]">More Coming Soon!</h2>
        </div>
      </div>
    </div>
  );
};

export default Practice;
