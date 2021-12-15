import { useState } from './useState'
export const useToggle = () => {
  const [ifActive, setIfActive] = useState<boolean>(false)
  const switchOn = () => {
    setIfActive(true)
  }
  const switchOff = () => {
    setIfActive(false)
  }
  return {
    ifActive,
    switchOn,
    switchOff,
  }
}
