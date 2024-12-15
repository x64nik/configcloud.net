import Link from "next/link"
import { HoverBorderGradient } from "../ui/hover-border-gradient"
import { Spotlight } from "../ui/spotlight"
function HeroSection() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.04] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-40"
        fill="gray"
      />
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
        <div className="mt-10 flex justify-center">
          <Link href={"/login"}>
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white items-center space-x-2"
              >
              <span>Try for Free!</span>
            </HoverBorderGradient>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
