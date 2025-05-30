
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
      <footer className="bg-card border-t border-border py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Kingdom Of Heaven Embassy Inc. All rights reserved.</p>
        <p>Corner Stone App - Exploring Geology and Faith</p>
      </footer>
    </div>
  );
};

export default AppLayout;
