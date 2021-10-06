const pro = require('./pro')
const dev = require('./dev')

const env = process.env.NODE_ENV

module.exports = () => {
    return env === 'dev' ? dev : pro
}