const cds = require('@sap/cds')

// http://localhost:4004/apiNode/massProducts
exports.massProducts = async (req, res) => {
    console.log("Batch Products: ", req.body.value);

    try {
        // const tx = await cds.transaction(req);
        const db = await cds.connect.to("db");
        const { Products } = await cds.entities('Products')

        const oData = req.body.value;

        if (oData && oData !== null && oData.length > 0) {
            let iFilasInsertadas = 0;

            for (let i = 0; i < oData.length; i++) {
                iFilasInsertadas += await db.run(INSERT.into(Products).entries(oData[i]));
            }

            // tx.commit();

            return res.status(200).type("application/json").send({
                code: 200,
                message: "Número de Productos ingresados " + iFilasInsertadas
            });
        } else {
            return res.status(400).type("application/json").send({
                code: 400,
                message: 'No se ha recibido ningún Producto'
            })
        }
    } catch (e) {
        console.log("Error", e)
        return res.status(400).type("application/json").send({
            code: 400,
            message: e
        })
    }
}

// http://localhost:4004/apiNode/getProduct
exports.getProducts = async (req, res) => {
    const db = await cds.connect.to("db");

    const { Products } = await cds.entities("Products")
    const aTramitacion = await db.run(SELECT.from(Products))

    return res.status(200).type("application/json").send(aTramitacion)
}

// http://localhost:4004/apiNode/patchProducts/04ca438e-2cc0-48ca-9da8-e7112091425d
exports.patchProducts = async (req, res) => {
    try {
        const db = await cds.connect.to("db");
        const { Products } = await cds.entities('Products')

        const product_ID = req.params.ID;

        const dbProducts = await db.run(SELECT.one(Products).where({ ID:product_ID }))
        
        // comprobar si el ID del producto existe en la BD para poder editarlo
        if (dbProducts && dbProducts !== null) {            
            console.log('valor',req.body);

            await db.run(UPDATE(Products).set(req.body).where({ID:product_ID}));

            return res.status(200).type("application/json").send({
                code: 200,
                message: `El producto ${product_ID} se ha editado con éxito`
            })
        } else {
            return res.status(400).type("application/json").send({
                code: 400,
                message: `El producto ${product_ID} no existe`
            })
        }
    } catch (e) {
        console.log("Error", e)
        return res.status(400).type("application/json").send({
            code: 400,
            message: e
        })
    }

    return res.status(200).type("application/json").send('Prueba')
}