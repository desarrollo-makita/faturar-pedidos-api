module.exports = {
    request : {
        idPedido : 123456
    },

    response  :  {data: { faturamento: 22388487, pedidos: [ '49091702' ] }},

    responseDocumentoNull  : {
        TipoDocumento: 'NOTA DE VTA INTERNA',
        Correlativo: null,
        Folio: 49090833,
        Fecha: null,
        Entidad: '76279534-5',
        FolioExterno: '49090833',
        URL: 'http://makita2404.acepta.com/v01/E92084A8EF9387811731D48248CB8255A5363095?k=d9c937291241f322e429102cc705b77d'
    },
    pedidos : [
        {
            ID_Pedido: '49090833',
            ID: 256,
            Empresa: 'Makita',
            Folio: 49090833,
            TipoDocumento: 'NOTA DE VTA INTERNA',
            Entidad: '76279534-5',
            SiglaCondicion: 'GAR',
            CodigoCondicion: 'GAR',
            Entrega: null,
            Exportado: null,
            TipoFlete: null,
            ValorAdicionalFabricante: 0,
            ValorDescontoFabricante: 0,
            Transportador: null,
            StatusPedido: 1,
            Remplazo: null,
            StatusDescripcion: 'Aguardando Exportação',
            OS_ID: '66283533',
            InformeTecnico: 'NO ENCIENDE',
            TipoMO: null,
            Modelo: 'DUC122',
            Serie: '1455478',
            TipoGarantia: null,
            NombreCliente: 'Musil Comercial',
            DireccionCliente: 'SANTA ROSA 1508-1510',
            Distribuidor: 'FERREVAL LTDA',
            NumeroDocumento: 1010101,
            Correlativo: 119343
          }
    ],

      pedidosNotFound:{}
};