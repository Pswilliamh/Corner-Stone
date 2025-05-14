'use client';

import Image from 'next/image';
import type { SavedRock } from '@/lib/rock-hound-types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import RockIdentificationDisplay from './rock-identification-display';
import { ScrollArea } from '@/components/ui/scroll-area';


interface RockCardProps {
  rock: SavedRock;
  onRemove: (rockId: string) => void;
}

const RockCard: React.FC<RockCardProps> = ({ rock, onRemove }) => {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-square">
          <Image
            src={rock.imageDataUri}
            alt={rock.identification.identification.commonName}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="rock geology"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold text-primary mb-1 truncate">
          {rock.identification.identification.commonName}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 italic">
          {rock.identification.identification.scientificName}
        </CardDescription>
        <p className="text-sm text-foreground line-clamp-3 overflow-hidden text-ellipsis">
          <strong>Note:</strong> {rock.userNote}
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t border-border/50 flex justify-between items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-secondary border-secondary hover:bg-secondary/10">
              <Eye className="mr-2 h-4 w-4" /> View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-[90vw] h-[90vh] p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl">{rock.identification.identification.commonName} Details</DialogTitle>
              <DialogDescription>
                Detailed information about {rock.identification.identification.commonName}.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[calc(90vh-120px)]"> {/* Adjust height as needed */}
              <div className="p-6 pt-0">
                <RockIdentificationDisplay rockData={rock.identification} />
              </div>
            </ScrollArea>
             <DialogFooter className="p-6 pt-0 sm:justify-start border-t">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove rock</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove
                "{rock.identification.identification.commonName}" from your collection.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onRemove(rock.id)}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default RockCard;
