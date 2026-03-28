import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage' 
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { toast} from 'react-hot-toast'

const App = () => {
  return (
    <div className="relative h-full w-full">
      
      <button className="btn btn-primary rounded-full"  >Click Me</button>
      <button className="btn btn-info">Info</button>
<button className="btn btn-success">Success</button>
<button className="btn btn-warning">Warning</button>
<button className="btn btn-error">Error</button>
      <button onClick={()=>toast.success('Selected!!')} className="btn btn-primary">Toast</button>
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage/>} />
        <Route path='/note/:id' element={<NoteDetailPage/>} />
      </Routes>
    </div>
  )
}
export default App
