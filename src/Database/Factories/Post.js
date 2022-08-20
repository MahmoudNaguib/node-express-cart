const {faker} = require('@faker-js/faker');
const {getRandomInteger} = require('../../Helpers/Helpers');
const Resize = require("../../Libs/Resize");
const knex = require('../../Database/knex');
const factory = {
    generate: async (data={}) => {
        let section = await knex('sections').orderByRaw('RAND ()').first();
        let row = {};
        row.section_id = (data.section_id!=undefined)?data.section_id:section.id;
        row.user_id = (data.user_id!=undefined)?data.user_id:1;
        row.title = faker.lorem.sentence(getRandomInteger(5, 20));
        row.content = faker.lorem.paragraphs(getRandomInteger(2, 5));
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