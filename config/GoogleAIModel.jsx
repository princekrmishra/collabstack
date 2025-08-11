/*
 * Install the Generative AI SDK
 *
 * npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */


import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  ChatSession,
} from "@google/generative-ai";

// It's recommended to use environment variables for your API key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


export const chatSession = model.startChat({
  generationConfig,
  history:[
    {
      role: "user",
      parts: [
        {text: "refrence to {\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n}\n"}
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n   \"time\": 1678886400000,\n   \"blocks\": [\n      {\n         \"id\": \"grocery-header\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Grocery To-Do List\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"produce-section\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Produce\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"produce-list\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"Avocado\",\n               \"Bananas\",\n               \"Broccoli\",\n               \"Spinach\"\n            ]\n         }\n      },\n      {\n         \"id\": \"dairy-section\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Dairy & Alternatives\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"dairy-list\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"Milk (Oat)\",\n               \"Greek Yogurt\",\n               \"Cheese\"\n            ]\n         }\n      },\n      {\n         \"id\": \"pantry-section\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Pantry Staples\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"pantry-list\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"Quinoa\",\n               \"Black Beans\",\n               \"Olive Oil\",\n               \"Whole Wheat Bread\"\n            ]\n         }\n      }\n   ],\n   \"version\": \"2.28.0\"\n}```"}
      ],
    },
  ],
});


  

