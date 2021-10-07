const Koa = require('koa')
const Key = require('./configuration/env')()
const db = require('./db/index')
const MidConfig = require('./middleware/mid-config')
const RegisterRouter = require('./api/index')
const Crontab = require('./infrastructure/crontab')
const TempScript = require('./infrastructure/script')

//Http Server Start
const app = new Koa()
const port = Key.port
serverStart(app, port)

async function serverStart(app, port) {
    try {
        let res = await db.connect()
        console.log(res)
        if(process.env.NODE_ENV=='dev'){
            await TempScript.run()
        }
        await Crontab.setup()
        app.use(MidConfig())
        app.use(RegisterRouter())
        const conn = app.listen(port, () => {
            console.log(`👻  :Server is now listening for the requests at port: ${port} `)
            process.send('ready')
        })
        process.on('SIGINT', () => {
            conn.keepAliveTimeout = 1
            console.log('Closing server...')
            conn.close(() => {
                console.log('Server closed !!!')
                process.exit()
            })
        })
    } catch (err) {
        console.log(err)
    }

}