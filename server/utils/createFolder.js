const fs = require('fs');
const Logger = require('./logger');

const makeUploadsDir = (uploadsDir)=>{
    try{
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }
    }
    catch(e){
        const customerMessage = "Sorry, we were unable to create the folder" ;
        Logger.log(
            'error',
            'Error',
            {
                message:e.message
            }
        )
        throw new Error(customerMessage);
    }
    
}

module.exports = makeUploadsDir;