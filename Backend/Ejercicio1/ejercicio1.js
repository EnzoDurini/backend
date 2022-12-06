
class ProductManager{

    constructor(){
        this.products = [];
    }
    getProducts(){
        return this.products
    }
    addProduct(title,description,price,thumbnail,code,stock){
        let product ={title,description,price,thumbnail,code,stock}
        let response
        
        for (let i = 0; i < this.products.length; i++){
            if (this.products[i].description === description){
                console.log(this.products[i].description);
                console.log(description)
                console.log("elemento repetido");
            }
            response = "Este producto ya esta agregado"
            break;
        }
        if (this.products.length === 0){
            product["id"] = 1;
    }else{
        product ["id"] = this.products[this.products.length - 1]["id"]+1
    }
    this.products.push(product)
    return response 
    }
getProductById(prodId){
        let prod
        for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id !== prodId) {
            prod = "Product not found"
            }
            else{
                prod = this.products[i] + "product found"
            }  
        }
        console.log(prod)
        }
      }




const chairs = new ProductManager();
console.log(chairs.getProducts());
chairs.addProduct(
    "producto prueba",
    "este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    26
)
chairs.addProduct(
    "producto prueba",
    "este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    26
)
console.log(chairs.getProducts())

chairs.getProductById(1)