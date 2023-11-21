import axios from "axios";

// const openAIKey = "";
// const maxTokens = 1000; // Adjust the response length as needed

export const getOpenAIResponse = async (
  input: string,
  points: number = 5,
  minWords: number = 100,
  maxWords: number = 200
  // pageSize: number = 500
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

    // const fullText = "1. Natural Language Understanding (NLU): Dialogflow leverages Google's advanced NLP capabilities to understand and process natural language input from users. It can recognize intents (user goals) and entities (key pieces of information) in user messages. Rich Integrations: Dialogflow supports integration with various messaging platforms and channels, including web chat, mobile apps, voice assistants(Google Assistant, Amazon Alexa), and more.It provides ready - to - use connectors for popular messaging platforms. Multilingual Support: You can build chatbots and conversational agents in multiple languages to cater to a global audience. Dialog Management: Dialogflow enables you to design conversation flows, handle user prompts, and manage context within conversations.You can create rich, multi - turn conversations that feel natural to users. Pre - built Agents: Dialogflow offers pre - built agents for common use cases, making it easier to get started with chatbot development.You can customize these agents to suit your specific requirements. Customization: You can create custom agents tailored to your application's unique needs. This involves defining intents, entities, training phrases, and responses."
    // const pages: string[] = [];
    // for (let i = 0; i < fullText.length; i += pageSize) {
    //   pages.push(fullText.slice(i, i + pageSize));
    // }
    // return pages;
    
    const fullText = "This study introduced an innovative methodology for developing troubleshooting chatbots tailored to provide technical support for ATM maintenance, utilizing the Google Dialogflow CX framework. A critical aspect of our methodology is the detailed demonstration of structuring a knowledge database to facilitate the creation of a virtual assistant. Furthermore, we proposed a distinctive approach to evaluating chatbot performance, focusing on aspects such as intent recognition and named entity recognition. When compared to other methodologies used in chatbot development [48,49,50,51,55,56,57], our strategy offers a more granular approach toward understanding the nuances of user intent and offers a systematic technique for structuring knowledge databases. This allows for an enhanced interpretation and processing of user inquiries, consequently leading to more accurate responses. Our approach can be extrapolated to various troubleshooting chatbot applications, specifically those related to the banking sector. This makes our methodology a flexible and scalable solution for designing conversational agents. The knowledge database created during this process can be conveniently updated and expanded, ensuring that the chatbot maintains its relevance and accuracy in light of evolving user needs and technological advancements. Our methodology, therefore, presents a substantial improvement over existing techniques, providing a robust and adaptive solution for the development of troubleshooting chatbots. It is worth mentioning that this methodology applies solely to retrieval-based chatbots, owing to the requirement of following a sequence of procedures developed by technical engineers and not being indicated, therefore, to generative-based chatbots. Nevertheless, the experimental protocol presented in this study can be utilized to evaluate various types of chatbots, particularly conversational agents that require a detailed description from the user and incorporate IR and NER techniques in their design and implementation. Using the proposed methodology, we implemented a state-of-the-art chatbot. Our performance analysis showed we achieved 0.95 and 0.88 accuracies for IR and NER, respectively. These results demonstrate our methodology’s effectiveness in creating a high-performing chatbot that can deliver a positive user experience. In summary, this work provides a valuable contribution to the field of chatbot development, highlighting the potential of the Google Dialogflow CX framework to create sophisticated and effective conversational agents. Furthermore, our methodology can be utilized as a foundation for developing chatbots in various domains and industries, offering a valuable tool for improving customer service, providing support, and enhancing user experiences."
    const words = fullText.split(' ');
    const pages: string[] = [];

    for (let i = 0; i < points; i++) {
      let page = '';
      while (page.split(' ').length < minWords && words.length > 0) {
        page += ' ' + words.shift();
      }
      pages.push(page);
    }

    return pages;
    
  } catch (error) {
    console.error("Error making OpenAI API request:", error);
  }

  return [];
};
