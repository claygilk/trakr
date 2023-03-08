const Redis = require('ioredis');
// import Redis from 'ioredis'

const redisClient = new Redis({
    host: '127.0.0.1',
    port: 6379,
});

const saveCombat = async (combatState) => {
    
    let result = await redisClient.set('combat', JSON.stringify(combatState))

    console.log("combat saved to redis", result);
}

const getCombat = async () => {

    let combatState = await redisClient.get('combat')

    console.log("combat retrieved from redis", combatState);

}

const redisDemo = async () => {
  // Connect to Redis at 127.0.0.1, port 6379.
  const redisClient = new Redis({
    host: '127.0.0.1',
    port: 6379,
  });

  // Set key "myname" to have value "Simon Prickett".
  await redisClient.set('myname', 'Simon Prickett');

  // Get the value held at key "myname" and log it.
  const value = await redisClient.get('myname');
  console.log(value);

  // Disconnect from Redis.
  redisClient.quit();
};


exports.redisDemo = redisDemo
exports.getCombat = getCombat
exports.saveCombat = saveCombat
