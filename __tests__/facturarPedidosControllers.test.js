const { facturacionPedidos,  } = require('../controllers/facturarPedidosControllers.js');
const { obtenerPedidos ,obtenerDataFacturamiento, facturarPedidos} = require('../services/pedidosService.js');
const mock = require('../config/mock.js');
const axios = require('axios');


jest.mock('../services/pedidosService.js');
jest.mock('axios');
jest.mock('../config/logger');

describe('obtenerPedidos', () => {
  let req;
  let res;

  afterEach(() => {
    jest.clearAllMocks();
});

  it('se realiza el proceso exitoso 200', async () => {
    // Mockear la respuesta de obtenerPedidos
    obtenerPedidos.mockResolvedValueOnce(mock.obtenerPedidos);

    // Mockear la respuesta de obtenerPedidos
    obtenerDataFacturamiento.mockResolvedValueOnce(mock.obtenerDataFacturamiento);
    
    // Simular solicitud y respuesta
    const req = {};
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    // Llamar a la función a probar
    await facturacionPedidos(req, res);
    // Verificar que la función responda con el estado 404 y el mensaje adecuado
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      pedidosFacturados: expect.any(Array),
      pedidosNoFacturados: expect.any(Array),
    }));
    
  });

  it('se realiza el proceso exitoso 200 v2', async () => {
    // Mockear la respuesta de obtenerPedidos
    obtenerPedidos.mockResolvedValueOnce(mock.obtenerPedidosv2);

    // Mockear la respuesta de obtenerPedidos
    obtenerDataFacturamiento.mockResolvedValueOnce(mock.obtenerDataFacturamientov2);
    
    // Simular solicitud y respuesta
    const req = {};
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    // Llamar a la función a probar
    await facturacionPedidos(req, res);
    // Verificar que la función responda con el estado 404 y el mensaje adecuado
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      pedidosFacturados: expect.any(Array),
      pedidosNoFacturados: expect.any(Array),
    }));
    
  });

  it('se realiza el proceso exitoso 200v3', async () => {
    // Mockear la respuesta de obtenerPedidos
    obtenerPedidos.mockResolvedValueOnce(mock.obtenerPedidosv2);

    // Mockear la respuesta de obtenerDataFacturamiento
    obtenerDataFacturamiento.mockResolvedValueOnce(mock.obtenerDataFacturamientov4);
    
    // Mockear la respuesta de facturarPedidos
    facturarPedidos.mockResolvedValueOnce(mock.facturarPedidos);
    
    
    // Simular solicitud y respuesta
    const req = {};
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    // Llamar a la función a probar
    await facturacionPedidos(req, res);
    // Verificar que la función responda con el estado 404 y el mensaje adecuado
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      pedidosFacturados: expect.any(Array),
      pedidosNoFacturados: expect.any(Array),
    }));
    
  });


  it('se realiza el proceso exitoso 200 vacio', async () => {
  // Mockear la respuesta de obtenerPedidos
  obtenerPedidos.mockResolvedValueOnce([]);

  
  // Simular solicitud y respuesta
  const req = {};
  const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  // Llamar a la función a probar
  await facturacionPedidos(req, res);
  // Verificar que la función responda con el estado 404 y el mensaje adecuado
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith( {"mensaje": "No existe data para procesar facturas"});
  
});
    


});
