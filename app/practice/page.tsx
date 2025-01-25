import NavigationBar from "../_components/NavigationBar.jsx";
import PracticeBar from "../_components/PracticeBar.jsx";

const Practice = () => {
  return (
    <div className="bg-white min-h-screen">
        <NavigationBar/>
        <h3 className="p-10 text-black justify-self-center">Choose Your Practice</h3>
        <div className="space-y-4">
        <PracticeBar Name="ABCs" Description="Practice the Alphabet" />
        <PracticeBar Name="Words" Description="Practice Words You Know" />
        <PracticeBar Name="More Coming Soon..." Description="" />
      </div>
    </div>
  );
};

export default Practice;
