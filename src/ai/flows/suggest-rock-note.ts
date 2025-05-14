'use server';
/**
 * @fileOverview Rock note suggestion AI agent.
 *
 * - suggestRockNote - A function that handles the rock note suggestion process.
 * - SuggestRockNoteInput - The input type for the suggestRockNote function.
 * - SuggestRockNoteOutput - The return type for the suggestRockNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRockNoteInputSchema = z.object({
  rockName: z.string().describe('The common name of the identified rock.'),
  rockProperties: z
    .string()
    .describe('The properties of the rock, such as hardness, luster, color, etc.'),
  rockFormation: z.string().describe('The formation process of the rock.'),
  rockLocation: z.string().describe('Common locations where the rock is found.'),
});
export type SuggestRockNoteInput = z.infer<typeof SuggestRockNoteInputSchema>;

const SuggestRockNoteOutputSchema = z.object({
  suggestedNote: z
    .string()
    .describe('A suggested note summarizing the rock properties, formation, and location.'),
});
export type SuggestRockNoteOutput = z.infer<typeof SuggestRockNoteOutputSchema>;

export async function suggestRockNote(input: SuggestRockNoteInput): Promise<SuggestRockNoteOutput> {
  return suggestRockNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRockNotePrompt',
  input: {schema: SuggestRockNoteInputSchema},
  output: {schema: SuggestRockNoteOutputSchema},
  prompt: `You are a rock and mineral expert. Generate a concise and informative note about the rock, suitable for saving in a personal collection. Focus on key properties, formation process, and common locations. 

Rock Name: {{{rockName}}}
Properties: {{{rockProperties}}}
Formation: {{{rockFormation}}}
Location: {{{rockLocation}}}`,
});

const suggestRockNoteFlow = ai.defineFlow(
  {
    name: 'suggestRockNoteFlow',
    inputSchema: SuggestRockNoteInputSchema,
    outputSchema: SuggestRockNoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
