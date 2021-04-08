require("dotenv").config()

module.exports = {
  mongodb: process.env.DB_NAME,
  mongopassword: process.env.DB_PASS,
  mongouser: process.env.DB_USER,
  mongodevhost: process.env.LOCAL_HOST,
  devmongodb: process.env.LOCAL_DB,
  devmongoport: process.env.MONGO_PORT,
  flw_pub_key: process.env.FLW_PUB_KEY,
  flw_sec_key: process.env.FLW_SEC_KEY,
  email_activation_key: process.env.EMAIL_ACTIVATION_KEY,
  sendgrid_api_key: process.env.SENDGRID_API_KEY,
  sendgrid_email: process.env.SENDER_EMAIL,
  credit_reg_email: process.env.CREDIT_EMAIL,
  credit_reg_password: process.env.CREDIT_PASSWORD,
  credit_reg_subscriber_id: process.env.CREDIT_SUBCRIBER_ID,
  secret_key: process.env.SECRET_KEY,
  gare_bookings_email: process.env.GARE_BOOKINGS_EMAIL,
  credit_reg_base_url: process.env.CREDIT_REG_BASE_URL
}