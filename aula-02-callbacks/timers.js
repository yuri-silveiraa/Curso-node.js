const logCalled = () => {
  console.log('> Fui chamada')
}

setTimeout(() => {
  logCalled()
}, 1000)

const timeoutId = setTimeout(logCalled, 5000)

clearTimeout(timeoutId)

const intervalId = setInterval(() => {
  console.log('> Chamada no intervalo')
}, 4000)

setTimeout(() => {
  clearInterval(intervalId)
}, 17000)
