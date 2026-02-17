function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-800">
      <h1 className="text-xl font-bold hover:text-blue-400 transition">
        Skill Tracker
      </h1>
      <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Login
      </button>
    </nav>
  );
}

export default Navbar;