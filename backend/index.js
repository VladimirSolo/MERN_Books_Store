import express from 'express';
import moongoose from  'mongoose'

const PORT = process.env.PORT || 3000;
const DB = process.env.MONGO_URL;

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  return res.status(201).send('You are the Book man')
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

moongoose
.connect(DB)
.then(() => {
  console.log('Connect to Data Base Success')
})
.catch((error) => {
  console.log(error)
})