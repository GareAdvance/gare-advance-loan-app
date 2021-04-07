require("dotenv").config()

module.exports = {
  mongodb: process.env.MONGO_DB,
  mongopassword: process.env.MONGO_PASSWORD,
  mongouser: process.env.MONGO_USERNAME,
  mongohost: process.env.MONGO_HOST,
  mongodevhost: process.env.LOCAL_HOST,
  devmongodb: process.env.LOCAL_DB,
  devmongoport: process.env.MONGO_PORT
}