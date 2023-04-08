import { FormEvent, useRef, useState } from "react";
import { useItems, useItemsDispatcher } from "../lib/ItemsProvider"
import { IItemProps, ItemActionType } from "../lib/ItemsProvider/ItemsReducer";
import { Reminder } from "../lib/db";

export function ItemManagement() {

    const INITIAL_ITEM = {
        name: "",
        startAt: 0
    }
    const nameInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useItemsDispatcher();
    const [item, setItem] = useState<IItemProps>(INITIAL_ITEM)
    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (item.name.length < 3) return;
        const toAdd = {
            ...item,
            startAt: item.startAt > 0 ? item.startAt : new Date().getTime(),
            activated: true
        };
        const newItemID = await Reminder.items.add(toAdd);
        try {
            console.log(item, newItemID)
            dispatch({
                type: ItemActionType.ADD,
                payload: {
                    ...toAdd,
                    id: newItemID as number
                }
            });

        } catch (error) {
            console.error(error)
        }
        if (nameInputRef.current)
            nameInputRef.current.focus();
        return setItem(INITIAL_ITEM)
    }
    return (
        <form className={"flex flex-col justify-self-center place-self-center self-center w-2/4 text-center text-xl text-stone-200"} onSubmit={onSubmitHandler}>

            <span >Gerenciamneto de item </span>
            <input className={"text-stone-200 focus:outline-none bg-transparent"} placeholder={"Item's name"} autoFocus type={"text"} value={item.name} onChange={(e) => (setItem({ ...item, name: e.target.value }))} ref={nameInputRef} />
            <button type={"submit"}>Enviar</button>
        </form>
    )
}