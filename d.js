import http from "http";
import fs from "fs";
import path from "path";
import { Transform } from "stream";


const host = 'localhost';
const port = 3000;


/*const server = http.createServer((request, response) => {
    const filePath = path.join(process.cwd(), './123.log')
    const readStream = fs.createReadStream(filePath, {encoding: 'utf-8', highWaterMark: 64})

    readStream.on('data', (chunk) => {
        response.write(chunk)
    })

    readStream.on('end', () => {
        response.end()
    })
})*/

const fsp = fs.promises;

const links = (arr, currentUrl) => {
  if (currentUrl.endsWith("/")) currentUrl = currentUrl.substring(0, currentUrl.length - 1);
  let li = "";
  for (const item of arr) {
    li += `<li><a href="${currentUrl}/${item}">${item}</a></li>`;
  }
  return li;
};

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    const url = request.url.split("?")[0];
    const currentPath = path.join(process.cwd(), url);

    fs.stat(currentPath, (err, stats) => {
      if (!err) {
        if (stats.isFile(currentPath)) {
          const readStream = fs.createReadStream(currentPath, "utf-8");
          readStream.pipe(response);
        } else {
          fsp
            .readdir(currentPath)
            .then((files) => {
              if (url !== "/") files.unshift("..");
              return files;
            })
            .then((data) => {
              const filePath = path.join(process.cwd(), "./index.html");
              const readStream = fs.createReadStream(filePath);
              const trans = new Transform({
                transform(chunk, encoding, callback) {
                  const li = links(data, url);
                  this.push(chunk.toString().replace("#filelinks#", li));

                  callback();
                },
              });

              readStream.pipe(trans).pipe(response);
            });
        }
      } else {
        response.end("Путь не существует");
      }
    });
  }
});

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`))