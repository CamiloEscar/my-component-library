import React from 'react';
import ComponentDemo from './components/ComponentDemo';
import { Github } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Component Library Showcase</h1>
            <a 
              href="https://github.com/your-repo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Github className="w-6 h-6 mr-2" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <ComponentDemo />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>
            <nav className="flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Terms of Service</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;