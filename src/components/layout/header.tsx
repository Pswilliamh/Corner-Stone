
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Gem, BookOpenText, Search, Lightbulb, Users, Home, ScrollText } from 'lucide-react'; // Added Home
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Header = () => {
  const pathname = usePathname();
  // Using the provided Discord CDN URL for the logo
  const koheLogoUrl = "https://cdn.discordapp.com/attachments/1221284005090955378/1239930093903872080/KOHENAVYLGLSM.png?ex=6644b393&is=66436213&hm=5c9f0b0760733071e9608616704d0007715784098385a8401c209f98e1b6512a&";


  const navItems = [
    { href: '/', label: 'Home', icon: Home }, // Added Home link first
    { href: '/identify-rock', label: 'Identify Rock', icon: Gem },
    { href: '/collection', label: 'My Collection', icon: BookOpenText },
    { href: '/describe-item', label: 'Describe Item', icon: Lightbulb },
    { href: '/scripture-search', label: 'Bible Bot', icon: Search },
    { href: '/lifecycle-system', label: 'Life Cycle System', icon: Users }
  ];

  return (
    <header className="bg-card border-b border-border shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
          <Image 
            src={koheLogoUrl} 
            alt="Kingdom Of Heaven Embassy Inc. Logo" 
            width={50} 
            height={50} 
            className="rounded-sm" 
            data-ai-hint="logo religious"
            unoptimized={koheLogoUrl.includes('cdn.discordapp.com')} // Potentially helps with Discord CDN links if optimization causes issues
          />
          <span>Corner Stone</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary px-2 sm:px-3 py-2 rounded-md',
                pathname === item.href ? 'text-accent bg-accent/10 font-semibold' : 'text-foreground/80 hover:bg-foreground/10'
              )}
            >
              <Link href={item.href} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <item.icon className="h-5 w-5 mb-0.5 sm:mb-0" />
                <span className="text-xs sm:text-sm">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
