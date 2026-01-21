"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);
};