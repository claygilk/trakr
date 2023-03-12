import React, {useState} from 'react'
import { v4 as uuid} from 'uuid';

export default function NewHealthBar({toggleNewHealthBar, addNewHealthBar}) {

  const [startingHp, setStartingHp] = useState("")

  function handleChange(e) {
    setStartingHp(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    let newHealthBar = {
      startingHp: startingHp,
      currentHp: startingHp,
      id: uuid()
    }

    addNewHealthBar(newHealthBar)

    toggleNewHealthBar()

  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      
      <label>Starting Health</label>
      <input 
        type="number"
        min="1"
        value={startingHp}
        onChange={handleChange}
        
      />

    </form>
    
    </>
  )
}
