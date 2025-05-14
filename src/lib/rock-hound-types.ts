import type { IdentifyRockOutput } from '@/ai/flows/identify-rock';

export interface SavedRock {
  id: string; // Unique identifier, e.g., timestamp or UUID
  imageDataUri: string; // Data URI of the uploaded rock photo
  identification: IdentifyRockOutput; // The AI's identification result
  userNote: string; // User's personal note about the rock
  timestamp: number; // Timestamp of when the rock was saved
}
