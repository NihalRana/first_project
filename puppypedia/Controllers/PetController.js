const db = require("../models");
const helper=require('../config/helper')
module.exports={
    index : async (req ,res ) => {
        if(!req.session.aid) return res.redirect('/');
        req.flash();
        let pets = await db.pets.findAll({
            include:[
                {
                    model:db.users,          
                }
            ],
            order: [['id','DESC']]
        });
        res.render('pets/index',{
            session:req.session,
            title:'pets',
            pets
        }); 
    },

    create:async (req,res) => {

        if(!req.session.aid) return res.redirect('/');
      const users=await db.users.findAll();
        res.render('pets/create',{
            session:req.session,users,
            title:'pets', 
        });
    },

    store:async(req,res)=>{
        if(req.files && req.files.image){
            let imageName = helper.fileUpload(req.files.image,'pets');
            req.body.image = imageName;
            console.log(imageName,'.................name');
                }
        console.log(req.body.owner,'..............ooooooooo')
        await db.pets.create(req.body); 
        req.flash('success','Pet created Successfully!')
        res.redirect('/pets');
        
    },
    view: (req,res ) => {
        
        if(!req.session.aid) return res.redirect('/');

     const pet= db.pets.findOne({
        include:[
            {
                model:db.users,          
            }
        ],
            where:{
                id:req.params.id
            },

        }).then(function(pet){
                res.render('pets/view',{
                title:'pets',
                error: req.flash('error'),
                success: req.flash('success'),
                session:req.session,
                 title:'pets',
                pet
            });
        });
        
        
    },
    edit:async(req,res)=>{

        if(!req.session.aid) return res.redirect('/');
        let pet = await db.pets.findOne({
            where:{
                id:req.params.id
            }
        });
        res.render('pets/edit',{
            pet,
            title:'pets',
            error: req.flash('error'),
            success: req.flash('success'),
            session:req.session,
        });
    },

    update: async(req,res) => {
        
        if(!req.session.aid) return res.redirect('/') 
        if(req.files){
            let imageName = helper.fileUpload(req.files.image,'pets');
            req.body.image = imageName;
        }
        await db.pets.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        req.flash('success','pets Updated Successfully!')
        res.redirect('/pets');
    },
    destroy:async function(req,res){
        if(!req.session.aid) return res.redirect('/');
        await db.pets.destroy({
            where: {
                id: req.params.id
            }
        })
    res.send(req.params.id)
    },
}