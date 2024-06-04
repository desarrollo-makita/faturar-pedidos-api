const express = require('express');
const router = express.Router();
const { facturacionPedidos } = require('../controllers/facturarPedidosControllers');

router.get('/facturar-pedidos', facturacionPedidos);

module.exports = router;
