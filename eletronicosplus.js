//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/eletronicosplus',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});


//criando a model/collection do seu projeto - começo da model usuario
const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : { type : String}
});


const Usuario = mongoose.model("Usuário", UsuarioSchema);


//configurando os roteamentos da model usuario
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha

    //como fica no postman pra add 
    const usuario = new Usuario({
        email : email,
        senha : senha
    })


    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }

});
// fim da model usuario 


// começo da model especifica - produtoeletronico
const ProdutoeletronicoSchema = new mongoose.Schema({
    id_produtoeletronico : {type : Number, required : true},
    descricao : {type : String},
    marca : {type : String},
    data_fabricacao : {type : Date},
    anos_garantia : {type : Number}
});


const Produtoeletronico = mongoose.model("Produtoeletronico", ProdutoeletronicoSchema);


//configurando os roteamentos da model cadastroeletronico
app.post("/cadastroprodutoeletronico", async(req, res)=>{
    const id_produtoeletronico = req.body.id_produtoeletronico;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const data_fabricacao = req.body.data_fabricacao;
    const anos_garantia = req.body.anos_garantia;


    //como fica no postman pra add 
    const produtoeletronico = new Produtoeletronico({
        id_produtoeletronico : id_produtoeletronico,
        descricao : descricao,
        marca : marca,
        data_fabricacao : data_fabricacao,
        anos_garantia : anos_garantia
    })


    try{
        const newProdutoeletronico = await produtoeletronico.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newProdutoeletronico._id});
    } catch(error){
        res.status(400).json({error});
    }

});


//rota raiz - inicio do inw por causa da pág html
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});


//configurando a porta - pra ler que vc ta usando a porta 3000 no mongo e no postman
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});