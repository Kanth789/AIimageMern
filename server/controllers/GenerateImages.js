import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

const token = process.env.HUGGING_FACE_TOKEN
const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        const arrayBuffer = await response.arrayBuffer(); 
        const buffer = Buffer.from(arrayBuffer); 
        const base64Image = buffer.toString('base64'); 

        return res.status(200).json({ photo: base64Image }); 
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
