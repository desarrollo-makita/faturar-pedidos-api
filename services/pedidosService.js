const sql = require('mssql');
const { connectToDatabase, closeDatabaseConnection } = require('../config/database.js');
const logger = require('../config/logger.js');
const axios = require('axios');
const mock = require('../config/mock.js');


/**
 * Funcion que busca pedidos en mi tabla pedidos con el filtro de exportado = 1 (etapa procesado)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function obtenerPedidos(){
    try {
        logger.info(`Iniciamos la funcion obtenerPedidos`);
        await connectToDatabase('Telecontrol');

        const consulta = `SELECT Correlativo , tipoDocumento , ID_Pedido FROM Telecontrol.dbo.Pedidos where Exportado  = 1`;
        const result = await sql.query(consulta);
        logger.info(`Fin de la funcion obtenerPedidos`);
        
        return result.recordset;
    
    } catch (error) {
        logger.error('Error al obtener pedidos:', error.message);
        throw error;
    }
    finally{
        await closeDatabaseConnection();
    }
}


/**
 * Obtenemos Documento para enviar a telecontrol
 * @param {*} tipoDocuemnto 
 * @param {*} correlativo 
 * @returns 
 */
async function obtenerDataFacturamiento(item){
    try {
        logger.info(`Iniciamos la funcion obtenerDataFacturamiento   ${JSON.stringify(item)}` );
      
        const tipoDocumento = item.tipoDocumento;
        const correlativo = item.Correlativo;
        
        await connectToDatabase('DTEBdQMakita');

        const consulta = `Select distinct g.TipoDocumento, g.Correlativo, g.Folio, g.Fecha, d.Entidad, d.FolioExterno, c.URL, g.Subtotal ,
        g.ImpuestoIngreso, gf.Cantidad, gf.Precio, gf.Item, pd.ID_Item, pd.facturado
        from DTEBdQMakita.dbo.documento d
        left join DTEBdQMakita.dbo.documentodet dt on dt.Empresa=d.empresa and dt.TipoDocumento=d.TipoDocumento and dt.Correlativo=d.Correlativo
        left join DTEBdQMakita.dbo.documentodet gf on gf.Empresa=dt.Empresa and gf.TipoDocumentoOrigen=dt.TipoDocumento and gf.CorrelativoOrigen=dt.Correlativo
        left join DTEBdQMakita.dbo.documento g on g.Empresa=gf.Empresa and g.TipoDocumento=gf.TipoDocumento and g.Correlativo=gf.Correlativo
        left join DTEBdQMakita.dbo.DTEControl c on c.Empresa=g.Empresa and c.TipoDocumento=g.TipoDocumento and c.Correlativo=g.Correlativo
        left join telecontrol.dbo.pedidosDet pd on pd.Folio= d.FolioExterno and pd.Empresa=d.empresa and pd.Referencia=gf.Item
        where d.TipoDocumento= '${tipoDocumento}' and d.folio= '${correlativo}'`;
        
        const result = await sql.query(consulta);
        
        logger.info(`Fin la funcion obtenerDataFacturamiento :` );

        return result.recordset;
    
    } catch (error) {
        logger.error('Error al obtener data para facturamiento', error.message);
        throw error;
    }finally{
        await closeDatabaseConnection();
        
    }
}


/**
 * Facturamos pedido con API de telecontrol
 * @param {*} item 
 * @returns 
 */
async function facturarPedidos(item){
    try {
        
        logger.info(`Iniciamos la funcion facturarPedidos`);
        const fechaFormateada = new Date(item.Fecha).toISOString().split("T")[0];
        
        const data  = 
        {
            posto: item.Entidad, // servicio tecnico
            notaFiscal: item.Correlativo, //número de la factura
            emissao: fechaFormateada, //fecha de emision
            totalNota: item.Subtotal, //monto neto
            totalIpi: item.ImpuestoIngreso, //monto IVA
            url_nf:item.URL, // link de la imagen
              itens: [
                {
                    pedido: item.FolioExterno, //número del pedido (orden)
                    pedidoItem: item.ID_Item, //pedido item
                    peca:item.Item , //referencia del repuesto
                    quantidade:item.Cantidad, //cantidad
                    preco: item.Precio, //precio
                    pecaPedida: item.ID_Item //confirmacion del repuesto que se va a enviar
                }
              ]
            }

        const url = `http://api2.telecontrol.com.br/posvenda-faturamento/faturamentos`;

        logger.info(`URL :  ${url}`);
        
       const response = await axios.post( url, data ,{
            headers: {
                'Content-Type': 'application/json',
                'Access-Application-Key': '3d137dea1d13220aa9a10ee57d69f6b30d247f28',
                'Access-Env': 'HOMOLOGATION',
                'X-Custom-Header': 'value'
            },
        });
        
        return response.data;
        
    
    } catch (error) {
         // Captura el error y maneja la excepción
        
    if (error.response && error.response.data) {
        const mensajeError = error.response.data.mensaje || error.response.data.message|| 'Error desconocido';
        logger.error('Error al obtener data para facturamiento', mensajeError);

        // Lanza una excepción personalizada o devuelve una respuesta con el mensaje de error
        throw new Error(mensajeError);
    } else {
        // Si no hay datos en la respuesta, lanza el error original
        throw error;
    }
        
       
        
    }
}

/**
 * Obtenemos Documento para enviar a telecontrol
 * @param {*} tipoDocuemnto 
 * @param {*} correlativo 
 * @returns 
 */
async function updateFacturacionPedido(folioExterno , idItem){
    try {
        logger.info(`Iniciamos la funcion updateFacturacionPedido` );

        await connectToDatabase('Telecontrol');

        const consulta = `UPDATE PedidosDet SET Facturado = 1 where Folio = ${folioExterno} and ID_Item = ${idItem}`;
        
        await sql.query(consulta);
        
        logger.info(`Fin la funcion updateFacturacionPedido` );
       
       
    
    } catch (error) {
        logger.error('Error al obtener data para facturamiento - updateFacturacionPedido', error.message);
        throw error;
    }finally{
        await closeDatabaseConnection();
        
    }
}






module.exports = {
    obtenerPedidos , obtenerDataFacturamiento , facturarPedidos , updateFacturacionPedido
};
