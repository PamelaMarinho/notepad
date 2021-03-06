const express = require('express')
const bodyparser = require('body-parser')
const root = require('./controller/index')
const note = require('./controller/note/noteController.js')
const routerUser = require('./controller/user/userController.js')
const path = require('path')
const app = express()

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use('/user',routerUser)
app.use('/notepad', note)
app.use('/',root)
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.info(`servidor escutando na porta ${port}`)
})

