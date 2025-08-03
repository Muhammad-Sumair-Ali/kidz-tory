/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const useAppStore = create((set) => ({
  formData: null,
  setFormData: (data: any) => set({ formData: data }),
  generatedStory: null,
  setGeneratedStory: (story: any) => set({ generatedStory: story }),
  clearGeneratedStory: () => set({ generatedStory: null }),
}));
