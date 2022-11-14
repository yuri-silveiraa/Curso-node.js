const { EventEmitter } = require('events')

const pingPongServer = () => {
    const pingpong = new EventEmitter()
    
    pingpong
        .on('ping', () => {
            console.log('ping!!')
            setTimeout(()=> {
                pingpong.emit('pong')
            }, 1000)
        })
        .on('pong', ()=> {
            console.log('pong!!')
            setTimeout(()=>{
                pingpong.emit('ping')
            }, 1000)
        })
    
        pingpong.emit('ping')
}

const delay = (time) =>
    new Promise(resolve => setTimeout(resolve, time))

const pingPongServerP = () => {
    const pingpong = new EventEmitter()

    pingpong
           .on('ping', async () => {
            console.log('ping')
            await delay(1000)
            pingpong.emit('pong')
           })
           .on('pong', async () => {
            console.log('pong')
            await delay(1000)
            pingpong.emit('ping')
           })
           pingpong.emit('ping')
}

// pingPongServerP()

const errors = async () => {
    const pingpong = new EventEmitter({
        captureRejections: true,
    })

    pingpong
           .on('ping', async () => {
            console.log('ping')
            await delay(500)
            pingpong.emit('pong')
           })
           .on('pong', async () => {
            console.log('pong')
            await delay(500)
            pingpong.emit('ping')
           })
           .on('error', (error) => {
            console.error('eu capturei o erro emitido:', error.message)
           })
           .on('forceExplodeAsync', error => Promise.reject(error))

           pingpong.emit('ping')

           await delay(2000)
           pingpong.emit('error', Error('Deu ruim depois de 2s'))

           await delay(1000)
           pingpong.emit('forceExplodeAsync', Error('Deu ruim de 3s'))
}

errors()