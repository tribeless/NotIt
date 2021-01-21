const sharp = require("sharp");
const Jimp = require('jimp');
const shortId = require("shortid");
const path = require("path");
const createResizeFile = require("./createResizeFile");
const Logger = require("./logger");

const resizeImage = async(image,outputDir)=>{
    const newFileName = `${shortId.generate()}.png`;
    //Could not use sharp to resize image because of Error: " Input file contains unsupported image format"
    // while resizing
    // see sharp issues https://github.com/lovell/sharp/issues/1255

    // await sharp(image).resize(50,40,{
    //     fit:"inside"
    // }).toBuffer().then((data)=>{
    //     const resizedImage = path.join(outputDir,newFileName);
    //     createResizeFile(resizedImage,data);
    // })
    // .catch(e=>{
    //     const customerMessage = "Could not resize your image";
    //     Logger.log(
    //         'error',
    //         'Error', {
    //             message: e.message
    //         }
    //     )
    //     throw new Error(e);
    // });

      try {
          // Read the image.
          const newImage = await Jimp.read(image);
          // contain the image to the provided width and height.
          // we will get the center part of the image which is the most significant
          // eslint-disable-next-line no-bitwise
          await newImage.contain(50, 40, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
          // Save and overwrite the image
          const resizedImage = path.join(outputDir, newFileName);
          await newImage.writeAsync(resizedImage);
          return newFileName;
      } catch (e) {
            const customerMessage = "Could not resize your image";
            Logger.log(
                'error',
                'Error', {
                    message: e.message
                }
            )
            throw new Error(customerMessage);
      }
    
}

module.exports = resizeImage;