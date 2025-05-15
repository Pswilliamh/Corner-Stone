
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpenCheck } from "lucide-react";

export default function VocabularyPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Build Vocabulary</h1>
        <p className="text-lg text-muted-foreground">Discover new words with pictures and sounds.</p>
      </div>

      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
            <BookOpenCheck className="h-7 w-7 text-accent" />
            Vocabulary Builder
          </CardTitle>
          <CardDescription>
            Thematic word sets with images, audio, and translations coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          <p className="text-xl text-muted-foreground">
            Content for Vocabulary building will be here. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
