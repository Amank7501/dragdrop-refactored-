import React from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import ReactGrid from './components/ReactGrid';
// import DragDrop from './components/DragDrop';
// import EditableDivOne from './components/EditableDivOne';
import { Route, Routes } from "react-router-dom";
import DragDrop from './components/DragDrop';
import Deploy from './components/Deploy';
import Test2 from './components/Test2';

const App = () => {
  return (

    <DndProvider backend={HTML5Backend}>

      {/* <div className='App'><ReactGrid /></div> */}
      {/* <div className='App'><DragDrop /></div> */}
      {/* <div className='App'><EditableDivOne /></div> */}
      {/* <div className='App'><ParentComponent/></div> */}
      <Routes>
      <Route path="/" element={<DragDrop />} />
      <Route path='/deploy' element={<Deploy/>}/>
      {/* <Route path="/" element={<Test2 />} /> */}

      </Routes>
    
    </DndProvider>
  )
}

export default App