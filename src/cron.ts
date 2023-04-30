import cron from 'node-cron'

const task = () => {
    console.log('Task running')
}

const schedule = () => {
    cron.schedule('*/1 * * * *', task)
}

export default schedule