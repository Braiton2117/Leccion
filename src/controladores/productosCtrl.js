import { conmysql } from '../db.js'
export const getProductos =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('select * from tb_consumo')
            res.json({ datos: result, message: "La consulta se realizó con éxito" })
        } catch (error) {
            return res.status(500).json({ datos: null, message: 'somenting goes wrong' })
        }
    }

//función que retorna un cliente c id
export const getProductosxid =
    async (req, res) => {
        try {
            // console.log(req.params.id)
            const [result] = await conmysql.query('select * from tb_consumo where con_id=?', [req.params.id])
            if (result.length <= 0) return res.status(404).json({
                id: 0,
                messge: "consumo no encontrado"
            })
            res.json(result[0])
        } catch (error) {
            return res.status(500).json({ message: 'somenting goes wrong' })
        }

    }
//función que crea un nuevo cliente
export const postProductos = async (req, res) => {
    try {
        const { med_id, mes, anio, consumo, longitudToma,latitudToma } = req.body
        //validar que no se repita la código
        const [fila] = await conmysql.query('Select * from tb_consumo where con_id=?', [med_id])
        if (fila.length > 0) return res.status(404).json({
            id: 0,
            messge: 'el consumo con código: ' + med_id + ' ya está registrado'
        })
        //console.log('consulta:'+fila.length)

        const [rows] = await conmysql.query('INSERT INTO tb_consumo ( med_id, mes, anio, consumo, longitudToma,latitudToma ) VALUES(?,?,?,?,?,?)',
            [med_id, mes, anio, consumo, longitudToma,latitudToma ])
        ///console.log(req.body)
        // res.send("insertar")
        res.send({
            id: rows.insertId,
            messge: 'consumo registrado con éxito :)'
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

export const putProductos = async (req, res) => {
    try {
        // res.send('modificado cliente')
        const { id } = req.params
        const { med_id, mes, anio, consumo, longitudToma,latitudToma } = req.body
        const [result] = await conmysql.query(
            'UPDATE tb_consumo SET med_id=?, mes=?, anio=?, consumo=?, longitudToma=?, latitudToma=? where con_id=?',
            [med_id, mes, anio, consumo, longitudToma,latitudToma, id]
        )
        if (result.affectedRows <= 0) return res.status(404).json({
            messge: 'consumo no encontrado'
        })
        const [rows] = await conmysql.query('Select * from tb_consumo where con_id=?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: 'somenting goes wrong' })
    }


}

export const patchProducto = async (req, res) => {
    try {
        // res.send('modificado cliente')
        const { id } = req.params
        const { med_id, mes, anio, consumo, longitudToma,latitudToma} = req.body
        const [result] = await conmysql.query(
            'UPDATE tb_consumo SET med_id=IFNULL(?,med_id), mes=IFNULL(?,mes), anio=IFNULL(?,anio), consumo=IFNULL(?,consumo), longitudToma=IFNULL(?,longitudToma), latitudToma=IFNULL(?,latitudToma) where con_id=?',
            [ med_id, mes, anio, consumo, longitudToma,latitudToma, id]
        )
        if (result.affectedRows <= 0) return res.status(404).json({
            messge: 'consumo no encontrado'
        })
        const [rows] = await conmysql.query('Select * from tb_consumo where con_id=?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: 'somenting goes wrong' })
    }


}
//funcion que elimina un cliente x id
export const deleteProductos = async (req, res) => {
    try {
        const [result] = await conmysql.query('delete from tb_consumo where con_id=?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            id: 0,
            messge: "No pudo eliminar el consumo"
        })

        res.json({
            id: 1,
            messge: 'Producto Eliminado con éxito :)'
        })
    } catch (error) {
        return res.status(500).json({ message: 'somenting goes wrong' })
    }

}


