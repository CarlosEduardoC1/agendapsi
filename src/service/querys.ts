import { Months, SessionMode, Sessions, Tables } from "../@types";
import DataBase from ".";
import { DatabaseConnection } from "./connect";
import { parseMonths } from "../utils";

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
      this.db.transaction(
        (tx) =>
          tx.executeSql(
            `insert into ${this.table} (${fields.toString()})
        values (${interrogations.toString()});`,
            fields.map((item) => (values as any)[item]),
            (tr, result) => {
              return resolve({ id: result.insertId });
            },
            (sqlError, opError) => {
              console.log("ERROR FIELDS", opError);
              console.log("ERROR ON INSERT", JSON.stringify(sqlError));
              reject({ id: 0 });
              return false;
            }
          ),
        (error) => {
          console.log(error);
        }
      );
    });
  }

  public findAll<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `select * from ${this.table} order by id desc;`,
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
      this.db.transaction(
        (tx) =>
          tx.executeSql(
            `select * from ${this.table} where id = ${id};`,
            [],
            (_, { rows }) => {
              resolve(rows["_array"] as T);
            },
            (sqlError, error) => {
              console.log("ERROR FIND ONE", error);
              reject(sqlError);
              return false;
            }
          ),
        (error) => {
          console.log("REAL ERROR", error);
        }
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

          (sqlError, realError) => {
            console.log("ERROR UPDATE", realError);
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

  public getPacientWithOppenedValues(id: any) {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) =>
          tx.executeSql(
            `select sum(sessionValue) as soma from sessions where id_paciente = ${id} and payed = false group by id_paciente;`,
            [],
            (_, response) => {
              resolve(response.rows._array);
            },

            (sqlError) => {
              reject(sqlError);
              return false;
            }
          ),
        (error) => {
          console.log("GET VALUES ERROR", error);
        }
      );
    });
  }

  public pacientSessionsQuantity(id: any) {
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) =>
          tx.executeSql(
            `select count(*) as quantidade from sessions where id_paciente = ${id} group by id_paciente;`,
            [],
            (_, response) => {
              resolve(response.rows._array);
            },

            (sqlError) => {
              reject(sqlError);
              return false;
            }
          ),
        (error) => {
          console.log("GET VALUES ERROR", error);
        }
      );
    });
  }

  public getSessionByPacient<T>(id: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `select * from sessions where id_paciente = ${id}`,
          [],
          (_, response) => {
            resolve(response.rows._array);
          },
          (sqlError) => {
            reject(sqlError);
            return false;
          }
        )
      );
    });
  }

  public getSessionByValues(month: Months, mode: SessionMode) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `select strftime('%m',schedule_date) as month, sum(sessionValue) as valor from sessions where payed = ${
            mode === "received" ? 1 : 0
          } AND month = "${parseMonths("byMonth", month)}" group by month;`,
          [],
          (_, response) => {
            resolve(response.rows._array);
          },
          (sqlError, realError) => {
            console.log("REAL ERROR", realError);
            reject(realError);
            return false;
          }
        )
      );
    });
  }

  public getSessionsOpen(): Promise<Sessions[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `select id, id_paciente, sessionValue from sessions where payed = 0;`,
          [],
          (_, response) => {
            resolve(response.rows._array);
          },
          (sqlError, realError) => {
            console.log("REAL ERROR", realError);
            reject(realError);
            return false;
          }
        )
      );
    });
  }
  public getSessionByPacientName(name: string): Promise<Sessions[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) =>
        tx.executeSql(
          `select * from sessions a join pacient b on a.id_paciente = b.id where b.nome like '%${name}%' ;`,
          [],
          (_, response) => {
            resolve(response.rows._array);
          },
          (sqlError, realError) => {
            console.log("REAL ERROR", realError);
            reject(realError);
            return false;
          }
        )
      );
    });
  }
}
