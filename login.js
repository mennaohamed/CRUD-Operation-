const Joi=require('joi');
const express= require('express');
const app= express();

app.use(express.json());

const users=[
    {id:1 ,user_name:'menna',password:"01hvgv"},
    {id:2 ,user_name:'rawan',password:"114kkj"},
    {id:3 ,user_name:'anan',password:"182ffr"},
    {id:4 ,user_name:'nour',password:"048jfse"}
];

app.get('/api/users' , (req,res)=>{
    res.send(users);
}); 

app.get('/api/users/:id', (req,res)=>{
    const user= users.find(u => u.id===parseInt( req.params.id))
    if(!user) res.status(404).send('The user with given ID was not found');
    res.send(user);
    });


    app.post('/api/users' , (req,res)=>{
        const {error}=validateuser(req.body);
    
        if(error){
            res.status(400).send(error.details[0].message);
        return;
        }
    
    
    const user={
    id:users.length+1,
    user_name:req.body.user_name,
    password:req.body.password,
    
    
    };
    users.push(user);
    res.send(user);
    }); 


    app.put('/api/users/:id' , (req,res)=>{
        const user= users.find(u => u.id===parseInt( req.params.id))
        if(!user) res.status(404).send('The user with given ID was not found');
        
        const {error}=validateuser(req.body);
        
        if(error){
            res.status(400).send(error.details[0].message);
        return;
        }
        user.user_name=req.body.user_name;
        user.password=req.body.password,

        res.send(user);
        });
        
        app.delete('/api/users/:id' , (req,res)=>{
            const user= users.find(P => P.id===parseInt( req.params.id))
            if(!user) res.status(404).send('The user with given ID was not found');
        
           const index= users.indexOf(user);
           users.splice(index,1);
           res.send(user);
        });


        function validateuser(user){
            const schema = Joi.object({ user_name: Joi.string() .min(4) .required(), password: Joi.string() .min(8) .required()
            });
            return schema.validate(user);
            res.send(validation);
        };

    app.listen(3065,()=>console.log('Lisrening on port 3065...'));
