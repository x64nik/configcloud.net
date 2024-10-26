import Link from "next/link"

function HeroSection() {
  return (
    <div 
    className="h-auto md:h-[50rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
        <div className="p-4 relative z-10 w-full text-center">
            <h1
            className="mt-20 md:mt-10 text-5xl md:text-8xl font-bold text-white"
            >ConfigCloud</h1>
            <h3
            className="mt-20 md:mt-3 text-xl md:text-2xl font-thin bg-clip-text text-transparent text-white"
            >Affordable Cloud Services for Devlopers</h3>
            <p
            className="mt-4 font-normal text-base md:text-lg text-neutral-400 max-w-xl mx-auto"
            >The ultimate platform designed specifically for Devlopers. Our mission is to make cloud computing accessible and affordable, enabling students to create and manage their Virtual Machines with ease.</p>
            <div className="mt-4">
                <Link href={"#"}>
                <button className=" mt-5 bg-slate-700 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-800 rounded-full p-px text-xs font-normal leading-6  text-white inline-block">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div className="text-sm relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-4 px-8 ring-1 ring-white/10 ">
                    <span>
                      Try for Free!
                    </span>
                  </div>
                  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HeroSection
