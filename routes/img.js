var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
const child_process = require("child_process")

/* GET users listing. */
router.post('/', function (req, res, next) {
    let {data, color} = req.body
    let time=Date.now()
    let imgName = time + ".png"
    let imgPath = path.join(process.cwd(), "imgProcessing/img/", imgName)
    let dataBuffer = Buffer.from(data, "base64")
    // console.log(imgPath)
    fs.writeFile(imgPath, dataBuffer, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(`${imgPath}写入成功`)
            // console.log(`python ${path.join(process.cwd(),"/imgProcessing/changeColor.py")} ${imgPath} ${color}`)
            let imgProcessing = child_process.exec(
                `python ${path.join(process.cwd(),"/imgProcessing/changeColor.py")} ${imgName} ${color}`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(stdout)
                        console.log(stderr)
                        let imgName = time + `_${color}.png`
                        let imgPath = path.join(process.cwd(), "imgProcessing/img/", imgName)
                        console.log(imgPath)
                        fs.readFile(imgPath,(err,data)=>{
                            if(err){
                                console.log("读取失败")
                                console.log(err)
                            } else {
                                console.log("读取成功")
                                // console.log(data.toString("base64"))
                                res.send({data: data.toString("base64")})
                            }
                        })
                    }
                })
        }
    })
    // python ${path.join(process.cwd(),"/imgProcessing/changeColor.py")} ${imgPath} ${color}


});

module.exports = router;
