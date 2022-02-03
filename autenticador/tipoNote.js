const User = require('../models/user')
const Notepad = require('../models/note')

module.exports = {

    separaCor(tipo){
        tipoDado = tipo.trim().toLowerCase()
        if(typeof(tipoDado)==String){
            const cor = tipoDado.substr(-3,3)
            const tamanho = tipoDado.length - cor.length
            const grupo = tipoDado.substr(0,tamanho)
            return{grupo,cor}
        }
    },
    
    geraCor(tipo){
        const corCriada = Math.floor(Math.random()*1000)
        const grupoCriado = tipo.concat(corCriada)
        return grupoCriado
    },

   async corExiste(tipo){
       const id = 120
        const usuario = await Notepad.findAll({where:{idser:id}})
        console.log(usuario)
        const a = Object.values(usuario)
        console.log(a)
        /* if(tipos.filter(tipo)==0){
            const grupo = geraCor(tipo)
            console.log(grupo)
            return grupo
        } */
    }

   
}

