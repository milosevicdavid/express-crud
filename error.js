setTimeout(() => {
    throw new Error('doup')
}, 300)


process.on('uncaughtException', (err) => {

})

process.on('uncaughtRejection', (err) => {

})