
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic2 } from "lucide-react";

export default function PronunciationPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Improve Pronunciation</h1>
        <p className="text-lg text-muted-foreground">Listen and practice speaking clearly.</p>
      </div>

      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
            <Mic2 className="h-7 w-7 text-accent" />
            Pronunciation Practice
          </CardTitle>
          <CardDescription>
            Audio playback and recording/feedback features coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          <p className="text-xl text-muted-foreground">
            Content for Pronunciation practice will be here. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
