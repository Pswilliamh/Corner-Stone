
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Button import is fine, but we won't use interactive props
import { BookOpenCheck, Volume2 } from "lucide-react";

// This page is a remnant from the "English Leap" app setup.
// It's being modified to be a minimal server component to prevent build errors
// in the "Corner Stone" application.

interface VocabularyItem {
  word: string;
  imageSrc: string;
  imageHint: string;
  translation_id?: string;
}

const vocabularyList: VocabularyItem[] = [
  { word: "Placeholder Word 1", imageSrc: "https://placehold.co/300x200.png", imageHint: "item one", translation_id: "Terjemahan 1" },
  { word: "Placeholder Word 2", imageSrc: "https://placehold.co/300x200.png", imageHint: "item two", translation_id: "Terjemahan 2" },
];

export default function VocabularyPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Vocabulary Builder (Placeholder)</h1>
        <p className="text-lg text-muted-foreground">This page is a placeholder.</p>
      </div>

      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
            <BookOpenCheck className="h-7 w-7 text-accent" />
            Word Explorer (Placeholder)
          </CardTitle>
          <CardDescription>
            Content for this section is part of a different application.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {vocabularyList.map((item) => (
              <Card key={item.word} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col bg-background/70">
                <div className="relative w-full h-48">
                  <Image
                    src={item.imageSrc}
                    alt={item.word}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={item.imageHint}
                  />
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <h3 className="text-2xl font-semibold text-primary mb-2">{item.word}</h3>
                  {item.translation_id && (
                    <p className="text-sm text-muted-foreground mb-3">Bahasa Indonesia: {item.translation_id}</p>
                  )}
                   {/* The interactive button that caused issues is removed */}
                </CardContent>
              </Card>
            ))}
          </div>
           <p className="text-center mt-6 text-muted-foreground">This is a placeholder page for the Corner Stone application.</p>
        </CardContent>
      </Card>
    </div>
  );
}
