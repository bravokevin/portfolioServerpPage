const express = require('express');
const request = require('request');
const serverless = require("serverless-http")
const app = express();

const router = express.Router()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


router.get('/list-api', (req, res) => {
    request(
        {
            url: `https://api.clickup.com/api/v2/list/${req.query.listId}/task?${req.query.query.toString()}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'pk_18924001_9XP63KU5MKGK40VZ09YHDJABAZAW1THD'
            }
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }

            res.json(JSON.parse(body));
        }
    );
});

router.get('/tasks-api', (req, res) => {
    request(
        {
            url: `https://api.clickup.com/api/v2/task/${req.query.taskId}?${req.query.query.toString()}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'pk_18924001_9XP63KU5MKGK40VZ09YHDJABAZAW1THD'
            }
        },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    );
});

const PORT = process.env.PORT || 5000;
app.use("/.netlify/functions/server", router)
app.listen(PORT, () => console.log(`listening on ${PORT}`));

module.exports.handler = serverless(app)