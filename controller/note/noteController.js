const User = require('../../models/user')
const Notepad = require('../../models/note')
const {confereTamanho,compatibilidade,confereVazio} = require('../../autenticador/user')
const express = require('express')
const router = express.Router()

router.post('/', async (req,res)=>{
    
    const {senha,nome} = req.body
    const usuario = await User.findOne({where:{nome:nome}})

    if(confereTamanho(nome,senha) && compatibilidade(nome,senha,usuario)){
        res.status(200).redirect(`/notepad/${usuario.dataValues.id}`)
    }else{
        res.render('../views/pages/avisos/jaCadastrado.ejs',{retorno:'/',mensagem:'Informe senha e login corretos'})
    }
})

router.get('/:id', async(req,res)=>{                                                                                                                    
    const idser = req.params.id
    const notepadDb = await Notepad.findAll({where:{idser}})
    if(notepadDb.length!=0){
        res.render('../views/pages/note/note.ejs',{notepad:notepadDb})
    }else{
        res.render('../views/pages/note/note.ejs',{notepad:false, id:idser})
    }
 })

router.get('/:id/newNote', async (req,res)=>{
    const idser = req.params.id
    res.render('../views/pages/note/newNote.ejs',{idser})    
})

router.post('/:id/newNote', async (req,res)=>{
    const id = req.params.id
    const {titulo,nota,tipo} = req.body
    
    if(titulo.length!=0 && nota.length!=0 && tipo.length!=0){

        const usuario = await User.findOne({where:{id}})
        await Notepad.create({titulo,nota,tipo,idser:id,nomeUser:usuario.dataValues.nome,ativo:true})
        res.redirect(`/notepad/${id}`)
    }else{
        res.render('../views/pages/avisos/jaCadastrado.ejs',{retorno:'newNote',mensagem:"Os campos título e mensagem são obrigatórios"})
    }
})

router.get('/:id/delete', async(req,res)=>{  
    const id = req.params.id
    const note = await Notepad.findOne({where:{id}})
    await Notepad.destroy({where:{id:id}})
    res.redirect(`/notepad/${note.dataValues.idser}`)
})

router.get('/:id/update', async(req,res)=>{  
    const note = await Notepad.findOne({where:{id:req.params.id}})
    res.render('../views/pages/note/alterarNote.ejs',{note:note.dataValues})
})

router.post('/:id/update', async(req,res)=>{  
    const idNote = req.params.id
    const {nota,titulo,tipo} = req.body
    console.log(confereVazio(nota,titulo))
    if(confereVazio(nota,titulo)==true){
        const note = await Notepad.findOne({where:{id:idNote}})
        await note.set({nota,titulo,tipo})
        await note.save()
        res.redirect(`/notepad/${note.dataValues.idser}`)
    }else{  
        res.render('../views/pages/avisos/jaCadastrado.ejs',{retorno:`update`,mensagem:"Os campos título e mensagem são obrigatórios"})
    }
})


module.exports = router


 