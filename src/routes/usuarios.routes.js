import {Router} from 'express'
import	{getUsuarios,getUsarioxid,postUsuarios,putUsuarios,patchUsuarios,deleteUsuarios} from '../controladores/usuarios.Ctrl.js'

const router=Router()

router.get('/tb_trabajador',getUsuarios) //select
router.get('/tb_trabajador/:id',getUsarioxid) //select
router.post('/tb_trabajador',postUsuarios)
router.put('/tb_trabajador/:id',putUsuarios)
router.patch('/tb_trabajador/:id',patchUsuarios)
router.delete('/tb_trabajador/:id',deleteUsuarios)
export default router