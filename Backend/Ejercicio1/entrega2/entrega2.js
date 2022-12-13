const fs = require ('fs')
class ProductManager{
    constructor(fileName){ 
        this.path = fileName;
    };

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                let products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            }else{
                return products = [];
            }

        }catch(error){
            console.log(error);
        }
    }
    async addProduct(title,description,price,thumbnail,code,stock){
        
        try{
            let product ={title,description,price,thumbnail,code,stock}
        let products = await this.getProducts();
        if (products.length === 0){
            product["id"] = 1;
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        }
            else{
                let verification = products.find(prod => prod['code'] === code)
                if(!verification){
                    product ["id"] = products[products.length - 1]["id"]+1
                    products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                }
                else{
                    console.log ("Product already exist")
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async getProductById(prodId){
            try{
            let products = await this.getProducts();
            let prod = products.find(prod => prod['id'] === prodId)
                if(prod == null){
                    console.log("Product not found");
                    return null;
                }
                else{
                    return prod
                }
            }catch(e){
                console.log(e)
            }
        }
    
    async updateProduct(id, title, description, price, thumbnail, code, stock){
        try {
            let products = await this.getProducts();
            let prod = products.find(prod => prod['id'] === id);
            if (prod != null){
                prod.title = title;
                prod.description = description;
                prod.price = price;
                prod.thumbnail = thumbnail;
                prod.code = code;
                prod.stock = stock;
                await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
            }
        } catch (e) {
            console.log(e);
            
        }
    }

    async deleteProduct(id){
        try {
            let products = await this.getProducts();
            let prod = products.find(prod => prod['id'] === id);
            if(prod!= null){
                products.splice(products.indexOf(prod), 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        } catch (e) {
            console.log(e);
            
        }
    }

}

let fileName = "./Products.JSON";
let products = new ProductManager(fileName);

products.getProducts().then((res) => console.log(res));

products.addProduct('producto1', 'Descripcion', 200, 'none', 'code123', 25).then((res) => console.log(res));

