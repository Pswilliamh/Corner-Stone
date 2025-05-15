
'use client';

import { useState, useEffect } from 'react';
import type { IdentifyRockOutput } from '@/ai/flows/identify-rock';
import { type SavedRock } from '@/lib/rock-hound-types';
import { identifyRock } from '@/ai/flows/identify-rock';
import { suggestRockNote } from '@/ai/flows/suggest-rock-note';
import PhotoUploader from '@/components/rock-hound/photo-uploader';
import RockIdentificationDisplay from '@/components/rock-hound/rock-identification-display';
import SaveRockForm from '@/components/rock-hound/save-rock-form';
import { saveRockToStorage } from '@/lib/local-storage-service';
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import DailyScripture from '@/components/custom/daily-scripture';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function HomePage() {
  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>(null);
  const [rockIdentificationResult, setRockIdentificationResult] = useState<IdentifyRockOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePhotoUploaded = async (file: File, dataUri: string) => {
    setUploadedImageUri(dataUri);
    setRockIdentificationResult(null);
    setError(null);
    setIsLoading(true);

    try {
      const result = await identifyRock({ photoDataUri: dataUri });
      setRockIdentificationResult(result);
      toast({
        title: "Rock Identified!",
        description: `Successfully identified: ${result.identification.commonName}`,
      });
    } catch (err) {
      console.error('Error identifying rock:', err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during identification.";
      setError(errorMessage);
      toast({
        title: "Identification Failed",
        description: "Could not identify the rock. " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRock = (note: string) => {
    if (!rockIdentificationResult || !uploadedImageUri) {
      toast({
        title: "Error",
        description: "No rock data or image to save.",
        variant: "destructive",
      });
      return;
    }

    const newRock: SavedRock = {
      id: uuidv4(),
      imageDataUri: uploadedImageUri,
      identification: rockIdentificationResult,
      userNote: note,
      timestamp: Date.now(),
    };

    saveRockToStorage(newRock);
    toast({
      title: "Rock Saved!",
      description: `${newRock.identification.identification.commonName} has been added to your collection.`,
    });
    // Clear results after saving
    handleClear();
  };

  const handleClear = () => {
    setUploadedImageUri(null);
    setRockIdentificationResult(null);
    setIsLoading(false);
    setError(null);
  };
  
  // Prevent hydration errors for DailyScripture by ensuring it only renders client-side
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <div className="space-y-12">
      <Card className="w-full max-w-4xl mx-auto shadow-xl bg-card/70 border-primary/50">
        <CardHeader className="text-center">
          <Gem className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
          <CardTitle className="text-4xl font-bold text-primary">Identify Your Rocks</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Upload a photo of a rock, and let our AI geologist help you discover its secrets.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-6 py-6">
          {!rockIdentificationResult && (
             <PhotoUploader onPhotoUploaded={handlePhotoUploaded} isProcessing={isLoading} />
          )}
         
          {isLoading && (
            <div className="text-center py-10">
              <div role="status" className="flex flex-col items-center justify-center">
                  <svg aria-hidden="true" className="w-12 h-12 text-muted-foreground animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="text-lg font-semibold text-muted-foreground mt-4">Identifying rock... Please wait.</span>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <Alert variant="destructive" className="my-6">
              <HelpCircle className="h-4 w-4" />
              <AlertTitle>Identification Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {rockIdentificationResult && uploadedImageUri && !isLoading && (
            <div className="mt-8 space-y-6">
              <RockIdentificationDisplay rockData={rockIdentificationResult} />
              <SaveRockForm
                rockData={rockIdentificationResult}
                imageDataUri={uploadedImageUri}
                onRockSaved={handleSaveRock}
              />
            </div>
          )}
        </CardContent>
      </Card>
      
      {isMounted && <DailyScripture />}

    </div>
  );
}
