require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes/index');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const subpageRouter1 = require('./routes/applications'); // Import the subpage router
const subpageRouter2 = require('./routes/mechanics');
const subpageRouter3 = require('./routes/games');
const subpageRouter4 = require('./routes/ai');
const subpageRouter5 = require('./routes/chatbot');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api', function (req, res) {

    if (req.url === '/favicon.ico') {
        res.end();
    }
    // Ends request for favicon without counting

    const json = fs.readFileSync('count.json', 'utf-8');
    const obj = JSON.parse(json);
    // Reads count.json and converts to JS object

    obj.pageviews = obj.pageviews + 1;
    if (req.query.type === 'visit-pageview') {
        obj.visits = obj.visits + 1;
    }
    // Updates pageviews and visits (conditional upon URL param value)

    const newJSON = JSON.stringify(obj);
    // Converts result to JSON

    fs.writeFileSync('count.json', newJSON);
    res.send(newJSON);
    // Writes result to file and sends to user as JSON

})

// ✅ Load your data from text files
const skills = fs.readFileSync('skillz.txt', 'utf8');
const projects = fs.readFileSync('projects.txt', 'utf8');

// ✅ Use OpenRouter endpoint
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
//console.log(process.env.CHAT)
app.post('/chat', async (req, res) => {
    const { message, imageUrl } = req.body;
    console.log(message);
    const systemMessage = `
You are a professional virtual assistant for Artur, a passionate and skilled software developer.
Your role is to inform employers or clients about his programming experience, skills, and projects.
Always refer to Artur in the third person and respond in a clear, confident, and friendly tone.
`;

    const textContent = {
        type: 'text',
        text: `A visitor has asked the assistant: "${message}"

Use the following information to craft your answer.

### Artur's Skills and Projects:
${skills}

### Artur's Projects:
${projects}`
    };

    // Build content array based on whether imageUrl is included
    const userContent = imageUrl
        ? [textContent, { type: 'image_url', image_url: { url: imageUrl } }]
        : [textContent];

    try {
        const response = await axios.post(OPENROUTER_URL, {
            model: 'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: userContent }
            ]
        }, {
            headers: {
                Authorization: `Bearer ${process.env.CHAT}`,
                'Content-Type': 'application/json'
            }
        });

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.error('Chat error:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to get response from OpenRouter' });
    }
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
});
app.use('/public', express.static(path.join(__dirname, 'public'), { 'Content-Type': 'text/javascript' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(flash());

app.use('/', routes); // Use the main router
app.use('/applications', subpageRouter1);
app.use('/mechanics', subpageRouter2);
app.use('/games', subpageRouter3);
app.use('/ai', subpageRouter4);
app.use('/chatbot', subpageRouter5);
module.exports = app;