export default function NavigationBar() {
    return (
        <div className="bg-[#111621] h-16 content-center flex items-center text-white">
            <a href="/" className="p-5 text-white">
                <img src="/icon.png" alt="Logo" className="h-8 bg-white rounded-full" />
            </a>
            <a href="/dashboard" className="p-5 duration-300 ease-in-out hover:bg-[#304165] hover:text-white">Dashboard</a>
            <a href="/practice" className="p-5 duration-300 ease-in-out hover:bg-[#304165] hover:text-white">Practice</a>
            <a href="/profile" className="p-5 text-white ml-auto">Profile</a>
        </div>
    );
}