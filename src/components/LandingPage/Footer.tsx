import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black-900 bg-black py-12 text-gray-400">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start max-w-6xl mx-auto gap-8">
          {/* Left Section */}
          <div className="text-left space-y-4">
            <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-white">ConfigCloud</span>
            </div>
            <div className="text-sm leading-relaxed">
            </div>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-left w-full md:w-1/3">
            {/* Column 1 */}
            <div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#" className="hover:text-white transition-colors">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/#" className="hover:text-white transition-colors">
                  Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
                <ul className="space-y-2 text-sm">
                <li>
                <Link
                    href="https://www.linkedin.com/in/rushikesh-darunte-758565226/"
                    className="hover:text-white transition-colors flex items-center space-x-2"
                >
                    <LinkedInLogoIcon className="w-5 h-5" /> {/* Adjust icon size */}
                    <span>LinkedIn</span>
                </Link>
                </li>
                <li>
                <Link
                    href="https://x.com/x64Rushi"
                    className="hover:text-white transition-colors flex items-center space-x-2"
                >
                    <TwitterLogoIcon className="w-5 h-5" /> {/* Adjust icon size */}
                    <span>Twitter</span>
                </Link>
                </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
