export default function NavigationBar() {
    return (
        <div className="bg-[#500000] h-16 content-center justify">
            <button className="p-5">Logo</button>
            <button className="p-5 duration-300 ease-in-out hover:bg-[#5F2727] hover:text-white">Learn</button>
            <button className="p-5 duration-300 ease-in-out hover:bg-[#5F2727] hover:text-white">Practice</button>
            <button className="p-5 duration-300 ease-in-out hover:bg-[#5F2727] hover:text-white">Settings</button>
            <button className="float-right p-5">Profile</button>
        </div>
    );
}