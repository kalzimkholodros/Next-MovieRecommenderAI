import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OpenAI API key not found');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const validCategories = [
  'Action',
  'Comedy',
  'Drama',
  'Sci-Fi',
  'Horror',
  'Romance',
  'Documentary',
  'Animation'
];

export async function analyzeUserQuery(query: string) {
  try {
    console.log('Starting OpenAI query analysis');
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a movie recommendation assistant. Analyze the user's query and determine the most suitable movie category. 
          You must respond with EXACTLY ONE of these category names: ${validCategories.join(', ')}. 
          Do not add any other text or explanation.`
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7,
      max_tokens: 50,
    });

    console.log('OpenAI response:', completion.choices[0].message);
    const category = completion.choices[0].message.content?.trim();
    
    if (!category) {
      throw new Error('OpenAI did not provide a response');
    }

    if (!validCategories.includes(category)) {
      console.log('Invalid category received:', category);
      throw new Error(`Invalid category response: ${category}`);
    }

    console.log('Valid category found:', category);
    return category;
  } catch (error) {
    console.error('Error in OpenAI query:', error);
    if (error instanceof Error) {
      throw new Error(`OpenAI Error: ${error.message}`);
    }
    throw error;
  }
} 