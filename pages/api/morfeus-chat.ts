// /pages/api/morfeus-chat.ts — Best of the Best API Handler for Morfeus

import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "dotenv";
config();

import { generate_gpt_reasoning } from "@/core/fx_reasoning_engine"; // Adjust to actual local logic if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Invalid query format" });
    }

    // Process with Morfeus engine
    const result = await generate_gpt_reasoning(query.trim().toUpperCase());
    return res.status(200).json(result);

  } catch (error) {
    console.error("Morfeus API Error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}