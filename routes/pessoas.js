const express = require('express')

const router = express.Router()

let listaPessoas = [
    {
        id: 1,
        nome:"Jon Snow",
        idade:19,
        email:"Jon@gmail.com",
        telefone:61981376543
    },
    {
        id: 2,
        nome:"Daenerys",
        idade:18,
        email:"Daenerys@gmail.com",
        telefone:61987524593
    },
    {
        id: 3,
        nome:"Jorah",
        idade:28,
        email:"Jorah@gmail.com",
        telefone:61982540782
    }
]

function validarPessoa(req,res,next){
    const id = req.params.id
    const pessoa  = listaPessoas.find(pessoa => pessoa.id == id)
    const index = listaPessoas.findIndex(pessoa => pessoa.id == id)
    if (pessoa){
        res.pessoa = pessoa
        res.index = index
        return next()
    }
    return res.status(404).json({mensagem: "Pessoa não encontrada!"})
}

function validarAtributos(req, res, next) {
    const dados = req.body
    if(!dados.nome || !dados.idade || !dados.email || !dados.telefone ){
        return res.status(400).json({mensagem:"Nome,idade,email e telefone são obrigatórios"})
    }
    return next()
}


router.get('/pessoas',(req,res)=>{
    res.json(listaPessoas)
})

router.get('/pessoas/:id',validarPessoa,(req,res)=>{
    res.json(pessoa)
})

router.post('/pessoas',validarAtributos,(req,res)=>{
    const dados = req.body
    console.log(req.body)

    const pessoa = {
        id: Math.round(Math.random() * 1000),
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    }

    listaPessoas.push(pessoa)

    res.json({
        mensagem:"Pessoa cadastrada com sucesso!",
        const:pessoa
    })
})

router.put('/pessoas/:id',validarAtributos, (req,res) => {
    const dados = req.body

    const pessoaAtualizada = {
        id: Number(id),
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    }

    listaPessoas[res.index] = pessoaAtualizada

    res.json({
        mensagem:"Pessoa atualizada com sucesso!",
        pessoa: pessoaAtualizada
    })
})

router.delete('/carros/:id',validarPessoa,(req,res)=>{
    listaPessoas.splice(res.index,1)
    res.json({mensagem:"Pessoa excluída com sucesso!"})

})


module.exports = router