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


webSocketServer.on('request', async function (req) {
  //
  // Create UUID for each connection
  //
  var userID = crypto.randomUUID()
  console.log((new Date()) + "Recieved a new connection from " + req.origin)

  //
  // Add new connection to list of clients/connections
  //
  const connection = req.accept(null, req.orgin)
  clients[userID] = connection
  console.log("connected: " + userID)

  //
  // Query Redis db to get state of combat
  //
  let combatState 
  combatState = await redisClient.get('combat')
  combatState = JSON.parse(combatState)
  console.log(typeof(combatState));

  if (!combatState){
    combatState = {
      healthBars: []
    }
  }

  //
  // Send current combat state to new client (or empty object if DB is empty)
  //
  connection.sendUTF(JSON.stringify({
    type: "combatInitialize",
    updateState: combatState
  }))

  console.log("sending Initial data: ", combatState);

  //
  // Set up listner to respond to messages from client
  //
  connection.on('message', (message) => {
    console.log("recieved update:", message.utf8Data);
    data = JSON.parse(message.utf8Data)
    combatState = data.updateState

    //
    // Save updated combat state from client to Redis
    //
    saveCombat(combatState)
    console.log("New combat state recieved: ", combatState);

    //
    // Send updated state to every subscribed client
    //
    for(key in clients){
      clients[key].sendUTF(message.utf8Data)
      console.log("sent message to all clients");
    }
  })

})

webSocketServer.on('connect', (s) => {
  console.log("someone connected");
})
