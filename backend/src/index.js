require('dotenv').config();
const express = require('express');
const app = express();
const jobsRouter = require('./routes/jobs');

app.use(express.json());
app.use('/jobs', jobsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
