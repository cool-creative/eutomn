import Intro from "./components/Intro";
import Navbar from "./components/Navbar";

export default function App() {


  return (
    <main
      className="h-screen w-full bg-white flex items-start justify-center"
    >
      <Intro/>
      <Navbar/>
      <div className="h-[200vh] w-full"></div>
    </main>
  );
}