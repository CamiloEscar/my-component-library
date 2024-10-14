import React from 'react';

interface FooterProps {
  companyName: string;
  backgroundColor?: string;
}

export const SimpleFooter: React.FC<FooterProps> = ({ companyName, backgroundColor = 'white' }) => (
  <footer style={{ backgroundColor }} className="py-4">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
    </div>
  </footer>
);

export const SocialFooter: React.FC<FooterProps> = ({ companyName, backgroundColor = 'white' }) => (
  <footer style={{ backgroundColor }} className="py-4">
    <div className="container mx-auto text-center">
      <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
      <div className="mt-4">
        <a href="#" className="text-gray-400 hover:text-gray-500 mx-2">
          Facebook
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-500 mx-2">
          Twitter
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-500 mx-2">
          Instagram
        </a>
      </div>
    </div>
  </footer>
);

export const ComplexFooter: React.FC<FooterProps> = ({ companyName, backgroundColor = 'white' }) => (
  <footer style={{ backgroundColor }} className="py-8">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">About</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Services</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Contact Us</h3>
          <p>123 Main St, Anytown, USA 12345</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@example.com</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-500">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Instagram</a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
      </div>
    </div>
  </footer>
);