var csv = require("csvtojson");


exports.get = (req, res) => {
    if (Number(req.params.page) <= 0) {
        res.redirect('/reportes/1')
    }
    csv()
        .fromFile('./public/codigom.csv')
        .then(function(jsonArrayObj) { //when parse finished, result will be emitted here.
            let page = req.params.page;


            let finalRegister = page.toString() + 0
            let initialRegister = Number(finalRegister) - 10

            let array = jsonArrayObj.slice(initialRegister, page.toString() + 0)


            page = page + 41;
            let arrayTemp = jsonArrayObj.slice(initialRegister, page.toString() + 0)
            let pageRestant = Object.keys(arrayTemp).length

            res.render('reportes/index', { json: array, page: req.params.page, initialRegister: initialRegister, pageRestant: pageRestant })
        })
}
exports.download = function(req, res) {

    csv()
        .fromFile('./public/codigom.csv')
        .then(function(jsonArrayObj) {
            var json = JSON.stringify(jsonArrayObj);

            var filename = 'reportes.json';
            var mimetype = 'application/json';

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            res.write(json, function(err) {
                res.end();
            })
        })


};