function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Track Your Skills. Improve Daily.
      </h2>

      <p className="text-gray-400 max-w-xl mb-8">
        Build consistency, track hours, monitor progress and become unstoppable.
      </p>

      <button className="bg-blue-600 px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition">
        Get Started 🚀
      </button>
    </div>
  );
}

export default Home;