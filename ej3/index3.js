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
    const found = products.some(products => products.id == req.params.id)
    if(found){
        products.forEach(product=>{
            if(product.id == req.params.id){
                product.name = req.body.name ? req.body.name : product.name,
                product.email = req.body.email ? req.body.email : product.email
                res.send(product)
            }
        })
    }else{
        
        res.status(404).send({msg:`Product with id ${req.params.id} not found`})
    }
})


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
