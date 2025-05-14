# **App Name**: Rock Hound

## Core Features:

- Photo Upload: Allow users to upload photos of rocks from their device.
- AI Rock ID: Use an AI tool (Gemini API) to analyze the uploaded photo and identify the rock type. The AI tool should indicate its confidence level for the top matches. It should be able to recognize the common and scientific name of the rock or mineral, primary identification, confidence level and basic classification (igneous, sedimentary, or metamorphic), rocks or mineral family. Also it should also be able to identify physical properties like the following hardness on the (Mohs scale), luster (metallic, vitreous, earthy etc.), typical color range, Streak color cleavage fracture patter, typical crystal structure if applicable, as well as the rocks formation process, common locations, collecting value and some fun facts.
- Rock Details: Display detailed information about the identified rock, including its properties, uses, and origin.
- Save Rock: Allow users to save identified rocks to a personal collection with a note. There is no separate database for this, identifications will be saved into the browser's localStorage.

## Style Guidelines:

- Primary color: Earthy tones like brown (#A68B64) and green (#6A8D73) to reflect nature.
- Secondary colors: Muted blues (#89B0AE) and grays (#E0E0E0) for a calming feel.
- Accent: Gold (#D4AF37) for highlights and important actions.
- Clear, sans-serif fonts for easy readability.
- Use simple, outline-style icons for a clean look.
- Clean and intuitive layout with clear hierarchy for easy navigation.