const {faker} = require('@faker-js/faker');
const {getRandomInteger, getRandomString} = require('../../Helpers/Helpers');
const Resize = require("../../Libs/Resize");

const factory = {
    generate:  (data = {}) => {
        let row = {};
        row.user_id = (data.user_id!=undefined)?data.user_id:1;
        row.title = (data.title != undefined) ? data.title : 'Section ' + getRandomInteger(1, 10000);
        row.is_active = 1;
        ///////// image field
        const Resize = require("../../Libs/Resize");
        const image = new Resize({large: '400x300', small: '200x150'});
        let fileName =  image.save('public/assets/imgs/samples/posts/'+getRandomInteger(1,20)+'.png');
        row.image = fileName;
        //////////////
        return row;
    }
}
module.exports = factory;