// AI Service for generating content

export async function improveWithAI(text, type) {
  try {
    const prompts = {
      bio: `Improve this professional bio to make it more engaging and professional. Keep it concise (2-3 sentences): "${text}"`,
      project: `Improve this project description to be more impactful and clear: "${text}"`,
      summary: `Create a professional summary based on this information: "${text}"`,
    };

    const response = await fetch('/api/ai/improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompts[type], text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('API Error:', errorData);
      throw new Error(errorData.error || 'AI request failed');
    }

    const data = await response.json();
    console.log('AI Response:', data);
    return { content: data.content, success: true };
  } catch (error) {
    console.error('AI improvement failed:', error);
    return { content: text, success: false };
  }
}

export async function categorizeSkills(skills) {
  try {
    const response = await fetch('/api/ai/categorize-skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills }),
    });

    if (!response.ok) throw new Error('AI categorization failed');

    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error('Skill categorization failed:', error);
    return { 'Uncategorized': skills };
  }
}

export async function generateProjectDescription(title, technologies) {
  try {
    const response = await fetch('/api/ai/generate-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, technologies }),
    });

    if (!response.ok) throw new Error('AI generation failed');

    const data = await response.json();
    return data.description;
  } catch (error) {
    console.error('Project description generation failed:', error);
    return '';
  }
}

export async function suggestImprovements(role, experience) {
  try {
    const response = await fetch('/api/ai/suggest-improvements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, experience }),
    });

    if (!response.ok) throw new Error('AI suggestions failed');

    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error('Improvement suggestions failed:', error);
    return [];
  }
}
