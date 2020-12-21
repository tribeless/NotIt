const fs = require("fs");
const Logger = require('./logger');

const deleteDir = dir =>{
    try{
        if(fs.existsSync(dir)) {
            fs.rmdirSync(dir);
        }
    }
    catch(e){
        const customerMessage = "Could not delete the folder,please try again";
        Logger.log(
            'error',
            'Error', {
                message: e.message
            }
        )
        throw new Error(customerMessage);
    }

}
module.exports = deleteDir;