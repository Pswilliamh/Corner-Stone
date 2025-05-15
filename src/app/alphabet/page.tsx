
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function AlphabetPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Learn the Alphabet</h1>
        <p className="text-lg text-muted-foreground">Master the English letters from A to Z.</p>
      </div>

      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
            <GraduationCap className="h-7 w-7 text-accent" />
            Alphabet Lessons
          </CardTitle>
          <CardDescription>
            Interactive lessons for each letter coming soon! Click a letter to learn more.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex flex-col items-center justify-center p-6">
          <p className="text-xl text-muted-foreground mb-6">
            Placeholder: Interactive alphabet grid will be here.
          </p>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2 text-2xl">
            {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
              <button
                key={letter}
                className="p-3 bg-card border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors focus:ring-2 focus:ring-primary"
                onClick={() => alert(`You clicked the letter ${letter}!`)}
              >
                {letter}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
