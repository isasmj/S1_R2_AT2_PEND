import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";

const categoriaController = new CategoriaController();
const categoriaRoutes = Router();

categoriaRoutes.get('/categorias', categoriaController.selecionarTodos);
categoriaRoutes.post('/categorias', categoriaController.criar);
categoriaRoutes.patch('/categorias', categoriaController.editar);
categoriaRoutes.delete('/categorias', categoriaController.deletar);
categoriaRoutes.get('/categorias/idCategoria', categoriaController.selecionaById)
categoriaRoutes.get('/categorias/nomeCategoria', categoriaController.selecionaByNome)
categoriaRoutes.get('/categorias/categoriaAlfabeto', categoriaController.selecionarAlfabeto)

export default categoriaRoutes;