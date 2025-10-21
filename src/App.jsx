
import Experience from './Components/Experience'
import Interface from './Interface/Interface'
import LevaControls from './Interface/Leva'
import { useStore } from './Store/useStore'
import WeathersAudio from './Utils/Audio/WeathersAudio'



function App() {
  const {Weather} =useStore()

  return (
    <>
    <Experience/>
    <Interface/>
    <WeathersAudio src={`./Audios/${Weather}.mp3`} />

    {/* <LevaControls/> */}
    </>
  )
}

export default App
