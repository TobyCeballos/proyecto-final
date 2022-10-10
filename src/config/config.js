const parseArgs = require('yargs')
const yargs = parseArgs(process.argv.slice(2))
const { PORT, name, _ } = yargs 
    .alias({
        p: 'PORT'
    })
    .default({
        p: 8080
    })
    .alias({
        n: 'name'
    })
    .default({
        n: 'tobyceballos44@gmail.com'
    })
    .argv

module.exports = {
    PORT,
    name
}