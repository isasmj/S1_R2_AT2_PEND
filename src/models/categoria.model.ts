import { RowDataPacket } from "mysql2";

export interface ICategoria extends RowDataPacket {
    id?: number;
    descricao?: string;
    ativo?: boolean;
    dataCad?: Date;
}

export class Categoria {
    private _id?: number;
    private _descricao: string = "";
    private _ativo: boolean;
    private _dataCad?: Date;

    constructor(descricao: string, ativo: boolean = true, id?: number) {
        this.Descricao = descricao;
        this._ativo = ativo;
        this._id = id;
    }

    public get id(): number | undefined {
        return this._id;
    }

    public get Descricao(): string {
        return this._descricao;
    }

    public set Descricao(value: string) {
        this._validarDescricao(value);
        this._descricao = value;
    }

    public static criar(descricao: string): Categoria {
        return new Categoria(descricao, true);
    }

    public static editar(descricao: string, ativo: boolean, id: number): Categoria {
        return new Categoria(descricao, ativo, id);
    }

    private _validarDescricao(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Nome da Categoria deve ter pelo menos 3 caracteres");
        }
        if (value.trim().length > 45) {
            throw new Error("Nome da Categoria deve ter no máximo 45 caracteres");
        }
    }

    public static deletar(id: number): number {
        if (!id || id <= 0) {
            throw new Error("O id deve ser um número válido.");
        }
        return id;

    }
}