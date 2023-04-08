import { ChangeEvent, FormEvent, useState } from "react";
import { useItems, useItemsDispatcher } from "../lib/ItemsProvider"
import { useLiveQuery } from "dexie-react-hooks";
import { Reminder } from "../lib/db";
import { ItemActionType } from "../lib/ItemsProvider/ItemsReducer";

export function ListItems() {
    // const items = useItems();
    const dispatch = useItemsDispatcher();
    const items = useLiveQuery(
        () =>
            Reminder.items.filter((item) => !!item.activated).toArray()
        , []
    );

    const updateItem = (item: ChangeEvent<HTMLInputElement>, index: number) => {
        const itemValue = item.target.value;
        if (itemValue !== items![index].name) {
            Reminder.items.update(items![index],
                { name: itemValue }
            );
        }
    }

    const removeItem = (index: number) => {
        const dbItem = items![index];
        Reminder.items.update(dbItem,
            { activated: false })
    }
    return (
        <section className={"flex flex-col justify-self-center place-self-center self-center w-2/4 text-center text-xl text-stone-200"} >
            <div>
                {items && items.sort((itemA, itemB) => itemB.startAt - itemA.startAt).map((item, index) => (
                    <div className={"flex flex-col w-full"} key={item.id}>
                        <div className={"flex justify-between flex-nowrap mb-2"}>
                            <input className={"text-stone-200 focus:outline-none bg-transparent w-full"} type={"text"} value={item.name} onChange={e => updateItem(e, index)} />
                            <div className=" w-64">
                                <span className={"text-sm "}>{new Date(item.startAt).toLocaleString()}</span>
                                <span className={"ml-3 border-solid border-amber-100 px-2 py-1 border-2 w-10 cursor-pointer"} onClick={() => removeItem(index)}>X</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}