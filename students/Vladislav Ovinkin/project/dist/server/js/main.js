!function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=3)}([function(n,e){n.exports=require("fs")},function(n,e){n.exports=require("express")},function(n,e,t){var r=t(5),o=t(0),i=t(6),u={add:r.add,change:r.change,del:r.remove};n.exports=function(n,e,t,r){o.readFile(r,"utf-8",(function(s,a){if(s)e.sendStatus(404,JSON.stringify({result:0}));else{var c=JSON.parse(a),f=u[t](c,n),d=f.newCart,l=f.name;o.writeFile(r,d,(function(n){n?e.sendStatus(500,JSON.stringify({result:0})):(e.send(JSON.stringify({result:1})),i(t,l))}))}}))}},function(n,e,t){var r=t(1),o=t(0),i=t(4),u=(t(2),r());u.use(r.json()),u.use("/",r.static("./dist/public")),u.use("/api/cart",i),u.get("/api/catalog",(function(n,e){o.readFile("./dist/server/db/catalog.json","utf-8",(function(n,t){n?e.sendStatus(404,JSON.stringify({result:0})):e.send(t)}))})),u.listen(8080,(function(){console.log("server is listening at port 8080")}))},function(n,e,t){var r=t(1),o=t(2),i=t(0),u=r.Router();u.get("/",(function(n,e){i.readFile("dist/server/db/userCart.json","utf-8",(function(n,t){n?e.sendStatus(404,JSON.stringify({result:0})):e.send(t)}))})),u.post("/",(function(n,e){o(n,e,"add","dist/server/db/userCart.json")})),u.put("/:id",(function(n,e){o(n,e,"change","dist/server/db/userCart.json")})),u.delete("/:id",(function(n,e){o(n,e,"del","dist/server/db/userCart.json")})),n.exports=u},function(n,e){calcSummary=function(n){var e=0;n.contents.forEach((function(n){e+=n.price*n.quantity})),n.countGoods=n.contents.length,n.amount=e},n.exports={add:function(n,e){return n.contents.push(e.body),calcSummary(n),{newCart:JSON.stringify(n,null,4),name:e.body.product_name}},change:function(n,e){var t=n.contents.find((function(n){return n.product_id===+e.params.id}));return t.quantity+=e.body.some,calcSummary(n),{newCart:JSON.stringify(n,null,4),name:t.product_name}},remove:function(n,e){var t=n.contents.find((function(n){return n.product_id===+e.params.id}));return n.contents.splice(n.contents.indexOf(t),1),calcSummary(n),{newCart:JSON.stringify(n,null,4),name:t.product_name}}}},function(n,e,t){var r=t(0),o=t(7);n.exports=function(n,e){r.readFile("./dist/server/db/logs.json","utf-8",(function(t,i){if(t)console.log("Cannot read logs...");else{var u=JSON.parse(i),s={user_action:n,name_prod:e,time:o().format("DD-MM-YYYY, H:mm:ss")};u.push(s),r.writeFile("./dist/server/db/logs.json",JSON.stringify(u,null,4),(function(n){n&&console.log("Cannot write logs...")}))}}))}},function(n,e){n.exports=require("moment")}]);