import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { title, technologies } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured', success: false },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a technical writer specializing in project descriptions. Create compelling, concise project descriptions that highlight key features and technical achievements.',
        },
        {
          role: 'user',
          content: `Write a professional project description for "${title}" built with ${technologies.join(', ')}. Keep it 2-3 sentences, focusing on key features and impact.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const description = completion.choices[0]?.message?.content || `${title} - A project built with ${technologies.join(', ')}`;

    return NextResponse.json({ description, success: true });
  } catch (error: any) {
    console.error('Project generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate description', success: false },
      { status: 500 }
    );
  }
}

