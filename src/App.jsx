import Intro from "./components/Intro";
import Navbar from "./components/Navbar";

export default function App() {


  return (
    <main
      className="h-screen w-screen bg-stone-100 flex items-start justify-center"
    >
      <Intro/>
      <Navbar/>
    </main>
  );
}