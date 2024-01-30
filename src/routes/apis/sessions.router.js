const { Router } = require("express");
const { usersModel } = require("../../dao/models/users.model.js");
const authentication = require("../../middlewares/auth.middleware.js");
const router = Router();
//const userservice = require('../../services/users.service.js')
router
    .get('/current', authentication, (req,res)=>{
        res.send('info actual del usuario pasado por seguridad')
    })

    .get('/', (req, res) => {
        if (req.session.counter) {
            req.session.counter++;
            res.send({ message: 'Ha ingresado al E-Commerce X', counter: req.session.counter });
        } else {
            req.session.counter = 1;
            res.send({ message: 'Bienvenido al E-Commerce', counter: 1 });
        }
    })

    .post('/login', (req, res) => {
        const { username, password } = req.body
        //console.log(username,password);
        if (username !== 'adminCoder@coder.com' || password !== 'adminCod3r123') {
            return res.status(401).send({ status: 'error', message: 'Usuario o contraseña incorrectos' });
        }           
        req.session.username = username;
        req.session.admin = true;           
        //console.log('Session after login:', req.session); 
        res.send({ message: 'Logged in' });        
    })
    

    .get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) return res.send({ status: 'error', message: 'Error al cerrar la sesión' })
        })        
        res.redirect('/login');

    })

// router de cookies
// router
// .get('/setCookie',(req,res)=>{
//     console.log('setcookie')
//     res.cookie('Micookie','esta es una cookie',{maxAge:60*60*24,signed:true}).send('Cookies seteadas')
// })
// .get('/getCookie',(req,res)=>{
//     console.log('getcookie')    
//     res.send(req.signedCookies)
// })
// .get('/deleteCookie',(req,res)=>{
//     console.log('Micookie deleted')
//     res.clearCookie('Micookie').send('Cookie Borrada')
// })

// .post('/login',async (req,res)=>{
//     //const {email,password} = req.body
//     //const user = await userservice.getUser({email})
//     //if(!user) return res.status(401).send({status:'error',message:'usuario no exisre'})    
// })
// // post de register
// .post('/register',(req,res)=>{
//     const {first_name,last_name,email,password} = req.body
//     console.log(username,password)
//     if(username && password){
//         req.session.user = username
//         res.send({message:'Registered'})
//     }else{
//         res.send({message:'Missing credentials'})
//     }
// })
// //post de logout
// .post('/logout',(req,res)=>{
//     req.session.destroy()
//     res.send({message:'Logged out'})
// })


module.exports = router
