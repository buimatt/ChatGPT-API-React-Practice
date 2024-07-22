const PORT = 8000;
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = 'sk-proj-kEws4aLREtSYziD16vbOT3BlbkFJD6xjUYPwSXiPD1dNciIL'

app.post('/completions', async (req,res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Server is running PORT: ' + PORT))
