const express = require('express');
const request = require('request');
const serverless = require("serverless-http")
const app = express();

const router = express.Router()
//habia que cambiar el header() por res.setHeader()
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
        next();
});

router.get('/list-api', (req, res) => {
    request({
        url: `https://api.clickup.com/api/v2/list/${req.query.listId}/task`,
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
       
            url: `https://api.clickup.com/api/v2/task/${req.query.taskId}`,
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