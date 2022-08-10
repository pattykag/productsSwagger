const cds = require("@sap/cds")

module.exports = cds.service.impl(async function () {
    //module.exports = cds.service.impl(async(srv) => {
    const { Products, Suppliers, Categories } = this.entities;

    this.before(['CREATE', 'UPDATE'], Products, async (req) => { // validar categoria y supplier
        const tx = cds.transaction(req);

        // Primero comprobamos que el campo "productName" no esté vacío, exista y no sea igual a null
        if (req.data.productName && req.data.productName !== null && req.data.productName.trim() !== '') {
            // Con trim, resolvemos si nos envían espacios vacios adelante y detrás
            req.data.productName = req.data.productName.trim();
            const { productName } = req.data;

            // Verificar si existe en la BD otro producto con el mismo nombre
            let nameExist;
            try {
                nameExist = await tx.run(SELECT.one(Products).where({ productName }));
            } catch (error) {
                req.reject(409, 'Error en la consulta');
            }

            if (nameExist) { // El nombre del producto ya existe en la DB
                const [ID] = req.params; // Guardar el ID que viene por URL en el PATCH

                if (ID === undefined || nameExist.ID !== ID || ID === null) { // Verificar si el URL tiene el mismo ID y nombre que alguno almacenado
                    // 'POST'
                    console.log(`Ya existe un producto con ese nombre`);
                    req.error(405, '2 productos no pueden tener el mismo nombre')
                } else { // El nombre existe pero corresponde al registro que está siendo editado
                    // 'PATCH'
                    console.log(`El producto "${productName}" fue editado con éxito`);
                }
            } else { // El nombre no existe en la DB
                console.log(`El producto "${productName}" fue guardado con éxito`);
            }
        } else {
            console.log('No tiene nombre');
        }
    });

    this.on('batchProducts', async (req) => {
        console.log("Batch Products: ", req.data.value)

        try {
            const tx = await cds.transaction(req);
            const { Products } = this.entities;

            const oData = req.data.value;

            if (oData && oData !== null && oData.length > 0) {
                let iFilasInsertadas = 0;
                
                for (let i = 0; i < oData.length; i++) {
                    iFilasInsertadas += await tx.run(INSERT.into(Products).entries(oData[i]));
                }

                // oData.forEach(async element => {
                //     //console.log("elemento:", JSON.stringify(element))
                //     await tx.run(INSERT.into(Products).entries(element));
                //     iFilasInsertadas = iFilasInsertadas + 1;  //no funciona esta linea
                // });
                
                const oMessage = {
                    code: 201,
                    message: "Número de Productos ingresados " + iFilasInsertadas
                }
                return oMessage;
            } else {
                req.reject(400, "No se ha recibido ningún Producto")
            }
        } catch (e) {
            console.log("Error", e)
            req.reject(400, e)
        }
    })

})