
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
            Interactive lessons for each letter coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          <p className="text-xl text-muted-foreground">
            Content for Alphabet learning will be here. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
