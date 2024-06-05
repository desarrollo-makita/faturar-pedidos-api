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

    obtenerPedidos : [
       
        {
            "Correlativo":120619,
            "tipoDocumento":"NOTA DE VTA INTERNA",
            "ID_Pedido":"49091702"
        
        }
    ],

    obtenerDataFacturamiento : [
        {
          TipoDocumento: 'DTE-GUIA GARANTIA',
          Correlativo: 18967,
          Folio: -18967,
          Fecha: '2024-05-31T00:00:00.000Z',
          Entidad: '76279534-5',
          FolioExterno: '49091702',
          URL: 'http://makita1511.acepta.com/v01/45034EEA35989E3ECDCFE6F6902D54A607DD1D0C?k=e2cc8b8e7ce2b288174258d5597087ad',
          Subtotal: 20274,
          ImpuestoIngreso: 3852,
          Cantidad: 1,
          Precio: 660,
          Item: '126180-5',
          ID_Item: '107249870',
          facturado: true
        },
        {
          TipoDocumento: 'DTE-GUIA GARANTIA',
          Correlativo: 18967,
          Folio: -18967,
          Fecha: '2024-05-31T00:00:00.000Z',
          Entidad: '76279534-5',
          FolioExterno: '49091702',
          URL: 'http://makita1511.acepta.com/v01/45034EEA35989E3ECDCFE6F6902D54A607DD1D0C?k=e2cc8b8e7ce2b288174258d5597087ad',
          Subtotal: 20274,
          ImpuestoIngreso: 3852,
          Cantidad: 1,
          Precio: 19614,
          Item: '650689-0',
          ID_Item: '107249871',
          facturado: true
        }
      ] ,

      obtenerPedidosv2 : [
        {
            Correlativo: 120487,
            tipoDocumento: 'NOTA DE VTA INTERNA',
            ID_Pedido: '49090833'
          },
    ],

    obtenerDataFacturamientov2:[
        {
          TipoDocumento: null,
          Correlativo: null,
          Folio: null,
          Fecha: null,
          Entidad: '76279534-5',
          FolioExterno: '49090833',
          URL: null,
          Subtotal: null,
          ImpuestoIngreso: null,
          Cantidad: null,
          Precio: null,
          Item: null,
          ID_Item: null,
          facturado: null
        }
      ],

      obtenerPedidosv3 : [
       
        {
            "Correlativo":120619,
            "tipoDocumento":"NOTA DE VTA INTERNA",
            "ID_Pedido":"49091702"
        
        }
    ],

    obtenerDataFacturamientov3 : [
        {
          TipoDocumento: 'DTE-GUIA GARANTIA',
          Correlativo: 18967,
          Folio: -18967,
          Fecha: '2024-05-31T00:00:00.000Z',
          Entidad: '76279534-5',
          FolioExterno: '49091702',
          URL: 'http://makita1511.acepta.com/v01/45034EEA35989E3ECDCFE6F6902D54A607DD1D0C?k=e2cc8b8e7ce2b288174258d5597087ad',
          Subtotal: 20274,
          ImpuestoIngreso: 3852,
          Cantidad: 1,
          Precio: 660,
          Item: '126180-5',
          ID_Item: '107249870',
          facturado: false
        },
        {
          TipoDocumento: 'DTE-GUIA GARANTIA',
          Correlativo: 18967,
          Folio: -18967,
          Fecha: '2024-05-31T00:00:00.000Z',
          Entidad: '76279534-5',
          FolioExterno: '49091702',
          URL: 'http://makita1511.acepta.com/v01/45034EEA35989E3ECDCFE6F6902D54A607DD1D0C?k=e2cc8b8e7ce2b288174258d5597087ad',
          Subtotal: 20274,
          ImpuestoIngreso: 3852,
          Cantidad: 1,
          Precio: 19614,
          Item: '650689-0',
          ID_Item: '107249871',
          facturado: false
        }
      ] ,

      obtenerDataFacturamientov4 : [
        {
          TipoDocumento: 'DTE-GUIA GARANTIA',
          Correlativo: 18967,
          Folio: -18967,
          Fecha: '2024-05-31T00:00:00.000Z',
          Entidad: '76279534-5',
          FolioExterno: '49091702',
          URL: 'http://makita1511.acepta.com/v01/45034EEA35989E3ECDCFE6F6902D54A607DD1D0C?k=e2cc8b8e7ce2b288174258d5597087ad',
          Subtotal: 20274,
          ImpuestoIngreso: 3852,
          Cantidad: 1,
          Precio: 660,
          Item: '126180-5',
          ID_Item: '107249870',
          facturado: false
        }
      ] ,

      facturarPedidos : {
        "faturamento": 22388463,
        "pedidos": [
            "49091702",
            "49091702"
         
        ]
    },



    pedidosNotFound:{}
};