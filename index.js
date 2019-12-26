const app = require('express')()
const fetch = require('node-fetch')
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();


async function getImages() {
    let [ files ] = await storage.bucket('toad-alerts').getFiles();
    files = files.map(file => {
      return `https://storage.googleapis.com/toad-alerts/${file.metadata.name}`
    });
    files.sort(() => Math.random() - 0.5 );
    files.splice(5)
    return files;
}

app.set('view engine', 'pug')

app.use('/', async (req, res) => {
    const images = await getImages();
    res.render('index', { images })
})

app.use('/send', (req, res) => {
    res.send('hellow')
})

exports.app = app;