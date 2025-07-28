import {
  Control,
  FieldErrors,
  useForm,
  UseFormRegister,
} from "react-hook-form";

export interface FormData {
  ageGroup: string[];
  language: string;
  favoriteThings: string;
  world: string[];
  theme: string[];
  mood: string[];
  storyPrompt: string;
}
export interface StoryResponse {
  id?: string;
  userId?: string;
  story: string;
  imageUrl: string;
  title: string;
  ageGroup: string;
  language: string;
  favoriteThings: string[];
  world: string;
  theme: string;
  mood: string;
}

// Step components props
export interface StepProps {
  register: ReturnType<typeof useForm<FormData>>["register"];
  errors?: ReturnType<typeof useForm<FormData>>["formState"]["errors"];
  watch?: ReturnType<typeof useForm<FormData>>["watch"];
}

export interface InputStepProps {
  register: UseFormRegister<FormData>;
  errors?: FieldErrors<FormData>;
}

export interface ControlledStepProps {
  control: Control<FormData>;
  errors?: FieldErrors<FormData>;
}


export interface Story {
  _id?: string;
  title: string;
  prompt: string;
  story: string;
  ageGroup: string;
  language: string;
  mood: string;
  theme: string;
  world: string | string[]; 
  favoriteThings: string[];
  imageUrl: string;
  createdBy?: string;
  userId: string;
  createdAt?: string; 
  updatedAt?: string;
  __v?: number;
}
