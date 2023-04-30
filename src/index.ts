import express from 'express'
import * as dotenv from 'dotenv'
import runCron from './cron'

dotenv.config()

const server = express()

runCron()

server.listen(process.env.APP_PORT, () => {
    console.log(`Listening on PORT ${process.env.APP_PORT}`)
})