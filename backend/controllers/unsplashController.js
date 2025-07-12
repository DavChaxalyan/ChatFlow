const axios = require('axios')

exports.unsplash = async (req, res) => {
    const { query } = req.query;

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
        params: {
          query: query || 'background',
          per_page: 20,
        },
      });
  
      res.json(response.data.results);
    } catch (error) {
      console.error('Unsplash API error:', error.message);
      res.status(500).json({ message: 'Error fetching Unsplash images' });
    }
};