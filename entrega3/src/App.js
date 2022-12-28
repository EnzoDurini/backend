import express from 'express'
import ProductManager from './ProductManager.js'
const app = express()
app.use(express.urlencoded({extended:true}))

app.get('/', (request,response)=>{
    response.send('Hi, how are You?')})

app.get('/products', async (req, res )=>{
try {
    let limit = req.query.limit
    if(limit != null || limit > 0) {
        const products = await ProductManager.getProducts();
        const productsLimit = products.slice(0, limit);
        res.json(productsLimit);
    }else{
        const products = await ProductManager.getProducts();
        res.json(products);
    }
} catch (error) {
    res.send(console.log("Error: ", error))
}
})

app.get('/products/:pid', async (req,res) =>{

    try { 
        let {pid} = req.params;
        console.log(pid)
        let product = await ProductManager.getProductById(parseInt(pid))
        res.json(product)
        
    } catch (e) {
        res.send(console.log("Error:", e))
    }})

app.get('*', (req,res)=>{
    res.send('Page not found')
})

app.listen(8080, ()=> {console.log('Server running on port', 8080);})
