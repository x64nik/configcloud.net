'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  // Detect scroll event to toggle navbar style
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); // Set state to true when scrolled down
      } else {
        setScrolled(false); // Set to false when scrolled to top
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-6 left-6 right-6 z-50 w-auto h-16 rounded-lg transition-all ease-in-out duration-300 
        ${scrolled ? 'border shadow-2xl backdrop-blur-lg' : ''} 
        bg-black bg-opacity-30`}
      style={{
        // Water ripple effect when not scrolled
        // backgroundImage: scrolled ? 'none' : 'url(/water-ripple.png)', 
        backgroundSize: scrolled ? 'none' : 'cover',
        backgroundPosition: scrolled ? 'none' : 'center', 
        
        // Gradient background when scrolled
        background: scrolled 
          ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.4))'
          : 'none',
      }}
    >
      <div className="container max-w-full flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <Link href="#" className="flex items-center space-x-2">
            <svg height="26" viewBox="0 0 235 203" fill="white">
            <path d="M117.551.058L234.484 202.10H.618L117.551.058Z" />
            </svg>
          </Link>
        </div>
        <div className="flex ml-14 gap-3">
          <Button variant={'outline'} className='rounded-full'>
            <Link
              href="#preview"
              className="text-sm text-white hover:text-gray-300"
              >
              Preview
            </Link>
          </Button>
          <Button variant={'outline'} className='rounded-full '>
            <Link href="#pricing" className="text-sm text-white hover:text-gray-300">
              Pricing
            </Link>
          </Button>
          <Button variant={'outline'} className='rounded-full '>
            <Link
              href="#contact"
              className="text-sm text-white hover:text-gray-300"
            >
              Contact
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-4 ml-auto">
        <Link href={"/login"}>
          <Button
            variant="outline"
            className="text-sm rounded-lg transition-all"
          >
            Log In
          </Button>
        </Link>
        <Link href={"/signup"}>
          <Button
            className="text-sm rounded-lg transition-all"
            >
            Sign Up
          </Button>
        </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
