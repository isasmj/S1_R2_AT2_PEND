import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";

const produtoController = new ProdutoController();
const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.selecionarTodos);
produtoRoutes.post('/produtos', produtoController.criar);
produtoRoutes.put('/produtos/:id', produtoController.editar); 
produtoRoutes.delete('/produtos/:id', produtoController.deletar); 
produtoRoutes.get('/produtos/:id', produtoController.selecionaById); 
produtoRoutes.get('/produtos/busca/nome', produtoController.selecionaByNome);
produtoRoutes.get('/produtos/lista/alfabeto', produtoController.selecionarAlfabeto);

export default produtoRoutes;
