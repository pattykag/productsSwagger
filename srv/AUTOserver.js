const cds = require('@sap/cds');

const cdsSwagger = require('cds-swagger-ui-express');

cds.on('bootstrap', app => {

    app.use(cdsSwagger({
        "basePath": "/swagger",
        "diagram": false
    }));

});

module.exports = cds.server;

// app.use(cdsSwagger({
//     "basePath": "/swagger",
//     "diagram": false
// }));