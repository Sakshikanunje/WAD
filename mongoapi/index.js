const express = require('express');
const dbConnect = require('./mongo_con');
const mongoObjectId = require('mongodb').ObjectId;
var app = express();
app.use(express.json());

app.get('/', async(req,res)=>{

    let data = await dbConnect();
    data = await data.find().toArray();
    res.send(data);
})

app.post('/',async(req,res)=>{

    let data = await dbConnect();
    data = await data.insertOne(req.body);
    res.send("data inserted successfully");
})

app.put('/:name',async(req,res) => {
    let data = await dbConnect();
    data = await data.updateOne(
        {
            name:req.params.name
        },
        {
            $set:req.body
        }
    )
    res.send("Data updated successfully");
})

// app.delete('/:name',async(req,res)=>{
//     let data = await dbConnect();
//     data = await data.deleteOne({
//         name:req.params.name
//     });
// res.send('data deleted successfully');
// })

app.delete('/:id',async(req,res)=>{

    console.log(req.params.id);
    let data = await dbConnect();
    data = await data.deleteOne({
        _id:new mongoObjectId(req.params.id)
    });
    res.send('data deleted successfully');
})

app.listen(8000);