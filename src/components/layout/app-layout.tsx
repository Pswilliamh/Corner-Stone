import type { ReactNode } from 'react';
import Header from './header';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-card border-t border-border py-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} English Leap for Students. Helping students learn!</p>
      </footer>
    </div>
  );
};

export default AppLayout;
