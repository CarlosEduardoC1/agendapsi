import { Tables } from "../@types";
import DataBase from ".";
import { DatabaseConnection } from "./connect";

export default class Querys extends DataBase {
  public table: Tables | null = null;

  constructor(tableName: Tables) {
    super();
    this.table = tableName;
    // this.db = DatabaseConnection.getConnection();
  }

  public insertation(values: object): Promise<{ id?: number }> {
    const fields = Object.keys(values);
    const interrogations = ["?"];

    while (interrogations.length < fields.length) {
      interrogations.push("?");
    }

    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `insert into ${this.table} (${fields.toString()})
        values (${interrogations.toString()});`,
          fields.map((item) => (values as any)[item]),
          (_, { insertId }) => {
            console.log("INSERTED", insertId);
            return resolve({ id: insertId });
          },
          (sqlError) => {
            console.log(JSON.stringify(sqlError));
            reject({ id: 0 });
            return false;
          }
        )
      );
    });
  }
  // this.db.transaction(
  //     (tx) => this.executeTransaction(tx, sql),
  //     this.errorTransaction,
  //     this.finallyTransaction
  //   );

  public findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) =>
          resolve(
            this.executeTransaction(tx, [`select * from ${this.table};`])
          ),
        this.errorTransaction,
        this.finallyTransaction
      );
    });
  }

  public findOne(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) =>
          resolve(
            this.executeTransaction(tx, [
              `select * from ${this.table} where id = ${id};`,
            ])
          ),
        this.errorTransaction,
        this.finallyTransaction
      );
    });
  }

  public update(id: number, data: object): Promise<any> {
    const fields = Object.keys(data);
    const updated: string[] = [];
    for (let i = 0; i < fields.length; i++) {
      updated.push(`${fields[i]} = ?`);
    }

    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) =>
          resolve(
            this.executeTransaction(
              tx,
              [
                `update ${
                  this.table
                } set ${updated.toString()} where id = ${id};`,
              ],
              fields.map((item) => (data as any)[item])
            )
          ),
        this.errorTransaction,
        this.finallyTransaction
      );
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) =>
          resolve(
            this.executeTransaction(tx, [
              `delete from ${this.table} where id = ${id};`,
            ])
          ),
        this.errorTransaction,
        this.finallyTransaction
      );
    });
  }
}
