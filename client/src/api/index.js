import axios from "axios";

const API = axios.create({
  baseURL: "https://aiimagemern.onrender.com/api",
});

export const GetPosts = async () => await API.get("/post");
export const CreatePost = async (data) => await API.post("/post", data);
export const GenerateImages = async (data) =>
  await API.post("/generateImage/", data);
