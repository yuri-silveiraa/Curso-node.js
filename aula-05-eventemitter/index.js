const {
    bus,
    Metric,
    loggerMetricsSubscriber
} = require ('./metrics')

const {
    promises: {
        readFile : readFileOriginal,
        writeFile : writeFileOriginal,
    }
} = require('fs')
const { join } = require('path')

const readFile =  async (path) => {
    const startTime = Date.now()
    bus.publish(Metric({ name: 'readFileCount', value: 1, unit: 'count' }))

    try{
        return readFileOriginal(path)
    } finally {
        const duration = Date.now() - startTime
        bus.publish(Metric({ name: 'readFileDuration', value: duration, unit:'ms' }))
    }
}

const writeFile =  async (path, content) => {
    const startTime = Date.now()
    bus.publish(Metric({ name: 'writeFileCount', value: 1, unit: 'count' }))

    try{
        return writeFileOriginal(path, content)
    } finally {
        const duration = Date.now() - startTime
        bus.publish(Metric({ name: 'writeFileDuration', value: duration, unit:'ms' }))
    }
}

const copy = async (source, dest) => {
    const content = await readFile(source)
    return writeFile(dest, content)
}

const main = async () => {
    bus.subscribe(loggerMetricsSubscriber)

    const separator = '*'.repeat(50)
    await copy(
        join(__dirname, '..', 'package.json'),
        join(__dirname,'package.copy.json')
    )
    
    console.log(separator)

    await copy(
        join(__dirname,'ping-pong.js'),
        join(__dirname,'ping-pong.js.copy')
    )
    
    console.log(separator)


    console.log('processo finalizado')
}

main()