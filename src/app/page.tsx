
'use client';

import Link from 'next/link';
import { GraduationCap, BookOpenCheck, MessageSquare, Mic2, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const features = [
    { name: 'Learn Alphabet', description: 'Master the English letters from A to Z.', href: '/alphabet', icon: GraduationCap },
    { name: 'Build Vocabulary', description: 'Discover new words with pictures and sounds.', href: '/vocabulary', icon: BookOpenCheck },
    { name: 'Practice Sentences', description: 'Understand how to form basic sentences.', href: '/sentences', icon: MessageSquare },
    { name: 'Improve Pronunciation', description: 'Listen and practice speaking clearly.', href: '/pronunciation', icon: Mic2 },
  ];

  return (
    <div className="space-y-12 flex flex-col items-center text-center">
      <div className="mt-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary">
          Welcome to English Leap for Students!
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
          Your fun and interactive journey to learning English starts here. Explore letters, words, sentences, and practice pronunciation with engaging lessons.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 w-full max-w-4xl">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.name} legacyBehavior>
            <a className="group bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center ring-1 ring-border hover:ring-accent">
              <div className="bg-accent/20 p-4 rounded-full mb-4 group-hover:bg-accent/30 transition-colors">
                <feature.icon className="h-10 w-10 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">{feature.name}</h2>
              <p className="text-foreground/70 mb-4 flex-grow">{feature.description}</p>
              <div className="mt-auto text-sm font-medium text-accent group-hover:underline flex items-center">
                Start Learning <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </a>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-secondary/20 rounded-lg max-w-3xl w-full shadow-md">
        <h3 className="text-2xl font-semibold text-secondary-foreground mb-3">Teacher's Note</h3>
        <p className="text-secondary-foreground/80">
          This app is designed to make learning English intuitive and enjoyable for young students in Indonesia. 
          We'll explore translation from Bahasa Indonesia to English and use audio to help with understanding and speaking.
          Let's embark on this exciting learning adventure together!
        </p>
      </div>
    </div>
  );
}
