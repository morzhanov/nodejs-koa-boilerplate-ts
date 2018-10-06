import bcrypt from "bcrypt-nodejs";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";

@Entity()
export class User {
  static create({ email, password }: { email: string; password: string }) {
    const user = new User();
    user.email = email;
    user.password = password;
    return user;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column("text")
  email: string;

  @Column({ type: "text", readonly: true })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPwd() {
    this.password = await this.cryptPassword(this.password);
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
