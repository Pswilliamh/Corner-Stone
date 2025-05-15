
// 'use server';
/**
 * @fileOverview Rock identification AI agent.
 *
 * - identifyRock - A function that handles the rock identification process.
 * - IdentifyRockInput - The input type for the identifyRock function.
 * - IdentifyRockOutput - The return type for the identifyRock function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyRockInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a rock, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyRockInput = z.infer<typeof IdentifyRockInputSchema>;

const IdentifyRockOutputSchema = z.object({
  identification: z.object({
    commonName: z.string().describe('The common name of the identified rock.'),
    scientificName: z
      .string()
      .describe('The scientific name of the identified rock.'),
    primaryIdentification: z
      .string()
      .describe('Primary identification of the rock.'),
    confidenceLevel: z
      .number()
      .describe('Confidence level for the identification (0-1).'),
    classification: z
      .string()
      .describe('Basic classification (igneous, sedimentary, or metamorphic).'),
    family: z.string().describe('Rocks or mineral family.'),
  }),
  physicalProperties: z.object({
    hardness: z
      .string()
      .describe('Hardness on the Mohs scale (e.g., 6-7 for Quartz).'),
    luster: z
      .string()
      .describe('Luster (metallic, vitreous, earthy etc.).'),
    colorRange: z.string().describe('Typical color range.'),
    streakColor: z.string().describe('Streak color.'),
    cleavageFracture: z.string().describe('Cleavage/fracture pattern.'),
    crystalStructure: z
      .string()
      .describe('Typical crystal structure if applicable.'),
  }),
  formationProcess: z.string().describe('The rock’s formation process.'),
  commonLocations: z.string().describe('Common locations where the rock is found.'),
  collectingValue: z.string().describe('Collecting value of the rock.'),
  funFacts: z.string().describe('Some fun facts about the rock.'),
});

export type IdentifyRockOutput = z.infer<typeof IdentifyRockOutputSchema>;

export async function identifyRock(input: IdentifyRockInput): Promise<IdentifyRockOutput> {
  return identifyRockFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyRockPrompt',
  input: {schema: IdentifyRockInputSchema},
  output: {schema: IdentifyRockOutputSchema},
  prompt: `You are an expert geologist specializing in rock identification.

You will use the information from the photo to identify the rock.

Analyze the provided image and identify the rock or mineral, including its common name, scientific name, primary identification, confidence level and basic classification (igneous, sedimentary, or metamorphic), rocks or mineral family. Also identify physical properties like the following hardness on the (Mohs scale), luster (metallic, vitreous, earthy etc.), typical color range, Streak color cleavage fracture patter, typical crystal structure if applicable, as well as the rocks formation process, common locations, collecting value and some fun facts.

Respond in a structured JSON format.

Photo: {{media url=photoDataUri}}
`,
});

const identifyRockFlow = ai.defineFlow(
  {
    name: 'identifyRockFlow',
    inputSchema: IdentifyRockInputSchema,
    outputSchema: IdentifyRockOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
