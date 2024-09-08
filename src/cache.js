const redis = require("redis")

;(async () => {
  const client = redis.createClient({
    url: "redis://0.0.0.0:6379",
  })

  client.on("error", (err) => console.log("Redis Client Error", err))

  await client.connect()

  await client.set("key", "kjjgbj")
  const value = await client.get("key")
  console.log(value)

  await client.disconnect()
})()
