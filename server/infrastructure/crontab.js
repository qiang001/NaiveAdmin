const schedule = require('node-schedule')

module.exports = {
    setup:async()=>{
        schedule.scheduleJob('0 * * * * *', async function () {
            
        })
        console.log('定时任务setup')
    }
}