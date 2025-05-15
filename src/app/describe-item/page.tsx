
'use client';

import { useState } from 'react';
import PhotoUploader from '@/components/rock-hound/photo-uploader'; // Reusing the existing uploader
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, HelpCircle, Image as ImageIcon } from 'lucide-react';
import { describeItem, type DescribeItemInput, type DescribeItemOutput } from '@/ai/flows/describe-item-flow';
import { useToast } from "@/hooks/use-toast";

export default function DescribeItemPage() {
  const [itemDescription, setItemDescription] = useState<DescribeItemOutput | null>(null);
  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>(null);
  const [userContext, setUserContext] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePhotoUploaded = async (file: File, dataUri: string) => {
    setUploadedImageUri(dataUri);
    setError(null);
    setIsLoading(true);
    setItemDescription(null);

    try {
      const input: DescribeItemInput = { 
        photoDataUri: dataUri,
        userContext: userContext || undefined
      };
      const result = await describeItem(input);
      setItemDescription(result);
      toast({
        title: "Item Described",
        description: `Successfully analyzed: ${result.itemName}`,
      });
    } catch (err) {
      console.error('Error describing item:', err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during item description.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: "Could not describe the item. " + errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setItemDescription(null);
    setUploadedImageUri(null);
    setUserContext('');
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold text-primary">
            <Lightbulb className="h-10 w-10 text-accent" />
            Describe an Item
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Upload a photo of an item, and our AI will try to describe it and provide insights.
            You can add context or specific questions below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!itemDescription && (
            <>
              <PhotoUploader onPhotoUploaded={handlePhotoUploaded} isProcessing={isLoading} />
              {uploadedImageUri && !isLoading && (
                 <div className="space-y-2 mt-4">
                    <Label htmlFor="userContext">Context or Question (Optional)</Label>
                    <Textarea
                      id="userContext"
                      placeholder="e.g., What is the symbolic meaning of this in the Bible? or Tell me more about its origin."
                      value={userContext}
                      onChange={(e) => setUserContext(e.target.value)}
                      className="h-24"
                      disabled={isLoading}
                    />
                  </div>
              )}
            </>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <div role="status" className="flex flex-col items-center justify-center">
                  <svg aria-hidden="true" className="w-12 h-12 text-muted-foreground animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="text-lg font-semibold text-muted-foreground mt-4">Analyzing item... Please wait.</span>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <HelpCircle className="h-4 w-4" />
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {itemDescription && (
            <Card className="mt-6 bg-background/50 shadow-md">
              <CardHeader>
                {uploadedImageUri && (
                  <div className="mb-4 overflow-hidden rounded-lg border border-border shadow-sm max-w-sm mx-auto">
                    <img src={uploadedImageUri} alt="Uploaded item" className="w-full h-auto object-contain max-h-64" data-ai-hint="object item" />
                  </div>
                )}
                <CardTitle className="text-2xl text-secondary flex items-center gap-2">
                  <ImageIcon className="h-6 w-6" /> AI Analysis: {itemDescription.itemName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Description:</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{itemDescription.description}</p>
                </div>
                
                {itemDescription.keyAspects && itemDescription.keyAspects.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Key Aspects:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {itemDescription.keyAspects.map((aspect, index) => (
                        <li key={index}>{aspect}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {itemDescription.potentialSignificance && (
                   <div>
                    <h3 className="font-semibold text-lg text-foreground">Potential Significance:</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{itemDescription.potentialSignificance}</p>
                  </div>
                )}
                <Button onClick={handleClear} variant="outline" className="w-full mt-4">Analyze Another Item</Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
