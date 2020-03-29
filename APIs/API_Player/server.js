
const express = require('express')
const app = express()
const mysql = require("mysql");
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors')


app.use(cors())

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  
  app.use(bodyParser.json())


  const PORT = 3000;
  const HOST = "0.0.0.0"; 

app.get('/', function (req, res) {
    res.send('ça marche les potos')
})


app.post('/createPartie',(req, res) =>{
    let joueur = req.body.name
    let ville =req.body.ville
    let token = crypto.randomBytes(64).toString('hex')
    if(ville == null || ville == ""){

        
        if (joueur == null || joueur == ""){
            res.status(400).send("Name null");
        }else{
            let count
            let serieId
            
            
            db.query("SELECT COUNT(id) FROM serie", function (err,result,fields){
                if (err){
                    console.error(err);
                    res.status(404).send(err);
                }else{
                    count = result[0]["COUNT(id)"]
                    serieId = Math.floor(Math.random() * Math.floor(count))+1;
                    console.log("Id série:"+serieId)
                

                    que=`SELECT COUNT(photo.desc) FROM photo INNER JOIN serie_photo ON photo.id = serie_photo.id_photo WHERE serie_photo.id_serie = ${serieId}`
                    db.query(que, function (err,result,fields){
                        if (err){
                            console.error(err);
                            res.status(404).send(err);
                        }else{

                        
                            let nbphotos = result[0]["COUNT(photo.desc)"]
                            
                            db.query(`INSERT INTO partie (token, nb_photos, status, score, joueur, id_serie) VALUES ("${token}", ${nbphotos}, 1, 0, "${joueur}", ${serieId} )`, function(err,result,fields){
                                if (err){
                                    console.error(err)
                                    res.status(404).send(err)
                                }else{
                                    console.log("Insert ville null réussi")
                                    res.send(token)
                                }
                            })

                            
                        }   
                    })

                }
            });
        }
    }else{
        postVille(joueur,ville,token)
        res.send(token)
    }

})

function postVille(joueur, ville, token){
 
        let count
        let serieId
        let idVille = []
        db.query(`SELECT id FROM serie where ville = "${ville}"`, function (err,result,fields){
            if (err){
                console.error(err);
            }else{
                result.forEach(element => {
                    idVille.push(element["id"])
                })
                count = idVille.length
                rand = Math.floor(Math.random() * Math.floor(count))
                serieId = idVille[rand]
                console.log("Id série:"+serieId)
               

                que=`SELECT COUNT(photo.desc) FROM photo INNER JOIN serie_photo ON photo.id = serie_photo.id_photo WHERE serie_photo.id_serie = ${serieId}`
                db.query(que, function (err,result,fields){
                    if (err){
                        console.error(err);
                    }else{

                    
                        let nbphotos = result[0]["COUNT(photo.desc)"]
                        
                        db.query(`INSERT INTO partie (token, nb_photos, status, score, joueur, id_serie) VALUES ("${token}", ${nbphotos}, 1, 0, "${joueur}", ${serieId} )`, function(err,result,fields){
                            if (err){
                                console.error(err);
                            }else{
                                console.log("Insert reussi d'une partie sur: "+ville+" pour le joueur: "+joueur)
                                return(token)
                            }
                        })

                        
                    }   
                })

            }
        });
    }



app.get('/createPartie',(req, res) =>{

    let count
    let serieId
    let ville
    let map_refs
    let di
    let photos = []
    let joueur

    let tokenbdd = req.query.token
    if (tokenbdd == null){
        res.status(400).send("Token null");
    }else{
        let tok = '{ "token": "'+tokenbdd+'" }'
        token = JSON.parse(tok)
        
        db.query(`SELECT id_serie,joueur FROM partie WHERE token = "${tokenbdd}"`, function (err,result,fields){
            if (err){
                console.error(err);
                res.status(404).send(err);
            }else{
                serieId =  result[0]["id_serie"]
                joueur = '{ "name": "'+result[0]["joueur"]+'" }'
                joueur = JSON.parse(joueur)
                console.log("Id série: "+serieId)
                db.query(`SELECT ville,map_refs,dist FROM serie WHERE id=${serieId}`, function (err,result,fields){
                    if (err){
                        console.error(err);
                        res.status(404).send(err);
                    }else{
                        ville = result[0]
                        result[0]["map_refs"] =JSON.parse(result[0]["map_refs"])
                        ville2 = JSON.stringify(ville)
                        ville3 = JSON.parse(ville2)


                        que=`SELECT photo.desc, photo.positionX, photo.positionY, photo.url FROM photo INNER JOIN serie_photo ON photo.id = serie_photo.id_photo WHERE serie_photo.id_serie = ${serieId}`
                        
                        db.query(que, function (err,result,fields){
                            
                            if (err){
                                console.error(err);
                                res.status(404).send(err);
                            }else{
                                let i=0
                                let taille = result.length
                                let indexs = []
                                let randomIndex
                                while(taille != indexs.length){
                                    randomIndex = Math.floor(Math.random() * Math.floor(taille))
                                    if (!indexs.includes(randomIndex)){
                                        indexs.push(randomIndex)
                                    }
                                }
                                console.log(indexs)

                                result.forEach(element => {
                                    photos.push('"'+indexs[i]+'":'+JSON.stringify(element))
                                    i++
                                });

                                let photoLength = photos.length 
                                let finalPhotos = []
                                let pho
                            
                                while(photoLength != finalPhotos.length){
                                    pho = photos[Math.floor(Math.random() * Math.floor(photoLength))]
                                    if (!finalPhotos.includes(pho)){
                                        finalPhotos.push(pho)
                                    }
                                }
                                           
                                let nb = '{ "nb_photo": '+photoLength+' }'
                                nombre = JSON.parse(nb)
                                let bababa = '{ "photos":{'+finalPhotos+'} }'
                                photos = JSON.parse(bababa)
                                //console.log(bababa)
                                //console.log(photos)
                                final = Object.assign(nombre, joueur)
                                final = Object.assign(final,ville3 )
                                final = Object.assign(final, photos)
                                res.send(final)
                                
                            }
                        })
                    }
        
                });
            }


        });
    }

})


app.put('/updatePartie', (req,res)=>{

    let token = req.body.token
    let score = req.body.score
    console.log("token: "+token+ ", score: "+score)
    if(token == null){
        res.status(400).send("Token null");
    }else if(score == null){
        res.status(400).send("Score null");
    }else{

        db.query(`UPDATE partie SET score = ${score}, status = 2 WHERE token = "${token}"`, function(err,result,fields){
            if (err){
                console.error(err);
                res.status(404).send(err);
            }else{
                res.send("Update effectuée") 
                console.log("Update effectuée")
            }
        })
    
    }
})


app.get('/getScore', (req,res)=>{
    let score = []
    let que=`SELECT partie.joueur, partie.score, serie.ville FROM partie INNER JOIN serie ON partie.id_serie = serie.id WHERE partie.status = 2 ORDER BY length(partie.score) DESC, partie.score DESC LIMIT 20`
                  
        db.query(que, function (err,result,fields){
            let i = 1
            if (err){
                console.error(err);
                res.status(404).send(err);
            }else{
                result.forEach(element => {

                    let elem = '{ "id": "'+i+'" }'
                    elem = JSON.parse(elem)
                    let temp = Object.assign(elem,element)
                    score.push('"'+i+'":'+JSON.stringify(temp))
                    console.log(JSON.stringify(temp))
                    i++
                });
                let final = '{ "scores":{'+score+'} }'
                console.log(i)
                res.send(JSON.parse(final))
            }
        })
        

})

app.get('/getPlayerScore', (req,res)=>{
    let score = []
    let player = req.query.name
    let que=`SELECT partie.joueur, partie.score, serie.ville FROM partie INNER JOIN serie ON partie.id_serie = serie.id WHERE partie.status = 2 ORDER BY length(partie.score) DESC, partie.score DESC`
                  
        db.query(que, function (err,result,fields){
            let i = 1
            let trouve = false
            if (err){
                console.error(err);
                res.status(404).send(err);
            }else{
                result.forEach(element => {
                    if (element["joueur"] == player){
                        let elem = '{ "classement": '+i+' }'
                        elem = JSON.parse(elem)
                        let temp = Object.assign(elem,element)
                        console.log('{ "scores":{'+temp+'} }')
                        score.push(temp)
                        trouve = true
                    }
                    i++
                   
                });
                if(trouve == false){
                    res.send("Pas de score attribué à ce joueur")
                }else{
                    res.send(score)
                }
                
            }
        })
        
})


app.get('/getVilles',(req,res)=>{
    let que = "SELECT DISTINCT ville FROM serie"
    let final = []
    let i = 0
    db.query(que, function (err,result,fields){
        if (err){
            console.error(err);
            res.status(404).send(err);
        }else{
            result.forEach(element=>{

                let elem = '{ "id": '+i+' }'
                elem = JSON.parse(elem)
                let temp = Object.assign(elem,element)
                final.push(temp)
                i++
            })
            res.send((final))
        }
        
    })
})




let db = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "geoquizz"
});
/** 
db.connect(err => {
    if (err) {
        return err;
    }
    console.log("Connected to database");
})*/

/**let db = mysql.createPool({
    connectionLimit: 10,
    host: "db",
    user: 'root',
    password:'root',
    database: 'geoquizz',
    
})*/

function startConnection() {
    console.error('CONNECTING');
    db = mysql.createConnection({
        host: "mysql",
        user: "root",
        password: "root",
        database: "geoquizz"
    });
    console.log(db)
    db.connect(function(err) {
        if (err) {
            console.error('CONNECT FAILED', err.code);
            startConnection();
        }
        else
            console.error('CONNECTED');
    });
    db.on('error', function(err) {
        if (err.fatal)
            startConnection();
    });
}

startConnection();

app.listen(PORT, HOST);
console.log(`API Player Running on http://${HOST}:${PORT}`)

// ------------------ GET ------------------
app.get("*", (req, res) => {
    res.status(400).json({ "type": "error", "error": 400, "message": "Ressource non disponible : " + req._parsedUrl.pathname });
    res.status(500).json({ "type": "error", "error": 500, "message": "Pb serveur : " + req._parsedUrl.pathname });
});

// ------------------ PUT ------------------
app.put("*", (req, res) => {
    res.status(400).json({ "type": "error", "error": 400, "message": "Ressource non disponible : " + req._parsedUrl.pathname });
    res.status(500).json({ "type": "error", "error": 500, "message": "Pb serveur : " + req._parsedUrl.pathname });
});