const cds = require('@sap/cds')

//exports.getProducts = async (req, res) => {
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

// Anda perfecto
exports.getProduct = async (req, res) => {
    const db = await cds.connect.to("db");

    const { Products } = await cds.entities("Products")
    const aTramitacion = await db.run(SELECT.from(Products))

    return res.status(200).type("application/json").send(aTramitacion)
}