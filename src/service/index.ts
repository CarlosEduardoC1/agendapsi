import { DatabaseConnection } from "./connect";

export default class DataBase {
  public db;

  constructor() {
    this.db = DatabaseConnection.getConnection();

    this.initDb();
  }

  protected initDb() {
    const sql: string[] = [
      `create table if not exists users (
        id integer not null primary key autoincrement,
        imagem longtext,
        email varchar(100)
        );`,
      `create table if not exists pacient (
            id integer not null primary key autoincrement, 
            nome varchar(100) not null,
            email varchar(100),
            telefone varchar(20),
            valor varchar(100) not null
        );`,
      `create table if not exists sessions (
          id integer not null primary key autoincrement,
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
    console.log(`ERROR TRANSACTION: ${JSON.stringify(error)}`);
  }

  public finallyTransaction() {
    console.log("transaction complete callback ");
  }
}
