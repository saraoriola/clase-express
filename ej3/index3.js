const express = require("express");
const app = express();

const products = [
    { id: 1, name: 'Harry Potter Mug', price: 300},
    { id: 2, name: 'FIFA 22 PS5', price: 1000},
    { id: 3, name: 'Goku Super Saiyan Figure', price: 100},
    { id: 4, name: 'Zelda Breath of the Wild', price: 200},
    { id: 5, name: 'Valorant Skin', price: 120},
    { id: 6, name: 'Star Wars Mug', price: 220}
];

app.use(express.json());

app.get("/products", (req, res) => {
  res.send({results: products});
});

app.post("/products", (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
    };

    if (!req.body.name || !req.body.price) {
        res.status(400).send({ msg: "Please fill all inputs" });
    } else {
        products.push(newProduct);
        res.status(201).send({ newProduct });
    }
});


app.put("/id/:id",(req,res)=>{
    const found = products.some(product => product.id == req.params.id);
    if(found){
        products.forEach(product=>{
            if(product.id == req.params.id){
                product.name = req.body.name ? req.body.name : product.name;
                product.price = req.body.price ? req.body.price : product.price;
                res.send(product);
            }
        });
    }else{
        res.status(404).send({msg:`Producto with id ${req.params.id} not found`});
    }
});

app.delete("/id/:id",(req,res)=>{
    const found = products.some(product => product.id == req.body.id)
    if(found){
     res.send(products.filter(product => product.id != req.body.id))
    }else{

        res.status(404).send({msg:`Product with id ${req.body.id} not found`})
    }
});

app.get("/products/filter/price", (req, res) => {
    const minPrice = req.query.min || 0;
    const maxPrice = req.query.max || Infinity; 
    
    const filteredProducts = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    
    res.send({ results: filteredProducts });
  });
  


app.listen(8081, () => {
  console.log("Server started on port 3000");
});
