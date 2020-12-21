const fs = require('fs');
const Logger = require("./logger");

const checkFileSize = async(fileToCheck) => {
    let fileSizeInMegabytes ;
    try{
        await fs.stat(fileToCheck,(err,stats)=>{
            if(err) throw err;
            const fileSizeInBytes = stats.size;
            fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
        });
    }
    catch(e){
        const customerMessage = "Sorry, we were unable to check your file size";
        Logger.log(
            'error',
            'Error', {
                message: e.message
            }
        )
        throw new Error(customerMessage);
    }
    return fileSizeInMegabytes;
};

module.exports = checkFileSize;