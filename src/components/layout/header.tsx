'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Layers } from 'lucide-react'; // Using Layers for collection
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Identify', icon: Home },
    { href: '/collection', label: 'Collection', icon: Layers },
  ];

  const logoUrl = "https://cdn.discordapp.com/attachments/1260653960283099156/1267975099760836749/image.png?ex=66ab4035&is=66a9eeb5&hm=18d5959b35f4e86afbca9061ac7961b266985a0c9c649657849f4126cb70c057&";


  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
          <Image 
            src={logoUrl}
            alt="Corner Stone Logo" 
            width={40} 
            height={40} 
            className="rounded-full"
            data-ai-hint="church logo"
          />
          <span>Corner Stone</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Link href={item.href} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
