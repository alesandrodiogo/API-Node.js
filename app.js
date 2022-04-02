const express = require('express');
const Livros = require('./models/Artigo');
const app = express();
const cors = require('cors');
require('./models/database')


app.use(express.json());

app.use((req,res,next)=>{
    //console.log("Acessou o Middleware");
    res.header(" Access-Control-Allow-Origin","*") //permite qual site pode fazer requisicao, "*" permite q qualquer site ou url pode fazer requisicao
    res.header("Access-Control-Allow-Methods",'GET,PUT,POST,DELETE')
    app.use(cors())
    next();
});

//Selecionar todos os registos
app.get("/", function(req,res){
    Livros.findAll().then((livros)=>{
        return res.json(livros);
    }).catch((erro)=>{
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});
//Visualizar apenas um dado
app.get("/artigo/:id", (req, res) => {
         /*console.log(req.params.id);
         return res.json(req.params.id);*/
         Livros.findOne({ where:{id:req.params.id }}).then((livros) => {
            return res.json(livros);
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                message: "Nenhum artigo encontrado!"
            })
        })
})

//Cadastro 
app.post("/cad-artigo", (req,res)=>{
    /*console.log(req.body);
    return res.json(req.body);*/
     const  livros = Livros.create(req.body, (err)=>{
           if(err) return res.status(400).json({
               error: true,
               message: "Erro: Artigo nao foi cadastrado com sucesso!"
           });
           return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
       })
});

//Update dados
app.put("/artigo/:id", (req, res) => {

    const livros = Livros.update(req.body,{where:{id: req.params.id}}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Artigo não foi editado com sucesso!"
        });

        return res.json({
            error: false,
            message: "Artigo editado com sucesso!"
        });
    });
});

app.delete("/artigo/:id", (req,res)=>{
     const livros = Livros.destroy({where:{id: req.params.id}}, (err) =>{
         if(err) return res.status(400).json({
             error: true,
             message: "Erro: Artigo nao foi apagado com sucesso!"
         });
         return res.json({
             error: false,
             message: "Artigo apagado com sucesso!"
         })
     })
});

app.listen(8080, ()=>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080/")
});