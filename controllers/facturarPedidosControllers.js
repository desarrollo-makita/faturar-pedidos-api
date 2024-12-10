const {
  obtenerPedidos,
  obtenerDataFacturamiento,
  facturarPedidos,
  updateFacturacionPedido,
} = require("../services/pedidosService.js");
const mock = require("../config/mock.js");
const logger = require("../config/logger.js");
const axios = require("axios");

/**
 * API que factura pedidos en telecontrol
 * @param {*} req
 * @param {*} res
 */
async function facturacionPedidos(req, res) {
  try {
    logger.info(`Iniciamos la funcion facturacionPedidos`);
    const pedidos = await obtenerPedidos();

    logger.info(`Response obtenerPedidos   ${JSON.stringify(pedidos)}`);

    const pedidosNoFacturados = [];
    const pedidosFacturados = [];
    let responseFacturamiento;

    if (!pedidos || pedidos.length === 0) {
      return res
        .status(200)
        .json({ mensaje: "No existe data para procesar facturas" });
    }

    for (item of pedidos) {
      const extraerDataFacturamiento = await obtenerDataFacturamiento(item);

      logger.info(
        `Response extraerDataFacturamiento   ${JSON.stringify(
          extraerDataFacturamiento
        )}`
      );
      for (dataFactura of extraerDataFacturamiento) {
        if (!dataFactura.Folio && !dataFactura.URL) {
          logger.info(
            `Pedido ${dataFactura.FolioExterno}  sin Folio generado `
          );
          pedidosNoFacturados.push(dataFactura.FolioExterno);
        } else if (!dataFactura.facturado) {
          responseFacturamiento = await facturarPedidos(dataFactura);
          logger.info(
            `Response responseFacturamiento   ${JSON.stringify(
              responseFacturamiento
            )}`
          );
          if (responseFacturamiento.data.faturamento) {
            logger.info(
              `Pedido ${JSON.stringify(
                dataFactura.FolioExterno
              )} facturado correctamente , facturamiento telecontrol ${JSON.stringify(
                responseFacturamiento.data.faturamento
              )}`
            );
            pedidosFacturados.push(dataFactura.FolioExterno);
            await updateFacturacionPedido(
              dataFactura.FolioExterno,
              dataFactura.ID_Item
            );
          }
        } else {
          logger.info(
            `Pedido ${dataFactura.FolioExterno} con estado Facturado true`
          );
          pedidosNoFacturados.push(dataFactura.FolioExterno);
        }
      }
    }

    //

    res
      .status(200)
      .json({
        pedidosFacturados: pedidosFacturados,
        pedidosNoFacturados: pedidosNoFacturados,
      });
  } catch (error) {
    logger.error(`Error al procesar data de facturamiento :  ${error.message}`);

    if (error.response && error.response.data) {
      const mensajeError =
        error.response.data.mensaje ||
        error.response.data.error ||
        "Error desconocido";
      res.status(error.response.status || 500).json({ error: mensajeError });
    } else {
      res.status(500).json({ error: `Error en el servidor: ${error.message}` });
    }
  }
}

module.exports = {
  facturacionPedidos,
};
