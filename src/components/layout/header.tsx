
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Gem, BookOpenText, Search, Lightbulb, Users, Home, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// TODO: Implement mobile sheet navigation if desired
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // This is the KOHE Inc. logo URL you provided
  const koheLogoUrl = "https://cdn.discordapp.com/attachments/1221284005090955378/1239930093903872080/KOHENAVYLGLSM.png?ex=6644b393&is=66436213&hm=5c9f0b0760733071e9608616704d0007715784098385a8401c209f98e1b6512a&";

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/#identify-rock-section', label: 'Identify Rock', icon: Gem },
    { href: '/collection', label: 'My Collection', icon: BookOpenText },
    { href: '/describe-item', label: 'Describe Item', icon: Lightbulb },
    { href: '/scripture-search', label: 'Bible Bot', icon: Search },
    { href: '/lifecycle-system', label: 'Life Cycle System', icon: Users }
  ];

  return (
    <header className="bg-card border-b border-border shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
          <Image
            src={koheLogoUrl}
            alt="Kingdom Of Heaven Embassy Inc. Logo"
            width={50}
            height={50}
            className="rounded-sm"
            data-ai-hint="logo religious"
            // Using unoptimized for Discord CDN URLs with query params can sometimes help
            unoptimized={koheLogoUrl.includes('cdn.discordapp.com')}
          />
          <Gem className="h-6 w-6" /> 
          <span>Corner Stone</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary px-2 sm:px-3 py-2 rounded-md',
                (pathname === item.href || (item.href.startsWith('/#') && pathname === '/')) ? 'text-accent bg-accent/10 font-semibold' : 'text-foreground/80 hover:bg-foreground/10'
              )}
            >
              <Link href={item.href} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                <item.icon className="h-5 w-5 mb-0.5 sm:mb-0" />
                <span className="text-xs sm:text-sm">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button - Placeholder for Sheet implementation */}
        <div className="md:hidden">
          {/* 
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-4">
              <div className="flex flex-col gap-4">
                <Link 
                  href="/" 
                  className="flex items-center gap-2 text-xl font-bold text-primary mb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Gem className="h-5 w-5" />
                  <span>Corner Stone</span>
                </Link>
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    asChild
                    className={cn(
                      'text-base justify-start font-medium transition-colors hover:text-primary w-full',
                      (pathname === item.href || (item.href.startsWith('/#') && pathname === '/')) ? 'text-accent bg-accent/10 font-semibold' : 'text-foreground/80 hover:bg-foreground/10'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
           */}
           <Button variant="ghost" size="icon" aria-label="Open menu (mobile)" disabled>
             <Menu className="h-6 w-6" />
           </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

    