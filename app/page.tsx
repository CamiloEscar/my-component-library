"use client"
import React, { useState } from 'react';
import ComponentDemo from './components/ComponentDemo';
import { Github, Moon, Sun, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState('#3b82f6');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>BibloComponentes</h1>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/CamiloEscar/my-component-library.git" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
              >
                <Github className="w-6 h-6 mr-2" />
                <span className="hidden sm:inline">Ver en GitHub</span>
              </a>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleDarkMode}
                className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}>
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configuración</DropdownMenuItem>
                  <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <ComponentDemo isDarkMode={isDarkMode} accentColor={accentColor} setAccentColor={setAccentColor} />
          </div>
        </div>
      </main>

      <footer className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'} mt-auto transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
            </p>
            <nav className="flex space-x-4">
              <a href="#" className={`text-sm ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors duration-200`}>Política de Privacidad</a>
              <a href="#" className={`text-sm ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} transition-colors duration-200`}>Términos de Servicio</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;