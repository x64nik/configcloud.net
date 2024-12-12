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
        ${scrolled ? 'border shadow-2xl' : ''} 
        bg-black bg-opacity-30 backdrop-blur-lg`}
      style={{
        // Water ripple effect when not scrolled
        backgroundImage: scrolled ? 'none' : 'url(/water-ripple.png)', 
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
          <Link href="/" className="flex items-center space-x-2">
            <svg height="26" viewBox="0 0 235 203" fill="white">
              <path d="M117.551.058L234.484 202.01H.618L117.551.058Z" />
            </svg>
          </Link>
          {/* <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto bg-transparent p-2 text-sm text-white hover:bg-gray-800 hover:text-white rounded-md">
                  Products
                  <ChevronDown className="ml-1 h-3 w-3" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 bg-black p-4 text-white">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Next.js
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            The React Framework for the Web
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
        </div>
        {/* <div className="flex items-center gap-4">
          <Link
            href="/enterprise"
            className="text-sm text-white hover:text-gray-300"
          >
            Enterprise
          </Link>
          <Link href="/docs" className="text-sm text-white hover:text-gray-300">
            Docs
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-white hover:text-gray-300"
          >
            Pricing
          </Link>
        </div> */}
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
