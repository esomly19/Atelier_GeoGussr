
const express = require('express')
const mysql = require("mysql")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


// Constants
const PORT = 3000;
const HOST = "0.0.0.0";
const SERVER = "http://docketu.iutnc.univ-lorraine.fr:19501/"

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json());
app.use(cors())



app.get('/', function (req, res) {
    res.send('api mobile de geogasurr')
})

// ------------ Les series -----------------

//get de toute les séries
app.get('/serie',(req, res) => {
    let count = 0;

    let query = "SELECT * FROM serie ORDER BY id ASC";
    db.query(query, (err, result) => {
        if (err){
            console.error(err);
            res.status(400).send(err);
        }else{
            let serieList = [];
            let serie = {};
            result.forEach(lm => {
                serie = {
                    id: lm.id,
                    ville: lm.ville,
                    map_refs: JSON.parse(lm.map_refs),
                    dist: lm.dist
                }
                serie.links = {
                    self: { href: `${SERVER}serie/${lm.id}`}, 
                    photos: { href: `${SERVER}photo/serie/${lm.id}`}
                }
                serieList.push(serie);
                serie = {};
                count++;
            });

            let data = {};
            data.type = "collection";
            data.count = count;
            
            data.series = serieList;

            res.status(200).send(data);


         }
     })
})

// get sur une serie via son id
app.get('/serie/:id',(req, res) => {
    let id = req.params.id;
    let query = `SELECT * FROM serie WHERE id= "${id}" `;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        if (result.length <= 0) {
            console.log(req.params.id + " Inexistant");
            res.status(404).json({ "type": "error", "error": 404, "message": "Ressource non disponible : " + req._parsedUrl.pathname });
        }else{
            let serie = {
                "id": result[0].id,
                "ville": result[0].ville,
                "map_refs": JSON.parse(result[0].map_refs),
                "dist": result[0].dist,
                "photos": { href: `${SERVER}photo/serie/${result[0].id}`}
            };
            res.status(200).send(serie);
        }
    });
});



// put sur une serie via son id
app.put('/serie/:id',(req, res) => {
    res.type("application/json;charset=utf-8");

    let id = req.params.id;
    let serie = JSON.stringify(req.body);
    let objSerie = JSON.parse(serie);

    let ville = objSerie.ville;
    let map_refs =  JSON.stringify(objSerie.map_refs)
    let dist = objSerie.dist;



    let query = `UPDATE serie SET ville = "${ville}", map_refs= '${map_refs}', dist = "${dist}" WHERE id= "${id}" `;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(404).send(err);
        }
        if (result.affectedRows == 0) {
            console.log("La commande " + req.params.id + " est inexistante");
            res.status(404).json({ "type": "error", "error": 404, "message": "Ressource non disponible : " + req._parsedUrl.pathname });
        }else{
            res.status(201).send(JSON.stringify({ message: "update reussi sur serie n°"+ id, serie: req.body}));
        }
    });

});



//post d'une série
app.post("/serie", (req,res) => {

    //Attention c'est pour le backoffice
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    let serie = JSON.stringify(req.body);
    let objSerie = JSON.parse(serie);

    let ville = objSerie.ville;
    let map_refs = JSON.stringify(objSerie.map_refs);
    let dist = objSerie.dist;
    let id = 0 ;

    let query = `INSERT INTO serie (ville,map_refs,dist) VALUES ("${ville}",'${map_refs}',"${dist}") `;

    db.query(query, (err,result) => {
        if (err) {
            console.error(err);
            res.status(404).send(err);
        }else{
            res.status(201).send(JSON.stringify({ id : result.insertId}));
        }
    })
})




// -------------------- PHOTO ---------------------


//get sur tout les photos avec filtre de nom de ville
app.get('/photo',(req,res) => {
    let count = 0
    let query = "";

    let ville = null
    if (req.query.ville != null){
        ville = req.query.ville; 
    }

    if(ville){
        query = `SELECT * FROM photo INNER JOIN serie_photo INNER JOIN serie  WHERE photo.id = serie_photo.id_photo AND serie_photo.id_serie = serie.id AND serie.ville = "${ville}" ORDER BY photo.id ASC`;
    }else{
        query = `SELECT * FROM photo ORDER BY id ASC`;
    }
    db.query(query, (err,result) =>{
        
        if(err){
            console.error(err);
            res.status(400).send(err);
        }else{
            let photoList = [];
            let photo = {};

            result.forEach(lm => {
                
                photo = { 
                    id: lm.id,
                    desc: lm.desc,
                    positionX: lm.positionX,
                    positionY: lm.positionY,
                    url: lm.url
                }
                photo.links = { self: { href: `${SERVER}photo/${lm.id}`}}
                photoList.push(photo);
                photo = {};
                count++; 
            });

            

            let data = {};
            
            data.type = "collection";
            data.count = count;

            if(ville){
                data.ville = ville;
            }
            data.photos = photoList;
            
            res.status(200).send(data);

        }
    })
})

//get sur une photo via son id
app.get("/photo/:id", (req,res) => {
    let id = req.params.id;

    let query = `SELECT * FROM photo WHERE id= "${id}" `;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        if (result.length <= 0) {
            console.log(req.params.id + " Inexistant");
            res.status(404).json({ "type": "error", "error": 404, "message": "Ressource non disponible : " + req._parsedUrl.pathname });
        }else{
            let photo = {
                "id": result[0].id,
                "desc": result[0].desc,
                "positionX": result[0].positionX,
                "positionY": result[0].positionY,
                "url": result[0].url
            };
            res.status(200).send(photo);
        }

    })
})


//get les photos d'une serie
app.get("/photo/serie/:idserie", (req,res) => {
    let idserie = req.params.idserie;
    let count = 0;

    // let query = `SELECT * FROM photo INNER JOIN serie_photo WHERE photo.id = serie_photo.id_photo AND serie_photo.id_serie = 1`;
    let query = `SELECT * FROM photo INNER JOIN serie_photo WHERE photo.id = serie_photo.id_photo AND serie_photo.id_serie = "${idserie}" `;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        if (result.length <= 0) {
            console.log(req.params.idserie + " Inexistant");
            res.status(404).json({ "type": "error", "error": 404, "message": "Ressource non disponible : " + req._parsedUrl.pathname });
        }else{
            let photoList = [];
            let photo = {};

            result.forEach(lm => {
                photo = {
                    "id": lm.id,
                    "desc": lm.desc,
                    "positionX": lm.positionX,
                    "positionY": lm.positionY,
                    "url": lm.url
                };
                photoList.push(photo);
                count++
            })

            let data = {};
            data.type = "collection";
            data.count = count;
            data.photos = photoList;
            res.status(200).send(data);
        }

    })
})

//post d'une photo avec metadonnée + URL
app.post("/photo", (req,res) => {
    let photo = JSON.stringify(req.body);
    let objPhoto = JSON.parse(photo);

    let desc = objPhoto.desc;
    let positionX = objPhoto.positionX;
    let positionY = objPhoto.positionY;
    let url = objPhoto.url;

    let query = "INSERT INTO `photo` (`desc`,`positionX`,`positionY`,`url`) VALUES ('"+desc+"',"+ positionX +","+ positionY +",'"+ url +"')"

    db.query(query, (err,result) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        }else{
            res.status(201).send("creation de photo reussi")
        }
    })
})


//-------------- utilisateur ---------------
//permet de ce connecter
app.post("/connexion", (req,res) => {
    let utilisateur = JSON.stringify(req.body);
    let objUtilisateur = JSON.parse(utilisateur);

    let query = `SELECT * FROM utilisateur WHERE email = "${objUtilisateur.email}"`;

    db.query(query, (err,result) => {
       
        if(err) {
            console.error(err);
            res.status(404).send(err);
        }else{
            if(result >=  0){
                res.status(404).send("email ou mot de passe invalide");
            }else{
                if(!bcrypt.compareSync(objUtilisateur.password,result[0].password)){
                    res.status(404).send("email ou mot de passe invalide");
                }else{
                    res.status(200).send("connexion accepté");
                }
            }
             
        }
    })

});

//crée un utilisateur
app.post("/utilisateur", (req,res) => {
    let utilisateur = JSON.stringify(req.body);
    let objUtilisateur = JSON.parse(utilisateur);
    
    let query = `SELECT * FROM utilisateur where 'email' = "${objUtilisateur.email}" `
    db.query(query, (err,result) => {
        if(err) {
            console.error(err);
            res.status(404).send(err);
        }else{
            if(result > 0){
                res.status(403).send("le compte existe déjà")
            }else{
                const salt = bcrypt.genSaltSync(4);
                const hash = bcrypt.hashSync(objUtilisateur.password, salt);
                let query2 = `INSERT INTO utilisateur(email,password) VALUES ('${objUtilisateur.email}','${hash}')`;

                db.query(query2, (err,result) => {
                    if(err){
                        console.error(err);
                        res.status(404).send(err);
                    }else{
                        res.status(201).send("créer");
                    }
                })
            }
        }
    })
})


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

app.listen(PORT, HOST);
console.log(`API Running on http://${HOST}:${PORT}`)
 