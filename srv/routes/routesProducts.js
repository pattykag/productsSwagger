const express = require('express');
const controllerProducts = require('../controllers/serviceProducts');
const router = express.Router();

module.exports = router;

//Express.json es el que sustituye a bodyParser
router.post('/massProducts', express.json(), controllerProducts.massProducts);
router.get('/getProducts', controllerProducts.getProducts);
router.patch('/patchProducts/:ID', express.json(), controllerProducts.patchProducts);
router.delete('/deleteProducts/:ID', express.json(), controllerProducts.deleteProducts);