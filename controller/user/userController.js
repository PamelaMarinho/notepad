const User = require('../../models/user')
const Notepad = require('../../models/note')
const express = require('express')
const router = express.Router()

router.post('/', (req,res)=>{
        res.render('../views/pages/user/newUser.ejs')
    })

router.post('/', async (req,res) =>{
    
    const {nome,senha,email} = req.body

    if(nome.length>=3 && senha.length==6 && email ){

        const result = await User.findOne({where:{nome:nome}})

        if(result==null){
            const usuario = await User.findOrCreate({
                where:{nome:nome},
                defaults:{nome,senha,email}
            })
            const notepad = await Notepad.findOrCreate({
                where:{nomeUser:nome},
                defaults:{nomeUser:nome,idser:usuario[0].id,tipo:'vazio',nota:'vazio',titulo:'Indefinido'}
            })

            res.render('../views/pages/index.ejs',
            {usuario,notepad,retorno:'/user',message:"usuário cadastrado com sucesso"})

        }else{
            res.render('../views/pages/avisos/jaCadastrado.ejs',
            {retorno:'/user',mensagem:'Usuário já cadastrado! Faça o login.'})
        }
    }else{
        res.render('../views/pages/avisos/jaCadastrado.ejs',
        {retorno:'/user',mensagem:'Login ou senha inválidos! certifique-se de informar um login maior que 3 caracteres e uma senha maior que 8 dígitos'})
    }
})



module.exports = router
  