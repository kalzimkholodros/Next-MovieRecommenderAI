import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// Debug: Log API key status
console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
console.log('API Key length:', process.env.OPENAI_API_KEY?.length);

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

export async function POST(request: Request) {
  console.log('API endpoint called: /api/analyze');
  
  try {
    const body = await request.json();
    const { query } = body;

    console.log('Received query:', query);

    if (!query) {
      console.log('No query provided');
      return NextResponse.json(
        { error: 'Please provide your movie preferences' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured');
    }

    // Debug: Log the exact request we're sending
    const requestMessages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are a movie recommendation assistant. Your task is to analyze the user's movie preferences and determine the most suitable category from this list: ${validCategories.join(', ')}. 
        Respond with EXACTLY ONE category name from the list. Do not add any other text or explanation.`
      },
      {
        role: "user",
        content: query
      }
    ];

    console.log('Sending request to OpenAI with messages:', JSON.stringify(requestMessages, null, 2));

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: requestMessages,
      temperature: 0.7,
      max_tokens: 10,
    });

    console.log('OpenAI response:', completion.choices[0].message);
    const category = completion.choices[0].message.content?.trim();
    
    if (!category) {
      console.error('No category received from OpenAI');
      throw new Error('Could not determine a category');
    }

    // Clean up the response
    const cleanCategory = category
      .replace(/[^a-zA-Z\s-]/g, '')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    console.log('Cleaned category:', cleanCategory);

    if (!validCategories.includes(cleanCategory)) {
      console.error('Invalid category received:', cleanCategory);
      throw new Error(`Invalid category: ${cleanCategory}`);
    }

    console.log('Valid category found:', cleanCategory);
    return NextResponse.json({ category: cleanCategory });
  } catch (error) {
    console.error('Detailed error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        error: 'Failed to analyze preferences',
        details: errorMessage
      },
      { status: 500 }
    );
  }
} 