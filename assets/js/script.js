"use strict";


// sessionStorage.setItem ("name","Aqshin");
// sessionStorage.setItem("surname","Veliyev");

// console.log(sessionStorage.getItem("name"));
// console.log(sessionStorage.getItem("surname"));

// // sessionStorage.clear();

// sessionStorage.removeItem("name");

// localStorage.setItem ("name","Aqshin");


// let inputKey = document.querySelector(".input-key");
// let inputValue = document.querySelector(".input-value");

// let addBtn = document.querySelector("button");

// addBtn.addEventListener("click", function () {
//     let key = inputKey.value;
//     let value = inputKey.value;
   
//     localStorage.setItem(key,value);

//     inputKey.value = "";
//     inputKey.value = "";
// })


// let datas=["Oruc","Metanet","Tunzale","Semed"];

// localStorage.setItem("datas",datas);

 
// let jsonData={
//     name:"asas",
//     surname:"hssd",
//     phones:[
        
//         613513,   6546546
     
//     ],
//     group:[
//          {
//             name:"P418",
//             capacity:40,
//             teachers:[
//                 "Cavid",
//                 "Hemid"
//             ]
//          }
//     ]
// }

// console.log(jsonData.group[0].capacity);

// for (const iterator of jsonData.group[0].teachers) {
//     console.log(iterator);
// }
// console.log(jsonData);

// let datas=[
//     {
//         name:"Semed",
//         surname:"huseynov"
//     },
//     {
//         name:"Meryem",
//         surname:"Eliyeva"
//     }
// ]

// let datas=["Oruc","Metanet","Tunzale","Semed"];
// localStorage.setItem("datas",JSON.stringify(datas));
// localStorage.setItem("datas",JSON.stringify(jsonData));

// console.log(JSON.parse(localStorage.getItem(datas)));



//basket
let basket = [];
let basketCountSpan = document.querySelector(".product-count");

if (JSON.parse(localStorage.getItem("basket")) == null) {
    localStorage.setItem("basket", JSON.stringify(basket));
} else {
    basket = JSON.parse(localStorage.getItem("basket"));
}

getBasketCount(basket);

function getBasketCount(arr) {
    let basketCount = 0;
    let sumCost = 0;

    if (arr.length != 0) {
        for (const item of arr) {
            basketCount += item.count;
            if (!isNaN(item.cost)) {
                sumCost += item.cost;
            }
        }
    }

    console.log("Sum of costs:", sumCost);

    document.querySelector(".product-count").innerText = basketCount;

    document.querySelector(".cost").innerText = sumCost + " ₼";
}

let addBtns = document.querySelectorAll(".add-btn");

addBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));
        let productName = this.parentNode.firstElementChild.innerText;
        let productDesc = this.parentNode.lastElementChild.innerText;
        let productImage = this.parentNode.previousElementSibling.getAttribute("src");
        
      
        let productCost = parseInt(this.parentNode.querySelector(".product-cost").innerText);

        let existProduct = basket.find(m => m.id !== undefined && m.id == productId);
        if (existProduct !== undefined) {
            existProduct.count++;
            existProduct.cost += productCost;
        } else {
            basket.push({
                id: productId,
                name: productName,
                description: productDesc,
                image: productImage,
                count: 1,
                cost: productCost
            });
        }

        getBasketCount(basket);
        localStorage.setItem("basket", JSON.stringify(basket));
    });
});


