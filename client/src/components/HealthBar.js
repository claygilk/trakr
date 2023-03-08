import { useState, useContext } from 'react';
import './HealthBar.css'
import { CombatContext } from '../App';


function HealthBar({ startingHp, currentHp, idProp, index, sendMessage }) {

  const [healDmg, setHealDmg] = useState(undefined)
  const [showModifyHpInput, setshowModifyHpInput] = useState(false)
  const [isHeal, setIsHeal] = useState(false)
  const { combat, setCombat } = useContext(CombatContext)

  function handleHealDmgChange(e) {
    setHealDmg(e.target.value)
  }

  function handleModifyHealth(isHeal) {
    setshowModifyHpInput(true)
    setIsHeal(isHeal)
  }

  function submitHealOrDamage(e) {
    e.preventDefault()

    setCombat((combat) => {
      let currentHp = combat.healthBars[index].currentHp
      let newHp = isHeal ? Number(currentHp) + Number(healDmg) : Number(currentHp) - Number(healDmg) 
      
      combat.healthBars[index].currentHp = newHp

      console.log(combat);
      console.log(`Healing hp-${idProp} for ${healDmg}. New Current HP: ${newHp}`)
      
      return combat
    })

    sendMessage()
    setHealDmg(undefined)
    setshowModifyHpInput(false)
  }


  return (
    <div className='health-bar-container'>
      <label className="hp-label" htmlFor={"hp-" + idProp} id={"label-for-hp-" + idProp}>HP:</label>
      <input
        className="hp-input"
        type="number"
        id={"hp-" + idProp}
        min="0"
        value={combat.healthBars[index].currentHp}
        readOnly
        >
      </input>
      {!showModifyHpInput ?
        <div>
          <button onClick={() => handleModifyHealth(true)}>+</button>
          <button onClick={() => handleModifyHealth(false)}>-</button>
        </div>
        :
        <form onSubmit={submitHealOrDamage}>
          <input
            className="heal-dmg-input"
            type="number"
            id="heal-dmg-input"
            min="0"
            value={healDmg}
            onChange={handleHealDmgChange}
          >
          </input>
        </form>
      }
    </div>
  );
}

export default HealthBar;