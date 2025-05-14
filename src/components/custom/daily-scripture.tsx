
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenText } from 'lucide-react';

interface Scripture {
  verse: string;
  reference: string;
}

const scriptures: Scripture[] = [
  {
    verse: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    reference: "John 3:16",
  },
  {
    verse: "The LORD is my shepherd; I shall not want.",
    reference: "Psalm 23:1",
  },
  {
    verse: "I can do all things through him who strengthens me.",
    reference: "Philippians 4:13",
  },
  {
    verse: "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    reference: "Proverbs 3:5-6",
  },
  {
    verse: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
    reference: "Jeremiah 29:11",
  },
  {
    verse: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
    reference: "Matthew 6:33",
  },
  {
    verse: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
    reference: "Romans 8:28",
  },
  {
    verse: "Be strong and courageous. Do not fear or be in dread of them, for it is the LORD your God who goes with you. He will not leave you or forsake you.",
    reference: "Deuteronomy 31:6",
  },
  {
    verse: "The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.",
    reference: "Lamentations 3:22-23",
  },
  {
    verse: "Come to me, all who labor and are heavy laden, and I will give you rest.",
    reference: "Matthew 11:28",
  }
];

const DailyScripture = () => {
  const [dailyScripture, setDailyScripture] = useState<Scripture | null>(null);

  useEffect(() => {
    // This effect runs on the client side after the component mounts.
    // It determines the scripture for the current day.
    const getDayOfYear = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      const oneDay = 1000 * 60 * 60 * 24;
      return Math.floor(diff / oneDay);
    };

    const dayOfYear = getDayOfYear();
    const scriptureIndex = dayOfYear % scriptures.length;
    setDailyScripture(scriptures[scriptureIndex]);
  }, []); // Empty dependency array means this runs once on mount

  if (!dailyScripture) {
    return (
      <Card className="w-full max-w-lg mx-auto my-6 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-primary">
            <BookOpenText className="h-5 w-5" />
            Today's Scripture
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm">Loading scripture...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto my-6 shadow-lg border-accent">
      <CardHeader className="bg-primary rounded-t-lg p-4">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-primary-foreground">
          <BookOpenText className="h-6 w-6" />
          Today's Scripture
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-center">
        <blockquote className="text-base md:text-lg font-serif text-foreground mb-3 leading-relaxed">
          "{dailyScripture.verse}"
        </blockquote>
        <p className="text-sm text-accent font-semibold">{dailyScripture.reference}</p>
      </CardContent>
    </Card>
  );
};

export default DailyScripture;
