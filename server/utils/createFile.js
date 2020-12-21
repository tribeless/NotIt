const {createWriteStream} = require("fs");
const path = require("path");
const Logger = require('./logger');

const createFile = (createReadStream,newFileName,uploadPath)=>{

     new Promise((resolve,reject)=>{
        try{
        return resolve(createReadStream().pipe(createWriteStream(path.join(uploadPath,newFileName))))
        }
        catch(e){
            Logger.log(
                'error',
                'Error', {
                    message: e.message
                }
            );
            reject(e);
        }
    })
}

module.exports = createFile;