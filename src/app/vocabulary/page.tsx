
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, Volume2 } from "lucide-react";

interface VocabularyItem {
  word: string;
  imageSrc: string;
  imageHint: string; // For AI image generation hint
  translation_id?: string; // Optional Indonesian translation
}

const vocabularyList: VocabularyItem[] = [
  { word: "Apple", imageSrc: "https://placehold.co/300x200.png", imageHint: "red apple", translation_id: "Apel" },
  { word: "Book", imageSrc: "https://placehold.co/300x200.png", imageHint: "open book", translation_id: "Buku" },
  { word: "Cat", imageSrc: "https://placehold.co/300x200.png", imageHint: "cute cat", translation_id: "Kucing" },
  { word: "Sun", imageSrc: "https://placehold.co/300x200.png", imageHint: "bright sun", translation_id: "Matahari" },
  { word: "House", imageSrc: "https://placehold.co/300x200.png", imageHint: "small house", translation_id: "Rumah" },
  { word: "Ball", imageSrc: "https://placehold.co/300x200.png", imageHint: "colorful ball", translation_id: "Bola" },
];

export default function VocabularyPage() {
  const handlePronunciation = (word: string) => {
    // Placeholder for actual speech synthesis
    alert(`Pronouncing: ${word}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Build Vocabulary</h1>
        <p className="text-lg text-muted-foreground">Discover new English words with pictures and sounds.</p>
      </div>

      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
            <BookOpenCheck className="h-7 w-7 text-accent" />
            Word Explorer
          </CardTitle>
          <CardDescription>
            Learn these words. Click the speaker icon to hear how they sound (feature coming soon!).
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {vocabularyList.map((item) => (
              <Card key={item.word} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
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
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group"
                      onClick={() => handlePronunciation(item.word)}
                    >
                      <Volume2 className="h-5 w-5 mr-2 text-accent group-hover:text-accent-foreground transition-colors" />
                      Hear Pronunciation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
