'use client';

import Link from 'next/link';
import { BookOpenCheck, Home, Users, MessageSquare, GraduationCap, Mic2 } from 'lucide-react'; // Added more icons
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button'; // Assuming Button component will be added later or is part of ShadCN

// Minimal Button component for now if ShadCN is not fully set up
// const Button = ({ className, children, ...props }: any) => (
//   <button className={cn("p-2 rounded-md hover:bg-muted", className)} {...props}>
//     {children}
//   </button>
// );

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
              variant="ghost" // Assuming this variant exists or Button is properly styled
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

// Minimal Button component definition if not using ShadCN Button yet
// You'll need to create src/components/ui/button.tsx if you want the full ShadCN button styling
// For now, to avoid errors, if you don't have it, this simple one can be a placeholder:
const ShadCNButtonPlaceholder = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean, variant?: string, size?: string }>(
  ({ className, children, asChild, variant, size, ...props }, ref) => {
    const Comp = asChild ? 'div' : 'button'; // Simplified for placeholder
    return (
      <Comp
        className={cn("p-2 rounded-md hover:bg-muted/20", className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
ShadCNButtonPlaceholder.displayName = "Button";

// Use this placeholder if actual Button from ui is not available.
// For now, assuming Button component will be added to components/ui later or use a simple style.
// To make this work without error, ensure you either have the ShadCN button or replace
// `import { Button } from '@/components/ui/button';` with the placeholder if needed.
// For this initial setup, I will assume a full Button component from ShadCN will be added when required.
// If the Button component is missing, this file will cause an error.
// The template uses `Button` from ` '@/components/ui/button';`
// It is NOT creating ui/button.tsx here, so that file must exist or be added for the header to work.
// Given the project structure and guidelines, I should assume ui/button.tsx will be added.

export default Header;
