import * as dotenv from "dotenv";
import { createError } from "../error.js";
import OpenAI from "openai";

dotenv.config();


const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            {
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }), // Ensure the prompt is sent properly
            }
        );

        const arrayBuffer = await response.arrayBuffer(); // Get the binary data as ArrayBuffer
        const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
        const base64Image = buffer.toString('base64'); // Convert Buffer to base64 string

        return res.status(200).json({ photo: base64Image }); // Return the base64 string
    } catch (error) {
        next(
            createError(
                error.status,
                error?.response?.data?.error?.message || error?.message
            )
        );
    }
};


export default generateImage;
