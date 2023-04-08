import { useLiveQuery } from "dexie-react-hooks";
import { generateRoadmap } from './roadmap'
export function Roadmap() {
    const items = generateRoadmap();
    return (
        <footer className={"absolute flex flex-col max-h-28 bottom-0  w-2/4 text-center text-xl text-stone-200"} >
            <span className={"row"}>Atualizações</span>
            <hr className="h-px my-1  bg-gray-200 border-1 dark:bg-gray-700"></hr>
            <ul className={"flex flex-col w-full max-h-44 gap-1 justify-self-center flex-wrap place-self-center self-center overflow-y-auto  flex-initial"}>
                {items && items.map((item, id) => (
                    <li className={"text-left"} key={item.id}>{item.desc}</li>
                ))}
            </ul>
        </footer>
    )
}