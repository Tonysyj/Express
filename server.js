import express from "express"
import minimist from "minimist"
import ip from 'ip'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from "node:url"

const app = express()
let PORT = 9090
let dirPath = 'public'
const argv = process.argv.slice(2)
const args = minimist(argv)
const __filename = fileURLToPath(import.meta.url)
console.log(__filename);
const __dirname = path.dirname(__filename) //dirname()的作用是找某一个文件的所在位置的文件夹
console.log(__dirname);

const address = ip.address()
args['p'] ? PORT = args['p'] : null
// PORT = args['p'] ? args['p'] : PORT // 这种写法和上面的写法是同一个意思
args['dir'] ? dirPath = args['dir'] : null

app.use(cors({origin: '*'}))
/**
 * ‘*’的意思是完全开放，即谁都可以访问我，我也可以给任何人所有里面信息
 * 因此这么写是很不安全的，这里应该是写上特定的域名
*/
app.use(express.static(path.join(__dirname, dirPath)))
/**
 * __dirname是当前这个文件位置的绝对定位的地址
 * 但是__dirname不支持我们正在用的ES的语言，因此我们需要自己const一个__dirname
 */
app.get('./*', function(req, res){
  res.sendFile(path.join(__dirname, dirPath, 'index.html'))
})

app.listen(PORT, address, () => {
  console.log(`http://127.0.0.1:${PORT}`); // 由于制定了address，所以此时这条不能被使用
  console.log(`http://${address}:${PORT}`);
})