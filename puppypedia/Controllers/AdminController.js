
const db = require('../models')
const bcrypt = require('bcryptjs');
const helper = require('../config/helper')
module.exports = {

    login: async function (req, res) {
        res.render('admin/login', {
            session: req.session
        })

    },
    CheckLogin: async (req, res) => {
        try {
            db.admin.findOne({
                where: {
                    email: req.body.email,
                }
            }).then(async function (admin) {
                if (admin == null) {
                    req.flash('error', 'Wrong Email Address')
                    res.redirect('/')
                }
                var compare = bcrypt.compareSync(req.body.password, admin.password);
                if (compare == true) {
                    req.session.email = admin.dataValues.email;
                    req.session.aid = admin.dataValues.id,
                        req.session.image = admin.dataValues.image,
                        req.session.name = admin.dataValues.name

                    res.redirect('/dashboard');
                }
                else {
                    req.flash('error', 'Wrong Password')
                    res.redirect('/')
                }
            });
        } catch (e) {
            console.log(e);
        }
    },
    dashboard: async function (req, res) {
        if (!req.session.aid) return res.redirect('/');
        const usersCount = await db.users.count();
        const petsCount = await db.pets.count();
        const catCount = await db.categories.count();

        res.render('admin/dashboard',
            {
                session: req.session, usersCount, petsCount, catCount,
                title: '',

            })
    },
    profile: async (req, res) => {
        try {
            if (!req.session.aid) return res.redirect('/');
            let profile = await db.admin.findOne({
                where: {
                    id: req.session.aid
                }
            });
            res.render('admin/profile', {
                title: 'profile',
                profile,
                session: req.session
            });
        }
        catch (err) {
            throw err;
        }
    },
    updateprofile: async (req, res) => {
        if (!req.session.aid) return res.redirect('/')
        if (req.files) {
            let imageName = helper.fileUpload(req.files.image, 'admin');
            req.body.image = imageName;
        }
        const update = await db.admin.update(req.body, {
            where: {
                id: req.session.aid
            }
        });
        if (update) {
            get_details = await db.admin.findOne({
                where: {
                    email: req.session.email
                }
            });
            if (get_details) {
                req.session.email = get_details.dataValues.email
                req.session.name = get_details.dataValues.name
                req.session.aid = get_details.dataValues.id
                req.session.image = get_details.dataValues.image
            }
            req.flash('success', ' Updated Profile!')
            res.redirect('/dashboard');
        }
        else {
            req.flash('msg', 'Something wrong please try again !');
            res.redirect('editprofile')
        }

    },
    changepassword: async (req, res) => {
        try {
            if (!req.session.aid) return res.redirect('/');

            res.render('admin/changepassword', {
                title: 'settings',
                session: req.session
            });
        }
        catch (err) {
            throw err;
        }
    },
    updatePassword: async (req, res) => {
        try {
            if (!req.session.aid)  req.flash('error',"Please Login First");  res.redirect('/');


            var data = await db.admin.findOne({
                where: {
                    email: req.session.email
                }
            });
            var hash = bcrypt.hashSync(req.body.newpassword, 8);
            var compare = bcrypt.compareSync(req.body.oldpassword, data.password);
            if (compare == true) {

                await db.admin.update({
                    password: hash
                },
                    {
                        where: {
                            email: req.session.email
                        }
                    })
                req.flash('success', 'Updated Password')
                res.redirect('changepassword')
            }
            else {
                req.flash('error', 'Wrong old password')
                res.redirect('changepassword')
            }
        }
        catch (err) {
            throw err;
        }
    },
    logout: (req, res) => {
        try {
            req.session.destroy();
            res.redirect('/')
        }
        catch (e) {
            console.log(e);
        }
    },

    delete: async (req, res) => {
        try {
            if (!req.session.aid) return res.redirect('/');
            console.log (req.body.table, '............................table');
            console.log(req.body.id, '............................id');

            // var tables = {
            //     'users': db.users,
            //     'pets': db.pets,
            // };

            // if (tables.hasOwnProperty(req.body.table)) {
            //     model = tables[req.body.table];
            // }

            // console.log(model, '..');
            
            await db[req.body.table].destroy({
                where: {
                    id: req.body.id
                }
            })
            res.send(req.body.id)

        }
        catch (e) {
            console.log(e);
        }
    },
}