const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next) => {
  var now =new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n' , error => {
    console.log('Unable to save log', error)
  })
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance');
// })

app.get('/',(req,res) => {
  res.render('home.hbs',{
    title:'Home page',
    welcomeMessage: 'Welcome to my website',
  })
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    title: 'About page'
  })
})

app.get('/bad', (req,res) => {
  res.send({errorMessage: 'Oops!'})
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`)
});
