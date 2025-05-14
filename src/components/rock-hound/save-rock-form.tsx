'use client';

import { useState, useEffect, type FormEvent } from 'react';
import type { IdentifyRockOutput } from '@/ai/flows/identify-rock';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Save } from 'lucide-react';
import { suggestRockNote, type SuggestRockNoteInput } from '@/ai/flows/suggest-rock-note';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


interface SaveRockFormProps {
  rockData: IdentifyRockOutput;
  imageDataUri: string;
  onRockSaved: (note: string) => void;
}

const SaveRockForm: React.FC<SaveRockFormProps> = ({ rockData, imageDataUri, onRockSaved }) => {
  const [note, setNote] = useState('');
  const [isSuggestingNote, setIsSuggestingNote] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSuggestedNote = async () => {
      setIsSuggestingNote(true);
      setError(null);
      try {
        const suggestInput: SuggestRockNoteInput = {
          rockName: rockData.identification.commonName,
          rockProperties: `Hardness: ${rockData.physicalProperties.hardness}, Luster: ${rockData.physicalProperties.luster}, Color: ${rockData.physicalProperties.colorRange}`,
          rockFormation: rockData.formationProcess,
          rockLocation: rockData.commonLocations,
        };
        const suggestion = await suggestRockNote(suggestInput);
        setNote(suggestion.suggestedNote);
      } catch (err) {
        console.error('Error suggesting note:', err);
        setError('Could not fetch AI note suggestion. Please write your own.');
        toast({
          title: "AI Note Suggestion Failed",
          description: "Could not fetch AI note suggestion. Please write your own or try again later.",
          variant: "destructive",
        });
      } finally {
        setIsSuggestingNote(false);
      }
    };

    if (rockData) {
      fetchSuggestedNote();
    }
  }, [rockData, toast]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (note.trim() === '') {
      toast({
        title: "Note Required",
        description: "Please add a note before saving.",
        variant: "destructive",
      });
      return;
    }
    onRockSaved(note);
    setNote(''); // Clear note after saving
  };

  return (
    <Card className="w-full mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <BookOpen className="h-6 w-6 text-primary" />
          Add to Collection
        </CardTitle>
        <CardDescription>Save this rock with your personal notes.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="rock-note" className="text-muted-foreground">Your Note</Label>
            {isSuggestingNote ? (
              <div className="space-y-2 mt-1">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
              </div>
            ) : (
              <Textarea
                id="rock-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="E.g., Found near the riverbed during a hike..."
                rows={4}
                className="mt-1"
                required
              />
            )}
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSuggestingNote}>
            <Save className="mr-2 h-4 w-4" />
            Save to Collection
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SaveRockForm;
