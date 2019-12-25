const app = require('express')();

app.use('/send', (req, res) => {
    res.send('hellow')
})

exports.app = app;

// gcloud functions deploy toad-alerts --trigger-http --runtime=nodejs10