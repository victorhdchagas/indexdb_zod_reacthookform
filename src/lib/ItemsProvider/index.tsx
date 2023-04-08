import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import ItemsReducer, { IItemAction, IItemProps, ItemActionType } from "./ItemsReducer";
// import { Reminder, getData, initDB } from "../db";

const ItemsContext = createContext<IItemProps[]>([])
const ItemsDispatchContext = createContext<Dispatch<IItemAction>>(() => { })

export const useItems = () => {
    return useContext(ItemsContext);
}

export const useItemsDispatcher = () => {
    return useContext(ItemsDispatchContext);
}

export function ItemsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(ItemsReducer, []);
    useEffect(() => {
        // let ignore = false;
        // const myAsyncFN = async () => {
        //     const ret = await getData<IItemProps>(Reminder.Items)
        //     if (ret instanceof Array) {
        //         dispatch({
        //             type: ItemActionType.GETALL,
        //             payload: ret
        //         })
        //     }
        // }
        // if (!ignore)
        //     myAsyncFN();
        // return () => { ignore = true }
    }, [])

    return (
        <ItemsContext.Provider value={state}>
            <ItemsDispatchContext.Provider value={dispatch}>
                {children}
            </ItemsDispatchContext.Provider>
        </ItemsContext.Provider >
    )
}