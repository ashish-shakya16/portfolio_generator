import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { skills } = await request.json();

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
          content: 'You are a technical skills categorization expert. Categorize the provided skills into appropriate categories such as Frontend, Backend, Database, DevOps, Tools, Design, Soft Skills, etc. Return the result as a JSON object where keys are category names and values are arrays of skills.',
        },
        {
          role: 'user',
          content: `Categorize these skills: ${skills.join(', ')}\n\nReturn ONLY a valid JSON object with categories as keys and arrays of skills as values.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    const categories = JSON.parse(responseText);

    return NextResponse.json({ categories, success: true });
  } catch (error) {
    console.error('Skill categorization error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to categorize skills', success: false },
      { status: 500 }
    );
  }
}

