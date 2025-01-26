export default function NavigationBar() {
    return (
        <div className="bg-[#111621] h-16 content-center flex items-center">
            <a href="/" className="p-5 text-white">Logo</a>
            <a href="/learn" className="p-5 duration-300 ease-in-out hover:bg-[#304165] hover:text-white">Learn</a>
            <a href="/practice" className="p-5 duration-300 ease-in-out hover:bg-[#304165] hover:text-white">Practice</a>
            <a href="/settings" className="p-5 duration-300 ease-in-out hover:bg-[#304165] hover:text-white">Settings</a>
            <a href="/profile" className="p-5 text-white ml-auto">Profile</a>
        </div>
    );
}