var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
let i=1
router.post('/', function (req, res, next) {
	let {ip,location,time}=req.body
	console.log(req.body)
	let data=`${i} ip：${ip}，位置：${location}，时间：${time}\n`.toString()
	fs.writeFile(path.join(process.cwd(),"./visitorInfo.txt"),data,{flag:"a"},(err)=>{
		if(err){
			console.log(err)
		}
	})
	res.send({statue:"success"})
	i++
})

module.exports = router;