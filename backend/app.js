"use strict"

const express= require("express");
const cors = require("cors");
let pswd = require("./pswd.js");
let mysql=require("mysql");
let bodyParser =require("body-parser");
const nodemailer = require("nodemailer");
let app = express();

const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(cors());

let connection = mysql.createConnection({
  host     : 'den1.mysql3.gear.host',
  user     : 'deployment5',
  password : 'Mu7I2i?7P29?',
  database : 'deployment5'
});


connection.connect();

/*Front-end posts data (name,price,qty) to server, and server inserts data into mySQL groceryDB database in the productList table.*/
app.post("/item", function(req,res) {
  console.log(req.body);
  connection.query(`INSERT INTO productList (productName,price,QTY,userId) VALUES ("${req.body.name}",${req.body.price},${req.body.qty},"${req.body.userId}")`, function(error,results,fields) {
    if (error) throw error;
    res.send("entry created");
  })
 })

/*Front-end posts data(name, description) to the server, and the server inserts this data into mySQL groceryDB database in the groceryListCreate table.*/
 app.post("/creategrocerylist", function(req,res) {
   console.log(req.body);
   connection.query(`INSERT INTO groceryListCreate (groceryName,groceryDescription,userId) VALUES ("${req.body.name}","${req.body.description}","${req.body.userId}")`, function(error,results,fields) {
     if (error) throw error;
     res.send("entry created");
   })
  })
/*Get data from mySQL groceryDB database's productList table, and send information back to front-end.*/
 app.get("/masterlist/:id", function(req,res) {
  let masterListArray;
  connection.query(`SELECT productId, productName, price, QTY FROM productList WHERE userId ="${req.params.id}"`, function (error, results, fields) {
     if (error) throw error; {
    }
    masterListArray = results; /*results comes from database query. Argument found in the function above.*/
    res.send(  /**/
      masterListArray
    )
 })
})

app.get("/listofgrocerylists/:id", function(req,res) {
 let groceryListArray;
 connection.query(`SELECT groceryId, groceryName, groceryDescription,userId FROM groceryListCreate WHERE userId = "${req.params.id}"`, function (error, results, fields) {
    if (error) throw error; {
   }
   groceryListArray = results; /*results comes from database query. Argument found in the function above.*/
   res.send(  /**/
     groceryListArray
   )
})
})



app.delete("/:id", function(req,res) {
  connection.query("DELETE FROM groceryListCreate WHERE groceryId=" + req.params.id, function(error, results, fields) {
    if (error) throw error;
    console.log(req.params);
  })
  res.send("deleted:" + req.params.id);
})

app.get("/updategrocerylist/:id", function(req,res) {
  /*request.params is where request was received.
  Note: params is from the url.*/
    let updateGroceryListArray;
    console.log(req.params.id);
     connection.query(`SELECT groceryId,groceryName,groceryDescription FROM groceryListCreate WHERE groceryId =${req.params.id}`,
       function(error,results,fields) {
       if (error) throw error; {
       }
       updateGroceryListArray=results;
       res.send(updateGroceryListArray)
    })
  })

  app.patch("/updategrocerylist", function(req,res) {
   console.log(req.body);
   connection.query(`UPDATE groceryListCreate SET groceryName= "${req.body.name}",groceryDescription="${req.body.description}" WHERE groceryId = ${req.body.groceryId}`, function(error,results,fields) {
     if (error) throw error;
     res.send("entry created");
   })
 })

/*............*/
app.patch("/updateitemlist", function(req,res) {
 connection.query(`UPDATE groceryListFinal SET groceryId= ${req.body.groceryId},productId=${req.body.productId} WHERE groceryId = ${req.body.groceryId}`, function(error,results,fields) {
   if (error) throw error;
   res.send("entry created");
 })
})

 app.get("/updateitem/:id", function(req,res) {
   /*request.params is where request was received.
   Note: params is from the url.*/
     let updateItemArray;
     console.log(req.params.id);
      connection.query(`SELECT productId,productName,price,QTY FROM productList WHERE productId =${req.params.id}`,
        function(error,results,fields) {
        if (error) throw error; {
        }
        updateItemArray=results;
        res.send(updateItemArray)
     })
   })

   app.patch("/updateitem", function(req,res) {
    console.log(req.body);
    connection.query(`UPDATE productList SET productName= "${req.body.productName}",price=${req.body.price} WHERE productId = ${req.body.productId}`, function(error,results,fields) {
      if (error) throw error;
      res.send("entry created");
    })
  })

  app.delete("/deleteitem/:id", function(req,res) {
    connection.query("DELETE FROM productList WHERE productId=" + req.params.id, function(error, results, fields) {
      if (error) throw error;
      console.log(req.params);
    })
    res.send("deleted:" + req.params.id);
  })

  app.get("/getgrocerylistname/:id", function(req,res) {
    /*request.params is where request was received.
    Note: params is from the url.*/
      let groceryNameArray;
       connection.query(`SELECT groceryId, groceryName FROM groceryListCreate WHERE userId = "${req.params.id}"`,
         function(error,results,fields) {
         if (error) throw error; {
         }
         groceryNameArray=results;
         res.send(groceryNameArray)
      })
    })
    app.post("/additemtogrocerylist", function(req,res) {
      console.log(req.body);
      connection.query(`INSERT INTO groceryListFinal (groceryId,productId,QTY) VALUES (${req.body.groceryId},${req.body.productId},${req.body.qty})`, function(error,results,fields) {
        if (error) throw error;
        res.send("entry created");
      })
     })

     app.get("/grocerylistfinal/:id", function(req,res) {
       /*request.params is where request was received.
       Note: params is from the url.*/
         let grocerylistfinal;
          connection.query(`SELECT groceryListFinal.groceryId, groceryListFinal.productId, groceryListFinal.id, groceryListFinal.QTY, productList.productName, productList.price FROM groceryListFinal INNER JOIN productList ON groceryListFinal.productId = productList.productId WHERE groceryId = ${req.params.id}`,
            function(error,results,fields) {
            if (error) throw error; {
            }
            grocerylistfinal=results;
            res.send(grocerylistfinal)
         })
       })

       app.get("/grocerylist/:id", function(req,res) {
         /*request.params is where request was received.
         Note: params is from the url.*/
           let grocerylistfinal;
            connection.query(`SELECT groceryId, productId FROM groceryListFinal WHERE groceryId = ${req.params.id}`,
              function(error,results,fields) {
              if (error) throw error; {
              }
              grocerylistfinal=results;
              res.send(grocerylistfinal)
           })
         })

         app.delete("/deleteitemfromgrocerylist/:id", function(req,res) {
           connection.query("DELETE FROM groceryListFinal WHERE id=" + req.params.id, function(error, results, fields) {
             if (error) throw error;
             console.log(req.params);
           })
           res.send("deleted:" + req.params.id);
         })

         app.patch("/updategrocerylistitems", function(req,res) {
          connection.query(`UPDATE groceryListFinal SET QTY=${req.body.qty} WHERE id = ${req.body.id}`, function(error,results,fields) {
            if (error) throw error;
            res.send("entry created");
          })
         })

         app.get("/listofgrocerylists2/:id", function(req,res) {
          let groceryListNameArray;
          connection.query("SELECT groceryId, groceryName, groceryDescription FROM groceryListCreate WHERE groceryId =" + req.params.id, function (error, results, fields) {
             if (error) throw error; {
            }
            groceryListNameArray = results; /*results comes from database query. Argument found in the function above.*/
            res.send(  /**/
              groceryListNameArray
            )
         })
         })
         app.post("/viewgrocerylist", function(req,res) {
           console.log(req);
           let transporter = nodemailer.createTransport({
             service: "SendGrid",
             auth: {
               user:"code3338",
               pass:pswd.password
             }
           })
           let mailOptions = {
             from: 'code3338@gmail.com',
             to: req.body.email,
             subject: `"${req.body.groceryListName}"`,
             text: req.body.text,
             html: ``
           }
           mailOptions.html = `<p>"${req.body.text}"</p><br>
           <table style="border:solid 2px #0099cc;text-align:center;border-collapse:collapse;padding:7px;margin:0px">
           <tr>
             <th style="border:solid 2px #0099cc;border-collapse:collapse;padding:7px;background-color:#99ccff;font-weight:bold;font-size:18px;margin-bottom:0px">Product Name</th>
             <th style="border:solid 2px #0099cc;border-collapse:collapse;padding:7px;background-color:#99ccff;font-weight:bold;font-size:18px;margin-bottom:0px"">QTY</th>
             <th style="border:solid 2px #0099cc;border-collapse:collapse;padding:7px;background-color:#99ccff;font-weight:bold;font-size:18px;margin-bottom:0px"">Price</th>
           </tr>
           </table><br>
          `

           function groceryListFinal() {
             for(let i = 0; i < req.body.groceryListFinal.length; i++) {
               mailOptions.html += `<tr>
                <td style="border:solid 2px #0099cc;border-collapse:collapse;padding:7px;margin:auto;text-align:center;font-size:16px;margin-top:0px;width:120px">${req.body.groceryListFinal[i].productName}</td>
                <td style="border:solid 2px #0099cc;border-collapse:collapse;padding:7px;margin:auto;text-align:center;font-size:16px;margin-top:0px;width:35px">${req.body.groceryListFinal[i].QTY}</td>
                <td style="border:solid 2px #0099cc;border-collapse:collapse;padding:7px;margin:auto;text-align:center;font-size:16px;margin-top:0px">$${req.body.groceryListFinal[i].price}</td>
               </tr>`
             }
             mailOptions.html += `<div><p style="font-size:17px"><b>Total Price:</b> $${req.body.totalPrice}</p></div>`
           }
           groceryListFinal();

           transporter.sendMail(mailOptions, (err, info) => {
             if (err) {
               console.log(err);
             }
             else {
               console.log(`message sent: ${info.response}`);
             }
           })

       })
app.listen(port);
