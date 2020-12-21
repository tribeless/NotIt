const fs = require("fs");
const Logger = require("./logger");

const deleteFile = (filePath)=>{

    return new Promise((resolve,reject)=>{

       try{
            if(fs.statSync(filePath)){
                resolve(fs.unlinkSync(filePath));
            }
        }
        catch(e){
            Logger.log(
                'error',
                'Error', {
                    message: e.message
                }
            )
        reject("Unable to delete your file");
        }
    })
}

module.exports = deleteFile;