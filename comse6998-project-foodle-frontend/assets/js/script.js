// function test() {
//   var params = {
//     'cuisine': 'Chinese',
//     'diet': '',
//     'equipment': '',
//     'excludeIngredients': '',
//     'includeIngredients': '',
//     'maxCalories': '',
//     'type': ''
//   };

//   var body = {};

//   var additionalParams = {
//     headers: {},
//     queryParams: {}
//   };

//   var apigClient = apigClientFactory.newClient();
//   apigClient.recipeGet(params, body, additionalParams)
//     .then(function (result) {
//       // Add success callback code here.
//       console.log('apigClient: success')
//       console.log(result.data)
//     }).catch(function (result) {
//     // Add error callback code here.
//     console.log('apigClient: error')
//   });
// }

// var maxCal='invalid';
// function getCalVal(){
//   getmaxCal();
//   while(maxCal=='invalid'){
//     continue;
//   }
//   return maxCal;
// }
// window.onload = function () {
//   if (getToken() !== undefined && getToken() !== 'invalid') {
//     token = getToken();
//     //   // Do something, e.g., call API Gateway
//   } else {
//     console.log('Redirect to home/register/login page');
//   }
// };
// var maxCal=0;
var title = [];
var image = [];
var allinfo = [];
var history_recipe = [];
function getmaxCal(callback){
  var params = {
    'token':getGlobalToken()
  };
  var body = {};

  var additionalParams = {
    headers: {},
    queryParams: {}
  };
  var apigClient = apigClientFactory.newClient();
  apigClient.userGet(params, body, additionalParams)
  .then(function (result){
    console.log(result.data);
    var age = parseInt(result.data['age']);
    var gender = parseInt(result.data['gender']);
    var height = parseInt(result.data['height']);
    var weight = parseInt(result.data['weight']);
    allinfo = result.data;
    history_recipe = result.data['history_recipe'];
    if(gender == 'female'){
      callback((10*weight)+(6.25*height)-(5*age)-161);
      // console.log(maxCal);
    }else{
      callback((10*weight)+(6.25*height)-(5*age)+5);
      // console.log("***********");
      // console.log(maxCal);
    }
  //get user selected courses
  // maxCal = bmr - 150;
  }).catch(function (result) {
    // Add error callback code here.
    console.log('apigClient: error')
  });
}
function send_ingre(){
  //get user infomation
  //test only
  // var complexSearch = {
  //   "results":[
  //     {"id":716426, "image":"https://spoonacular.com/recipeImages/716426-312x231.jpg","title":"Cauliflower, Brown Rice, and Vegetable Fried Rice"},
  //     {"id":715594, "image":"https://spoonacular.com/recipeImages/715594-312x231.jpg","title":"Homemade Garlic and Basil French Fries"}
  //     // {"id":715497, "image":"https://spoonacular.com/recipeImages/715497-312x231.jpg","title":"Berry Banana Breakfast Smoothie"}, 
  //     // {"id":644387, "image":"https://spoonacular.com/recipeImages/644387-312x231.jpg","title":"Garlicky Kale"}, 
  //     // {"id":715392, "image":"https://spoonacular.com/recipeImages/715392-312x231.jpg","title":"Chicken Tortilla Soup (Slow Cooker)"}
  //   ]
  //   };
  // var nutritionWidget = {
  //   '716426':{"bad":[{'title':'Calories','amount':"191"},{'title':'Fat','amount':"6g"},{'title':'Carbohydrates','amount':"29g"},{'title':'Sugar','amount':"3g"}],'good':[{'title':'Protein','amount':"6g"},{'title':'Calcium','amount':"132mg"}]},
  //   '715594':{"bad":[{'title':'Calories','amount':"191"},{'title':'Fat','amount':"6g"},{'title':'Carbohydrates','amount':"29g"},{'title':'Sugar','amount':"3g"}],'good':[{'title':'Protein','amount':"6g"},{'title':'Calcium','amount':"132mg"}]}
  // }
  // var analyzedInstructions = {
  //   '716426':[{'steps':[{'number':1,'step':"Remove the cauliflower's tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble ric."},{'number':2,'step':"Heat 1T butter and 1T oil in a large skillet over medium heat."}]}],
  //   '715594':[{'steps':[{'number':1,'step':"Remove the cauliflower's tough stem and reserve for another use. Using a food processor, pulse cauliflower florets until they resemble ric."},{'number':2,'step':"Heat 1T butter and 1T oil in a large skillet over medium heat."}]}]
  // }
  
  //   var displayResult = document.getElementById("return-result");
  //   var i;
  //   var text = "";
  //   var url="";
  //   var nuit = [];
  //   for (i=0;i<complexSearch["results"].length;i++){
  //     if(i==5){
  //       break;
  //     }
  //     // nuit.push(result["results"][i]['id']);
  //     text += "<div onclick = 'myfunc("+String(i)+")' class = 'content' id = 'click"+String(i)+"' style='cursor:pointer;'>";
  //     text += "<div id='first'><div class = 'content-overlay'></div> <img src="+complexSearch["results"][i]["image"]+" class='content-image'></div>";
  //     text += "<div id='second"+String(i)+"'><p>Calories: "+nutritionWidget[String(complexSearch["results"][i]['id'])]['bad'][0]['amount']+" &nbsp Fat: "+nutritionWidget[String(complexSearch["results"][i]['id'])]['bad'][1]['amount'];
  //     text += " &nbsp Carbohydrates: "+nutritionWidget[String(complexSearch["results"][i]['id'])]['bad'][2]['amount']+"</p></div>";
  //     text += "<p>Sugar: "+nutritionWidget[String(complexSearch["results"][i]['id'])]['bad'][3]['amount']+ " &nbsp Protein: "+nutritionWidget[String(complexSearch["results"][i]['id'])]['good'][0]['amount'] + " &nbsp Calcium: "+nutritionWidget[String(complexSearch["results"][i]['id'])]['good'][1]['amount']+"</p><h4><u>Cooking Instructions:</u></h4><ol>";
  //     for(var y=0;y<analyzedInstructions[String(complexSearch["results"][i]['id'])][0]['steps'].length;y++){
  //       text += "<li>"+analyzedInstructions[String(complexSearch["results"][i]['id'])][0]['steps'][y]["step"]+"</li>";
  //     }
  //     text += "</ol><div class='content-details'><h4 class='recipe-name'>"+complexSearch["results"][i]["title"]+"</h4></div>"
  //     text += "</div><br>";
  //   }
  //   displayResult.innerHTML = text;
  
  // console.log(maxCal);
  // console.log("!!!!!!!!!!");
  while(getmaxCal(function(data){
    var params = {
      'query':document.getElementById("dish-name").value,
      'cuisine': document.getElementById("cuisine-type").value,
      'diet': document.getElementById("diet-type").value,
      'equipment': '',
      'excludeIngredients': document.getElementById("ex-ingre").value,
      'includeIngredients': document.getElementById("ingre-list").value,
      'maxCalories': data,
      'type': ''
    };
    
    console.log(data);
    console.log("!!!!!!!!!!")
    var body = {};
  
    var additionalParams = {
      headers: {},
      queryParams: {}
    };
    var apigClient = apigClientFactory.newClient();
    apigClient.recipeGet(params, body, additionalParams)
      .then(function (result) {
        // Add success callback code here.
        console.log('apigClient: success')
        console.log(result.data)
        var displayResult = document.getElementById("return-result");
        var i;
        var text = "";
        var cal="";
        var carbs="";
        var fat = "";
        var sugar ="";
        var sodium = "";
        var vc = "";
        var fiber = "";
        var protein ="";
        var calcium = "";
        var currentgood = "";
        var currentbad = "";
        if(result.data['complexSearch']["results"].length==0){
          text += "<p class='history_line'>No Result Found</p>";
        }else{
          for (i=0;i<result.data['complexSearch']["results"].length;i++){
            if(i==3){
              break;
            }
            currentbad = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'];
            currentgood = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['good'];
            for(var j =0; j < currentgood.length;j++){
              if(currentgood[j]['title']=='Protein'){
                protein = currentgood[j]['amount'];
              }
              if(currentgood[j]['title']=='Fiber'){
                fiber = currentgood[j]['amount'];
              }
              if(currentgood[j]['title']=='Vitamin C'){
                vc = currentgood[j]['amount'];
              }
              if(currentgood[j]['title']=='Calcium'){
                calcium = currentgood[j]['amount'];
              }
              
            }
            for(var j =0; j < currentbad.length;j++){
              if(currentbad[j]['title']=='Calories'){
                cal = currentbad[j]['amount'];
              }
              if(currentbad[j]['title']=='Carbohydrates'){
                carbs = currentbad[j]['amount'];
              }
              if(currentbad[j]['title']=='Fat'){
                fat = currentbad[j]['amount'];
              }
              if(currentbad[j]['title']=='Sugar'){
                sugar = currentbad[j]['amount'];
              }
              if(currentbad[j]['title']=='Sodium'){
                sodium = currentbad[j]['amount'];
              }
  
            }
  
  
            // cal = String(result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][0]['amount']);
            cal = String(cal);
            // carbs = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][2]['amount'];
            carbs = carbs.replace('g','');
            // fat = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][1]['amount'];
            fat = fat.replace('g','');
            // sugar = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][3]['amount'];
            sugar = sugar.replace('g','');
            // sodium = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][6]['amount'];
            sodium = sodium.replace('mg','');
            // vc = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['good'][1]['amount'];
            vc = vc.replace('mg','');
            // protein = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['good'][0]['amount'];
            protein = protein.replace('g','');
            // fiber = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['good'][5]['amount'];
            fiber = fiber.replace('g','');
            calcium = calcium.replace('mg','');
            titles = result.data['complexSearch']["results"][i]["title"];
            title.push(titles);
            image.push(result.data['complexSearch']["results"][i]["image"]);
            text += "<div onclick = 'myfunc("+String(i)+","+String(result.data['complexSearch']["results"][i]['id'])+","+cal+","+carbs+","+fat+","+sugar+","+sodium+","+vc+","+protein+","+fiber+")' class = 'content' id = 'click"+String(i)+"' style='cursor:pointer;'>";
            text += "<div id='first'><div class = 'content-overlay'></div> <img src="+result.data['complexSearch']["results"][i]["image"]+" class='content-image'></div>";
            text += "<div id='second"+String(i)+"'><p>Calories: "+cal+" &nbsp Fat: "+fat+"g";
            text += " &nbsp Carbohydrates: "+carbs+"g</p></div>";
            text += "<p>Sugar: "+sugar+ "g &nbsp Protein: "+protein + "g &nbsp Calcium: "+calcium+"mg</p><h4><u>Cooking Instructions:";
            if(result.data['analyzedInstructions'][String(result.data['complexSearch']["results"][i]['id'])].length !=0){
              text += '</u></h4><ol>';
              for(var y=0;y<result.data['analyzedInstructions'][String(result.data['complexSearch']["results"][i]['id'])][0]['steps'].length;y++){
                text += "<li>"+result.data['analyzedInstructions'][String(result.data['complexSearch']["results"][i]['id'])][0]['steps'][y]["step"]+"</li>";
             }
             text += '</ol>';
            }else{
              text += " None</u></h4>";
            }
            text += "<div class='content-details'><h4 class='recipe-name'>"+result.data['complexSearch']["results"][i]["title"]+"</h4></div>";
            text += "</div><br>";
            }
        }
        // for (i=0;i<result.data['complexSearch']["results"].length;i++){
        //   if(i==3){
        //     break;
        //   }
        //   currentbad = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'];
        //   currentgood = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['good'];
        //   for(var j =0; j < currentgood.length;j++){
        //     if(currentgood[j]['title']=='Protein'){
        //       protein = currentgood[j]['amount'];
        //     }
        //     if(currentgood[j]['title']=='Fiber'){
        //       fiber = currentgood[j]['amount'];
        //     }
        //     if(currentgood[j]['title']=='Vitamin C'){
        //       vc = currentgood[j]['amount'];
        //     }
            
        //   }
        //   for(var j =0; j < currentbad.length;j++){
        //     if(currentbad[j]['title']=='Calories'){
        //       cal = currentbad[j]['amount'];
        //     }
        //     if(currentbad[j]['title']=='Carbohydrates'){
        //       carbs = currentbad[j]['amount'];
        //     }
        //     if(currentbad[j]['title']=='Fat'){
        //       fat = currentbad[j]['amount'];
        //     }
        //     if(currentbad[j]['title']=='Sugar'){
        //       sugar = currentbad[j]['amount'];
        //     }
        //     if(currentbad[j]['title']=='Sodium'){
        //       sodium = currentbad[j]['amount'];
        //     }

        //   }


        //   // cal = String(result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][0]['amount']);
        //   cal = String(cal);
        //   // carbs = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][2]['amount'];
        //   carbs = carbs.replace('g','');
        //   // fat = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][1]['amount'];
        //   fat = fat.replace('g','');
        //   // sugar = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][3]['amount'];
        //   sugar = sugar.replace('g','');
        //   // sodium = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['bad'][6]['amount'];
        //   sodium = sodium.replace('mg','');
        //   // vc = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['good'][1]['amount'];
        //   vc = vc.replace('mg','');
        //   // protein = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['good'][0]['amount'];
        //   protein = protein.replace('g','');
        //   // fiber = result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['good'][5]['amount'];
        //   fiber = fiber.replace('g','');
        //   titles = result.data['complexSearch']["results"][i]["title"];
        //   title.push(titles);
        //   image.push(result.data['complexSearch']["results"][i]["image"]);
        //   text += "<div onclick = 'myfunc("+String(i)+","+String(result.data['complexSearch']["results"][i]['id'])+","+cal+","+carbs+","+fat+","+sugar+","+sodium+","+vc+","+protein+","+fiber+")' class = 'content' id = 'click"+String(i)+"' style='cursor:pointer;'>";
        //   text += "<div id='first'><div class = 'content-overlay'></div> <img src="+result.data['complexSearch']["results"][i]["image"]+" class='content-image'></div>";
        //   text += "<div id='second"+String(i)+"'><p>Calories: "+cal+" &nbsp Fat: "+fat+"g";
        //   text += " &nbsp Carbohydrates: "+carbs+"g</p></div>";
        //   text += "<p>Sugar: "+sugar+ "g &nbsp Protein: "+protein + "g &nbsp Calcium: "+result.data['nutritionWidget'][String(result.data['complexSearch']["results"][i]['id'])]['good'][1]['amount']+"</p><h4><u>Cooking Instructions:";
        //   if(result.data['analyzedInstructions'][String(result.data['complexSearch']["results"][i]['id'])].length !=0){
        //     text += '</u></h4><ol>';
        //     for(var y=0;y<result.data['analyzedInstructions'][String(result.data['complexSearch']["results"][i]['id'])][0]['steps'].length;y++){
        //       text += "<li>"+result.data['analyzedInstructions'][String(result.data['complexSearch']["results"][i]['id'])][0]['steps'][y]["step"]+"</li>";
        //    }
        //    text += '</ol>';
        //   }else{
        //     text += " None</u></h4>";
        //   }
        //   text += "<div class='content-details'><h4 class='recipe-name'>"+result.data['complexSearch']["results"][i]["title"]+"</h4></div>";
        //   text += "</div><br>";
        //   }
          text += "<p class='history_line'>-------------History Dishes-------------</p>";
          if(history_recipe.length!=0){
            for(var x = 0;x<history_recipe.length;x++){
              text += "<div onclick = 'myfunc1("+String(x)+")' class = 'content' id = 'hist"+String(x)+"' style='cursor:pointer;'>";
              text += "<div id='first'><div class = 'content-overlay'></div> <img src="+history_recipe[x]['image']+" class='content-image'></div>";
              text += "<div id='second"+String(i+x)+"'><p>Calories: "+history_recipe[x]['calories']+" &nbsp Fat: "+history_recipe[x]['fat']+"g";
              text += " &nbsp Carbohydrates: "+history_recipe[x]['carbs']+"g</p></div>";
              text += "<p>Sugar: "+history_recipe[x]['sugar']+ "g &nbsp Protein: "+history_recipe[x]['protein'] + "g &nbsp Fiber: "+history_recipe[x]['fiber']+"g</p><h4><u>Cooking Instructions:";
              text += " None</u></h4>";
              text += "<div class='content-details'><h4 class='recipe-name'>"+history_recipe[x]['title']+"</h4></div>";
              text += "</div><br>";
            }
          }else{
            text += "<p class='history_line'>No Result Found</p>";
          }
          // for(var x = 0;x<history_recipe.length;x++){
          //   text += "<div onclick = 'myfunc1("+String(x)+")' class = 'content' id = 'hist"+String(x)+"' style='cursor:pointer;'>";
          //   text += "<div id='first'><div class = 'content-overlay'></div> <img src="+history_recipe[x]['image']+" class='content-image'></div>";
          //   text += "<div id='second"+String(i+x)+"'><p>Calories: "+history_recipe[x]['calories']+" &nbsp Fat: "+history_recipe[x]['fat']+"g";
          //   text += " &nbsp Carbohydrates: "+history_recipe[x]['carbs']+"g</p></div>";
          //   text += "<p>Sugar: "+history_recipe[x]['sugar']+ "g &nbsp Protein: "+history_recipe[x]['protein'] + "g &nbsp Fiber: "+history_recipe[x]['fiber']+"g</p><h4><u>Cooking Instructions:";
          //   text += " None</u></h4>";
          //   text += "<div class='content-details'><h4 class='recipe-name'>"+history_recipe[x]['title']+"</h4></div>";
          //   text += "</div><br>";
          // }
          displayResult.innerHTML = text;
        }).catch(function (result) {
        // Add error callback code here.
        console.log('apigClient: error')
      });
  }));
}
function nextpage() {
  var x = document.getElementById("first-page");
  var y = document.getElementById("second-page");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = 'none';
  } else {
    y.style.display = "block";
    x.style.display = 'none';
  }
}

function myfunc(input,id,cal,carbs,fat,sugar,sodium,vc,protein,fiber){
  var x = document.getElementById('click'+input);
  x.innerHTML="<p style='text-align:center'>Course Selected!</p>";
  // later to do!!!!!!! cuisine put
  var params = {
    'token':getGlobalToken(),
    'recipeid':id
  };
  var body = {
    "id": parseInt(id),
    "calories": parseInt(cal),
    "carbs": parseInt(carbs),
    "fat": parseInt(fat),
    "protein": parseInt(protein),
    "sugar":parseInt(sugar),
    "sodium":parseInt(sodium),
    "vc":parseInt(vc),
    "fiber":parseInt(fiber),
    "title": title[parseInt(input)],
    "image":image[parseInt(input)]
};
console.log(body);
console.log(history_recipe);
console.log("*************");
  var additionalParams = {
    headers: {},
    queryParams: {}
  };
  var apigClient = apigClientFactory.newClient();
  apigClient.recipePut(params, body, additionalParams)
    .then(function (result) {
      // Add success callback code here.
      console.log('apigClient: success')
      console.log(result.data)
      }).catch(function (result) {
      // Add error callback code here.
      console.log('apigClient: error')
    });
}

function myfunc1(input){
  var x = document.getElementById('hist'+input);
  console.log("^^^^^^^^^^1");
  x.innerHTML="<p style='text-align:center'>Course Selected!</p>";
  console.log("^^^^^^^^^^2");
  // later to do!!!!!!! cuisine put
  var params = {
    'token':getGlobalToken(),
    'recipeid':history_recipe[parseInt(input)]['id']
  };
  console.log("^^^^^^^^^^3");
  console.log(history_recipe[parseInt(input)]);
  var body = {
    "id": parseInt(history_recipe[parseInt(input)]['id']),
    "calories": parseInt(history_recipe[parseInt(input)]['calories']),
    "carbs": parseInt(history_recipe[parseInt(input)]['carbs']),
    "fat": parseInt(history_recipe[parseInt(input)]['fat']),
    "protein": parseInt(history_recipe[parseInt(input)]['protein']),
    "sugar":parseInt(history_recipe[parseInt(input)]['sugar']),
    "sodium":parseInt(history_recipe[parseInt(input)]['sodium']),
    "vc":parseInt(history_recipe[parseInt(input)]['vc']),
    "fiber":parseInt(history_recipe[parseInt(input)]['fiber']),
    "title": history_recipe[parseInt(input)]['title'],
    "image":history_recipe[parseInt(input)]['image']
};
console.log(body);
console.log("^^^^^^^^^^");
  var additionalParams = {
    headers: {},
    queryParams: {}
  };
  var apigClient = apigClientFactory.newClient();
  apigClient.recipePut(params, body, additionalParams)
    .then(function (result) {
      // Add success callback code here.
      console.log('apigClient: success')
      console.log(result.data)
      }).catch(function (result) {
      // Add error callback code here.
      console.log('apigClient: error')
    });
}