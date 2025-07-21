const express = require('express');
const mongoose = require('mongoose');
const enrollRoutes = require('./routes/enroll');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('public')); // Serve index.html

mongoose.connect('mongodb://127.0.0.1:27017/enrollmentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

app.use('/api', enrollRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});