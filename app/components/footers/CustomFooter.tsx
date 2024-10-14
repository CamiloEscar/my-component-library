import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  url: string;
}

interface CustomFooterProps {
  companyName: string;
  backgroundColor: string;
  textColor: string;
  showSocialIcons: boolean;
  socialLinks: SocialLink[];
  copyrightText: string;
}

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

export const CustomFooter: React.FC<CustomFooterProps> = ({
  companyName,
  backgroundColor,
  textColor,
  showSocialIcons,
  socialLinks,
  copyrightText,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8" style={{ backgroundColor, color: textColor }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">{companyName}</h2>
          </div>
          {showSocialIcons && (
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label={`Visit our ${link.platform} page`}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
          <p>
            &copy; {currentYear} {companyName}. {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export const customFooterConfig = {
  name: 'CustomFooter',
  component: CustomFooter,
  defaultProps: {
    companyName: 'Your Company',
    backgroundColor: '#f3f4f6',
    textColor: '#1f2937',
    showSocialIcons: true,
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'linkedin', url: 'https://linkedin.com' },
    ],
    copyrightText: 'All rights reserved.',
  },
  customizableProps: {
    companyName: { type: 'text' as const, label: 'Company Name' },
    backgroundColor: { type: 'color' as const, label: 'Background Color' },
    textColor: { type: 'color' as const, label: 'Text Color' },
    showSocialIcons: { type: 'boolean' as const, label: 'Show Social Icons' },
    socialLinks: { type: 'text' as const, label: 'Social Links (JSON format)' },
    copyrightText: { type: 'text' as const, label: 'Copyright Text' },
  },
  description: 'A customizable footer with company name, social icons, and copyright text.',
};