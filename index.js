const express = require('express');
const app = express();
const path = require('path');
const songData = require('./api/slotify.json');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  songs = songData[2].data;
  res.render(`home`, { songs });
});

app.get('/s/:songId', (req, res) => {
  const { songId } = req.params;
  const data = songData[2].data[songId];
  let artists;
  try {
    artists = songData[3].data[data.artist - 1];
  } catch {
    res.render('notfound', { songId });
  }

  if (data) {
    res.render('song', { ...data, ...artists });
  } else {
    res.render('notfound', { songId });
  }
});

app.listen(3001, () => {
  console.log('running');
});
