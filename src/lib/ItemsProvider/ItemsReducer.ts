import { Reminder } from "../db"

export interface IItemProps {
    id?: number
    name: string
    startAt: number
    endAt?: number
    repeat?: boolean
    activated?: boolean
}

export enum ItemActionType {
    ADD = "add",
    REMOVE = "remove",
    GETALL = "getall",
    UPDATE = "update"
}




export interface IItemAction {
    type: ItemActionType
    payload?: IItemProps | IItemProps[]
}
export default function (items: IItemProps[], action: IItemAction): IItemProps[] {
    switch (action.type) {
        case "add":
            if (action.payload && !(action.payload instanceof Array)) {
                return [...items, action.payload]
            }
            return items;
        case "remove":
            if (action.payload && !(action.payload instanceof Array))
                return items.filter(a => a.id !== (action.payload! as IItemProps).id)
            return items;
        case "update":
            if (action.payload && !(action.payload instanceof Array))
                return items.filter(a => a.id !== (action.payload! as IItemProps).id)
            return items;
        case "getall":
            if (action.payload instanceof Array)
                return [...items, ...action.payload]
            return items
        default:
            throw "errr"
    }
}