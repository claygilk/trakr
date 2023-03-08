import React, { useEffect, useState } from 'react'
import { w3cwebsocket as WebSocket } from "websocket"

const client = new WebSocket("ws://127.0.0.1:8000")

export default function WebSocketTest() {

  const [msgInput, setMsgInput] = useState()
  const [msgOutput, setMsgOutput] = useState()

  useEffect(() => {
    console.log(client);
    client.onopen = () => {
      console.log("Websocket connected!");
    }

    client.onmessage = (message) => {
      const data = JSON.parse(message.data)
      console.log("reply: " , data.msg);
      setMsgOutput(data.msg)
    }
  
  }, [])

  function sendMessage(e) {
    e.preventDefault()
    console.log("sending message");
    client.send(JSON.stringify({
      type: "message",
      msg: msgInput
    }))
  }

  function handleChange(e) {
    setMsgInput(e.target.value)
  }
  

  return (
    <div>
      <h3>WebSocketTest</h3>
      <form onSubmit={sendMessage}>
        <input type="text" value={msgInput} onChange={handleChange}></input>
      </form>
      <p color='white'>Latest Message: {msgOutput}</p>
    </div>
  )
}
