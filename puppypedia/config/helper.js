

const path=require('path');
const uuid = require('uuid').v4;

module.exports={
    
fileUpload: (file,folder) => {
    if (file) {
        var extension = path.extname(file.name);
        var filename = uuid() + extension;
        console.log(folder,'............folder');
        file.mv(process.cwd() + `/public/assets/images/${folder}/` + filename, function (err) {
            if (err)
                return err;
        });
       
    }               
    return filename;
},
}