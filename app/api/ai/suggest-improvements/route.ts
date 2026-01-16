import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { role, experience } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured', success: false },
        { status: 500 }
      );
    }

    const experienceText = experience.map((exp: any) => 
      `${exp.position} at ${exp.company} (${exp.duration}): ${exp.description}`
    ).join('\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a career coach and portfolio expert. Provide specific, actionable suggestions to improve a portfolio for the given role.',
        },
        {
          role: 'user',
          content: `Role: ${role}\n\nExperience:\n${experienceText}\n\nProvide 5 specific suggestions to improve this portfolio. Return as a JSON array of strings.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText = completion.choices[0]?.message?.content || '[]';
    const suggestions = JSON.parse(responseText);

    return NextResponse.json({ suggestions, success: true });
  } catch (error: any) {
    console.error('Suggestions error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate suggestions', success: false },
      { status: 500 }
    );
  }
}

