import axios from "axios";

const openAIKey = ""; // Replace with your actual OpenAI API key

export const getOpenAIResponse = async (input: string): Promise<string> => {
  const url = "https://api.openai.com/v1/completions";
  const maxTokens = 1000; // Adjust the response length as needed

  try {
    const response = await axios.post(
      url,
      {
        prompt: `give a story titled ${input} 100 lines`,
        max_tokens: 50,
        model: "text-davinci-003",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAIKey}`,
        },
      }
    );

    // const response = await fetch("/api/generate", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ result: input }),
    //   });

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    }
  } catch (error) {
    console.error("Error making OpenAI API request:", error);
  }

  return "";
};
