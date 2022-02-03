
module.exports = {

    confereTamanho(nome,senha){
        if (nome.lenght==0 || nome.lenght<3 || senha.lenght==0 || senha.lenght<8) return false 
        else return true
    },
    compatibilidade(nome,senha,obj){
        if (obj != null) {
            if (nome != obj.dataValues.nome || senha != obj.dataValues.senha) return false 
            else return true
        }
    },
    confereVazio(obj1, obj2){
        console.log(obj1,obj2)
        if (obj1.lenght==0 || obj2.lenght==0){
            return false 
        } else {
            return true 
        }
    }
   
}


   

