
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

// This page is a remnant from the "English Leap" app setup.
// It's being modified to be a minimal server component to prevent build errors
// in the "Corner Stone" application.
export default function AlphabetPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Alphabet Learning (Placeholder)</h1>
        <p className="text-lg text-muted-foreground">This page is a placeholder.</p>
      </div>

      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold">
            <GraduationCap className="h-7 w-7 text-accent" />
            Alphabet Lessons (Placeholder)
          </CardTitle>
          <CardDescription>
            Content for this section is part of a different application.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex flex-col items-center justify-center p-6">
          <p className="text-xl text-muted-foreground mb-6">
            This is a placeholder page for the Corner Stone application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
