
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Diagnostic log - this will appear in your server terminal when Next.js starts
console.log("Checking GOOGLE_API_KEY in genkit.ts:", 
  process.env.GOOGLE_API_KEY ? 
  `Key starts with: ${process.env.GOOGLE_API_KEY.substring(0, 5)}...` : 
  "GOOGLE_API_KEY is UNDEFINED or empty."
);

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
