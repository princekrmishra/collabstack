import { Button } from "@/components/ui/button";
import Link from "next/link";
// import Link from "next/navigation";
import Image from "next/image";
import Logo from "./_components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
      <header className="w-full border-b bg-white shadow-md "> 
        <div className="max-w-7xl mx-auto flex justify-between items-center py-1">
          <div className="flex items-start gap-2">
            <Link href='/dashboard'>
                <Logo />
            </Link>
            
          </div>
          <Link href="/dashboard">
            <Button className=" text-white">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
     <main className="flex flex-col items-center justify-center flex-1 text-center px-6 
 text-gray-800">
        <h1 className="text-4xl md:text-6xl font-bold ">
          CollabStack – Collaborate Effortlessly and </h1><h1 className="text-4xl md:text-6xl font-bold text-[oklch(66.683%_0.19516_43.138)]">Work in Harmony.</h1>
        
        <p className="mt-4 max-w-2xl text-lg text-gray-600 w">
          CollabStack unites your team in one real-time workspace, making collaboration effortless and keeping everyone perfectly in sync.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <Link href="/dashboard">
            <Button className=" text-white px-6 py-3">
              Get Started
            </Button>
          </Link>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md border-t  text-black py-2 px-3 flex flex-col md:flex-row items-center justify-between">
        {/* Left - Logo & Name */}
        <div className="flex items-center space-x-3">
          <Logo />
          
        </div>

        {/* Center - Year */}
        <div className="text-sm">
          © {new Date().getFullYear()} My Company. All rights reserved.
        </div>

        {/* Right - Contact Details */}
        <div className="text-sm  text-black">
          Contact:{" "}
          <a href="mailto:kmishraprince@gmail.com" className="underline">
            kmishraprince@gmail.com
          </a>{" "}
          | +91-76672-14106
        </div>
      </footer>
    </div>
  );
}
