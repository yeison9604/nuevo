const { removeUnsupportedItems } = require("@babel/preset-env/lib/filter-items");
const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../config");


router.get("/listadopersonas", async (req, res) =>{
    
    let pool = await sql.connect(config);
    pool.query("SELECT nombre, cedula, apellido, telefono FROM Persona", (error, results, fields) =>{
        if(error){
            console.log("Error: ", error);
            res.send({
                "code" : 400,
                "failed" : "Error ocurrido"
            });
        }else{
            res.render("personas/listadopersonas", {data: results.recordset});
        }
    });
    
    
});



router.get("/insertarpersonas", (req, res)=>{
    res.render("personas/insertarpersonas");
})

router.post("/insertarpersonas", async(req, res)=>{

    let pool = await sql.connect(config);
    const {nombre, cedula, apellido, telefono} = req.body;
    var query = "INSERT INTO Persona(nombre, cedula, apellido, telefono) VALUES('" + nombre + "', '" + cedula + "','" + apellido + "','" + telefono + "')"
    pool.request().query(query);
    res.redirect("listadopersonas");
});

router.post("/registro", async(req, res)=>{

    let pool = await sql.connect(config);
    const {id, username, password} = req.body;
    var query = "SELECT login(id, username, password) VALUES('" + id + "', '" + username + "','" + password + "')"
    pool.request().query(query);
    res.redirect("registro");
});

router.get("/eliminar/:cedula", async(req, res)=>{

    const {cedula} = req.params;
    let pool = await sql.connect(config);
    pool.query("DELETE FROM Persona WHERE cedula = '" + cedula + "'");
    res.redirect("/listadopersonas");

});

router.get("/editar/:cedula", async(req, res)=>{

    const {cedula} = req.params;
    let pool = await sql.connect(config);
    pool.query("SELECT * FROM Persona WHERE cedula = '" + cedula + "'", (error, results, fields) =>{
        if(error){
            console.log("Error: ", error);
            res.send({
                "code" : 400,
                "failed" : "Error ocurrido"
            });
        }else{
            res.render("personas/editarpersonas", {data: results.recordset[0]});
        }
    });

});

router.post("/editarpersonas/:cedula", async(req, res)=>{

    const pool = await sql.connect(config);
    const {cedula} = req.params;
    const {nombre, apellido, telefono} = req.body;
    var query = "UPDATE Persona SET nombre = '" + nombre + "', apellido ='" + apellido + "', telefono = '" + telefono + "' WHERE cedula = '" + cedula + "'";
    pool.request().query(query);
    res.redirect("/listadopersonas");
});

router.get("/listadoproductos", async (req, res) =>{
    
    let pool = await sql.connect(config);
    pool.query("SELECT id_producto, nombre_producto, tipo_producto FROM Prodructo", (error, results, fields) =>{
        if(error){
            console.log("Error: ", error);
            res.send({
                "code" : 400,
                "failed" : "Error ocurrido"
            });
        }else{
            res.render("personas/listadoproductos", {data: results.recordset});
        }
    });
    
    
});

router.get("/insertarproductos", (req, res)=>{
    res.render("personas/insertarproductos");
})

router.post("/insertarproductos", async(req, res)=>{

    let pool = await sql.connect(config);
    const {id_producto, nombre_producto, tipo_producto} = req.body;
    var query = "INSERT INTO Prodructo(id_producto, nombre_producto, tipo_producto) VALUES('" + id_producto + "', '" + nombre_producto + "','" + tipo_producto + "')"
    pool.request().query(query);
    res.redirect("listadoproductos");
});

router.get("/eliminarlo/:id_producto", async(req, res)=>{

    const {id_producto} = req.params;
    let pool = await sql.connect(config);
    pool.query("DELETE FROM Prodructo WHERE id_producto = '" + id_producto + "'");
    res.redirect("/listadoproductos");

});


router.get("/editarlo/:id_producto", async(req, res)=>{

    const {id_producto} = req.params;
    let pool = await sql.connect(config);
    pool.query("SELECT * FROM Prodructo WHERE id_producto = '" + id_producto + "'", (error, results, fields) =>{
        if(error){
            console.log("Error: ", error);
            res.send({
                "code" : 400,
                "failed" : "Error ocurrido"
            });
        }else{
            res.render("personas/editarproductos", {data: results.recordset[0]});
        }
    });

});

router.post("/editarproductos/:id_producto", async(req, res)=>{

    const pool = await sql.connect(config);
    const {id_producto} = req.params;
    const {nombre_producto, tipo_producto} = req.body;
    var query = "UPDATE Prodructo SET nombre_producto = '" + nombre_producto + "', tipo_producto ='" + tipo_producto + "' WHERE id_producto = '" + id_producto + "'";
    pool.request().query(query);
    res.redirect("/listadoproductos");
});




module.exports = router;