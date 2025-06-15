
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is accessed from environment variables.
// This variable MUST be set in the environment where the code runs.
const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (!API_KEY) {
  console.error(
    "API_KEY environment variable not set. Gemini API functionality will be disabled. This app does not require it for its core quiz functionality."
  );
} else {
  // Initialize the GoogleGenAI client with the API key
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

// Export the initialized client (can be null if API_KEY is not set)
export const geminiAI = ai;

// Example function demonstrating how to use the Gemini API client.
// This specific function is not used by the quiz game itself.
export const getSampleGeminiResponse = async (promptText: string): Promise<string> => {
  if (!geminiAI) {
    const errorMsg = "Gemini AI client not initialized due to missing API Key.";
    console.log(errorMsg);
    return errorMsg;
  }
  try {
    // Using a valid model name as per guidelines
    const response: GenerateContentResponse = await geminiAI.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17', 
        contents: promptText
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error fetching response from Gemini.";
  }
};

// Example function demonstrating how to generate images.
// This specific function is not used by the quiz game itself.
export const generateSampleImage = async (promptText: string): Promise<string | null> => {
    if (!geminiAI) {
        const errorMsg = "Gemini AI client not initialized due to missing API Key for image generation.";
        console.log(errorMsg);
        return null;
    }
    try {
        const response = await geminiAI.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: promptText,
            config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
        });
        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;
    } catch (error) {
        console.error("Error calling Gemini Image API:", error);
        return null;
    }
};
