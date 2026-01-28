export async function handler(event, context) {
  try {
    const prompt = `
Tu es un générateur de cartes éducatives sur le cancer.
Réponds uniquement en JSON.

Format :
{
  "rarity": "commun | rare | epique | legend",
  "text": "..."
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const message = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: message
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
