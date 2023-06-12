const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual OpenAI API key

async function generateStory(input: string): Promise<string> {
  const response = await fetch(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: input,
        max_tokens: 100,
        temperature: 0.7,
        n: 1,
        stop: "\n",
      }),
    }
  );

  const data = await response.json();

  return data.choices[0].text.trim();
}

export default generateStory;