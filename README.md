
# Corner Stone App

An application for rock identification, exploring biblical insights related to geology, and AI-powered item description. Features integration with the K.O.H.E. Life Cycle System and a Bible Bot for scripture exploration.

## Features

-   **Rock Identification:** Upload a photo of a rock, and AI will identify it, providing details about its properties, formation, and more.
-   **Save Collection:** Save identified rocks with personal notes to a local collection.
-   **Describe Item:** Upload a photo of any item for an AI-generated description and insights.
-   **Daily Scripture:** Displays a new Bible verse each day.
-   **Corner Stone Bible Bot:** An embedded AI chat interface to ask questions and explore biblical topics, especially those related to stones, elements, and geology.
-   **K.O.H.E. Life Cycle System:** Information and link to subscribe to the Life Cycle System.

## Tech Stack

-   Next.js (App Router)
-   React
-   TypeScript
-   Tailwind CSS
-   ShadCN UI components
-   Genkit (for AI features with Google Gemini)

## Getting Started

1.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Google AI API Key:
    ```
    GOOGLE_API_KEY=your_google_ai_api_key_here
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the Genkit development server (optional, for testing flows):
    In one terminal:
    ```bash
    npm run genkit:dev
    ```
    This will start the Genkit developer UI, typically on `http://localhost:4000`.

4.  Run the Next.js development server:
    In another terminal:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:9003` by default.

This project aims to provide an engaging experience connecting geology with spiritual wisdom.
