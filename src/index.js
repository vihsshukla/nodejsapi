const express=require('express');
const queryRunner = require('./utils/queryRunner');
const { topUsersQuery, loyalityScoreQuery, highestTransactionCount } = require('./dto/dto');
const calculateLoyalityScore = require('./utils/calculateLoyalityScore');

const app=express();

const PORT=3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Hello world');
})

app.get('/top-users/:duration/:value',(req,res)=>{
  const {duration,value}=req.params;
  if(duration=='month'){
    if(value <1 || value>12){
      res.status(400).json({success:false,message:"Invalid Month fromat"})
    }
  }
  if(duration=='year'){
    if(value.length >4 ){
      res.status(400).json({success:false,message:"Invalid Year fromat"})
    }
  }
  queryRunner(topUsersQuery,[duration,value])
  .then((data)=>{
    res.status(200).json({sucess:true,data});
  })
  .catch((error)=>{
    res.status(400).json({success:false,error});
  })
})

app.get('/highest-trans-hour/:year',(req,res)=>{
  const {year}=req.params;
  queryRunner(highestTransactionCount,[year])
  .then((data)=>{
    res.status(200).json({sucess:true,data});
  })
  .catch((error)=>{
    res.status(400).json({success:false,error});
  })
})

app.get('/loyality-score/:userid',(req,res)=>{
  const {userid}=req.params;
  queryRunner(loyalityScoreQuery,[userid])
  .then((data)=>{
    const loyalityScore=calculateLoyalityScore(data[0].count,data[0].sum);
    res.status(200).json({sucess:true,data:loyalityScore});
  })
  .catch((error)=>{
    res.status(400).json({success:false,error});
  })
})

app.listen(PORT,()=>{
  console.log(`Server lsitening on port ${PORT}`)
})