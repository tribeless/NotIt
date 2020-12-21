const fs = require("fs");
const Logger = require("./logger");

const createResizeFile = async(filePath,content)=>{
    try{
        await fs.writeFile(filePath,content,(err)=>{
            if(err) throw new Error(err);
        })
    }
    catch(e){
        const customerMessage = "Could not write your image";
        Logger.log(
            'error',
            'Error', {
                message: e.message
            }
        )
        throw new Error(customerMessage);
    }
}

module.exports = createResizeFile;