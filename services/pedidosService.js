const sql = require("mssql");
const {
  connectToDatabase,
  closeDatabaseConnection,
} = require("../config/database.js");
const logger = require("../config/logger.js");
const axios = require("axios");
const mock = require("../config/mock.js");

/**
 * Funcion que busca pedidos en mi tabla pedidos con el filtro de exportado = 1 (etapa procesado)
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function obtenerPedidos() {
  try {
    logger.info(`Iniciamos la funcion obtenerPedidos`);
    await connectToDatabase("Telecontrol");

    const consulta = `SELECT Correlativo , tipoDocumento , ID_Pedido FROM Telecontrol.dbo.Pedidos where Exportado  = 1`;
    const result = await sql.query(consulta);
    logger.info(`Fin de la funcion obtenerPedidos`);

    return result.recordset;
  } catch (error) {
    logger.error("Error al obtener pedidos:", error.message);
    throw error;
  } finally {
    await closeDatabaseConnection();
  }
}

/**
 * Obtenemos Documento para enviar a telecontrol
 * @param {*} tipoDocuemnto
 * @param {*} correlativo
 * @returns
 */
async function obtenerDataFacturamiento(item) {
  try {
    logger.info(
      `Iniciamos la funcion obtenerDataFacturamiento   ${JSON.stringify(item)}`
    );

    const tipoDocumento = item.tipoDocumento;
    const correlativo = item.Correlativo;

    await connectToDatabase("BdQMakita");

    const consulta = `Select distinct g.TipoDocumento, g.Correlativo, g.Folio, g.Fecha, d.Entidad, d.FolioExterno, c.URL, g.Subtotal ,
        g.ImpuestoIngreso, gf.Cantidad, gf.Precio, gf.Item, pd.ID_Item, pd.facturado
        from BdQMakita.dbo.documento d
        left join BdQMakita.dbo.documentodet dt on dt.Empresa=d.empresa and dt.TipoDocumento=d.TipoDocumento and dt.Correlativo=d.Correlativo
        left join BdQMakita.dbo.documentodet gf on gf.Empresa=dt.Empresa and gf.TipoDocumentoOrigen=dt.TipoDocumento and gf.CorrelativoOrigen=dt.Correlativo
        left join BdQMakita.dbo.documento g on g.Empresa=gf.Empresa and g.TipoDocumento=gf.TipoDocumento and g.Correlativo=gf.Correlativo
        left join BdQMakita.dbo.DTEControl c on c.Empresa=g.Empresa and c.TipoDocumento=g.TipoDocumento and c.Correlativo=g.Correlativo
        left join telecontrol.dbo.pedidosDet pd on pd.Folio= d.FolioExterno and pd.Empresa=d.empresa and pd.Referencia=gf.Item
        where d.TipoDocumento= '${tipoDocumento}' and d.folio= '${correlativo}'`;

    console.log("!consulrA", consulta);
    const result = await sql.query(consulta);

    logger.info(`Fin la funcion obtenerDataFacturamiento :`);

    return result.recordset;
  } catch (error) {
    logger.error("Error al obtener data para facturamiento", error.message);
    throw error;
  } finally {
    await closeDatabaseConnection();
  }
}

/**
 * Facturamos pedido con API de telecontrol
 * @param {*} item
 * @returns
 */
async function facturarPedidos(item) {
  try {
    logger.info(`Iniciamos la función facturarPedidos`);
    const fechaFormateada = new Date(item.Fecha).toISOString().split("T")[0];

    const data = {
      posto: item.Entidad, // servicio técnico
      notaFiscal: item.Correlativo, // número de la factura
      emissao: fechaFormateada, // fecha de emisión
      totalNota: item.Subtotal, // monto neto
      totalIpi: item.ImpuestoIngreso, // monto IVA
      urlNf: item.URL, // link de la imagen
      itens: [
        {
          pedido: item.FolioExterno, // número del pedido (orden)
          pedidoItem: item.ID_Item, // pedido item
          peca: item.Item, // referencia del repuesto
          quantidade: item.Cantidad, // cantidad
          preco: item.Precio, // precio
          pecaPedida: item.Item, // confirmación del repuesto que se va a enviar
        },
      ],
    };

    const url = `http://api2.telecontrol.com.br/posvenda-faturamento/faturamentos`;

    logger.info(`URL :  ${url}`);

    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Application-Key": "588b56a33c722da5e49170a311e872d9ee967291",
        "Access-Env": "PRODUCTION",
        "X-Custom-Header": "value",
      },
    });

    // Verifica si la respuesta no fue un 200
    if (response.status !== 200 && response.status !== 201) {
      logger.warn(
        `Respuesta no exitosa para el item ${item.FolioExterno}: ${response.status} - ${response.statusText}`
      );
      // Puedes retornar algo específico aquí si deseas seguir con el flujo
      return {
        success: false,
        message: `Error en la facturación para el item ${item.FolioExterno}`,
        data: response.data,
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // Captura el error y maneja la excepción
    let mensajeError;

    if (error.response && error.response.data) {
      mensajeError =
        error.response.data.mensaje ||
        error.response.data.message ||
        "Error desconocido";
      logger.error("Error al obtener data para facturamiento", mensajeError);
    } else {
      mensajeError = "Error en la conexión a la API";
      logger.error("Error en la conexión a la API", error.message);
    }

    // Devuelve un objeto con el estado de error
    return {
      success: false,
      message: mensajeError,
    };
  }
}

/**
 * Obtenemos Documento para enviar a telecontrol
 * @param {*} tipoDocuemnto
 * @param {*} correlativo
 * @returns
 */
async function updateFacturacionPedido(folioExterno, idItem) {
  try {
    logger.info(`Iniciamos la funcion updateFacturacionPedido`);

    await connectToDatabase("Telecontrol");

    const consulta = `UPDATE PedidosDet SET Facturado = 1 where Folio = ${folioExterno} and ID_Item = ${idItem}`;

    await sql.query(consulta);

    logger.info(`Fin la funcion updateFacturacionPedido`);
  } catch (error) {
    logger.error(
      "Error al obtener data para facturamiento - updateFacturacionPedido",
      error.message
    );
    throw error;
  } finally {
    await closeDatabaseConnection();
  }
}

module.exports = {
  obtenerPedidos,
  obtenerDataFacturamiento,
  facturarPedidos,
  updateFacturacionPedido,
};
