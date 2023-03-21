const express= require('express');
const app= express();
app.use(express.json());
const Joi=require('joi');


const donations=[
    {id:1, Name:"Menna" , DrugName:"Rivo",ExpirationDate:"1-2-2025",Quantity:"2",PhoneNum:"0110480760", address:"Cairo"},
    {id:2, Name:"Mai" , DrugName:"bruffen",ExpirationDate:"1-2-2024",Quantity:"3",PhoneNum:"0110480760", address:"Alex"},
    {id:3, Name:"Anan" , DrugName:"oplex",ExpirationDate:"1-8-2023",Quantity:"1",PhoneNum:"0110480760", address:"Beni-seuf"},
]

app.get('/api/donations' ,(req,res)=>{
  res.send(donations)
});


app.get('/api/donations/:id', (req,res)=>{
    const donation= donations.find(r=> r.id=== parseInt( req.params.id));
    if (!donation) res.status(404).send('ID of the Drug that you need ,not found');
    res.send(donation);
});

app.post('/api/donations' , (req,res)=>{
    const {error}=validatedonations(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
    return;
    }


    const donation={
                id:donations.length+1,
                Name:req.body.Name,
                DrugName:req.body.DrugName,
                ExpirationDate:req.body.ExpirationDate,
                Quantity:req.body.Quantity,
                PhoneNum:req.body.PhoneNum,
                address:req.body.address
            };
            donations.push(donation);
            res.send(donation);
}); 


function validatedonations(donation){
    const schema = Joi.object({ DrugName: Joi.string() .min(3) .required(), ExpirationDate: Joi.string() .required() ,  Quantity : Joi.string() .min(1) .required()
    });
    return schema.validate(donation);
    res.send(validation);
};


app.put('/api/donations/:id' , (req,res)=>{
    const donation= donations.find(d => d.id===parseInt( req.params.id))
    if(!donation) res.status(404).send('');
    
    const {error}=validatedonations(req.body);
    
    if(error){
        res.status(400).send(error.details[0].message);
    return;
    }
    donation.DrugName=req.body.DrugName;
    donation.ExpirationDate=req.body.ExpirationDate,
    donation.Quantity=req.body.Quantity,

    res.send(donation);
    });
    
    app.delete('/api/donations/:id' , (req,res)=>{
        const donation= donations.find(d => d.id===parseInt( req.params.id))
        if(!donation) res.status(404).send('ID of the Drug that you need ,not found');
    
       const index= donations.indexOf(donation);
       donations.splice(index,1);
       res.send(donation);
    });


app.listen(3000, ()=>console.log("Listening on port 3000 ...."))

