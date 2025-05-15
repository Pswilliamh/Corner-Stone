
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function SentencesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Practice Sentences</h1>
        <p className="text-lg text-muted-foreground">Understand how to form basic English sentences.</p>
      </div>

      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
            <MessageSquare className="h-7 w-7 text-accent" />
            Sentence Construction
          </CardTitle>
          <CardDescription>
            Exercises to practice forming basic English sentences coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          <p className="text-xl text-muted-foreground">
            Content for Sentence practice will be here. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
