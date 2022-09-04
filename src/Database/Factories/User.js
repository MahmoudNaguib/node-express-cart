const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");
const {getRandomInteger} = require('../../Helpers/Helpers');
const Resize = require("../../Libs/Resize");

const factory = {
    generate: () => {
        const name=faker.name.fullName();
        const email=faker.internet.exampleEmail();
        let row={};
        row.type='User'
        row.name=name;
        row.email=email;
        row.mobile="012"+getRandomInteger(10000000,99999999);
        row.password=bcrypt.hashSync(process.env.DEFAULT_PASSWORD, process.env.HASH_SALT);
        row.token=bcrypt.hashSync(email, process.env.HASH_SALT)+bcrypt.hashSync(Math.random().toString(), process.env.HASH_SALT);
        row.is_active=1;
        ///////// image field
        const Resize = require("../../Libs/Resize");
        const img = new Resize({large: '400x300', small: '200x150'});
        row.image = img.save('public/assets/imgs/samples/users/'+getRandomInteger(1,10)+'.png');
        //////////////
        row.is_confirmed=1;
        return row;
    }
}
module.exports = factory;
