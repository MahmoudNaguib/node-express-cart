const sharp = require('sharp');
const {v4: uuidv4} = require('uuid');
const fs = require("fs");

class Resize {

    constructor(dimensions) {
        this.dimensions = (dimensions) ? dimensions : {small: '200x150', large: '500x350'};
        this.folder='public/uploads';
    }

     save(buffer) {
        let fileName = uuidv4() + '.png';
        for (const [key, value] of Object.entries(this.dimensions)) {
            const dimensions = value.split("x");
            const path =this.folder+'/' + key;
            let width = (dimensions[0] != undefined) ? dimensions[0] : 100;
            let height = (dimensions[1] != undefined) ? dimensions[1] : width;
            /////////
            fs.mkdir(path, {recursive: true}, (err) => {
                if (err) throw err;
            });
             sharp(buffer)
                .resize({
                    width: parseInt(width),
                    height: parseInt(height),
                    fit: sharp.fit.cover,
                    // fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .png({palette: true, compressionLevel: 8})
                .toFile(path + '/' + fileName);
        }
        return fileName;
    }
}

module.exports = Resize;