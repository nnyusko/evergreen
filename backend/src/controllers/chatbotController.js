const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// @desc    Chat with AI
// @route   POST /api/chatbot
// @access  Private
const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const chat = model.startChat({
      history: [
        { role: "user", parts: "You are a helpful assistant for seniors." },
        { role: "model", parts: "Great to meet you. What would you like to know?" },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Error communicating with Google AI:', error);
    res.status(500).json({ message: 'Error communicating with AI service' });
  }
};

module.exports = { chatWithAI };
