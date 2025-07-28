/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useCallback } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FormData } from "@/types/story-form";
import { Step1, Step2, Step3, Step4, Step5, Step6} from "./resuseable/story-steps";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { storyForm_colors } from "@/helpers/colors";
import { useAuth } from "@/context/useAuth";
import { useAppStore } from "@/store/store";

const StoryForm = () => {
  const setFormData = useAppStore((state:any) => state.setFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useAuth()
  const methods = useForm<FormData>({
    defaultValues: {
      ageGroup: [],
      language: "English",
      favoriteThings: "",
      world: [],
      theme: [],
      mood: [],
      storyPrompt: "",
    },
  });
  const { register, handleSubmit, formState: { errors }, control, trigger } = methods;
  const router = useRouter();

  const validateStep = useCallback(async () => {
    const fieldsPerStep: Array<Array<keyof FormData>> = [
      ["storyPrompt"], 
      ["ageGroup"],
      ["favoriteThings"],
      ["world"], 
      ["theme"], 
      ["mood"], 
      [], 
    ];
    const fields = fieldsPerStep[currentStep];
    if (fields.length === 0) return true;
    const result = await trigger(fields);
    return result;
  }, [currentStep, trigger]);

  const nextStep = useCallback(async () => {
    const isValid = await validateStep();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
    }
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

const onSubmit: SubmitHandler<FormData> = async (data) => {
  setIsLoading(true);
  try {
    if (!user?._id) return alert("Please login first");
    const userId = user._id;
    const requestPayload = {
      ...data,
      userId
    };
    const response = await axios.post("/api/generate-story", requestPayload);
    const story = response.data;
    
    if (!story.success) {
      throw new Error(story.error || "Failed to generate story");
    }
    
    const formData ={
      id: story.id,
      ageGroup: JSON.stringify(story.ageGroup),
      language: story.language,
      favoriteThings: story.favoriteThings,
      world: JSON.stringify(story.world),
      theme: JSON.stringify(story.theme),
      mood: JSON.stringify(story.mood),
      story: story.story,
      imageUrl: story.imageUrl || "",
      title: story.title || ""
    };
     
     setFormData({...formData});
    router.push("/user-stories");
  } catch (error) {
    console.error("API error:", error);
    alert("Story generation failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const steps = [
    <Step1 key="step1" register={register} errors={errors} control={control} />,
    <Step2 key="step2" control={control} errors={errors} register={register} />,
    <Step3 key="step3" control={control} errors={errors} register={register} />,
    <Step4 key="step4" control={control} errors={errors} register={register} />,
    <Step5 key="step5" control={control} errors={errors} register={register} />,
    <Step6 key="step6" control={control} errors={errors} register={register} />,
  ];

  return (
    <FormProvider {...methods}>
      <section
        className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-blue-100 to-purple-100"
        style={{ backgroundColor: storyForm_colors.background }}
      >
        <div className="container mx-auto text-center relative">
          <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0 max-w-4xl mx-auto rounded-3xl overflow-hidden">
            <CardContent className="p-6 sm:p-12">
              <h1
                className="-mt-5 text-2xl sm:text-4xl font-extrabold mb-4 flex items-center justify-center gap-3 animate-bounce-slow"
                style={{ color: storyForm_colors.text }}
              >
                <Sparkles className="w-10 h-10" style={{ color: storyForm_colors.primary }} />
                Create Your Story
              </h1>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-sm sm:text-base text-gray-600 mb-2">
                      Step {currentStep + 1} of 6
                    </p>
                    <div className="flex justify-center gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index <= currentStep ? "bg-purple-600" : "bg-gray-300"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  {steps[currentStep]}
                  <div className="flex justify-between mt-8 gap-4">
                    {currentStep > 0 && (
                      <Button
                        onClick={prevStep}
                        variant="outline"
                        className="w-32 py-2 border-2 border-purple-200 hover:bg-purple-50 transform hover:scale-105 transition-all"
                        style={{ color: storyForm_colors.text }}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      onClick={currentStep === 5 ? () => handleSubmit(onSubmit)() : nextStep}
                      disabled={isLoading}
                      className="w-32 py-2 transform hover:scale-105 transition-all duration-300"
                      style={{
                        backgroundColor: storyForm_colors.secondary,
                        color: "white",
                        borderRadius: "1rem",
                      }}
                    >
                      {currentStep === 5 ? "Generate Story" : "Next"}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Decorative Elements */}
          <div className="absolute top-5 left-5 sm:top-10 sm:left-10 opacity-60 animate-spin-slow">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill={storyForm_colors.accent}
              />
            </svg>
          </div>
          <div className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 opacity-60 animate-pulse">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill={storyForm_colors.secondary} />
            </svg>
          </div>
        </div>

      
      </section>
    </FormProvider>
  );
};

export default StoryForm;