import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";

export default function App() {


  return (
    <main
      className="h-fit w-full bg-white flex flex-col  justify-center"
    >
      <Intro/>
      <Navbar/>
      <Hero/>
      <div className="h-[90vh] w-full"></div>

    </main>
  );
}