const jwt = require('jsonwebtoken');
const authService = require('../services/authService')
const {hashPassword,compareHash} = require('../helpers/hash')
require('dotenv').config();
const  login = async  (req,res)=>{
    const {username,password} = req.body;
    const user = await authService.getOneByUsername(username);
    console.log(user);
    if (user){
        
        if (compareHash(user.password,user.salt,password)){
            const token = jwt.sign({
                sub: user.username,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"15m"
            })
            return res.status(200).json({
                access_token: token
            })
        }
        return res.status(404).json({
            message: 'Invalid password'
        })
        
    }
    return res.status(404).json({
        message: 'Username not found'
    })
}
const register = async (req,res)=>{
    try{
        const  {name,username,password,age,email,gender} = req.body;
        const userExisted = authService.getOneByUsername(username);
        if (userExisted){
            return res.status(401).json({
                message: 'User already exists',
            });
        }
        const {salt,hashedPassword} = hashPassword(password);
        const userCreated = await authService.register(name,username,salt,hashedPassword,age,email,gender);
        console.log(userCreated)
        if (userCreated) {
            return res.status(201).json({
                "message": "Successfully registered"
            });
        }
        return res.status(401).json("error");
    }
    catch(err){
        console.log(err)
    }
    

}

module.exports ={
    register,
    login
}