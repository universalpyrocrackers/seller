const express=require ('express');
const router=express.Router();
const seller=require("../models/seller");
const orders=require("../models/orders");
const products=require("../models/products");
const brands=require("../models/brand");
const comments=require("../models/comment");
const categorys=require("../models/category");
const stocks=require("../models/stock");


//view product in table
router.get("/viewTableProduct",(req,res)=>{
  products.find((err,data)=>{
    if(err){
      res.json({msg:"failed to add product"});
  }else{
    res.send(data);
  }
  })
})
 //for login seller
router.post("/login1",(req,res)=>{
 var queryu = { username: req.body.username };
 var query = { username: req.body.username ,password:req.body.password};
seller.find(queryu,(err,data)=>{
if(data.length!=0){
seller.find(query,(err,data)=>{
if(data.length!=0){
   res.send({msg:"valid credential",value:"1"})
 }else{
 res.send({msg:"invalid password",value:"0"})
 }
 })
}else{
 res.send({msg:"You are not Registered",value:"-1"})
}
})
 })

  //adding product to  table
router.post("/addTableProduct",(req,res)=>{
  var query={"_id":req.body.category};
  let newproduct=new products({ 
  name:req.body.name,
  price:req.body.price,
  discountpercent:req.body.discountpercent,
  disprice:req.body.disprice,
  disamount:req.body.disamount,
  image:req.body.image,
  available:req.body.available,
  brand:req.body.brand,
  category:req.body.category,
  description:req.body.description,  
  video:req.body.video,
  supersalepos:req.body.supersalepos
  })
  newproduct.save((err,result)=>{
    if(err){
      res.json({msg:"failed to add product"});
  }else{
    categorys.find(query,(err,data)=>{
if(data!=null){
  let qty=data[0].qty;
  qty++;
  var newvalues = { $set: {qty:qty} };
  categorys.updateOne(query,newvalues,(err,result)=>{
          if(err){
              res.json({result});
          }else{
    res.json({msg:"successfully product is added"});
         }
       })
}
    })
  }
  })
  })  
  // edit product table
router.put("/editTableProduct/:id",(req,res)=>{
  var query={_id:req.params.id};
  products.find(query,(err,data)=>{
    if(data.length!=0){
      // var myquery = {  username: data[0].username};
      let oldcategory=data[0].category;
      let newcategory=req.body.category;
      var newvalues = { $set: {  
        name:req.body.name,
        price:req.body.price,
        discountpercent:req.body.discountpercent,
        disprice:req.body.disprice,
        disamount:req.body.disamount,
        image:req.body.image,
        available:req.body.available,
        brand:req.body.brand,
        category:req.body.category,
        description:req.body.description,
        video:req.body.video,
  supersalepos:req.body.supersalepos,
  resellerprice:req.body.resellerprice,
  shopprice:req.body.shopprice
      } };
  
    // 
    if(oldcategory!=newcategory){
      var query1={_id:oldcategory};
      var query2={_id:newcategory};
      categorys.find(query1,(err,data)=>{
        if(data!=null){
          let qty=data[0].qty;
          qty--;
          var newvalues = { $set: {qty:qty} };
          categorys.updateOne(query1,newvalues,(err,result)=>{
                  if(err){
                      res.json({result});
                  }else{
                    categorys.find(query2,(err,data)=>{
                      if(data!=null){
                        let qty=data[0].qty;
                        qty++;
                        var newvalues = { $set: {qty:qty} };
                        categorys.updateOne(query2,newvalues,(err,result)=>{
                                if(err){
                                    res.json({result});
                                }else{
                       
                               }
                             })
                      }
                          })
                 }
               })
        }
            })

    }

    // 
      products.updateOne(query, newvalues,(err,result)=>{
          if(err){
              res.json({msg:"failed to add your list"});
          }else{
            products.find((err,data)=>{
              // res.send(data[0])
              
    res.send(data);

            });
          }
      })
     }
  })
  // to update newly added field
  // var myquery = { supersalepos: 1 };
  // var newvalues = { $set: {supersalepos:0} };
  // products.updateMany(myquery, newvalues, function(err, res) {
  //   if (err) throw err;
  //   console.log(res.result + " document(s) updated");
  // });

  }) 
   //delete product url
 router.delete("/deleteproduct/:id",(req,res)=>{
  let query={"_id":req.params.id};
  
  products.find(query,(err,data)=>{
    if(data.length!=0){
      let oldcategory=data[0].category;
      let query1={"_id":oldcategory};

    // 
    products.deleteOne(query,(err,data)=>{
    if(err){
      res.json(err);
          }else{
            categorys.find(query1,(err,data)=>{
              if(data!=null){
                let qty=data[0].qty;
                qty--;
                var newvalues = { $set: {qty:qty} };
                categorys.updateOne(query1,newvalues,(err,result)=>{
                        if(err){
                            res.json({result});
                        }else{
                       }
                     })
              }
                  })
           products.find((err,datap)=>{
                res.send(datap);
              })
          }
  })
     }
  })

})      
// edit seller profile
router.put("/editsellerprofile",(req,res)=>{
  var query = {  _id:  req.body.id };
  seller.find(query,(err,data)=>{
    var newvalues = { $set:{ "username":req.body.name,"password":req.body.password,"details":req.body.details,"pdf":req.body.pdf,"minbuyprice":req.body.minbuyprice,"deliverycharge":req.body.deliverycharge}};
    seller.updateOne(query, newvalues,(err,result)=>{
       if(err){
           res.json({result});
       }else{
         res.json({ "name":req.body.name,"password":req.body.password,"pdf":req.body.pdf,"details":req.body.details,"minbuyprice":req.body.minbuyprice,"deliverycharge":req.body.deliverycharge,msg:"successfully updated!"});
        // res.json({result});
        
      
      }
    })
      })
})
//fetch seller profile
router.post("/sellerprofile",(req,res)=>{
  var query = {  username:  req.body.username };
  seller.find(query,(err,data)=>{
    res.send({"name":data[0].username,"pdf":data[0].pdf,"password":data[0].password,"id":data[0]._id,"details":data[0].details,"minbuyprice":data[0].minbuyprice,"deliverycharge":data[0].deliverycharge});
      })
})
//show all orders placed by customer to seller 
router.get("/showplacedorder",(req,res)=>{
  orders.find((err,data)=>{
    res.json(data.reverse());
  })
})

// No
// router.get("/updateorder",(req,res)=>{
//   // to update newly added field
//   var myquery = { location: "Free Delivery" };
//   var newvalues = { $set: {position:0} };
//   brands.updateMany(newvalues, function(err, res) {
//     if (err) throw err;
//     console.log(res.result + " document(s) updated");
//   });
// })
//edit placedorder to seller like amount paid,delivery,booked,reset
router.put("/editplacedorder/:id",(req,res)=>{
  var olddelivery;
  var newdelivery=req.body.delivery;
  var oldpack;
  var newpack=req.body.book;
  // console.log(newdelivery);
  var num3 = new Date();
  var t=num3.getDate()+"/"+Number(num3.getMonth()+1)+"/"+num3.getFullYear();

  var myquery = { _id: req.params.id };
  orders.find(myquery,(err,data)=>{
    olddelivery=data[0].delivery
    oldpack=data[0].book

    
    // res.json(data[0].delivery);
if(olddelivery==newdelivery){
  // check packed value


if(oldpack==newpack){
  var newvalues = { $set: {book: req.body.book,payments: req.body.payments,delivery: req.body.delivery,status:req.body.status} };
  orders.updateOne(myquery, newvalues,(err,result)=>{
    if(err){
        res.json({msg:"failed to update contact"});
    }else{
        // for seller
        orders.find((err,data)=>{
          res.json(data.reverse());
      })
    }
})
}
else if(oldpack==0&&newpack==1) {

  stocks.find((err,datap)=>{
    if(err){
    
    }else{
      let productcodes=datap[0].productcode;
      // let productnames=datap[0].productname;
      let stockis=datap[0].stock;
      let solded=datap[0].sold;
    
      orders.find(myquery,(err,data1)=>{
        let itr=-1;
        // olddelivery=data[0].delivery
        // res.json(data[0].delivery);
         let cartproductcodes=data1[0].placedlist[0].code;
      let cartstockis=data1[0].placedlist[0].qty
      cartproductcodes.forEach(x => {
        itr++;
        if(productcodes.indexOf(x)!=-1){
          stockis.splice(productcodes.indexOf(x),1,stockis[productcodes.indexOf(x)]-cartstockis[itr])
          solded.splice(productcodes.indexOf(x),1,solded[productcodes.indexOf(x)]+cartstockis[itr])
    
        }
    // console.log(cartstockis[itr]);
    // console.log(stockis[productcodes.indexOf(x)]);
    
    // console.log(stockis);
    
          
        });
        // console.log("263"+stockis);
        var newvalues1 = { $set: {stock:stockis,sold:solded} };
        stocks.updateOne( newvalues1,(err,result)=>{
          if(err){
              res.json({msg:"failed to update contact"});
          }else{
              // for seller
              var newvalues = { $set: {book: req.body.book,payments: req.body.payments,delivery: req.body.delivery,status:req.body.status} };
      orders.updateOne(myquery, newvalues,(err,result)=>{
        if(err){
            res.json({msg:"failed to update contact"});
        }else{
            // for seller
            orders.find((err,data)=>{
              res.json(data.reverse());
          })
        }
    })
          }
      })
    })
    // console.log(stockis);
    
      
      // res.json({"productcode":datap[0].productcode,"productname":datap[0].productname,"stock":datap[0].stock});
    
    }
    })
// fcfdfdfdfdf
}

else if(oldpack==1&&newpack==0) {

  stocks.find((err,datap)=>{
    if(err){
    
    }else{
      let productcodes=datap[0].productcode;
      // let productnames=datap[0].productname;
      let stockis=datap[0].stock;
      let solded=datap[0].sold;
    
      orders.find(myquery,(err,data1)=>{
        let itr=-1;
        // olddelivery=data[0].delivery
        // res.json(data[0].delivery);
         let cartproductcodes=data1[0].placedlist[0].code;
      let cartstockis=data1[0].placedlist[0].qty
      cartproductcodes.forEach(x => {
        itr++;
        if(productcodes.indexOf(x)!=-1){
          stockis.splice(productcodes.indexOf(x),1,stockis[productcodes.indexOf(x)]+cartstockis[itr])
          solded.splice(productcodes.indexOf(x),1,solded[productcodes.indexOf(x)]-cartstockis[itr])
    
        }
    // console.log(cartstockis[itr]);
    // console.log(stockis[productcodes.indexOf(x)]);
    
    // console.log(stockis);
    
          
        });
        // console.log("263"+stockis);
        var newvalues1 = { $set: {stock:stockis,sold:solded} };
        stocks.updateOne( newvalues1,(err,result)=>{
          if(err){
              res.json({msg:"failed to update contact"});
          }else{
              // for seller
              var newvalues = { $set: {book: req.body.book,payments: req.body.payments,delivery: req.body.delivery,status:req.body.status} };
      orders.updateOne(myquery, newvalues,(err,result)=>{
        if(err){
            res.json({msg:"failed to update contact"});
        }else{
            // for seller
            orders.find((err,data)=>{
              res.json(data.reverse());
          })
        }
    })
          }
      })
    })
    // console.log(stockis);
    
      
      // res.json({"productcode":datap[0].productcode,"productname":datap[0].productname,"stock":datap[0].stock});
    
    }
    })
// fcfdfdfdfdf
}

}else if(olddelivery==0&&newdelivery==1){
// console.log("in else part")
var newvalues = { $set: {book: req.body.book,payments: req.body.payments,delivery: req.body.delivery,status:req.body.status,delivereddate:t} };
orders.updateOne(myquery, newvalues,(err,result)=>{
  if(err){
      res.json({msg:"failed to update contact"});
  }else{
      // for seller
      orders.find((err,data)=>{
        res.json(data.reverse());
    })
  }
})
}else{
  if(oldpack==1&&newpack==0) {
    stocks.find((err,datap)=>{
      if(err){
      
      }else{
        let productcodes=datap[0].productcode;
        // let productnames=datap[0].productname;
        let stockis=datap[0].stock;
        let solded=datap[0].sold;
      
        orders.find(myquery,(err,data1)=>{
          let itr=-1;
          // olddelivery=data[0].delivery
          // res.json(data[0].delivery);
           let cartproductcodes=data1[0].placedlist[0].code;
        let cartstockis=data1[0].placedlist[0].qty
        cartproductcodes.forEach(x => {
          itr++;
          if(productcodes.indexOf(x)!=-1){
            stockis.splice(productcodes.indexOf(x),1,stockis[productcodes.indexOf(x)]+cartstockis[itr])
          solded.splice(productcodes.indexOf(x),1,solded[productcodes.indexOf(x)]-cartstockis[itr])
    
          }
          });
          // console.log("263"+stockis);
          var newvalues1 = { $set: {stock:stockis,sold:solded} };
          stocks.updateOne( newvalues1,(err,result)=>{
            if(err){
                res.json({msg:"failed to update contact"});
            }else{
                // for seller
                var newvalues = { $set: {book: req.body.book,payments: req.body.payments,delivery: req.body.delivery,status:req.body.status,delivereddate:"No"} };
        orders.updateOne(myquery, newvalues,(err,result)=>{
          if(err){
              res.json({msg:"failed to update contact"});
          }else{
              // for seller
              orders.find((err,data)=>{
                res.json(data.reverse());
            })
          }
      })
            }
        })
      })
      // console.log(stockis);
      
        
        // res.json({"productcode":datap[0].productcode,"productname":datap[0].productname,"stock":datap[0].stock});
      
      }
      })
  }else{
    stocks.find((err,datap)=>{
      if(err){
      
      }else{
    
        var newvalues = { $set: {book: req.body.book,payments: req.body.payments,delivery: req.body.delivery,status:req.body.status,delivereddate:"No"} };
        orders.updateOne(myquery, newvalues,(err,result)=>{
          if(err){
              res.json({msg:"failed to update contact"});
          }else{
              // for seller
              orders.find((err,data)=>{
                res.json(data.reverse());
            })
          }
      })
      }
      })
  }
  // console.log("in else part")

  }
//   var newvalues = { $set: {book: req.body.book,payments: req.body.payments,delivery: req.body.delivery,status:req.body.status} };
//   orders.updateOne(myquery, newvalues,(err,result)=>{
//     if(err){
//         res.json({msg:"failed to update contact"});
//     }else{
//         // for seller
//         orders.find((err,data)=>{
//           res.json(data.reverse());
//       })
//     }
// })
})
})

// edit placedorder buyer detail
router.put("/editplacedorderbuyer/:id",(req,res)=>{
  var myquery = { _id: req.params.id };

  var newvalues = { $set: {username: req.body.username,shipping: req.body.shipping,phone: req.body.phone,location: req.body.location,sellerdiscount: req.body.sellerdiscount,comment: req.body.comment,deliverycharge:req.body.deliverycharge} };
  orders.updateOne(myquery, newvalues,(err,result)=>{
    if(err){
        res.json({msg:"failed to update detail"});
    }else{
        // for seller
        orders.find((err,data)=>{
          res.json(data.reverse());
      })
    }
})
})
//get seller details
router.get("/sellerdetail",(req,res)=>{
seller.find((err,data)=>{
if(data.length!=0)
res.send({name:data[0].details[0],contact:data[0].details[1],payment:data[0].details[2],minbuyprice:data[0].minbuyprice,deliverycharge:data[0].deliverycharge})
 },err=>{
              
})
});

// get category and qty
router.get("/categorylists",(req,res)=>{
  categorys.find((err,data)=>{
    data.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))
    res.send({"categorylist":data});

         })
})
// add category 
router.post("/addcategory",(req,res)=>{
  let newcategory=new categorys({
    imageurl:req.body.imageurl,
    catname:req.body.catname,
    qty:0,
    position:req.body.position
  })
  newcategory.save((err,result)=>{
      if(err){
          res.json({msg:err});
      }else{
          res.send({"res":1,"msg":"Category Added successfully!"});
            
      }
  })
})
//remove category
router.delete("/removecategory/:id",(req,res)=>{
  let query={"_id":req.params.id};
  categorys.deleteOne(query,(err,data)=>{
    if(err){
      res.json(err);
          }else{
           //  var arrvideoprd=[];
           categorys.find((err,datap)=>{
            datap.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))
                res.send({"categorylist":datap,"msg":"Category removed successfully!"});
              })
          }
  })

})
// edit category 
router.put("/editcategory/:id",(req,res)=>{
  let query={"_id":req.params.id};
     var newvalues = { $set:{ "imageurl":req.body.imageurl,"catname":req.body.catname,"position":req.body.position}};
     categorys.updateOne(query, newvalues,(err,result)=>{
        if(err){
            res.json({result});
        }else{
          categorys.find((err,datap)=>{
            datap.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))
            res.send({"categorylist":datap,"msg":"Category Updated successfully!"});

         })
       }
     })
})

// delete order
router.delete("/deleteorder/:id",(req,res)=>{
  var query={_id:req.params.id};
  orders.deleteOne(query,(err,data)=>{
    if(err){
      res.json({msg:"order is not deleted"});
          }else{
            orders.find((err,data)=>{
              res.send(data.reverse());
            })
          }
  })
})
// add brand
router.post("/addbrand",(req,res)=>{
  let newbrand=new brands({
    image:req.body.image,
    name:req.body.name,
    position:req.body.position
  })
  newbrand.save((err,result)=>{
      if(err){
          res.json({msg:err});
      }else{
       res.send({"msg":"Brand added successfully!"})
            
      }
  })
})
// get brand
router.get("/getbrand",(req,res)=>{
  brands.find((err,data)=>{
    if(data.length!=0)
    data.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))
     res.send(data)
    },err=>{
          
   })
})
//edit video url
router.put("/editbrand/:id",(req,res)=>{
  let query={"_id":req.params.id};
     var newvalues = { $set:{ "image":req.body.image,"name":req.body.name,"position":req.body.position}};
     brands.updateOne(query, newvalues,(err,result)=>{
        if(err){
            res.json({result});
        }else{
         brands.find((err,datap)=>{
          datap.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))

     res.send(datap);
          
         })
       }
     })
 
 
 })
 //delete video url
 router.delete("/deletebrand/:id",(req,res)=>{
   let query={"_id":req.params.id};
   brands.deleteOne(query,(err,data)=>{
     if(err){
       res.json(err);
           }else{
            //  var arrvideoprd=[];
             brands.find((err,datap)=>{
          datap.sort((a,b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0))

                 res.send(datap);
               })
           }
   })
 })
//  get comment
 router.get("/getcomment",(req,res)=>{
  comments.find((err,data)=>{
    res.send(data.reverse());
  })
 })
//  delete comment
router.delete("/deletecomment/:id",(req,res)=>{
  let query={"_id":req.params.id};
  comments.deleteOne(query,(err,data)=>{
    if(err){
      res.json(err);
          }else{
           //  var arrvideoprd=[];
           comments.find((err,datap)=>{
                res.send(datap.reverse());
              })
          }
  })
})
//edit comment
router.put("/editcomment/:id",(req,res)=>{
  let query={"_id":req.params.id};
     var newvalues = { $set:{ "status":req.body.status}};
     comments.updateOne(query, newvalues,(err,result)=>{
        if(err){
            res.json({result});
        }else{
          comments.find((err,datap)=>{
     res.send(datap.reverse());
          
         })
       }
     })
 })

//  router.get("/addstock",(req,res)=>{
//    let code=['UP001', 'UP002', 'UP005', 'UP003', 'UP004', 'UP006', 'UP007', 'UP008', 'UP009', 'UP010', 'UP011', 'UP012', 'UP013', 'UP015', 'UP016', 'UP037', 'UP038', 'UP027', 'UP024', 'UP023', 'UP028', 'UP025', 'UP026', 'UP017', 'UP019', 'UP020', 'UP021', 'UP018', 'UP022', 'UP029', 'UP030', 'UP031', 'UP032', 'UP033', 'UP034', 'UP035', 'UP036', 'UP044', 'UP045', 'UP046', 'UP049', 'UP047', 'UP048', 'UP050', 'UP051', 'UP053', 'UP054', 'UP055', 'UP056', 'UP057', 'UP052', 'UP085', 'UP086', 'UP087', 'UP088', 'UP089', 'UP090', 'UP091', 'UP092', 'UP093', 'UP094', 'UP095', 'UP096', 'UP097', 'UP098', 'UP099', 'UP100', 'UP058', 'UP064', 'UP063', 'UP061', 'UP060', 'UP059', 'UP062', 'UP076', 'UP077', 'UP078', 'UP079', 'UP081', 'UP082', 'UP083', 'UP080', 'UP084', 'UP072', 'UP068', 'UP070', 'UP071', 'UP074', 'UP073', 'UP075', 'UP065', 'UP066', 'UP014', 'UP039', 'UP041', 'UP040', 'UP042', 'UP043', 'UP101', 'UP102', 'UP067', 'UP069', 'UN00']
  //  let pname=['2 ¾" Kuruvi (5pcs/Pkt )', '3½" Deluxe Lakshmi (5pcs/ Pkt)', 'Two Sound ( 5pcs /Pkt )', '4" Spl Lakshmi & Parrot (5pcs/Pkt)', '4"Dlx Lakshmi (5pcs/Pkt)', '5"Inch Mega DLX (5pcs/Pkt )', '6"Inch Ultra Deluxe Lakshmi (5pcs/Pkt)', '100 Wala Garland (Full Count)', '1000 Wala Machine Garland (Full Count)', '1000 Wala Bang Bang (Blue Tube) (Full Count)', '2000 WALA -Sunshine (Full Count)', '5000 Wala Garland (Full Count)', 'MEGA BULLET (10Pcs /Box)', 'Gorilla Bomb (Green) (10Pcs /Box)', 'GodZilla Bomb (Green) (10Pcs /Box)', '1"1/2 Twinkling Star (10 Pcs / Box)', '4" Twinkling Star (10 Pcs / Box)', 'Zamin Chakkar Big (25 pcs/Box)', 'Zamin Chakkar Ashoka (10 pcs/Box)', 'Zamin Chakkar SPL (10 pcs/Box)', 'Zamin Chakkar Dlx (10 pcs/Box)', 'Bambara (Red,Green & Gold Colour) (10 Pcs/Box)', 'Lotus Wheel (3 Pcs/Box)', 'Flower Drops Big (10 Pcs/Box)', 'Flower Drops Red & Green (SPL) (10 Pcs/Box)', 'Non-Stop Star Fountain Super Red & Green (10 Pcs/Box)', 'Colour Koti (10 Pcs/Box)', 'FLOWER POTS SUPER DELUXE (2 Pcs /Box)', 'Mega Colour Koti (Deluxe) (10 Pcs/Box)', 'Colour Rain ( 5 Pcs/Box)', 'Peaock Feather ( 5 Pcs/Box)', 'Fox Star (Crackling)', 'Lovely Pearl Pops ( 3 Pcs/Box)', 'Singpop (Box)', 'Oddbods Mini Fountain ( 5 Pcs/Box)', 'King Star (3 Pcs/Box)', 'Tricolour (10 Pcs/Box)', 'Photoflash (5 Pcs/Box)', 'Pappu Shower (Box', 'Drone (5 Pcs/Box)', 'Magic Peacock (Box)', 'Wonder(Mix) Siren (Box)', 'Colour Fog (3 Pcs/Box)', 'Love Fire(Mix) (Box)', 'Chocolate Chakkar Celebration', 'Temple Run (Box)', '100k Crackling Anar', 'Penta Lighting Ball', 'USA Anar', 'Nemo (4 in 1) Funtions', 'Cute Fountain', '7 cm Electric Sparklers (10 pcs/Box)', '10 cm Electric Sparklers (10 pcs/Box)', '12 cm Electric Sparklers (10 pcs/Box)', '12 cm Crckling Sparklers (10 pcs/Box)', '12 cm Green Sparklers (10 pcs/Box)', '12 cm Red Sparklers (10 pcs/Box)', '15 cm Electric Sparklers (10 pcs/Box)', '15cm Crackling Sparklers (10 pcs/Box)', '15cm Green Sparklers (10pcs/Box)', '15Cm Red Sparklers (10pcs/Box)', '30Cm Electric Sparklers (5 pcs/Box)', '30Cm Crackling Sparklers (5 pcs/Box)', '30Cm Green Sparklers (5 pcs/Box)', '30Cm Red Sparklers (5 pcs/Box)', '50Cm Electric Sparklers (5 pcs/Box)', '50Cm Crackling Sparklers (5 pcs/Box)', 'MAGIC WHIP', 'YALINEE', 'ELAKKIYA', 'SHARP SHOOTER', '1000 TO 2000 LAR', 'I AM LAR DELUXE', 'JEGAJAL DELUXE', '7 Shot Signal Colour Bomb', '12 Short (Crackling)', '16 Short (Crackling)', '30 Short', '36 Short (Lion King) Crackling', '60 Short', '100 shorts (Indian Missal)', 'Flyover 30 (Myile Function with Full Crackling)', '100 Shorts Maringa Celebration (Full Crackling)', '2"Inch (3 Function)(2pcs/Box)', '3"Inch Shell', '3.5" Shell - 7 Steps Function', '3.5" Shell - Double Ball Function', '4"Inch Shell - Hero Series With Crackling (2 Pcs /Box)', '5" inch Shell - Prime Dove', '4"Inch Shell - SKY SERIES DOUBLE BALL (2 Pcs/Box)', 'MINIONS (CHOTTA PIPE)( 1 Pcs/Box)', 'RUBY ROBO -Penta Sky Short (5Pcs/Box)', 'Colour Paper Bomb (Box)', '28 Taj & Tiger Giant Crackers', '56 Taj & Tiger Crackers', '4" X 28 X 100 Bharath Deluxe', '4" X 50 X 50 Balaji Deluxe', '4"100 DLX (BIG WALA)', 'SHANE PUNJAB Rocket', 'FX 3 (3 SOUND ROCKET)', '2"Inch Sky Short (1PCS)', 'Shadi Mubarak (Day Out Colour Powder) (3Pcs /Box)', 'King Kong Foil Mega Bomb'];
//    let s=[100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
//    let newstock=new stocks({ 
//     productcode:code,
//     productname:pname,
//     stock:s,
//     })
//     newstock.save((err,result)=>{
//       if(err){
//         res.json({msg:"failed to add product"});
//     }else{
//       res.json(result);
//     }})
//  })
// get stock
router.get("/getstock",(req,res)=>{
   stocks.find((err,result)=>{
     if(err){
       res.json({msg:"failed to add product"});
   }else{
     res.json({"productcode":result[0].productcode,"productname":result[0].productname,"stock":result[0].stock,"sold":result[0].sold});
   }})
})
// Add stock
router.put("/addstock",(req,res)=>{
  stocks.find((err,result)=>{
    if(err){
      res.json({msg:"failed to add product"});
  }else{
    let productcode1=result[0].productcode;
    let productname1=result[0].productname;
    let stock1=result[0].stock;
    let sold1=result[0].sold;

    productcode1.push(req.body.code)
    productname1.push(req.body.name)
    stock1.push(req.body.qty)
    sold1.push(0);

    let newvalues1 = { $set: {productcode:productcode1,productname:productname1,stock:stock1,sold:sold1} };
    stocks.updateOne( newvalues1,(err,result)=>{
      if(err){
        res.json({msg:"failed to update stock"});
    }else{
      stocks.find((err,result)=>{
        if(err){
          res.json({msg:"failed to add product"});
      }else{
        res.json({"productcode":result[0].productcode,"productname":result[0].productname,"stock":result[0].stock,"sold":result[0].sold,"msg":"stock Added successfully!"});
      }})
    }})
    // res.json({"productcode":result[0].productcode,"productname":result[0].productname,"stock":result[0].stock});
  }})
})
// edit stock
router.put("/editstock/:index",(req,res)=>{
  stocks.find((err,result)=>{
    if(err){
      res.json({msg:"failed to add product"});
  }else{
    let productcode1=result[0].productcode;
    let productname1=result[0].productname;
    let stock1=result[0].stock;
    let sold1=result[0].sold;

    // res.json({"productcode":result[0].productcode,"productname":result[0].productname,"stock":result[0].stock});
    productcode1.splice(req.params.index,1,req.body.code);
    productname1.splice(req.params.index,1,req.body.name);
    stock1.splice(req.params.index,1,req.body.qty);
    sold1.splice(req.params.index,1,req.body.sold);
  let newvalues1 = { $set: {productcode:productcode1,productname:productname1,stock:stock1,sold:sold1} };
  stocks.updateOne( newvalues1,(err,result)=>{
    if(err){
      res.json({msg:"failed to update stock"});
  }else{
    stocks.find((err,result)=>{
      if(err){
        res.json({msg:"failed to add product"});
    }else{
      res.json({"productcode":result[0].productcode,"productname":result[0].productname,"stock":result[0].stock,"sold":result[0].sold,"msg":"stock updated successfully!"});

    }})
  }})
}})
})
// delete stock
router.get("/deletestock/:index",(req,res)=>{
  stocks.find((err,result)=>{
    if(err){
      res.json({msg:"failed to add product"});
  }else{
    let productcode1=result[0].productcode;
    let productname1=result[0].productname;
    let stock1=result[0].stock;
    // res.json({"productcode":result[0].productcode,"productname":result[0].productname,"stock":result[0].stock});
    productcode1.splice(req.params.index,1);
    productname1.splice(req.params.index,1);
    stock1.splice(req.params.index,1);

  let newvalues1 = { $set: {productcode:productcode1,productname:productname1,stock:stock1} };
  stocks.updateOne( newvalues1,(err,result)=>{
    if(err){
      res.json({msg:"failed to update stock"});
  }else{
    stocks.find((err,result)=>{
      if(err){
        res.json({msg:"failed to find stock"});
    }else{
      res.json({"productcode":result[0].productcode,"productname":result[0].productname,"stock":result[0].stock,"sold":result[0].sold,"msg":"stock deleted successfully!"});
    }})
  }})
}})
})
module.exports=router;