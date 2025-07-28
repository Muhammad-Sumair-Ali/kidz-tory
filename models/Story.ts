
import { model, models, Schema } from "mongoose";



const StorySchema = new Schema(
  {
    title: { type: String, required: true },
    ageGroup: String,
    language: String,
    favoriteThings: [String],
    world: String,
    theme: String,
    mood: String,
    story: String,
    imageUrl: String,
    prompt: String,
    createdBy: String,
    userId: String,
  },
  { timestamps: true }
);

export default models.Story || model("Story", StorySchema);
