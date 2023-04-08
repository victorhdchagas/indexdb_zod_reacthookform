import Dexie from "dexie";

let request: IDBOpenDBRequest;
// let db: IDBDatabase;
let version = 1;

export enum Reminder {
    Items = "items"
}

export const initDB = (): Promise<boolean> => {
    return new Promise((resolve) => {
        request = indexedDB.open("reminder", 1);
        request.onupgradeneeded = (ev) => {
            const db = request.result;
            if (!db.objectStoreNames.contains(Reminder.Items))
                db.createObjectStore(Reminder.Items, { keyPath: "id", autoIncrement: true });
        }
        request.onsuccess = (e) => {
            while (request.readyState !== "done") {
                if (request.readyState == "pending") break;
                const db = request.result;
                version = db.version;

                resolve(true)
            }
        }

        request.onerror = () => {
            console.log("something went wrong")
            resolve(false)
        }
    })
}

export const addData = async <T>(table: string, data: T): Promise<T | string | null> => {
    return new Promise((resolve => {

        const request = indexedDB.open("reminder");

        request.onerror = () => {
            const error = request.error?.message
            if (error)
                resolve(error);
            else
                resolve("Unknown error")
        }
        request.onsuccess = () => {

            // while (request.readyState !== "done") {
            const db = request.result;
            const tx = db.transaction(table, 'readwrite');
            const store = tx.objectStore(table)

            const ret = store.add(data);
            console.log(ret)
            // const indexed = store.index(Reminder.Items).openCursor(null, 'prev')

            // indexed.onsuccess = (e) => {
            //     console.log(e.target)
            //     resolve(data)
            // }
            // }
        }
        request.onerror = console.log


    }))
}



export const getData = async <T>(table: string): Promise<T[] | string | null> => {
    return new Promise((resolve => {

        const request = indexedDB.open("reminder");

        request.onerror = () => {
            const error = request.error?.message
            if (error)
                resolve(error);
            else
                resolve("Unknown error")
        }
        request.onsuccess = () => {

            // while (request.readyState !== "done") {
            const db = request.result;
            const tx = db.transaction(table, 'readonly');
            const store = tx.objectStore(table)

            const ret = store.getAll();
            ret.onsuccess = (e => {
                resolve(ret.result)

            })
            // const indexed = store.index(Reminder.Items).openCursor(null, 'prev')

            // indexed.onsuccess = (e) => {
            //     console.log(e.target)
            //     resolve(data)
            // }
            // }
        }
        request.onerror = console.log


    }))
}


class ReminderDB extends Dexie {
    /**
     *
     */
    constructor() {
        super("ReminderDB");
        this.version(2).stores({
            items: `
            ++id,
            name
            `
        })
    }
}
