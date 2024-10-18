const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

dotenv.config();
const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port', process.env.PORT || 5000);
});
