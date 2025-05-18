"use client";

import { useState } from "react";
import DepositModalWrapper from "@/components/DepositModalWrapper";
import { Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedMerch from './components/FeaturedMerch';
import MusicReleaseMerch from './components/MusicReleaseMerch';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    document.body.style.overflow = "auto";
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }>
        <Hero />
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-[#a0b921] text-white rounded-lg shadow-lg hover:bg-[#8ca01b] transition-colors"
          >
            Open Deposit Modal
          </button>
        </div>
        <FeaturedMerch />
        <MusicReleaseMerch />
      </Suspense>
      <Footer />

      <DepositModalWrapper
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        amount={100}
      />
    </main>
  );
}
