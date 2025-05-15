
'use server';
/**
 * @fileOverview AI agent for describing an item from a photo.
 *
 * - describeItem - A function that handles the item description process.
 * - DescribeItemInput - The input type for the describeItem function.
 * - DescribeItemOutput - The return type for the describeItem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const DescribeItemInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userContext: z.string().optional().describe("Optional user-provided context or specific question about the item.")
});
export type DescribeItemInput = z.infer<typeof DescribeItemInputSchema>;

export const DescribeItemOutputSchema = z.object({
  itemName: z.string().describe("The identified name of the item."),
  description: z.string().describe("A general description of the item."),
  keyAspects: z.array(z.string()).describe("Key aspects or features of the item."),
  potentialSignificance: z.string().optional().describe("Potential symbolic, historical, or practical significance."),
});
export type DescribeItemOutput = z.infer<typeof DescribeItemOutputSchema>;

export async function describeItem(input: DescribeItemInput): Promise<DescribeItemOutput> {
  return describeItemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'describeItemPrompt',
  input: {schema: DescribeItemInputSchema},
  output: {schema: DescribeItemOutputSchema},
  prompt: `You are an insightful analyst. Based on the provided image and any user context, identify the item and provide a concise description. 
  Focus on its main characteristics. If applicable, briefly suggest any potential symbolic, historical, or practical significance, especially if it might relate to biblical or spiritual themes.

Photo: {{media url=photoDataUri}}
{{#if userContext}}User Context/Question: {{{userContext}}}{{/if}}
`,
});

const describeItemFlow = ai.defineFlow(
  {
    name: 'describeItemFlow',
    inputSchema: DescribeItemInputSchema,
    outputSchema: DescribeItemOutputSchema,
  },
  async (input) => {
    // In a real scenario, you might have more complex logic here,
    // e.g., calling multiple models, or tools.
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate a description.");
    }
    return output;
  }
);
