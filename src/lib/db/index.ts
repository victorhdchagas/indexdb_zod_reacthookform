import Dexie, { Table } from 'dexie';
import { IItemProps } from '../ItemsProvider/ItemsReducer';

export class MySubClassedDexie extends Dexie {
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    items!: Table<IItemProps>;

    constructor() {
        super('Reminder');
        this.version(1).stores({
            items: '++id, name, startAt, repeat,activated' // Primary key and indexed props
        });
    }
}

export const Reminder = new MySubClassedDexie();