import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt, text } = await request.json();

    console.log('Gemini API Key exists:', !!process.env.GEMINI_API_KEY);
    console.log('Received request:', { promptLength: prompt?.length, textLength: text?.length });

    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key not configured');
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please add GEMINI_API_KEY to .env.local', success: false },
        { status: 500 }
      );
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const fullPrompt = `${prompt}\n\nOriginal: ${text}\n\nReturn ONLY the improved version without any explanation, labels, or extra text:`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    let improvedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean up any markdown formatting or labels
    improvedText = improvedText
      .replace(/^(Improved version:|Improved:|Enhanced:|Better version:)\s*/i, '')
      .replace(/^\*\*.*?\*\*\s*/g, '')
      .replace(/^["']|["']$/g, '')
      .trim();

    console.log('Gemini Response received successfully');
    return NextResponse.json({ content: improvedText, success: true });
  } catch (error) {
    console.error('AI improvement error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
    });
    return NextResponse.json(
      { 
        error: error.message || 'Failed to improve text', 
        details: error.status ? `API Error: ${error.status}` : 'Unknown error',
        success: false 
      },
      { status: 500 }
    );
  }
}

