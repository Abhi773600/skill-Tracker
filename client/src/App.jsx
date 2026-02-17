import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from "./pages/Home";
import AddSkill from "./pages/AddSkill";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Home />
      <AddSkill />
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Main Content Area */}
        <main className="flex-grow flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome to My Site
          </h1>
        </main>

        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
}

export default App;