
'use client';

import { useState } from 'react';
import PhotoUploader from '@/components/rock-hound/photo-uploader';
import RockIdentificationDisplay from '@/components/rock-hound/rock-identification-display';
import SaveRockForm from '@/components/rock-hound/save-rock-form';
import DailyScripture from '@/components/custom/daily-scripture';
import { identifyRock, type IdentifyRockInput, type IdentifyRockOutput } from '@/ai/flows/identify-rock';
import { saveRockToStorage } from '@/lib/local-storage-service';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Gem, Lightbulb, BookOpenText, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const [rockIdentification, setRockIdentification] = useState<IdentifyRockOutput | null>(null);
  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePhotoUploaded = async (file: File, dataUri: string) => {
    setUploadedImageUri(dataUri);
    setError(null);
    setIsLoading(true);
    setRockIdentification(null); // Clear previous identification

    try {
      const input: IdentifyRockInput = { photoDataUri: dataUri };
      const result = await identifyRock(input);
      setRockIdentification(result);
      toast({
        title: "Rock Identified!",
        description: `Successfully identified: ${result.identification.commonName}`,
      });
    } catch (err) {
      console.error('Error identifying rock:', err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during identification.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: "Could not identify the rock. " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRockSaved = (note: string) => {
    if (rockIdentification && uploadedImageUri) {
      const newRock = {
        id: Date.now().toString(),
        imageDataUri: uploadedImageUri,
        identification: rockIdentification,
        userNote: note,
        timestamp: Date.now(),
      };
      saveRockToStorage(newRock);
      toast({
        title: "Rock Saved!",
        description: `${rockIdentification.identification.commonName} has been added to your collection.`,
      });
      // Clear the form/identification after saving
      setRockIdentification(null);
      setUploadedImageUri(null);
    }
  };
  
  const handleClearIdentification = () => {
    setRockIdentification(null);
    setUploadedImageUri(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <Card className="text-center bg-card/80 shadow-xl border-primary">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">Welcome to Corner Stone</CardTitle>
          <CardDescription className="text-lg text-foreground/80 mt-2">
            Discover the world of geology and explore its connections to biblical and spiritual insights.
            Identify rocks, describe items, and delve into scripture.
          </CardDescription>
        </CardHeader>
      </Card>

      <DailyScripture />

      <Separator className="my-8 border-accent" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <section id="identify-rock" className="space-y-6">
          <h2 className="text-3xl font-semibold text-center text-primary mb-4">Identify a Rock</h2>
          {!rockIdentification && (
            <PhotoUploader onPhotoUploaded={handlePhotoUploaded} isProcessing={isLoading} />
          )}

          {isLoading && (
            <div className="text-center py-8">
              <div role="status" className="flex flex-col items-center justify-center">
                  <svg aria-hidden="true" className="w-12 h-12 text-muted-foreground animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="text-lg font-semibold text-muted-foreground mt-4">Identifying rock... Please wait.</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
              <p className="font-semibold">Identification Failed</p>
              <p>{error}</p>
            </div>
          )}

          {rockIdentification && (
            <>
              <RockIdentificationDisplay rockData={rockIdentification} />
              <SaveRockForm
                rockData={rockIdentification}
                imageDataUri={uploadedImageUri!}
                onRockSaved={handleRockSaved}
              />
              <button 
                onClick={handleClearIdentification} 
                className="w-full mt-4 text-sm text-primary hover:underline"
              >
                Identify Another Rock
              </button>
            </>
          )}
        </section>

        <aside className="space-y-6">
          <h2 className="text-3xl font-semibold text-center text-primary mb-4">Explore More</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { href: '/collection', label: 'My Rock Collection', icon: Gem, description: "View and manage your saved rocks and items." },
              { href: '/describe-item', label: 'Describe an Item', icon: Lightbulb, description: "Get AI insights on any item from a photo." },
              { href: '/scripture-search', label: 'Corner Stone Bible Bot', icon: BookOpenText, description: "Explore scriptures and biblical connections." },
            ].map(item => (
              <Link href={item.href} key={item.href} legacyBehavior>
                <a className="block p-6 bg-card hover:bg-card/90 rounded-lg shadow-md transition-all duration-300 group border border-border hover:border-primary">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="h-7 w-7 text-accent" />
                    <h3 className="text-xl font-semibold text-primary group-hover:text-accent-foreground">{item.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="text-xs text-accent group-hover:underline mt-3 flex items-center">
                    Go to {item.label} <ExternalLink className="ml-1 h-3 w-3" />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
