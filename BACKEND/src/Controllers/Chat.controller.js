import OpenAI from "openai";
import { AsyncHandler } from "../Utils/AsyncHandler.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatBot = AsyncHandler(async (req, res) => {
  const { message, language } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required",
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Lencho, an agriculture assistant helping farmers with crops, soil, irrigation, fertilizer, and selling produce.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    res.json({
      success: true,
      data: reply,
    });
  } catch (error) {
    console.error("AI ERROR:", error.message);

    res.status(500).json({
      success: false,
      data: {},
      message: "AI service temporarily unavailable. Please try again.",
    });
  }
});
