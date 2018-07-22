const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello OpenShift! With new naming strategy :)')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})