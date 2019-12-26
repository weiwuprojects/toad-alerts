const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs')
const path = require('path')
const site = "https://pixabay.com/images/search/toad/";


const download_image = async (url, path) => {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    return await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
          reject(err);
        });
        fileStream.on("finish", function() {
          resolve();
        });
      });
}


(async () => {

    const url = `${site}`;
    const html = await fetch(url, {
        headers: {
            'Host': 'pixabay.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Cookie': '__cfduid=dd996a6eceabe503ab4985356caf2718b1577247292; is_human=1; client_width=420; anonymous_user_id=161e5829-1bc7-4b2e-be18-00076fffeeec; dwf_attribution_template_ads=True',
            'Upgrade-Insecure-Requests': 1,
            'Cache-Control': 'max-age=0',
            'TE': 'Trailers'
        }
    }).then( async (res) => await res.text() );
    const $ = cheerio.load(html);
    $('img').toArray().forEach( async (img) => {
        if (!img.attribs.src.includes('/static/img/')){
            try {
                console.log(path.basename(img.attribs.src))
                
                await download_image(img.attribs.src, `images/${path.basename(img.attribs.src)}`)
            }
            catch(e){
                console.log(e)
            }
        }
    })
})()