const db = require("../models");

module.exports = {
    index : async (req ,res ) => {
        if(!req.session.aid) return res.redirect('/');
        let users = await db.users.findAll({
           
            order: [['id','DESC']]
        });
        res.render('users/index',{
            session:req.session,
            title:'users',
            users
        }); 
    },
    
    view: (req,res ) => {
        
        if(!req.session.aid) return res.redirect('/');

     const user= db.users.findOne({
            where:{
                id:req.params.id
            },

        }).then(function(user){
                res.render('users/view',{
                title:'users',
             
                session:req.session,
                user
            });
        });
        
        
    },

    create:async (req,res) => {

        if(!req.session.aid) return res.redirect('/');
      
        res.render('users/create',{
           
            session:req.session,
            title:'users',

            
        });
    },

   

    edit:(req,res)=>{
        if(!req.session.aid) return res.redirect('/');
        User.findOne({
            where:{
                id:req.params.id
            },
        }).then(function(user){
            res.render('users/edit',{
                user:user,
                title:'users',
                error: req.flash('error'),
            success: req.flash('success'),
            })
        })
        
    },


   
    destroy:async function(req,res){
        if(!req.session.aid) return res.redirect('/');
        await db.users.destroy({
            where: {
                id: req.params.id
            }
        })
    res.send(req.params.id)
    },

    petsdetail:async function(req,res){
      const pets= await db.pets.findAll({
            where: {
                userid: req.params.id
            }
            
        }).then(function(pets){
            pets = pets.map(p => p.toJSON())
            res.render('users/mypets',{
            title:'users',
            session:req.session,
            pets
        });

      
            console.log(pets,'.........pets');
            console.log(pets[0].id,'.........id');

    })
    },
    // check_email_availability: async function (req, res) {
    //     if(!req.session.aid) return res.redirect('/admin');
    //     const count = await User.count({
    //         where : {
    //           email : req.query.email
    //         }
    //     });
    //     if(count > 0) {
    //         res.json(1);
    //     } else {
    //         res.json(0);
    //     }        
    // },

    check_phone_availability: async function (req, res) {
        if(!req.session.aid) return res.redirect('/admin');
        const count = await User.count({
            where : {
                phone : req.query.phone
            }
        });
        if(count > 0) {
            res.json(1);
        } else {
            res.json(0);
        }        
    },
    
}

