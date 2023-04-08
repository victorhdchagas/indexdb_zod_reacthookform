
const addItem = (desc: string) => {
    return { desc }
}
const roadItems = [
    addItem(""),
    addItem("Ajustar startAt no item"),
    addItem("Card de items"),
    addItem("Aviso"),
    addItem("Aviso"),
    addItem(""),
    addItem("Aviso"),
    addItem("Modal pra configurações"),
    addItem("Botão de configuração"),
    addItem("Aviso"),
    addItem("Aviso"),
    addItem("Aviso"),
]

export function generateRoadmap() {
    return roadItems.map((item: { desc: string }, index: number) => ({ ...item, id: index }));
}