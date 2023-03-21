
const Joi=require('joi');
const express= require('express');
const app= express();
app.use(express.json());

const products=[
    {id:1 ,pro_name:'Rivo',formulation:"strips"},
    {id:2 ,pro_name:'Adol',formulation:"strips"},
    {id:3 ,pro_name: 'brufen',formulation:"strips"},
    {id:4 ,pro_name: 'oplex_n',formulation:"oral drug"},
];

app.get('/',(req,res)=>{
    res.send('Hello');

});
app.get('/api/products',(req,res)=>{
    res.send(products);
}); 

app.get('/api/products/:id', (req,res)=>{
const product= products.find(P => P.id===parseInt( req.params.id))
if(!product) res.status(404).send('The product with given ID was not found');
res.send(product);
});  

app.post('/api/products' , (req,res)=>{
    const {error}=validateproduct(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
    return;
    }


const product={
id:products.length+1,
pro_name:req.body.pro_name,
formulation:req.body.formulation,


};
products.push(product);
res.send(product);
}); 


app.put('/api/products/:id' , (req,res)=>{
const product= products.find(P => P.id===parseInt( req.params.id))
if(!product) res.status(404).send('The product with given ID was not found');

const {error}=validateproduct(req.body);

if(error){
    res.status(400).send(error.details[0].message);
return;
}
product.pro_name=req.body.pro_name;
product.formulation=req.body.formulation;
res.send(product);
});

app.delete('/api/products/:id' , (req,res)=>{
    const product= products.find(P => P.id===parseInt( req.params.id))
    if(!product) res.status(404).send('The product with given ID was not found');

   const index= products.indexOf(product);
   products.splice(index,1);
   res.send(product);
});


function validateproduct(product){
    const schema = Joi.object({ pro_name: Joi.string() .min(3) .required(), formulation: Joi.string() .min(3) .required(),
    });
    return schema.validate(product);
    
};


// port
app.listen(3099,()=>console.log('Lisrening on port 3099...'));