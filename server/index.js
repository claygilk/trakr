const wsPort = 8000
const WebSocketServer = require('websocket').server
const http = require('http')
const crypto = require('crypto');
const saveCombat = require('./redis.js').saveCombat
const getCombat = require('./redis.js').getCombat
const redisClient = require('./redis.js').redisClient

const server = http.createServer()
server.listen(wsPort)
console.log("listening on port " + wsPort)

const webSocketServer = new WebSocketServer({
  httpServer: server
})

const clients = {}

// const testData = [{startingHp: 10, currentHp:10, id: 1}, {startingHp: 15,currentHp:15,  id: 2}, {startingHp: 20,currentHp:20,  id: 3}]


// let combatState = {
//   healthBars: testData
// }

// saveCombat(combatState)

async function initCombat(){
  return getCombat()
}

webSocketServer.on('request', async function (req) {
  var userID = crypto.randomUUID()
  console.log((new Date()) + "Recieved a new connection from " + req.origin)

  const connection = req.accept(null, req.orgin)
  clients[userID] = connection
  console.log("connected: " + userID)

  let combatState 
  combatState = await redisClient.get('combat')
  combatState = JSON.parse(combatState)
  console.log(typeof(combatState));

  if (!combatState){
    combatState = {
      healthBars: []
    }
  }

  // send current state
  connection.sendUTF(JSON.stringify({
    type: "combatInitialize",
    updateState: combatState
  }))

  console.log("sending Initial data: ", combatState);

  connection.on('message', (message) => {
    console.log("recieved update:", message.utf8Data);
    data = JSON.parse(message.utf8Data)
    combatState = data.updateState

    saveCombat(combatState)
    console.log("New combat state recieved: ", combatState);

    for(key in clients){
      clients[key].sendUTF(message.utf8Data)
      console.log("sent message to all clients");
    }
  })

})

webSocketServer.on('connect', (s) => {
  console.log("someone connected");
})

webSocketServer.on("combatUpdate", (test) => {
  console.log("combat was updated");
})