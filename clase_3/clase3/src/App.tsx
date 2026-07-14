
import './App.css'

import Pruebas from './components/Pruebas'
import SeccionOne from './components/SeccionOne'
import SeccionTwo from './components/SeccionTwo'

function App() {

  return (
    <>
      <Pruebas />
      <SeccionOne />
      <SeccionOne />

      <div className="ticks">
        <h1>hola</h1>
      </div>

      <SeccionTwo />

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
