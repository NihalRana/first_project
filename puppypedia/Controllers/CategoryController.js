const db = require("../models");
const Sequelize = require('sequelize');
const helper=require("../config/helper")
const Op = Sequelize.Op;
module.exports = {
    index : async (req ,res ) => {
        if(!req.session.aid) return res.redirect('/');
        let categories = await db.categories.findAll({
           
            order: [['id','DESC']]
        });
        res.render('categories/index',{
            session:req.session,
            title:'categories',


            categories
        }); 
    },
    create:async (req,res) => {
       
        if(!req.session.aid) return res.redirect('/');
        res.render('categories/create',{
            session:req.session,
            title:'categories',
        });
    },

    store:async(req,res)=>{
        if(req.files && req.files.image){
            let imageName = helper.fileUpload(req.files.image,'categories');
            req.body.image = imageName;
            console.log(imageName,'.................name');
                }
        console.log(req.body.name)
        req.body.status=1
        await db.categories.create(req.body); 
        req.flash('success','Category created Successfully!')
        res.redirect('/categories');
        
    },
    

    edit:async(req,res)=>{

        if(!req.session.aid) return res.redirect('/');
        let category = await db.categories.findOne({
            where:{
                id:req.params.id
            }
        });
        res.render('categories/edit',{
            category,
            title:'categories',
            session:req.session,
        });
    },
    update: async(req,res) => {
        
        if(!req.session.aid) return res.redirect('/') 
        if(req.files){
            let imageName = helper.fileUpload(req.files.image,'categories');
            req.body.image = imageName;
        }
        await db.categories.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        req.flash('success','Category Updated Successfully!')
        res.redirect('/categories');
    },

    destroy:async function(req,res){
        await db.categories.destroy({
            where: {
                id: req.params.id
            }
        })
        // res.json(1)
    res.send(req.params.id)
    },

    status_change:async function(req,res){
        var check= await db.categories.update({
            status:req.body.value
        },
        {
            where:{
                id:req.body.id
        }
        })
        res.send(true)
    },

    check_category_name_availability: async function (req, res) {
        if(!req.session.aid) return res.redirect('/');
       if(req.query.id) {
           let catId = req.query.id

           console.log(catId,'................................');
           let count = await db.categories.count({
               where : {
                   name : req.query.name,
                   id: { [Sequelize.Op.not]: catId}
               }
           });
           
           if(count > 0) {
               res.send('false');
           } else {
               // res.json(0);
               res.send('true');
           }
       } else {
           let count = await db.categories.count({
               where : {
                   name : req.query.name
               }
           });
           if(count > 0) {
               // res.json(1);
               res.send('false');
           } else {
               // res.json(0);
               res.send('true');
           }
       }        
   },

   ajax:async function(req,res){
       res.render('categories/ajaxtable',{
        session:req.session,
        title:'categories',
    })
   },
}