
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText, PencilLine, MessageSquareText, Waves, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EnglishLeapHomePage() {
  const learningSections = [
    { title: "Learn the Alphabet", description: "Master letters from A to Z.", href: "/alphabet", icon: BookText, color: "bg-blue-500" },
    { title: "Build Vocabulary", description: "Discover new English words.", href: "/vocabulary", icon: PencilLine, color: "bg-green-500" },
    { title: "Practice Sentences", description: "Understand sentence basics.", href: "/sentences", icon: MessageSquareText, color: "bg-purple-500" },
    { title: "Improve Pronunciation", description: "Listen and practice speaking.", href: "/pronunciation", icon: Waves, color: "bg-teal-500" },
  ];

  return (
    <div className="space-y-12">
      <Card className="text-center bg-card/80 shadow-xl border-primary/50 py-8">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Sparkles className="h-16 w-16 text-accent animate-pulse" />
          </div>
          <CardTitle className="text-5xl font-bold text-primary">Welcome to English Leap!</CardTitle>
          <CardDescription className="text-xl text-foreground/80 mt-3 max-w-2xl mx-auto">
            Your fun journey to learning English starts here. Let's explore letters, words, and sentences together!
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105 mt-4">
            <Link href="/alphabet">
              Start with the Alphabet <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {learningSections.map((section) => (
          <Card key={section.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-accent">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-full ${section.color} text-white`}>
                  <section.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl font-semibold text-primary">{section.title}</CardTitle>
              </div>
              <CardDescription className="text-md text-muted-foreground">{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                <Link href={section.href}>
                  Go to {section.title.split(' ')[1]} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
