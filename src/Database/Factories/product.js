const {faker} = require('@faker-js/faker');
const {getRandomInteger} = require('../../Helpers/Helpers');
const Resize = require("../../Libs/Resize");

const factory = {
    generate: (data={}) => {
        let row = {};
        row.category_id = (data.category_id!=undefined)?data.category_id:1;
        row.user_id = (data.user_id!=undefined)?data.user_id:1;
        row.title = faker.lorem.sentence(getRandomInteger(5, 10));
        row.content = faker.lorem.paragraphs(getRandomInteger(2, 5));
        row.price = getRandomInteger(100, 1000);
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