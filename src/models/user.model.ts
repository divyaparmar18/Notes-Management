import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { IsEmail, IsString, Length } from "class-validator";
import { Note } from "./notes.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column()
  @IsString()
  password!: string;

  @Column()
  @IsString()
  salt!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Note, (note) => note.user)
  notes!: Note[];
}
