import { CategoriaRepository } from "../repository/categoria.repository";
import { Categoria } from "../models/categoria.model";

export class CategoriaService {
    constructor(private _repository = new CategoriaRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(descricao: string) {
        const categoria = Categoria.criar(descricao);
        return await this._repository.create(categoria);
    }

    async editar(id: number, descricao: string, ativo: boolean){
        const categoria = Categoria.editar(descricao, ativo, id)
        return await this._repository.update(id, categoria)
    }

    async deletar(id: number){
        const result =  await this._repository.delete(id)
        return result;
    }

    async selecionaById(id: number){
        const result =  await this._repository.findById(id)
        return result;
    }

    async selecionaByNome(descricao: string){
        const result =  await this._repository.findByName(descricao)
        return result;
    }
    async selecionaAbc() {
        return await this._repository.findAlfabetic();
    }

}