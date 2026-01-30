
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SimulationResult } from "../types";

// Always initialize GoogleGenAI with a named parameter for apiKey.
// Use process.env.API_KEY directly as required by guidelines.
export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Analyzes biometric aging factors using Gemini AI.
 * Uses a multimodal approach by sending both an image and a text prompt.
 */
export const analyzeBiometricAging = async (
  base64Image: string,
  biometricType: string
): Promise<SimulationResult> => {
  const ai = getGeminiClient();
  const prompt = `
    Analyze this photo of an elderly citizen in the context of biometric authentication (${biometricType}).
    Identify specific biological aging factors (e.g., skin elasticity, cataracts, wrinkles, bone structure changes) 
    that might cause current biometric scanners to fail when compared to a 10-15 year old database record.
    
    Provide a confidence score (0-100) of how likely this person is to PASS a standard biometric check.
    List 3 specific failure points.
    Provide a professional but empathetic explanation and a recommended alternative (e.g. OTP, Face Auth with Aging Compensation).
    
    Format the response as JSON.
  `;

  // Use the recommended object format for single-turn multimodal generation.
  // We use gemini-3-flash-preview as it is multimodal and efficient for text tasks.
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          confidenceScore: { type: Type.NUMBER },
          failurePoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          explanation: { type: Type.STRING },
          recommendation: { type: Type.STRING }
        },
        required: ["confidenceScore", "failurePoints", "explanation", "recommendation"]
      }
    }
  });

  // Access the text property directly on the GenerateContentResponse object.
  const text = response.text;
  try {
    return JSON.parse(text || "{}");
  } catch (e) {
    console.error("Failed to parse AI response:", e);
    return {
      confidenceScore: 0,
      failurePoints: ["Analysis error"],
      explanation: "Could not process the image properly.",
      recommendation: "Please try again with a clearer photo."
    };
  }
};

/**
 * Chats with the AI Digital Inclusion Advocate.
 * Uses a chat session to maintain context.
 */
export const chatWithAdvocate = async (history: { role: string; content: string }[], message: string) => {
  const ai = getGeminiClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are an empathetic digital inclusion advocate for elderly citizens facing biometric failures. You help them understand their rights, provide steps for manual override (like Exception handling in Aadhaar), and explain how to use alternative authentication. Keep language simple, large-print-style, and respectful.",
    },
  });

  // chat.sendMessage accepts a message parameter; access response.text directly.
  const response: GenerateContentResponse = await chat.sendMessage({ message });
  return response.text;
};
