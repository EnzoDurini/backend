import express, { response } from 'express'
import ProductManager from './ProductManager'
const app = express()
app.use(express.urlencoded({extended:true}))

app.get('/', (request,response)=>{
    response.send('Hi, how are You?')

})

app.get('/products', (request, response )=>{
    let limit = parseInt(request.query.limit)
try {
    if (limit === 0 || !limit){
        response.json(ProductManager.getProducts())}
        else{
            const arrayProducts = ProductManager.getProducts()
            let arrayLimit = arrayProducts.slice(0,limit)
        }
} catch (error) {
    res.send(console.log("Error: ", error))
}
})

app.get('/products/:pid', async(req,res) =>{
    let pid = parseInt(req.params.pid);
    let response = await ProductManager.getElementById(pid)
    console.log(response)
    res.json(response || {"Error": "product not found"})

})

app.get('*', (req,res)=>{
    res.send('Page not found')
})