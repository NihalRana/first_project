const db = require("../models");
const Sequelize = require('sequelize');
const helper=require("../config/helper")
const Op = Sequelize.Op;
module.exports = {
    index : async (req ,res ) => {
        if(!req.session.aid) return res.redirect('/');
        let banners = await db.banners.findAll({
           
            order: [['id','DESC']]
        });
        res.render('banners/index',{
            session:req.session,
            title:'banners',

            banners
        }); 
    },
    create:async (req,res) => {
       
        if(!req.session.aid) return res.redirect('/');
        res.render('banners/create',{
            session:req.session,
            title:'banners',
        });
    },

    store:async(req,res)=>{
        if(req.files && req.files.image){
            let imageName = helper.fileUpload(req.files.image,'banners');
            req.body.image = imageName;
            console.log(imageName,'.................name');
                }
        req.body.status=1
        await db.banners.create(req.body); 
        req.flash('success','Banner created Successfully!')
        res.redirect('/banners');
        
    },
    destroy:async function(req,res){
        await db.banners.destroy({
            where: {
                id: req.params.id
            }
        })
    res.send(req.params.id) 
    },
    edit:async(req,res)=>{

        if(!req.session.aid) return res.redirect('/');
        let banner = await db.banners.findOne({
            where:{
                id:req.params.id
            }
        });
        res.render('banners/edit',{
            banner,
            title:'banners',
            session:req.session,
        });
    },
    update: async(req,res) => {
        
        if(!req.session.aid) return res.redirect('/') 
        if(req.files){
            let imageName = helper.fileUpload(req.files.image,'banners');
            req.body.image = imageName;
        }
        await db.banners.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        req.flash('success','Banner Updated Successfully!')
        res.redirect('/banners');
    },
    banner_status:async function(req,res){
        var check= await db.banners.update({
            status:req.body.value
        },
        {
            where:{
                id:req.body.id
        }
        })
        res.send(true)
    },
    
}