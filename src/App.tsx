import { useEffect, useState } from 'react'
import { ItemManagement } from './components/ItemManagement'
import { useItems } from './lib/ItemsProvider'
import { ListItems } from './components/ListItems';
import { Roadmap } from './components/Roadmap';

function App() {
  return (
    <div className={"h-full flex  flex-col justify-center items-center "}>
      <h1 className={"mb-4 text-4xl font-bold leading-none tracking-tight font-garamond"}>Personal Reminder</h1>
      <ItemManagement />
      <ListItems />
      <Roadmap />
    </div>
  )
}

export default App
