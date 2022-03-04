const db = require('../_helpers/db');

module.exports = {
    getById
};

async function getById(imgUrl, res) {
    imgName = imgUrl.originalUrl.split("/");

    switch (imgName[3]) {
        case 'steelseries':
            res.sendFile(`${__basedir}/resources/img/steelseries.png`);
        case 'razer':
            res.sendFile(`${__basedir}/resources/img/steelseries.png`);
        case 'logitech':
            res.sendFile(`${__basedir}/resources/img/steelseries.png`);
        default:
            res.sendFile(`${__basedir}/resources/img/steelseries.png`);
    }
}

// helper functions

async function getProduct(id) {
    const product = await db.Products.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}

function basicDetails(product) {
    const { id, name, image, description, quantity } = product;
    return { id, name, image, description, quantity };
}