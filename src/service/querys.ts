import { Tables } from "@/@types";
import DataBase from ".";

export default class Querys extends DataBase {
    public table: Tables | null = null;

    constructor(tableName: Tables) {
        super();
        this.table = tableName;
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
                        console.log(sqlError);
                        reject({ id: 0 });
                        return false;
                    }
                )
            );
        });
    }

    public findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) =>
                tx.executeSql(
                    ` select * from ${this.table}`,
                    [],
                    (_, { rows }) => {
                        console.log("ROWS", rows["_array"]);
                        return resolve(rows["_array"]);
                    },

                    (sqlError) => {
                        console.log("ERRRO", sqlError);
                        reject(sqlError);
                        return false;
                    }
                )
            );
        });
    }

    public findOne(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => tx.executeSql(`select * from ${this.table} where id = ${id}`, [],
                (_, { rows }) => {
                    console.log("ONE", rows["_array"]);
                    resolve(rows["_array"]);
                },

                (sqlError) => {
                    console.log("ERRRO", sqlError);
                    reject(sqlError);
                    return false;
                }))
        })
    }

    public update(id: number, data: object): Promise<any> {
        const fields = Object.keys(data);
        const updated: string[] = [];
        for (let i = 0; i < fields.length; i++) {

            updated.push(`${fields[i]} = ?`);

        }


        return new Promise((resolve, reject) => {
            this.db.transaction(tx => tx.executeSql(`update ${this.table} set ${updated.toString()} where id = ${id}`,
                fields.map((item) => (data as any)[item]),
                (_, response) => {
                    console.log("UPDATED", response);
                    resolve(response);
                },

                (sqlError) => {
                    console.log("ERRRO", sqlError);
                    reject(sqlError);
                    return false;
                }))
        })
    }

    public delete(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => tx.executeSql(`delete from ${this.table} where id = ${id}`,
                [],
                (_, response) => {
                    console.log("UPDATED", response);
                    resolve(response);
                },

                (sqlError) => {
                    console.log("ERRRO", sqlError);
                    reject(sqlError);
                    return false;
                }))
        })
    }
}
