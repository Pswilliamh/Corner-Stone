
'use client';

import Link from 'next/link';
import { BookText, PencilLine, MessageSquareText, Waves, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/alphabet', label: 'Alphabet', icon: BookText },
    { href: '/vocabulary', label: 'Vocabulary', icon: PencilLine },
    { href: '/sentences', label: 'Sentences', icon: MessageSquareText },
    { href: '/pronunciation', label: 'Pronunciation', icon: Waves },
  ];

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
          <Sparkles className="h-8 w-8 text-accent" />
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
                pathname === item.href ? 'text-accent font-semibold' : 'text-foreground/70'
              )}
            >
              <Link href={item.href} className="flex items-center gap-1 sm:gap-2">
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
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
