const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/app.routes.js');
const viewsRouter = require( './routes/views.routes.js' );
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');


const app = express();
const PORT = process.env.PORT || 8080;

const httpServer = app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});

const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + './public'));
app.use('/realtimeproducts', viewsRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './public')));

app.use('/api', apiRoutes);


httpServer.on('error', (error) => {
    console.error('Error: ', error);
});

const products = [{title: "lapiz", price: 100}];

io.on('connection', socket =>{
    console.log('nuevo cliente conectado');
    
    socket.emit('products', products);

    socket.on('products', (data) => {
        io.emit('product', data);
    });
    
    socket.on('products', (data) => {
        if (data != null) {
            const product = {
            title: data.title,
            price: data.price
            }
            products.push(product);
        }
        io.emit('products', products)
      });
});

app.use('*', (req, res) =>{
    res.status(404).send(`error: ruta ${req.url} metodo ${req.method} no autorizado`);
});