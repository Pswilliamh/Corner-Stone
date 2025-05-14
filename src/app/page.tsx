'use client';

import { useState } from 'react';
import type { IdentifyRockOutput } from '@/ai/flows/identify-rock';
import { identifyRock } from '@/ai/flows/identify-rock';
import PhotoUploader from '@/components/rock-hound/photo-uploader';
import RockIdentificationDisplay from '@/components/rock-hound/rock-identification-display';
import SaveRockForm from '@/components/rock-hound/save-rock-form';
import { saveRockToStorage } from '@/lib/local-storage-service';
import type { SavedRock } from '@/lib/rock-hound-types';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function HomePage() {
  const [uploadedImage, setUploadedImage] = useState<{ file: File; dataUri: string } | null>(null);
  const [rockData, setRockData] = useState<IdentifyRockOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePhotoUploaded = async (file: File, dataUri: string) => {
    setUploadedImage({ file, dataUri });
    setRockData(null); // Clear previous results
    setError(null);
    setIsLoading(true);

    try {
      const result = await identifyRock({ photoDataUri: dataUri });
      setRockData(result);
    } catch (err) {
      console.error('Error identifying rock:', err);
      let errorMessage = 'Failed to identify rock. Please try again.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      toast({
        title: "Identification Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRockSaved = (note: string) => {
    if (!rockData || !uploadedImage) return;

    const newSavedRock: SavedRock = {
      id: Date.now().toString(), // Simple ID generation
      imageDataUri: uploadedImage.dataUri,
      identification: rockData,
      userNote: note,
      timestamp: Date.now(),
    };

    saveRockToStorage(newSavedRock);
    toast({
      title: "Rock Saved!",
      description: `${rockData.identification.commonName} has been added to your collection.`,
    });
    // Optionally clear the form or redirect
    setRockData(null);
    setUploadedImage(null);
  };

  return (
    <div className="space-y-12 flex flex-col items-center">
      {!rockData && (
        <PhotoUploader onPhotoUploaded={handlePhotoUploaded} isProcessing={isLoading} />
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-lg bg-card shadow-md">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Identifying your rock, please wait...</p>
          <p className="text-sm text-muted-foreground">This may take a moment.</p>
        </div>
      )}

      {error && !isLoading && (
        <Alert variant="destructive" className="max-w-lg mx-auto">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {rockData && !isLoading && (
        <div className="w-full max-w-3xl mx-auto space-y-8">
          <RockIdentificationDisplay rockData={rockData} />
          <SaveRockForm
            rockData={rockData}
            imageDataUri={uploadedImage!.dataUri}
            onRockSaved={handleRockSaved}
          />
        </div>
      )}
    </div>
  );
}
