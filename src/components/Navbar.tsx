import { Link, useLocation } from 'react-router-dom';
import { Gift, Heart, UserCheck, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';

export function Navbar() {
  const location = useLocation();
  const { isAdmin } = useStore();

  const links = [
    { to: '/', label: 'Casamento', icon: Heart },
    { to: '/gifts', label: 'Lista de Presentes', icon: Gift },
    { to: '/rsvp', label: 'Confirme sua Presença', icon: UserCheck },
  ];

  return (
    <nav className="bg-white shadow-md">
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
          <Link
            to={isAdmin ? "/admin" : "/login"}
            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-400"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}