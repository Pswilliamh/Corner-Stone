
'use client';

import Link from 'next/link';
import { HomeIcon, Gem, BookOpenText, Lightbulb, UserCircle, Sprout } from 'lucide-react'; // Added Lightbulb
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; 

// Assuming this header is for the "Corner Stone" app
// based on previous interactions (My Collection, Bible Bot links)

const Header = () => {
  const pathname = usePathname();

  // Navigation items for Corner Stone
  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon }, // Assuming rock identification/main features are on Home
    { href: '/collection', label: 'My Collection', icon: Gem },
    { href: '/describe-item', label: 'Describe Item', icon: Lightbulb }, // New Item
    { href: '/scripture-search', label: 'Bible Bot', icon: BookOpenText },
    // { href: '/profile', label: 'Profile', icon: UserCircle }, // Example future link
  ];

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
          {/* Placeholder for a logo image if available */}
          {/* Using Sprout as a placeholder, replace with your actual logo component or img tag */}
          <Sprout className="h-8 w-8 text-accent" /> 
          <span>Corner Stone</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost" 
              asChild
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary px-2 sm:px-3',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Link href={item.href} className="flex items-center gap-1 sm:gap-2">
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
                {/* Show shorter label on small screens if needed */}
                <span className="sm:hidden MuiTypography-noWrap">{item.label.split(' ')[0]}</span>

              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
