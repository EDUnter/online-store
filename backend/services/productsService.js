const db = require('../_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const products = await db.Products.findAll();

    return products.map(x => basicDetails(x));
}

async function getById(id) {
    const product = await getProduct(id);

    return basicDetails(product);
}

async function create(params) {
    
    const product = new db.Products(params);

    // save product
    await product.save();

    return basicDetails(product);
}

async function update(id, params) {
    const product = await getProduct(id);

    // copy params to product and save
    Object.assign(product, params);

    await product.save();

    return basicDetails(product);
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

// helper functions

async function getProduct(id) {
    const product = await db.Products.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}

function basicDetails(product) {
    const { id, name, image, description, quantity, sold } = product;
    return { id, name, image, description, quantity, sold };
}