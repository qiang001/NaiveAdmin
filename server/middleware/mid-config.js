const compose = require('koa-compose')
const chalk = require('chalk')
//Logger
async function logger(ctx, next) {
    const start = Date.now()
    await next()
    const s = (Date.now() - start) / 1000 + 's'
    let info = {
        status: ctx.status,
        method: ctx.method,
        url: ctx.url,
        cost: s
    }
    let { status, method, url, cost } = info
    console.log(`[${status < 300 ? chalk.green(status) : chalk.red(status)}] [${chalk.yellow(method)}] ${chalk.cyan(url)} (${chalk.gray(cost)})`)
}

//Handling Error
async function errorHandling(ctx, next) {
    try {
        await next()
    } catch (err) {
        console.log(err)
        ctx.status = err.code || 500
        ctx.body = {
            error: err.message || 'Internal Server Error'
        }
    }
}

//Parsing the Body
const bodyParser = require('koa-bodyparser')

//Handling CORS
const cors = require('koa2-cors')

module.exports = () => {
    return compose([logger, errorHandling, bodyParser(), cors()])
}