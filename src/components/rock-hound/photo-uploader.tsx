'use client';

import { useState, type ChangeEvent, type DragEvent } from 'react';
import Image from 'next/image';
import { UploadCloud, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PhotoUploaderProps {
  onPhotoUploaded: (file: File, dataUri: string) => void;
  isProcessing: boolean;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onPhotoUploaded, isProcessing }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
    event.currentTarget.classList.remove('border-accent');
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add('border-accent');
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('border-accent');
  };

  const processFile = (selectedFile: File) => {
    setError(null);
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, GIF, WebP).');
      setPreview(null);
      setFile(null);
      return;
    }
    // Max file size: 5MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB.');
      setPreview(null);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = () => {
    if (file && preview) {
      onPhotoUploaded(file, preview);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setFile(null);
    setError(null);
    const fileInput = document.getElementById('rock-photo-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <UploadCloud className="h-7 w-7 text-primary" />
          Upload Rock Photo
        </CardTitle>
        <CardDescription>
          Choose a clear photo of a rock for identification. Max 5MB.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('rock-photo-input')?.click()}
        >
          <Label htmlFor="rock-photo-input" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center space-y-2">
              <FileImage className="h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WebP up to 5MB</p>
            </div>
          </Label>
          <Input
            id="rock-photo-input"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={handleFileChange}
            className="hidden"
            disabled={isProcessing}
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {preview && (
          <div className="space-y-4">
            <div className="relative w-full aspect-video rounded-md overflow-hidden border border-border shadow-sm">
              <Image
                src={preview}
                alt="Rock preview"
                layout="fill"
                objectFit="contain"
                data-ai-hint="rock mineral"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleClear} disabled={isProcessing}>
                Clear
              </Button>
              <Button onClick={handleSubmit} disabled={!file || isProcessing} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isProcessing ? 'Identifying...' : 'Identify Rock'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoUploader;
