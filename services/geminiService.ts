
import { GoogleGenAI, Type } from "@google/genai";
import { Priority } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const parseAppointmentFromText = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Parse the following natural language text into a structured appointment object. 
      If no date is mentioned, assume today is ${new Date().toISOString().split('T')[0]}.
      Current Text: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            startTime: { type: Type.STRING, description: "ISO 8601 format" },
            endTime: { type: Type.STRING, description: "ISO 8601 format" },
            priority: { type: Type.STRING, enum: Object.values(Priority) },
            reminderMinutes: { type: Type.NUMBER }
          },
          required: ["title", "startTime"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    return null;
  }
};

export const suggestOptimizedSchedule = async (appointments: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `As an AI scheduling assistant, analyze these appointments and suggest an optimized order based on priority and time. 
      List reasons for the reorganization.
      Appointments: ${JSON.stringify(appointments)}`,
      config: {
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return "Could not generate suggestions at this time.";
  }
};
