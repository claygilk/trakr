import './App.css';
import HealthBar from './components/HealthBar';
import { useState, createContext, useEffect} from 'react';
import { w3cwebsocket as WebSocket } from "websocket"

const client = new WebSocket("ws://127.0.0.1:8000")


const testData = [{startingHp: 10, currentHp:10, id: 1}, {startingHp: 15,currentHp:15,  id: 2}, {startingHp: 20,currentHp:20,  id: 3}]

export const CombatContext = createContext()

function App() {

  const [combat, setCombat] = useState(null)

  useEffect(() => {
    console.log(client);
    client.onopen = () => {
      console.log("Websocket connected!");
    }

    client.onmessage = (message) => {
      console.log(message);
      const data = JSON.parse(message.data)
      console.log("reply: " , data);
      console.log(typeof(data.updateState))
      console.log(JSON.stringify(data.updateState))
      setCombat(data.updateState)
    }
  
  }, [])

  function sendMessage() {
    console.log("sending combat update");
    client.send(JSON.stringify({
      type: "combatUpdate",
      updateState: combat
    }))
  }


  return (
    <CombatContext.Provider value={{ combat, setCombat }}>
        <div className='App'>
          {/* <WebSocketTest></WebSocketTest> */}
            <h1>Health Bars</h1>
            {
              combat && combat.healthBars ? 
              combat.healthBars.map((hb, i) => <HealthBar 
                startingHp={hb.startingHp} 
                currentHp={hb.currentHp} 
                idProp={hb.id} 
                key={hb.id} 
                index={i}
                sendMessage={sendMessage}
                />)
              : <h2>No Health Bars Added Yet</h2>
            }
            <button>Add Health Bar</button>
        </div>
    </CombatContext.Provider>
  );
}

export default App;
