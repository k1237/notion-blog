import React, { ReactNode } from 'react';
import './globals.css';
import Header from '@/components/templates/Header';
import Footer from '@/components/templates/Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
};
