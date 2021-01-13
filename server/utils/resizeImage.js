const sharp = require("sharp");
const shortId = require("shortid");
const path = require("path");
const createResizeFile = require("./createResizeFile");
const Logger = require("./logger");

const resizeImage = async(image,outputDir)=>{
    const newFileName = `${shortId.generate()}.png`;
    await sharp(image).resize(50,40,{
    await sharp(image).resize(50,60,{
        fit:"inside"
    }).toBuffer().then((data)=>{
        const resizedImage = path.join(outputDir,newFileName);
        createResizeFile(resizedImage,data);
    })
    .catch(e=>{
        const customerMessage = "Could not resize your image";
        Logger.log(
            'error',
            'Error', {
                message: e.message
            }
        )
        throw new Error(customerMessage);
    })
    return newFileName;
}

module.exports = resizeImage;