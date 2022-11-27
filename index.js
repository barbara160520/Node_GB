'use strict';
import fs from 'fs'
import readline from 'readline';

const ACCESS_LOG = "./logs/access_tmp.log"
const ipAddres = ['89.123.1.41','34.48.240.111']

const writeStream_1 = fs.createWriteStream(`./logs/${ipAddres[0]}_requests.log`, {encoding: "utf-8"})
const writeStream_2 = fs.createWriteStream(`./logs/${ipAddres[1]}_requests.log`, {encoding: "utf-8"})

const readInterface = readline.createInterface({ 
    input: fs.createReadStream(ACCESS_LOG), 
}); 

readInterface.on('line',(line)=>{
    if(line.match(ipAddres[0])){
        writeStream_1.write(line+"\n")
    }
    if(line.match(ipAddres[1])){
        writeStream_2.write(line+"\n")
    }
})

