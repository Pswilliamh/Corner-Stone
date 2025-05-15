'use client';

import Link from 'next/link';
import { BookOpenCheck, Home, Users, MessageSquare, GraduationCap, Mic2 } from 'lucide-react'; // Added more icons
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; 

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/alphabet', label: 'Alphabet', icon: GraduationCap },
    { href: '/vocabulary', label: 'Vocabulary', icon: BookOpenCheck },
    { href: '/sentences', label: 'Sentences', icon: MessageSquare },
    { href: '/pronunciation', label: 'Pronounce', icon: Mic2 },
  ];

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
          <GraduationCap className="h-7 w-7 text-accent" />
          <span>English Leap</span>
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
                <span className="sm:hidden">{item.label.split(' ')[0]}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;