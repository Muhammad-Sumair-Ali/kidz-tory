/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storyForm_colors } from "@/helpers/colors";
import { 
  BookOpen, 
  Users, 
  Heart, 
  Globe, 
  Target, 
  Smile,
  Rocket,
  TreePine,
  Crown,
  Waves,
  School,
  Home,
  Shield,
  Search,
  UserCheck,
  Gamepad2,
  Sparkles,
  Moon,
  Zap
} from "lucide-react";

// Step 1: Story Prompt
export const Step1: React.FC<{
  register: any;
  errors: any;
  control: any;
}> = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-purple-600" />
        <Label
          className="text-lg font-semibold"
          style={{ color: storyForm_colors.text }}
        >
          Step 1: What&apos;s the story about?
        </Label>
      </div>
      <div className="relative">
        <Input
          {...register("storyPrompt", {
            required: "Please provide a story idea",
          })}
          placeholder="Example: A brave puppy explores a magical forest to find a hidden treasure..."
          className="w-full pl-12 px-4 py-5 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none resize-y"
          style={{ color: storyForm_colors.text }}
          rows={4}
        />
      </div>
      {errors.storyPrompt && (
        <p className="text-red-500 text-sm">{errors.storyPrompt.message}</p>
      )}
    </div>
  );
};

// Step 2: Age Group
export const Step2: React.FC<{
  register: any;
  errors: any;
  control: any;
}> = ({ control, errors }) => {
  const ageIcons = {
    "1-5": Users,
    "6-10": Users,
    "11-15": Users,
    "15 and above": Users
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-purple-600" />
        <Label
          className="text-lg font-semibold"
          style={{ color: storyForm_colors.text }}
        >
          Step 2: Who&apos;s the story for?
        </Label>
      </div>
      <div className="space-y-2">
        {["1-5", "6-10", "11-15", "15 and above"].map((age) => {
          const IconComponent = ageIcons[age as keyof typeof ageIcons];
          return (
            <Controller
              key={age}
              name="ageGroup"
              control={control}
              rules={{ required: "Please select at least one age group" }}
              render={({ field }) => (
                <label className="flex justify-between items-center border-fuchsia-900/40 border-2 text-black bg-white p-4 rounded-xl shadow-md cursor-pointer hover:bg-fuchsia-900/10 hover:scale-105 transition-all duration-200 w-full">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{age}</span>
                  </div>
                  <Checkbox
                    checked={field.value?.includes(age)}
                    onCheckedChange={(checked) => {
                      const current = field.value || [];
                      field.onChange(
                        checked
                          ? [...current, age]
                          : current.filter((item: string) => item !== age)
                      );
                    }}
                    className="h-5 w-5 text-purple-800 border-gray-600"
                  />
                </label>
              )}
            />
          );
        })}
      </div>
      {errors.ageGroup && (
        <p className="text-red-500 text-sm">{errors.ageGroup.message}</p>
      )}
    </div>
  );
};

// Step 3: Favorite Things
export const Step3: React.FC<{
  register: any;
  errors: any;
  control: any;
}> = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Heart className="w-6 h-6 text-purple-600" />
        <Label
          className="text-lg font-semibold"
          style={{ color: storyForm_colors.text }}
        >
          Step 3: What are your favorite things?
        </Label>
      </div>
      <div className="relative">
        <Input
          {...register("favoriteThings", {
            required: "Please enter your favorite things",
          })}
          placeholder="Example: Dragons, rainbows, or soccer..."
          className="w-full pl-12 px-4 py-5 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
          style={{ color: storyForm_colors.text }}
        />
      </div>
      {errors.favoriteThings && (
        <p className="text-red-500 text-sm">{errors.favoriteThings.message}</p>
      )}
    </div>
  );
};

// Step 4: Story World
export const Step4: React.FC<{
  register: any;
  errors: any;
  control: any;
}> = ({ control, errors }) => {
  const worldIcons = {
    "Space": Rocket,
    "Jungle": TreePine,
    "Magical Kingdom": Crown,
    "Underwater": Waves,
    "School": School,
    "Everyday Life": Home
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 ml-4">
        <Globe className="w-6 h-6 text-purple-600" />
        <Label
          className="text-lg font-semibold"
          style={{ color: storyForm_colors.text }}
        >
          Step 4: Where does the story happen?
        </Label>
      </div>
      <div className="space-y-2">
        {[
          "Space",
          "Jungle",
          "Magical Kingdom",
          "Underwater",
          "School",
          "Everyday Life",
        ].map((world) => {
          const IconComponent = worldIcons[world as keyof typeof worldIcons];
          return (
            <Controller
              key={world}
              name="world"
              control={control}
              rules={{ required: "Please select at least one story world" }}
              render={({ field }) => (
                <label className="flex justify-between items-center border-fuchsia-900/40 border-2 text-black bg-white p-4 rounded-xl shadow-md cursor-pointer hover:bg-fuchsia-900/10 hover:scale-105 transition-all duration-200 w-full">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{world}</span>
                  </div>
                  <Checkbox
                    checked={field.value?.includes(world)}
                    onCheckedChange={(checked) => {
                      const current = field.value || [];
                      field.onChange(
                        checked
                          ? [...current, world]
                          : current.filter((item: string) => item !== world)
                      );
                    }}
                    className="h-5 w-5 text-purple-800 border-gray-600"
                  />
                </label>
              )}
            />
          );
        })}
      </div>
      {errors.world && (
        <p className="text-red-500 text-sm">{errors.world.message}</p>
      )}
    </div>
  );
};

// Step 5: Story Focus
export const Step5: React.FC<{
  register: any;
  errors: any;
  control: any;
}> = ({ control, errors }) => {
  const focusIcons = {
    "Kindness": Heart,
    "Courage": Shield,
    "Curiosity": Search,
    "Friendship": UserCheck,
    "Just for Fun": Gamepad2
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 ml-4">
        <Target className="w-6 h-6 text-purple-600" />
        <Label
          className="text-lg font-semibold"
          style={{ color: storyForm_colors.text }}
        >
          Step 5: What should the story teach or focus on?
        </Label>
      </div>
      <div className="space-y-2">
        {["Kindness", "Courage", "Curiosity", "Friendship", "Just for Fun"].map(
          (focus) => {
            const IconComponent = focusIcons[focus as keyof typeof focusIcons];
            return (
              <Controller
                key={focus}
                name="theme"
                control={control}
                rules={{ required: "Please select at least one story focus" }}
                render={({ field }) => (
                  <label className="flex justify-between items-center border-fuchsia-900/40 border-2 text-black bg-white p-4 rounded-xl shadow-md cursor-pointer hover:bg-fuchsia-900/10 hover:scale-105 transition-all duration-200 w-full">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">{focus}</span>
                    </div>
                    <Checkbox
                      checked={field.value?.includes(focus)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        field.onChange(
                          checked
                            ? [...current, focus]
                            : current.filter((item: string) => item !== focus)
                        );
                      }}
                      className="h-5 w-5 text-purple-800 border-gray-600"
                    />
                  </label>
                )}
              />
            );
          }
        )}
      </div>
      {errors.theme && (
        <p className="text-red-500 text-sm">{errors.theme.message}</p>
      )}
    </div>
  );
};

// Step 6: Story Mood
export const Step6: React.FC<{
  register: any;
  errors: any;
  control: any;
}> = ({ control, errors }) => {
  const moodIcons = {
    "Funny": Smile,
    "Magical": Sparkles,
    "Calm": Moon,
    "Adventure": Zap
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Smile className="w-6 h-6 text-purple-600" />
        <Label
          className="text-lg font-semibold"
          style={{ color: storyForm_colors.text }}
        >
          Step 6: What&apos;s the mood of the story?
        </Label>
      </div>
      <div className="space-y-2">
        {["Funny", "Magical", "Calm", "Adventure"].map((mood) => {
          const IconComponent = moodIcons[mood as keyof typeof moodIcons];
          return (
            <Controller
              key={mood}
              name="mood"
              control={control}
              rules={{ required: "Please select at least one story mood" }}
              render={({ field }) => (
                <label className="flex justify-between items-center border-fuchsia-900/40 border-2 text-black bg-white p-4 rounded-xl shadow-md cursor-pointer hover:bg-fuchsia-900/10 hover:scale-105 transition-all duration-200 w-full">
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{mood}</span>
                  </div>
                  <Checkbox
                    checked={field.value?.includes(mood)}
                    onCheckedChange={(checked) => {
                      const current = field.value || [];
                      field.onChange(
                        checked
                          ? [...current, mood]
                          : current.filter((item: string) => item !== mood)
                      );
                    }}
                    className="h-5 w-5 text-purple-800 border-gray-600"
                  />
                </label>
              )}
            />
          );
        })}
      </div>
      {errors.mood && (
        <p className="text-red-500 text-sm">{errors.mood.message}</p>
      )}
    </div>
  );
};