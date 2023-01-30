const fs=require("fs")
let dir=fs.readdirSync("../public/sese1")
console.log(dir)
let i=1
dir.forEach(item=>{
	try{
		let fileData=fs.readFileSync("../public/sese1/"+item)
		fs.writeFileSync("../public/sese/"+i+".jpg",fileData)
		i++
	} catch (e) {
		if(e){
			console.log(e)
		}
	}


})