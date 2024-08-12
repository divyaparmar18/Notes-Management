import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { IsString } from "class-validator";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsString()
  title!: string;

  @Column()
  @IsString()
  body!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
