function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gray-800">
        <h1 className="text-xl font-bold">Skill Tracker</h1>
        <button className="bg-cyan-500 px-6 py-2 rounded-full font-semibold transition-all duration-500 ease-in-out hover:bg-cyan-600 hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] hover:-translate-y-1">    login /Sign In</button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Track Your Skills. Improve Daily.
        </h2>

        <p className="text-gray-400 max-w-xl mb-8">
          Build consistency, track hours, monitor progress and become unstoppable.
        </p>

        <button className="bg-cyan-500 px-6 py-2 rounded-full font-semibold transition-all duration-500 ease-in-out hover:bg-cyan-600 hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] hover:-translate-y-1">
          Get Started 🚀
        </button>
      </div>
    </div>
  );
}

export default App;