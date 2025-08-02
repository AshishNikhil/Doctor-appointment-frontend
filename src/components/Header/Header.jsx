const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-100 px-6 py-4 shadow-md h-20">
      <div className="flex items-center justify-between space-x-4">
        <img src="/public/logo.png" alt="Logo" className="w-14 h-16 rounded-full" />
        <h1 className="text-[#147aa3] text-2xl font-bold">
          Doctor Appointment System
        </h1>
      </div>
    </header>
  );
};

export default Header;
