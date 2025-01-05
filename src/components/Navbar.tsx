import { Link, useLocation } from 'react-router-dom';
import { Gift, Heart, UserCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Casamento', icon: Heart },
    { to: '/gifts', label: 'Presentes', icon: Gift },
    { to: '/rsvp', label: 'Presença', icon: UserCheck },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-md hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      'inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors',
                      location.pathname === link.to
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-500 hover:text-blue-400'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden z-50">
        <div className="flex justify-around py-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'flex flex-col items-center px-3 py-1 text-xs font-medium transition-colors',
                  isActive ? 'text-blue-400' : 'text-gray-500'
                )}
              >
                <Icon className="w-6 h-6 mb-1" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}