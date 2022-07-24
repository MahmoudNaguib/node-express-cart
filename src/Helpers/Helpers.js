const helpers = {
    getDate: (date = '') => {
        if (date) {
            let field = new Date(date);
            return field.toJSON().slice(0, 10) + ' ' + field.toLocaleTimeString();
        } else {
            new Date().toJSON().slice(0, 10) + ' ' + new Date().toLocaleTimeString();
        }
    },
    getRandomInteger: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomString: (length) => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
}
module.exports = helpers;