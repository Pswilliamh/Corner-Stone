
# Corner Stone App

This is a Next.js application designed to integrate geological exploration with spiritual insights. Users can identify rocks, describe items, explore their biblical significance, and manage a personal collection.

## Features

-   **Rock Identification:** Upload a photo of a rock to get AI-powered identification and details.
-   **Describe Item:** Upload a photo of any item to get an AI-generated description and potential significance.
-   **My Collection:** Save identified rocks and items with personal notes.
-   **Bible Bot:** Explore scriptures and ask questions about biblical topics, especially related to stones and elements.
-   **Daily Scripture:** View an inspirational Bible verse each day.

## Tech Stack

-   Next.js (App Router)
-   React
-   TypeScript
-   Tailwind CSS
-   ShadCN UI components
-   Genkit (for AI features - rock identification, item description)
-   Firebase (potential for future database/auth integration)

## Getting Started

To get started with development:

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Set up your environment variables. Create a `.env.local` file in the root of your project and add your Google AI API Key:
    ```env
    GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:9003` by default.

Ensure you have the necessary ShadCN UI components installed.
```