#!/home/barbymak/.nvm/versions/node/v16.17.0/bin/node
import fsp from 'fs/promises'
import fs from "fs"
import path from 'path'
import readline from 'readline'
import inquire from 'inquirer'

const ipAddres = ['89.123.1.41','34.48.240.111']

const writeStream_1 = fs.createWriteStream(`./logs/${ipAddres[0]}_requests.log`, {encoding: "utf-8"})
const writeStream_2 = fs.createWriteStream(`./logs/${ipAddres[1]}_requests.log`, {encoding: "utf-8"})

fsp
    .readdir(path.join(process.cwd()))
    .then(async (indir)=>{      
        const list = [] 
        for (const item of indir){
            const src = await fsp.stat(item)
            if(src.isFile()) list.push(item)
        }
        return list
    })
    .then((choices)=>{

        return inquire.prompt({
            name: 'fileName',
            type: 'list',
            message: 'Был выбран файл',
            choices,
        });
    })
    .then(({fileName})=> {
        const rl = readline.createInterface({
            input:fs.createReadStream(fileName)
        })
        rl.on('line',function(line){
            if(line.match(ipAddres[0])){
                writeStream_1.write(line+"\n")
            }
            if(line.match(ipAddres[1])){
                writeStream_2.write(line+"\n")
            }
        })
        console.log("Файлы созданы")
    })
    
  

