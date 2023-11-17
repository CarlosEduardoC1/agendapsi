import { DatabaseConnection } from "./connect";

export default class DataBase {
  public db;

  constructor() {
    this.db = DatabaseConnection.getConnection();
    this.db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
      console.log("Foreign keys turned on")
    );

    this.initDb();
  }

  protected initDb() {
    const sql: string[] = [
      `create table if not exists users (
        id integer not null primary key auto_increment,
        imagem longtext,
        email varchar(100)
        );`,
      `create table if not exists pacient (
            id integer not null primary key auto_increment, 
            nome varchar(100) not null,
            email varchar(100),
            telefone varchar(20),
            valor varchar(100) not null
        );`,
      `create table if not exists sessions (
          id integer not null primary key auto_increment,
          id_paciente integer,
          schedule_date datetime not null,
          payed boolean not null,
          executed boolean not null,
          sessionValue decimal(10,2) not null,
          received decimal(10,2),
          toReceive decimal(10,2),

          foreign key (id_paciente) references pacient(id)
        );`,
    ];

    this.db.transaction(
      (tx) => this.executeTransaction(tx, sql),
      this.errorTransaction,
      this.finallyTransaction
    );
  }

  public executeTransaction(tx: any, sql: string[]) {
    for (let i = 0; i < sql.length; i++) {
      console.log(`EXECUTING SQL: ${sql[i]}`);
      tx.executeSql(sql[i]);
    }
  }

  public errorTransaction(error: any) {
    console.log(`erro: ${JSON.stringify(error)}`);
  }

  public finallyTransaction() {
    console.log("transaction complete call back ");
  }
}
