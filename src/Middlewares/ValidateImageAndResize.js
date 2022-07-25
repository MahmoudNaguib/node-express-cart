const Resize = require("../Libs/Resize");
module.exports = (fieldName, isRequired, maxSize, imageSizes) => async (req, res, next) => {
    let errors = {};
    if (req.files[fieldName] == undefined) {
        delete req.body[fieldName];
        errors[fieldName] = `${fieldName} field is required`;
        if (isRequired) {
            return res.status(422).send({message: 'Validation errors', errors: errors});
        }
        next();
    } else {
        let fileAttach = req.files[fieldName][0];
        if (fileAttach.maxSize > maxSize) {
            errors[fieldName] = `${fieldName} field max file maxSize is ${maxSize / 1000000} MB`;
            return res.status(422).send({message: 'Validation errors', errors: errors});
        } else {
            let imageExtensions=['image/png','image/webp','image/svg+xml','image/jpeg','image/jpg'];
            if(!imageExtensions.includes(fileAttach.mimetype)){
                errors[fieldName] = `${fieldName} field has invalid image type`;
                return res.status(422).send({message: 'Validation errors', errors: errors});
            }
            const image = new Resize(imageSizes);
            const fileName = image.save(fileAttach.buffer);
            req.body.image = fileName;
            next();
        }
    }
}