var express = require('express');
var morgan = require('morgan');

var app = express();
//variabile di prova
var memorie = [{numero: 1 , testo : 'testo di prova'}, {numero: 2 , testo : 'altro testo'}, {numero: 3 , testo : 'ancora testo'}];

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
// get visualizza
app.get('/memorie', function (req,res) {
    res.json(memorie);
})

// get nascondi
app.get('/memorie', function (req,res) {
    res.json(memorie);
})

// post
app.post('/memorie', function (req,res) {
    var {testo} = req.body;
    memorie.push({
      numero : memorie.length +1,
      testo : testo});
    res.json('Memoria creata con successo');
//    console.log(req.body);
//    res.send('memoria ricevuta')
})

//put
app.put('/memorie/:id', function (req,res) {
    var numero = req.params.id;
    var testo = req.body.testo;
    memorie.forEach(function (memoria,i) {
        if (memoria.numero == numero){
          memoria.testo = testo;
        }
    })
    res.json('Modificato!');
})
//delete
app.delete('/memorie/:id', function (req,res) {
  var numero = req.params.id;
  memorie.splice(numero-1,1);
  for(i=1;i<=memorie.length;i++){
    memorie[i-1].numero=i;
    }
  res.json(memorie);
});

// static files
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(3000);
console.log('Server sulla porta 3000');
