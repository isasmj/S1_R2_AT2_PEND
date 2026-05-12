import { db } from "../database/connection.database";
import { ICategoria } from "../models/categoria.model";
import { ResultSetHeader } from "mysql2/promise";

export class CategoriaRepository {

    async findAll(): Promise<ICategoria[]> {
        const [rows] = await db.execute<ICategoria[]>(
            'SELECT * FROM categorias;'
        );
        return rows;
    }

    //omite os campos discriminados
    async create(dados: Omit<ICategoria, 'id'>): Promise<ResultSetHeader> {
        const sql = 'INSERT INTO categorias (descricao, ativo) VALUES (?,?);';
        const values = [dados._descricao, dados._ativo];
        console.log('Teste TIMEOUT: ', values)
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(id: number, dados: Omit<ICategoria, 'id'>): Promise<ResultSetHeader> {
        const sql = 'UPDATE categorias SET descricao=?, ativo=? WHERE id=?;';
        const values = [dados._descricao, dados._ativo, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values)
        return rows;
    }

    async delete(id: number): Promise<ResultSetHeader> {
        const sql = 'DELETE FROM categorias WHERE id = ?;';
        const [rows] = await db.execute<ResultSetHeader>(sql, [id]);
        return rows;
    }

    async findById(id: number): Promise<ICategoria | undefined> {
        const sql = 'SELECT * FROM categorias WHERE id = ?;';
        const [rows] = await db.execute<ICategoria[]>(sql, [id]);
        return rows[0];
    }

    async findByName(descricao: string): Promise<ICategoria> {
        const sql = 'SELECT * FROM categorias WHERE descricao = ?;';
        const [rows] = await db.execute<ICategoria[]>(sql, [descricao]);
        return rows[0];
    }

    async findAlfabetic(): Promise<ICategoria[]> {
        const [rows] = await db.execute<ICategoria[]>(
            'SELECT * FROM categorias ORDER BY descricao ASC;');
        return rows;
    }



}