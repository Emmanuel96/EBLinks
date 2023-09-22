import axios from "axios";

// const openAIKey = "";
// const maxTokens = 1000; // Adjust the response length as needed

export const getOpenAIResponse = async (
  input: string,
  pageSize: number = 500
): Promise<string[]> => {
  // const url = "https://api.openai.com/v1/completions";

  try {
    // const response = await axios.post(
    //   url,
    //   {
    //     prompt: `Find a story called ${input} Explain seven key points then give detailed explanation (700 words) to each of them`,
    //     max_tokens: maxTokens,
    //     model: "text-davinci-003",
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${openAIKey}`,
    //     },
    //   }
    // );

    // if (response.data.choices && response.data.choices.length > 0) {
    //   const fullText = response.data.choices[0].text.trim();
    //   const pages: string[] = [];
    //   for (let i = 0; i < fullText.length; i += pageSize) {
    //     pages.push(fullText.slice(i, i + pageSize));
    //   }
    //   return pages;
    // }

    const fullText = "1. Natural Language Understanding (NLU): Dialogflow leverages Google's advanced NLP capabilities to understand and process natural language input from users. It can recognize intents (user goals) and entities (key pieces of information) in user messages. Rich Integrations: Dialogflow supports integration with various messaging platforms and channels, including web chat, mobile apps, voice assistants(Google Assistant, Amazon Alexa), and more.It provides ready - to - use connectors for popular messaging platforms. Multilingual Support: You can build chatbots and conversational agents in multiple languages to cater to a global audience. Dialog Management: Dialogflow enables you to design conversation flows, handle user prompts, and manage context within conversations.You can create rich, multi - turn conversations that feel natural to users. Pre - built Agents: Dialogflow offers pre - built agents for common use cases, making it easier to get started with chatbot development.You can customize these agents to suit your specific requirements. Customization: You can create custom agents tailored to your application's unique needs. This involves defining intents, entities, training phrases, and responses."
    const pages: string[] = [];
    for (let i = 0; i < fullText.length; i += pageSize) {
      pages.push(fullText.slice(i, i + pageSize));
    }
    return pages;
  } catch (error) {
    console.error("Error making OpenAI API request:", error);
  }

  return [];
};
