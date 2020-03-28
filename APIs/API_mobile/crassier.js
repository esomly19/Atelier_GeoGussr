//get de toute les séries (que pour le backoffice)
//avec pagination 
app.get('/serie',(req, res) => {
    let page = 1
    if (req.query.page != null && req.query.page > 0) {
        page = req.query.page
    }
    let size = 10
    if (req.query.size != null && req.query.size > 0) {
        size = req.query.size
    }

    let startIndex = (page - 1) * size
    let endIndex = page * size
    let count = 0

    res.type("application/json;charset=utf-8");
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    let query = "SELECT * FROM serie ORDER BY id ASC"; // query database to get all the players

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(404).send(err);
        }else{
            
            let serieList = {};
            let serie = {};
            
            result.forEach(lm => { 
                serie.serie = {
                    id: lm.id,
                    ville: lm.ville,
                    map_refs: lm.map_refs,
                    dist: lm.dist
                }
                // serie.links = { self: { href: `/serie/${lm.id}`} };
                serieList.push(serie);
                serie = {};
                count++;
            })

            let nbpage = Math.ceil(count / size)
            if (page > nbpage) {
                page = nbpage
                startIndex = (page - 1) * size
                endIndex = page * size
            }

            let data = {};
            data.type = "collection";
            data.count = count;
            data.size = serieList.slice(startIndex, endIndex).length;
            
            if (startIndex > 0){
                let previous = SERVER + parseInt(parseInt(page) - 1) + "&size=" + size;
                data.previous = previous;
            }

            if (endIndex < count){
                let next = SERVER + parseInt(parseInt(page) + 1) + "&size=" + size;
                data.next = next;
            }

            data.series = serieList.slice(startIndex, endIndex);

            res.status(200).send(JSON.stringify(data));
            // res.status(200).send('test');
        }  
    });
})