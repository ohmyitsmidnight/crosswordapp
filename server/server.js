const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Ensure path module is included
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Add this to parse JSON bodies

// API route
app.get('/api/define', async (req, res) => {
  const word = req.query.word;
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const definition = response.data[0].meanings[0].definitions[0].definition;
    res.json({ definition });
  } catch (error) {
    res.status(500).json({ error: 'Definition not found' });
  }
});

// Serve static files from React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})