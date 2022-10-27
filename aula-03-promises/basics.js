const {
    promises:{
        readFile,
        writeFile,
    }
} = require('fs')
const { join, resolve } = require('path')

// Promise: Rejected = promise rejeitada / Fulfilled = promise resolvida

// .then((data) => {...}) 
// .catch((error) => {...}) lidar com error 

const packageJsonPath = join(__dirname, '..', 'package.json')
const destPath = join(__dirname, 'package.copy.promise.json')
const notExistsPath = join(__dirname,'notexists')
/*
readFile(notExistsPath)  // promise de leitura 
    .catch((error) => {
        console.error('Deu erro, to logando pra avisar, mas vou deixar subir', error.message)
        // return '{ "message": "ooops" }'
        // return readFile(packageJsonPath)
        return Promise.reject(error)
    })
    .then((data) => {// valor puro que vc retornou ou o dado da promise fulfilled 
        console.log('Terminei de ler')
        return writeFile(destPath, data) // promise da escrita 
    })
    .then(()=>{
        console.log('Terminei de escrever')
    })
    .catch((error) => {
        console.error('Deu erro de novo', error.message)
    })
*/
/*
console.log('*'.repeat(20))

readFile(notExistsPath)
    .then(
        // so cai aqui se o readFile der certo
        // podemos retornar valores puros
        (data) => '\n\n\n' + data
    )
    .then(
        // podemos retornar outra promise
        (data) => writeFile(destPath, data)
    )
    .then(
        //so cai aqui se writeFile for "fulfilled" 
        () => console.log('copia deu certo de fato')
    )
    .catch(
        // lidando com o erro
        (error) => {
            console.error('Vish deu erro, mas eu posso tratar')
            if (error.code === 'ENOENT') {
                return Promise.reject(Error('Arquivo não existe'))
            }
            return Promise.reject(error)
        }
    )
    .catch(
        // tratamento de erro -> engolindo o erro
        error => {
            console.error(error.message)
        }
    )
        .finally(()=> {
            console.log('eu rodo mesmo se der erro')
        })

Promise.resolve(
    // Valor puro
    // outro Promise
)
*/
/*
let cachedContent = null

const readPackageJson = () => {
    console.log('Vou ler o arquivo')
    readFile(packageJsonPath, { encoding: 'utf8'}).then(data => {
        console.log('Eu li o arquivo')
        cachedContent = data
        return data
    })
}

const getPackageJsonContent = () =>
    Promise.resolve(
        cachedContent ?? readPackageJson()
        )
    
getPackageJsonContent()
        .then(data => console.log(data))
        .then(() => getPackageJsonContent())
        .then(data => console.log(data))
*/
/*
const bagulhoBaseadoEmCallbacks = (param, callback) => {
    setTimeout(()=>{
        callback(Error('de proposito'))
    }, 1000)
}

const bagulhoBaseadoEmPromises = param =>
    new Promise((resolve, reject) => {
        bagulhoBaseadoEmCallbacks(param, (error, data) => {
            if(error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })

bagulhoBaseadoEmPromises('ser mesmo?')
    .then((data => console.log(`${data}\n é mesmo hein...`)))
    .catch((error) => console.error(`${error.message}\n mas mesmo assim ainda é promises`))
*/

// Multiplas promises - Promise.all = se uma falhar não da um resultado 

// Promise.all([
//     Promise.resolve(1),
//     Promise.reject(Error('A segunda falhou')),
//     Promise.resolve(3),
// ])
//     .then(([r1 ,r2 ,r3]) => r1 + r2 + r3 )
//     .then(console.log)
//     .catch(console.error)

// Multiplas promises - Promise.allSettled = te da um resultdao mesmo se uma falhar

// Promise.allSettled([
//     Promise.resolve(1),
//     Promise.reject(Error('A segunda falhou')),
//     Promise.resolve(3),
// ]) // [ {status: 'fulfilled', value: T } | { status: 'reject', reason: Error} ]
//     .then(
//         results => results.filter( r => r.status === 'fulfilled').map(r => r.value)
//     )
//     .then(console.log)

// multiplas promises - Promise.race = mostra o que trazer o resultado mais rapido 

// const delay = (time) => 
//     new Promise((resolve) =>
//         setTimeout(resolve, time)
//     )


// Promise.race([
//     delay(1000).then(() => '1s'),
//     delay(2000).then(() => '2s'),
// ])
//     .then(console.log)

// multiplas promises - Promise.any = Pega só o que nao da erro

Promise.any([
    Promise.reject(Error('Primeiro erro')),
    Promise.resolve('deu certo'), 
    Promise.reject(Error('terceiro erro'))
])
    .then(console.log)
    .catch(err => console.error('Nao devo ser chamado', err))