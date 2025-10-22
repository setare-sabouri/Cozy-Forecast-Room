import Experience from './Components/Experience'
import Interface from './Interface/Interface'
import RotateOverlay from './Interface/RotateOverlay'
import { useStore } from './Store/useStore'
import WeathersAudio from './Utils/Audio/WeathersAudio'
import useBreakpoint from './Utils/useBreakpoint'
import useOrientation from './Utils/useOrientation'



function App() {
  const {Weather} =useStore()
  const breakpoint=useBreakpoint()
  const orientation = useOrientation()
  const rotateIsNeeded = breakpoint==='mobile' && orientation==='portrait';

  return (
    <>
    <RotateOverlay show={rotateIsNeeded} />
    <Experience/>
    <Interface/>
    <WeathersAudio src={`./Audios/${Weather}.mp3`} />
    </>
  )
}

export default App
