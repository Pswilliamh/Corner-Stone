'use client';

import type { SavedRock } from '@/lib/rock-hound-types';
import RockCard from './rock-card';
import { Gem } from 'lucide-react';

interface CollectionListProps {
  rocks: SavedRock[];
  onRemoveRock: (rockId: string) => void;
}

const CollectionList: React.FC<CollectionListProps> = ({ rocks, onRemoveRock }) => {
  if (rocks.length === 0) {
    return (
      <div className="text-center py-16">
        <Gem className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">Your Collection is Empty</h2>
        <p className="text-muted-foreground">
          Start identifying rocks to add them to your personal collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {rocks.map((rock) => (
        <RockCard key={rock.id} rock={rock} onRemove={onRemoveRock} />
      ))}
    </div>
  );
};

export default CollectionList;
