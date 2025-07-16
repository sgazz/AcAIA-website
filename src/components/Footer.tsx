import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BrainIcon, 
  GithubIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon 
} from "@/components/icons";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <BrainIcon className="h-7 w-7 text-white" />
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AcAIA
                </span>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-0 text-blue-400">
                  Beta
                </Badge>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-lg leading-relaxed text-lg">
              Revolutionary AI assistant that transforms the way you learn. We combine cutting-edge technology with proven pedagogical principles to create truly personalized learning experiences.
            </p>
            
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-110">
                <GithubIcon className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-110">
                <TwitterIcon className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-110">
                <LinkedinIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium group relative"
                >
                  <span className="relative">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium group relative"
                >
                  <span className="relative">
                    About
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium group relative"
                >
                  <span className="relative">
                    Pricing
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-all duration-300 font-medium group relative"
                >
                  <span className="relative">
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MailIcon className="h-5 w-5 text-blue-400" />
                </div>
                <span className="font-medium">info@acaia.com</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300 group">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PhoneIcon className="h-5 w-5 text-green-400" />
                </div>
                <span className="font-medium">+381 11 123 456</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-300 group">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPinIcon className="h-5 w-5 text-purple-400" />
                </div>
                <span className="font-medium">Belgrade, Serbia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 AcAIA. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <Link 
              href="#" 
              className="text-gray-400 hover:text-white text-sm transition-all duration-300 font-medium group relative"
            >
              <span className="relative">
                Privacy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <Link 
              href="#" 
              className="text-gray-400 hover:text-white text-sm transition-all duration-300 font-medium group relative"
            >
              <span className="relative">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <Link 
              href="#" 
              className="text-gray-400 hover:text-white text-sm transition-all duration-300 font-medium group relative"
            >
              <span className="relative">
                Cookies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 