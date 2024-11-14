import {Router} from 'express'
import {getClientes,
    getclientesxid,
    postCliente,
    putCliente,
    patchCliente,
    deleteCliente} from '../controladores/clientesCtrl.js'
const router=Router()
// armar nuestras rutas

router.get('/tb_cliente',getClientes) //select
router.get('/tb_cliente/:id',getclientesxid)//select x id
router.post('/tb_cliente',postCliente) //insert
router.put('/tb_cliente/:id',putCliente)//update
router.patch('/tb_cliente/:id',patchCliente)//update
router.delete('/tb_cliente/:id',deleteCliente)//delete

export default router