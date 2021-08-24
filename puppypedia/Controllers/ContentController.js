const db = require("../models");
const helper=require("../config/helper")
module.exports = {
    condition:async (req,res) => {
       
        if(!req.session.aid) return res.redirect('/');
        const condition =await db.content.findOne({
            where:{
                name:"Condition"
            }
        })
        res.render('content/condition',{
            session:req.session,
            title:'condition',
            condition
        });
    },

    UpdateCondition: async function (req, res) {
        try {
            if(!req.session.aid) return res.redirect('/');
                const condition=await db.content.findOne({
                    where:{
                        name:"Condition"
                    }
                })
                if(condition){
                    db.content.update(req.body,{
                        where:{
                            name:"Condition"
                        }
                    })
                    req.flash('success', 'Terms Condition Updated Successfully');
                    res.redirect('/dashboard')
                }
        }
        catch (error) {
            throw error
        }
    },

    policy:async (req,res) => {
       
        if(!req.session.aid) return res.redirect('/');
        const policy =await db.content.findOne({
            where:{
                name:"Policy"
            }
        })
        res.render('content/policy',{
            session:req.session,
            title:'policy',
            policy
        });
    },

    UpdatePolicy: async function (req, res) {
        try {
            if(!req.session.aid) return res.redirect('/');
                const policy=await db.content.findOne({
                    where:{
                        name:"Policy"
                    }
                })
                if(policy){
                    db.content.update(req.body,{
                        where:{
                            name:"Policy"
                        }
                    })
                    req.flash('success', 'Policy Updated Successfully');
                    res.redirect('/dashboard')
                }
        }
        catch (error) {
            throw error
        }
    },

    About:async (req,res) => {
       
        if(!req.session.aid) return res.redirect('/');
        const about =await db.content.findOne({
            where:{
                name:"About"
            }
        })
        res.render('content/about',{
            session:req.session,
            title:'about',
            about
        });
    },

    UpdateAbout: async function (req, res) {
        try {
            if(!req.session.aid) return res.redirect('/');
                const about=await db.content.findOne({
                    where:{
                        name:"About"
                    }
                })
                if(about){
                    db.content.update(req.body,{
                        where:{
                            name:"About"
                        }
                    })
                    req.flash('success', 'Updated Successfully');
                    res.redirect('/dashboard')
                }
        }
        catch (error) {
            throw error
        }
    },
}