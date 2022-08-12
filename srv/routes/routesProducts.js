const express = require('express');
const controllerProducts = require('../controllers/serviceProducts');
const router = express.Router();

module.exports = router;

//Express.json es el que sustituye a bodyParser
router.post('/massProducts', express.json(), controllerProducts.massProducts);
router.get('/getProducts', controllerProducts.getProducts);
// Cannot PATCH /apiNode/patchProducts
// router.put('/patchProducts', express.json(), controllerProducts.patchProducts);
// Cannot DELETE /apiNode/deleteProduct
// router.delete('deleteProduct', controllerProducts.deleteProducts);