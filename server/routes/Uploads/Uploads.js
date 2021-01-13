const {ApolloError} = require('apollo-server-express');
const path = require("path");
const shortId = require("shortid")
const {Users} = require('../../dataSources/models');
const resizeImage = require("../../utils/resizeImage");
const checkFileSize = require("../../utils/checkFileSize");
const makeUploadsDir = require("../../utils/createFolder");
const createFile = require("../../utils/createFile");
const deleteFile = require("../../utils/deleteFile");
const Logger = require("../../utils/logger");

require("dotenv").config();
const configValues = process.env;

class UploadsApi {

    async uploadUserFile(user,args){
        if(!user){
            throw new ApolloError("Please signIn",401);
        }

        const {file} = args;
        try{
            const {createReadStream,filename} =  await file;
            const { name, ext } = await path.parse(filename.toString());

            //check file type(png,jpg)
            const slicedExt = ext.slice(1, 4);
            if(!configValues.STATIC_FILE_TYPE_ALLOWED.includes(slicedExt)){
                throw new Error("Image type not allowed,please upload only jpg and png files");
            }

            const response = await Users.findById({_id:user.id});

            const newFileName = `${shortId.generate()}-${name}${ext}`;
            if(response){
            const userUploadsDir = `${process.cwd()}/uploads/${response._id}`;
            makeUploadsDir(userUploadsDir);
            const uploadPath = process.cwd() + "/uploads/" + response._id;
            const filePath =`/${response._id}/${newFileName}` ;
            await createFile(
                createReadStream,
                newFileName,
                uploadPath
            )
            
            //check file size being uploaded to be 2||<
            if(await checkFileSize(`${uploadPath}/${newFileName}`)>configValues.STATIC_FILE_MAX_SIZE){
                deleteFile(`${uploadPath}/${newFileName}`);
                throw new Error("Please upload a file less than 2mb");
            }

            //upload image to user db
                let fileUrl = "";
            
                //lets resize the image the update the path in the db and return the url to client
                const outputPath = `${process.cwd()}/uploads/${response._id}`;
                const imageToResize = `${process.cwd()}/uploads${filePath}`;

                const result = await resizeImage(imageToResize,outputPath);
                fileUrl = `${configValues.STATIC_FILE_BASE_URL}/${response._id}/${result}`;
                result && await Users.updateOne({_id:user.id},{filePath:fileUrl});

                }
                            
                return {
                    status: true,
                    message: 'Successfully uploaded your image'
                    }
            }
            catch(e){
            const customerMessage = "Sorry, we were unable to upload your file" ;
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
            await Users.update({_id:user.id},{filePath});

            }
            return {
                    status: true,
                    message: 'Successfully uploaded your image'

                }
        }
        catch(e){
        const customerMessage = "Sorry, we were unable to upload your file" ;
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

    async retrieveAvatar(user){
        if(!user){
            throw new ApolloError("Please signIn",401);
        }
        try{
                let fileUrl = "";
                const response = await Users.findById({_id:user.id});
                if(response){
                    //lets resize the image the update the path in the db and return the url to client
                    const outputPath = `${process.cwd()}/uploads/${response._id}`;
                    const imageToResize = `${process.cwd()}/uploads${response.filePath}`;

                    const result = await resizeImage(imageToResize,outputPath);
                    fileUrl = `${configValues.STATIC_FILE_BASE_URL}/${response._id}/${result}`;
                    result && await Users.update({_id:user.id},{filePath:fileUrl});

                };
                return {
                    status:true,
                    fileUrl
                }
                
            }
            catch(e){
                const customerMessage = "Sorry, we were unable to fetch your file";
                Logger.log(
                    'error',
                    'Error', {
                        message: e.message
                    }
                )
                throw new Error(customerMessage);
            }
    }
}

module.exports = UploadsApi;