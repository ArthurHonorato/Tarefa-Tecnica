//Autor: Arthur Honorato dos Santos Silva

//Bibliotecas utilizadas, express, body parser e axios.

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios");

//Configurando o body parser que será responsável por buscar os dados do formulário e trazer ao back-end.

    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

//Abrindo a página em html do front-end, a qual contém o formulário.

app.get("/", function(req,res){
    res.sendFile(__dirname + "/main.html");
});

//Utilizando do mesmo método do formulário (post), aqui inicia a principal função node desse código.

app.post("/retorno", function(req,res){
    //Criada a função para calcular a renda per capta do usuário.

    function calculoRendaPerCapta(renda,dependentes){
        
        var rendaPerCapta = renda/dependentes;
        
        return rendaPerCapta;
    }
    //No possível caso de algum dos campos do formulário estar em branco, tirando o de nome, o usuário é avisado e pode retornar à página inicial através de um botão.

    if(req.body.cep === "" || req.body.dependentes === "" || req.body.renda === ""){
        res.sendFile(__dirname + "/retornoCampoEmBranco.html");
    }else{
        //Utilizando o CEP informado no formulário, através da biblioteca axios, é possível fazer a conexão api com o link do ViaCEP. 
        //Todos os dados do link api ficam salvos na variável 'endereco'. Para acessar os dados que queremos, é necessário usar 'endereco.data', onde fica guardado os dados de endereço completo.
        axios.get("https://viacep.com.br/ws/"+ req.body.cep +"/json/").then(function(endereco){
            
            if(endereco.data.cep == undefined){
                //Caso o CEP informado não exista, o retorno do valor de cep do link api ficará indefinido(undefined), dessa forma, o usuário será avisado e poderá retornar à página inicial através de um botão. 
                res.sendFile(__dirname + "/retornoCEPinvalido.html");

            }else if (req.body.nome === ""){
                
                //A função de calcular a renda per capta é chamada utilizando-se os dados obtidos do formulário com a biblioteca body parser.
                var rendapercapta = calculoRendaPerCapta(req.body.renda,req.body.dependentes);
                rendapercapta = rendapercapta.toFixed(2);

                //Caso esteja tudo certo e nome o usuário não for informado, os dados do endereço completo e sua renda per capta serão informados na página, porém seu nome será dado como não informado.
                res.send('<html><head><title>Dados do titular</title>' +
                '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>' +
                '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>' +
                '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' +
                '</head><body>' + '<br><br><br><br>' + '<center><h1 class="main-title">Dados do titular</h1><br><br>' +
                '<h3>Nome do titular: ' + "Não informado" + 
                '<br><br>Endereço do titular:<br>CEP - ' + endereco.data.cep + 
                '<br>Bairro - ' + endereco.data.bairro + 
                '<br>Localidade - ' + endereco.data.localidade + 
                '<br>UF - ' + endereco.data.uf + 
                '<br><br>Valor da renda per capta: R$ ' + rendapercapta + 
                '</h3><br><form action="/">' + 
                '<button type="submit" class="btn btn-primary btn-lg">Retornar à página inicial</button></form>' + 
                '</center></body></html>');
            }else{
                
                //A função de calcular a renda per capta é chamada utilizando-se os dados obtidos do formulário com a biblioteca body parser.
                var rendapercapta = calculoRendaPerCapta(req.body.renda,req.body.dependentes);
                rendapercapta = rendapercapta.toFixed(2);
                
                //Caso esteja tudo certo e nome o usuário for informado, os dados do endereço completo, nome e seu renda per capta serão informados na página.
                res.send('<html><head><title>Dados do titular</title>' +
                '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>' +
                '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>' +
                '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' +
                '</head><body>' + '<br><br><br><br>' + '<center><h1 class="main-title">Dados do titular</h1><br><br>' +
                '<h3>Nome do titular: ' + req.body.nome + 
                '<br><br>Endereço do titular:<br>CEP - ' + endereco.data.cep + 
                '<br>Bairro - ' + endereco.data.bairro + 
                '<br>Localidade - ' + endereco.data.localidade + 
                '<br>UF - ' + endereco.data.uf + 
                '<br><br>Valor da renda per capta: R$ ' + rendapercapta + 
                '</h3><br><form action="/">' + 
                '<button type="submit" class="btn btn-primary btn-lg">Retornar à página inicial</button></form>' + 
                '</center></body></html>');
            }        
        });
    }        
});

//Servidor aberto na porta 8081

app.listen(8081, function(){
    console.log("SERVIDOR RODANDO!");
});