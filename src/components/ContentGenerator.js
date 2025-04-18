import React, { useState } from 'react';

const ContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
        }),
      });

      const data = await res.json();
      setResult(data.choices?.[0]?.message?.content || 'No content generated.');
    } catch (error) {
      console.error('Error generating content:', error);
      setResult('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">AI Content Generator</h2>
      <textarea
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring"
        placeholder="Enter a topic or prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />
      <button
        onClick={handleGenerate}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Generated Content:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
