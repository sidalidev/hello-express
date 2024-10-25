const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())

const User = mongoose.model('User', {
  name: String,
})

app.get('/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

app.post('/users', async (req, res) => {
  const user = await User.create(req.body)
  res.send(user)
})

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  res.send(user)
})

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body)
  res.send(user)
})

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.send(user)
})

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mon-projet')
    console.log('✅ Connected to MongoDB')
    app.listen(3000, () => console.log('✅ Server started on port 3000'))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
