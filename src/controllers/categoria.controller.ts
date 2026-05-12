import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";

export class CategoriaController {
    constructor(private _service = new CategoriaService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const categorias = await this._service.selecionarTodos();
            res.status(200).json({ categorias })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }
    criar = async (req: Request, res: Response) => {
        try {
            const { descricao } = req.body;
            const novo = await this._service.criar(descricao);
            res.status(201).json({ novo })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    editar = async (req: Request, res: Response) => {
        try {
            const { descricao, ativo } = req.body;
            const id = Number(req.query.id)
            const alterado = await this._service.editar(id, descricao, ativo);
            res.status(200).json({ alterado })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id)
            const deletado = await this._service.deletar(id);
            if (deletado.affectedRows === 0 || (Array.isArray(deletado) && deletado.length === 0)) {
                return res.status(404).json({ message: "Categoria nao encontrada" });
            }
            res.status(200).json({ deletado })
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'code' in error) {
                const err = error as { code?: string };
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(400).json({ message: 'Não é possível excluir a categoria pois existem produtos vinculados.' })
                }
            }
            if (error instanceof Error) {

                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    selecionaById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id)
            if (!id || id <= 0) {
                throw new Error("O id para deve ser um número válido");
            }
            const categoriasPorId = await this._service.selecionaById(id);
            res.status(200).json({ categoriasPorId })
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    selecionaByNome = async (req: Request, res: Response) => {
        try {
            const { descricao } = req.query;
            const categoriasPorNome = await this._service.selecionaByNome(String(descricao));

            if (!descricao || String(descricao).trim() === "") {
                return res.status(400).json({ message: "Digite uma descrição de categoria" });
            }
            if (!categoriasPorNome || (Array.isArray(categoriasPorNome) && categoriasPorNome.length === 0)) {
                return res.status(404).json({ message: "Não existe essa categoria" });
            }

            return res.status(200).json({ categoriasPorNome });
        } catch (error) {
        }
    }

    selecionarAlfabeto = async (req: Request, res: Response) => {
        try {
            const categorias = await this._service.selecionaAbc();
            res.status(200).json({ categorias })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }
}
