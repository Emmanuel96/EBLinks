import axios from "axios";

const openAIKey = "";
const maxTokens = 1000; // Adjust the response length as needed

export const getOpenAIResponse = async (
  input: string,
  pageSize: number = 500
): Promise<string[]> => {
  const url = "https://api.openai.com/v1/completions";

  try {
    const response = await axios.post(
      url,
      {
        prompt: `Find a story called ${input} Explain seven key points then give detailed explanation (700 words) to each of them`,
        max_tokens: maxTokens,
        model: "text-davinci-003",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAIKey}`,
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      const fullText = response.data.choices[0].text.trim();
      const pages: string[] = [];
      for (let i = 0; i < fullText.length; i += pageSize) {
        pages.push(fullText.slice(i, i + pageSize));
      }
      return pages;
    }
  } catch (error) {
    console.error("Error making OpenAI API request:", error);
  }

  return [];
};