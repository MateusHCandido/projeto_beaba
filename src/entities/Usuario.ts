import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import {v4 as uudi} from 'uuid';
import bcrypt from 'bcryptjs';

export enum perfil_usuario {
    ADMINISTRADOR = 'ADMINISTRADOR',
    USUARIO = 'USUARIO',
}

export enum status_usuario {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO'
}

@Entity('usuario')
export class Usuario{

    @PrimaryColumn()
    id_usuario: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    nome_completo: string;

    @Column({
        type: 'varchar',
        length: 15,
        nullable: false,
        unique: true
    })
    matricula: string;

    @Column({
        type: 'enum',
        enum: perfil_usuario,
        default: perfil_usuario.USUARIO
    })
    perfil_usuario: perfil_usuario;

    @Column({
        type: 'varchar',
        length: 60,
        nullable: false
    })
    senha: string;

    @Column({
        type: 'enum',
        enum: status_usuario,
        default: status_usuario.ATIVO
    })
    status_usuario: status_usuario

    //verifica se o id_usuario está preenchido
    constructor(){
        if(!this.id_usuario){
            this.id_usuario = uudi();
        }
    }

    @BeforeInsert()
    async hashPassword(){
        this.senha = await bcrypt.hash(this.senha, 10);
    }
}