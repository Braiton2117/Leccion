import { conmysql } from '../db.js'
export const getUsuarios =
    async (req, res) => {
        try {
            const [result] = await conmysql.query('select * from tb_trabajador')
            res.json(result)
        } catch (error) {
            return res.status(500).json({ message: 'somenting goes wrong' })
        }

    }
    
//función que retorna un usuarios c id
export const getUsarioxid =
    async (req, res) => {
        try {
            // console.log(req.params.id)
            const [result] = await conmysql.query('select * from tb_trabajador where tra_cedula=?', [req.params.id])
            if (result.length <= 0) return res.status(404).json({
                id: 0,
                messge: "trabajador no encontrado"
            })
            res.json(result[0])
        } catch (error) {
            return res.status(500).json({ message: 'somenting goes wrong' })
        }

    }
//función que crea un nuevo cliente
export const postUsuarios = async (req, res) => {
    try {
        const { tra_nombres, tra_apellidos, tra_estado} = req.body
          //validar que no se repita la cédula
          const [fila] = await conmysql.query('Select * from tb_trabajador where tra_cedula=?', [tra_nombres])
          
          if (fila.length >0) return res.status(404).json({
            id: 0,
            messge: 'El suario : '+ tra_nombres+' ya está registrado'
        })
         
         // console.log('consulta:'+fila.length)
        const [rows] = await conmysql.query('INSERT INTO tb_trabajador ( tra_nombres, tra_apellidos, tra_estado) VALUES(?,?,?)',
            [tra_nombres, tra_apellidos, tra_estado])
        ///console.log(req.body)
        // res.send("insertar")
        res.send({
            id: rows.insertId,
            messge:'trabajador registrado con éxito :)'
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

export const putUsuarios = async (req, res) => {
    try {
        // res.send('modificado cliente')
        const { id } = req.params
        const { tra_nombres, tra_apellidos, tra_estado} = req.body
        const [result] = await conmysql.query(
            'UPDATE tb_trabajador SET tra_nombres=?, tra_apellidos=?, tra_estado=? where tra_cedula=?',
            [tra_nombres, tra_apellidos, tra_estado, id]
        )
        if (result.affectedRows <= 0) return res.status(404).json({
            messge: 'trabajador no encontrado'
        })
        const [rows] = await conmysql.query('Select * from tb_trabajador where tra_cedula=?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: 'somenting goes wrong' })
    }


}

export const patchUsuarios = async (req, res) => {
    try {
        // res.send('modificado cliente')
        const { id } = req.params
        const { tra_nombres, tra_apellidos, tra_estado} = req.body
        const [result] = await conmysql.query(
            'UPDATE tb_trabajador SET tra_nombres=IFNULL(?,tra_nombres), tra_apellidos=IFNULL(?,tra_apellidos), tra_estado=IFNULL(?,tra_estado) where tra_cedula=?',
            [tra_nombres, tra_apellidos, tra_estado, id]
        )
        if (result.affectedRows <= 0) return res.status(404).json({
            messge: 'Trabajador no encontrado'
        })
        const [rows] = await conmysql.query('Select * from tb_trabajador where tb_trabajador=?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ message: 'somenting goes wrong' })
    }


}
//funcion que elimina un cliente x id
export const deleteUsuarios = async (req, res) => {
    try {
        const [result] = await conmysql.query('delete from tb_trabajador where tb_trabajador=?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            messge: "No pudo eliminar el trabajador"
        })
        res.json({
            id: 1,
            messge:'trabajador Eliminado con éxito :)'
        })
    } catch (error) {
        return res.status(500).json({ message: 'somenting goes wrong' })
    }

} 