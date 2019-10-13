const express=require('express');
const app=express();
const cars=require('./cars');
const customers=require('./customer');
const bodyparser=require('body-parser')
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://akshanshkmt:root@cluster0-qogwf.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true },()=>console.log("Connected to MongoDB!"))

const Cars = mongoose.model("cars");
const Customers = mongoose.model("customers");

const port= process.env.PORT||3000

app.listen(port,()=>console.log('Listening on Port '+port+'...'));
app.use(bodyparser.json());

//home page
app.get('/',(req,res)=>{
	res.send("Welcome to the home page!");
});

//see all cars
app.get('/cars', async (req,res)=>{
	const car=await Cars.find();
	res.json(car);
});

//see all available cars
app.get('/cars/available', async (req,res)=>{
	const car=await Cars.find({booked:false});
	res.json(car);
});

//see all booked cars
app.get('/cars/booked', async (req,res)=>{
	const car=await Cars.find({booked:true});
	res.json(car);
});

//Find a car by its vehicle number
app.get('/cars/vehiclenumber/:id',async (req,res)=>{
	const car=await Cars.find({vehicle_number:req.params.id});
	res.json(car);
});


//add a new car
app.post('/cars',async (req,res)=>{
	console.log(req.body);
	const car =new Cars({
		vehicle_number:req.body.vehicle_number,
    	model:req.body.model,
    	seating_capacity:req.body.seating_capacity,
    	rent_per_day:req.body.rent_per_day,
    	booked:false,
        customer_name:null,
        issue_date:null,
        return_date:null,
	});
	car.save()
	.then(data =>{
		res.json(data);
	})
	.catch(err =>{
		res.json({message:err});
	})
});

//delete a car by its vehicle number
app.delete('/cars/vehiclenumber/:id',async (req,res)=>{
	const removedcar=await Cars.remove({vehicle_number:req.params.id});
	res.json(removedcar);
});

//update a car's details
app.patch('/cars/vehiclenumber/:id',async (req,res)=>{
	const updatedcar=await Cars.updateOne(
		{vehicle_number:req.params.id},
		{$set:{vehicle_number:req.body.vehicle_number,
    	model:req.body.model,
    	seating_capacity:req.body.seating_capacity,
    	rent_per_day:req.body.rent_per_day,
    	booked:req.body.booked,
        customer_name:req.body.customer_name,
        issue_date:req.body.issue_date,
        return_date:req.body.return_date,}}
		);
	res.json(updatedcar);
});

//book a car by vehice number
app.patch('/cars/available/book/vehiclenumber/:id',async (req,res)=>{
	const bookedcar=await Cars.updateOne(
		{vehicle_number:req.params.id},
		{$set:{booked:true,
		customer_name:req.body.customer_name,
        issue_date:req.body.issue_date,
        return_date:req.body.return_date,}}
		);
	res.json(bookedcar);
});