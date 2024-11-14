import {Router} from 'express'
import multer from 'multer';
import {getProductos,getProductosxid,postProductos,putProductos,patchProducto,deleteProductos} from '../controladores/productosCtrl.js'

//configurar multer para almacenar las imagenes
const storage=multer.diskStorage({
destination:(req,file,cb)=>{
    cb(null,'uploads');//carpeta donde se guardan las imagenes
},
filename:(req,file,cb)=>{
    cb(null, `${Date.now()}-${file.originalname}`);
}
});

const upload=multer({storage});
const router=Router()
//rutas
router.get('/tb_consumo',getProductos)
router.get('/tb_consumo/:id',getProductosxid)
router.post('/tb_consumo',postProductos)
router.put('/tb_consumo/:id',putProductos)
router.patch('/tb_consumo/:id',patchProducto)
router.delete('/tb_consumo/:id',deleteProductos)

//exportamos las rutas
export default router