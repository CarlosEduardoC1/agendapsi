import { Tables } from "../@types";
import DataBase from ".";
import { DatabaseConnection } from "./connect";

export default class Querys extends DataBase {
  public table: Tables | null = null;

  constructor(tableName: Tables) {
    super();
    this.table = tableName;
    this.db = DatabaseConnection.getConnection();
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
          (tr, result) => {
            return resolve({ id: result.insertId });
          },
          (sqlError) => {
            console.log("ERROR ON INSERT", JSON.stringify(sqlError));
            reject({ id: 0 });
            return false;
          }
        )
      );
    });
  }

  public findAll<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `select * from ${this.table};`,
          [],
          (_, { rows }) => {
            return resolve(rows["_array"] as T);
          },

          (sqlError) => {
            console.log("ERROR ON SELECT ALL", sqlError);
            reject(sqlError);
            return false;
          }
        )
      );
    });
  }

  public findOne<T>(id: number): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `select * from ${this.table} where id = ${id};`,
          [],
          (_, { rows }) => {
            resolve(rows["_array"] as T);
          },

          (sqlError) => {
            console.log("ERROR FIND ONE", sqlError);
            reject(sqlError);
            return false;
          }
        )
      );
    });
  }

  public update<T>(id: number, data: object): Promise<T> {
    const fields = Object.keys(data);
    const updated: string[] = [];
    for (let i = 0; i < fields.length; i++) {
      updated.push(`${fields[i]} = ?`);
    }

    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `update ${this.table} set ${updated.toString()} where id = ${id};`,
          fields.map((item) => (data as any)[item]),
          (_, response) => {
            resolve(response["rows"]["_array"] as T);
          },

          (sqlError) => {
            console.log("ERROR UPDATE", sqlError);
            reject(sqlError);
            return false;
          }
        )
      );
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `delete from ${this.table} where id = ${id};`,
          [],
          (_, response) => {
            resolve(response);
          },

          (sqlError) => {
            console.log("ERROR DELETE", sqlError);
            reject(sqlError);
            return false;
          }
        )
      );
    });
  }
}
