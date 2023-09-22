import axios from "axios";
import * as cheerio from "cheerio";
import fs, { fdatasync } from 'fs';

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  } 

for(let i=1;i<10;i++){
    let data;
    let response;
    if(!fs.existsSync('./'+i+ '.html')){
        response = await axios.get("https://xkcd.com/" + i);
        await delay(1000);
        console.log('NOT CACHE!!');
        data = response.data;
        fs.writeFileSync('./cache/' + i + '.html');
    } else{
        console.log('CACHE');
        data = fs.readFileSync('./cache/'+ i + '.html');
    }
    const $ = cheerio.load(response.data);
    let img = $('#comic>img');
    console.log(img.attr('title'));
    console.log(img.attr('alt'));
    console.log(img.attr('src'));
    await delay(1000);
}