'use client';

import { useState, useEffect, useCallback } from 'react';
import CollectionList from '@/components/rock-hound/collection-list';
import { getCollectionFromStorage, removeRockFromStorage } from '@/lib/local-storage-service';
import type { SavedRock } from '@/lib/rock-hound-types';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function CollectionPage() {
  const [collection, setCollection] = useState<SavedRock[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    setCollection(getCollectionFromStorage());
  }, []);

  const handleRemoveRock = useCallback((rockId: string) => {
    const rockToRemove = collection.find(r => r.id === rockId);
    removeRockFromStorage(rockId);
    setCollection((prevCollection) => prevCollection.filter((rock) => rock.id !== rockId));
    if (rockToRemove) {
      toast({
        title: "Rock Removed",
        description: `${rockToRemove.identification.identification.commonName} has been removed from your collection.`,
      });
    }
  }, [toast, collection]);

  if (!isMounted) {
    // Prevents hydration mismatch by not rendering localStorage-dependent UI on server
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-muted-foreground">Loading your collection...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">My Rock Collection</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/">
            <PlusCircle className="mr-2 h-5 w-5" />
            Identify New Rock
          </Link>
        </Button>
      </div>
      <CollectionList rocks={collection} onRemoveRock={handleRemoveRock} />
    </div>
  );
}
