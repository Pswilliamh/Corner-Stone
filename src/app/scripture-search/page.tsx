
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookMarked } from 'lucide-react'; // Using BookMarked as a relevant icon

export default function ScriptureSearchPage() {
  return (
    <div className="space-y-8 flex flex-col items-center">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-primary">
            <BookMarked className="h-7 w-7 text-accent" />
            Corner Stone Bible Bot
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            Have questions about stones, elements, or other topics in the Bible? Use the Bible Bot below to search and explore historical biblical truth and bring spirituality to your experience of geology.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border border-border shadow-sm">
            <iframe
              src="https://www.yeschat.ai/i/gpts-9t557MqLvXz-Bible-Bot"
              className="w-full h-[60vh] min-h-[500px] sm:min-h-[600px] md:min-h-[700px]"
              frameBorder="0"
              allowFullScreen
              title="YesChat Bible Bot"
            ></iframe>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            The Bible Bot is a third-party tool. We are not responsible for its content or functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
