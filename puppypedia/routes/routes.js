


const router  = require('express').Router();
var admin=require("../Controllers/AdminController");
var users=require("../Controllers/UserController");
var pets=require("../Controllers/PetController");
var category=require("../Controllers/CategoryController");
var content=require("../Controllers/ContentController");
var banner=require("../Controllers/BannerController");

const { route } = require('../puppypedia');



//Admin
            router.get('/',admin.login);
            router.post('/login',admin.CheckLogin);
            router.get('/dashboard',admin.dashboard);
            router.get('/profile',admin.profile);
            router.post('/profile',admin.updateprofile);
            router.get('/changepassword',admin.changepassword);
            router.post('/changepassword',admin.updatePassword);


            router.get('/logout',admin.logout);

//all delete
            router.delete('/delete',admin.delete);

//Users
            router.get('/users',users.index);
            router.get('/user/create',users.create);
            // router.post('/user/store',users.store);
            router.get('/user/view/:id',users.view);
            // router.get('/user/delete/:id',users.destroy);
            router.get('/user/edit/:id',users.edit);
            router.get('/user/petsdetail/:id',users.petsdetail);

            // router.post('/user/edit/:id',users.update);


            // Pets
            router.get('/pets',pets.index);
            router.get('/pet/create',pets.create);
            router.post('/pet/create',pets.store);
            router.get('/pet/view/:id',pets.view);
            router.get('/pet/edit/:id',pets.edit);
            router.post('/pet/edit/:id',pets.update);
            // router.get('/pet/delete/:id',pets.destroy);


            //Category
            router.get('/categories',category.index);
            router.get('/category/create',category.create);
            router.post('/category/create',category.store);
            router.post('/status_change',category.status_change);
            router.get('/category/delete/:id',category.destroy);
            router.get('/category/edit/:id',category.edit);
            router.post('/category/edit/:id',category.update);
            router.get('/check_category_name_availability',category.check_category_name_availability);

            router.get('/ajaxtable',category.ajax);



            //Contents
            router.get('/condition',content.condition);
            router.post('/condition',content.UpdateCondition);

            router.get('/policy',content.policy);
            router.post('/policy',content.UpdatePolicy);
            router.get('/about',content.About);
            router.post('/about',content.UpdateAbout);



            //Banners
            router.get('/banners',banner.index);
            router.get('/banner/create',banner.create);
            router.post('/banner/create',banner.store);
            router.post('/banner_status',banner.banner_status);
            // router.get('/banner/delete/:id',banner.destroy);

            router.get('/banner/edit/:id',banner.edit);
            router.post('/banner/edit/:id',banner.update);
module.exports=router;