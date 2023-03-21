const express= require('express');
const app= express();
app.use(express.json());
const Joi=require('joi');
// const { join } = require('lodash');

const email=require("validator");
console.log(email.isEmail("menna@gmail.com"));

const register=[
    {id:1, FirstName:"Menna" , LastName:"Mohamed", email:"menna@gmail.com",password:"12345",confirmPassword:"12345"},
    {id:2, FirstName:"Nour" , LastName:"Mohamed",email:"nour@gmail.com",password:"ahm12345",confirmPassword:"ahm12345"},
    {id:3, FirstName:"Ahmed" , LastName:"Mohamed",email:"ahmed@gmail.com",password:"54321",confirmPassword:"54321"},
    {id:4, FirstName:"Ali" , LastName:"Mohamed",email:"ali@gmail.com",password:"12345",confirmPassword:"12345"},
]

app.get('/',(req,res)=>{
res.send('Welcome!!!!!!')

});

app.get('/api/register' ,(req,res)=>{
  res.send(register)
});


app.get('/api/register/:id', (req,res)=>{
    const registerition= register.find(r=> r.id=== parseInt( req.params.id));
    if (!registerition) res.status(404).send('the person that try to register with this ID not found');
    res.send(registerition);
});

app.post('/api/register' , (req,res)=>{
    const {error}=validateregister(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
    return;
    }


    const registerition={
                id:register.length+1,
                FirstName:req.body.FirstName,
                LastName:req.body.LastName,
                email:req.body.email,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            };
register.push(registerition);
res.send(registerition);
}); 

function validateregister(registerition){
    const schema = Joi.object({ FirstName :Joi.string() .min(3) .required(),LastName :Joi.string() .min(3) .required(),email: Joi.string() .min(10) .required() , password: Joi.string() .min(8) .required() ,  confirmPassword : Joi.string() .min(8) .required()
    });
    return schema.validate(registerition);
    res.send(validation);
};

// app.put('/api/register/:id',(req,res)=>{

//     const registerition= register.find(r=> r.id=== parseInt( req.params.id));
//     if (!registerition) res.status(404).send('the person that try to register with this ID not found');
//     // res.send(registerition);

//     const schema={
//         FirstName:Joi.string().min(3).required()
//     };
// });


app.put('/api/register/:id' , (req,res)=>{
    const registerition= register.find(r => r.id===parseInt( req.params.id))
    if(!registerition) res.status(404).send('The user with given ID was not found');
    
    const {error}=validateregister(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
    return;
    }
    registerition.email=req.body.email;
    registerition.password=req.body.password;
    registerition.confirmPassword=req.body.confirmPassword;
    registerition.FirstName=req.body.FirstName;
    registerition.LastName=req.body.LastName;
    
    res.send(registerition);
    });
    
    app.delete('/api/register/:id' , (req,res)=>{
        // if the registerrition not found  -------------------------------> return 404Not found
        const registerition= register.find(r => r.id===parseInt( req.params.id))
        if(!registerition) res.status(404).send('The user with given ID was not found');
    
       const index= register.indexOf(registerition);
       register.splice(index,1);
       res.send(registerition);
    });


app.listen(3000, ()=>console.log("Listening on port 3000 ...."))

