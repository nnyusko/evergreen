const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Chat with AI
// @route   POST /api/chatbot
// @access  Private
const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant for seniors.' },
        { role: 'user', content: message },
      ],
      model: 'gpt-3.5-turbo',
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ message: 'Error communicating with AI service' });
  }
};

module.exports = { chatWithAI };
