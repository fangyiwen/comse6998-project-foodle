
var userid = '';
var dislike = '';
var email = '';
var gender = '';
var current_recipe = '';
var height = '';
var phone = '';
var weight = '';
var current_recipe =[];
var history_recipe =[];
window.onload = function (){
	if (getGlobalToken()!== undefined && getGlobalToken() !== 'invalid') {

	  	token = getGlobalToken();
		var text = '';
	//   console.log("!!!!");
	  //   // Do something, e.g., call API Gateway
	  var displayResult = document.getElementById("circle-div-info");
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
		//   text+="<ul>";
		userid = result.data['userid'] ;
		dislike = result.data['dislike'];
		email = result.data['email'];
		age = result.data['age'];
		gender = result.data['gender'];
		current_recipe = result.data['current_recipe'];
		history_recipe = result.data['history_recipe'];
		height = result.data['height'];
		phone = result.data['phoneNumber'];
		weight = result.data['weight'];
		firstName = result.data['firstName'];
		lastName = result.data['lastName'];
		document.getElementById("firstname").value = firstName;
		document.getElementById("lastname").value = lastName;
		document.getElementById("phone").value = phone;
		document.getElementById("age").value = age;
		document.getElementById("email").value = email;
		document.getElementById("gender").value = gender;
		document.getElementById("height").value = height;
		document.getElementById("weight").value = weight;
		document.getElementById("dislike").value = dislike;
		text+="<h3>Username: "+userid+"</h3>";
		text+="<h3>First Name: "+firstName+"</h3>";
		text+="<h3>Last Name: "+lastName+"</h3>";
		text+="<h3>Gender: "+gender+"</h3>";
		text+="<h3>Age: "+age+"</h3>";
		text+="<h3>Phone: "+phone+"</h3>";
		text+="<h3>Email: "+email+"</h3>";
		text+= "<h3>Height: "+height+"cm</h3>";
		text+= "<h3>Weight: "+weight+"kg</h3>";
		text+= "<h3>Dislike: "+dislike+"</h3>";
		displayResult.innerHTML = text;//change location?
		var showdish = document.getElementById("current-dishes");
		var dishtext = "<h3>Today's Specials</h3>";
		for(var j = 0; j <current_recipe.length;j++){
			dishtext += "<div onclick=deletedish("+String(j)+") class=show-dish>";
			// dishtext += "<img src="+current_recipe[j]['image']+" class='content-image'>";
			dishtext += "<h4>"+current_recipe[j]['title']+"</h4>";
			dishtext += "<p>---------------------------------------- Calories: "+String(current_recipe[j]['calories'])+"</p>";
			dishtext += "</div>";
		}
		showdish.innerHTML=dishtext;
		var showpastdish = document.getElementById("past-dishes");
		var pastdishtext = "<h3>Cheif's Choice</h3>";
		for(var j = 0; j <history_recipe.length;j++){
			if(j==10){
				break;
			}
			pastdishtext += "<div class=show-dish-past>";
			// dishtext += "<img src="+current_recipe[j]['image']+" class='content-image'>";
			pastdishtext += "<h4>"+history_recipe[j]['title']+"</h4>";
			pastdishtext += "</div>";
		}
		showpastdish.innerHTML=pastdishtext;
		var maxcalories = 0;
		  var cal=0;
		  var fat = 0;
		  var sugar = 0;
		  var protein=0;
		  var carbs = 0;
		  var sodium = 0;
		  var fiber = 0;
		  var vc = 0;
		  if(gender == 'female'){
			maxcalories = (10*weight)+(6.25*height)-(5*age)-161;
		  }else{
			maxcalories = (10*weight)+(6.25*height)-(5*age)+5;
		  }
		  
		  for(var i = 0; i <current_recipe.length;i++){
			cal+=current_recipe[i]['calories'];
			fat+=current_recipe[i]['fat'];
			sugar += current_recipe[i]['sugar'];
			protein += current_recipe[i]['protein'];
			carbs += current_recipe[i]['carbs'];
			sodium += current_recipe[i]['sodium'];
			fiber +=current_recipe[i]['fiber'];
			vc += current_recipe[i]['vc'];
		  }
		  sodium=sodium/1000;
			var chartDom = document.getElementById('main');
	  var myChart = echarts.init(chartDom);
	  var option;
	  
	  option = {
		  tooltip: {
			  trigger: 'item'
		  },
		  // legend: {
		  //     top: '5%',
		  //     left: 'center'
		  // },
		  series: [
			  {
				  name: 'Nutrition',
				  type: 'pie',
				  radius: ['40%', '70%'],
				  avoidLabelOverlap: false,
				  itemStyle: {
					  borderRadius: 10,
					  borderColor: '#fff',
					  borderWidth: 2
				  },
				  label: {
					  show: false,
					  position: 'center'
				  },
				  emphasis: {
					  label: {
						  show: true,
						  fontSize: '40',
						  fontWeight: 'bold',
						  color: 'white'
					  }
				  },
				  labelLine: {
					  show: false
				  },
				  data: [
					  {value: protein,name: 'Protein'},
					  {value: vc, name: 'Vitamin C'},
					  {value: fiber, name: 'Fiber'},
					  {value: sugar, name: 'Sugar'},
					  {value: fat, name: 'Fat'},
					  {value: carbs, name: 'Carbohydrates'},
					  {value: sodium, name: 'Sodium'}
				  ]
			  }
		  ]
	  };
	  
	  myChart.setOption(option);
	  
	  var chartDom1 = document.getElementById('main1');
	  var myChart1 = echarts.init(chartDom1);
	  var option1;
	  
	  option1 = {
		  tooltip: {
			  trigger: 'item'
		  },
		  legend: {
		      top: '2%',
		      left: 'center'
		  },
		  series: [
			  {
				  name: 'Calories Status',
				  type: 'pie',
				  radius: ['40%', '70%'],
				  avoidLabelOverlap: false,
				  itemStyle: {
					  borderRadius: 10,
					  borderColor: '#fff',
					  borderWidth: 2
				  },
				  label: {
					  show: false,
					  position: 'center'
				  },
				  emphasis: {
					  label: {
						  show: true,
						  fontSize: '40',
						  fontWeight: 'bold',
						  color: 'white'
					  }
				  },
				  labelLine: {
					  show: false
				  },
				  data: [
					  {value: cal,name: 'Calories Intake'},
					  {value: (maxcalories-cal), name: 'Calories Quota'}
				  ]
			  }
		  ]
	  };
	  
	  myChart1.setOption(option1);
	  
	  var chartDom2 = document.getElementById('main2');
	  var myChart2 = echarts.init(chartDom2);
	  var option2;
	  
	  option2 = {
		  tooltip: {
			  trigger: 'axis',
			  axisPointer: {
				  type: 'shadow'
			  }
		  },
		  legend: {
			  data: ['Standard', 'Actual Intake']
		  },
		  grid: {
			  left: '3%',
			  right: '4%',
			  bottom: '3%',
			  containLabel: true
		  },
		  xAxis: {
			  type: 'value',
			  boundaryGap: [0, 0.01]
		  },
		  yAxis: {
			  type: 'category',
			  data: ['Sodium(g)','Carbohydrates(g)' , 'Fat(g)', 'Suger(g)','Fiber(g)', 'Vitamin C(mg)','Protein(g)']
		  },
		  series: [
			  {
				  name: 'Standard',
				  type: 'bar',
				  data: [3, 310, 70, 90, 30, 80,50]
			  },
			  {
				  name: 'Actual Intake',
				  type: 'bar',
				  data: [sodium, carbs, fat, sugar, fiber, vc,protein]
			  }
		  ]
	  };
	  
	  option2 && myChart2.setOption(option2);

	   }).catch(function (result) {
		   // Add error callback code here.
		   console.log('apigClient: error')
		});
	} else {
		var displayResult = document.getElementById("circle-div-info");
		displayResult.innerHTML = "<h1>Please Login</h1>";
	  console.log('Redirect to home/register/login page');
	}
// 	var cal=0;
// 	var fat = 0;
// 	// var sugar = 0;
// 	var protein=0;
// 	var carbs = 0;
// 	// var sodium = 0;
// 	// var fiber = 0;
// 	// var vc = 0;
// 	console.log("!!!!!!!!");
// 	console.log(typeof(current_recipe));
// 	for(var i =0;i<current_recipe.length;i++){
// 		console.log("!!!!!!!!");
// 		console.log(current_recipe[i]);
// 	}
// 	  var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom);
// var option;

// option = {
//     tooltip: {
//         trigger: 'item'
//     },
//     // legend: {
//     //     top: '5%',
//     //     left: 'center'
//     // },
//     series: [
//         {
//             name: 'Nutrition',
//             type: 'pie',
//             radius: ['40%', '70%'],
//             avoidLabelOverlap: false,
//             itemStyle: {
//                 borderRadius: 10,
//                 borderColor: '#fff',
//                 borderWidth: 2
//             },
//             label: {
//                 show: false,
//                 position: 'center'
//             },
//             emphasis: {
//                 label: {
//                     show: true,
//                     fontSize: '40',
//                     fontWeight: 'bold',
//                     color: 'white'
//                 }
//             },
//             labelLine: {
//                 show: false
//             },
//             data: [
//                 {value: 50,name: 'Protein'},
//                 {value: 735, name: 'Vitamin C'},
//                 {value: 580, name: 'Fiber'},
//                 {value: 484, name: 'Sugar'},
//                 {value: 300, name: 'Fat'},
//                 {value: 300, name: 'Carbohydrates'},
//                 {value: 300, name: 'Sodium'}
//             ]
//         }
//     ]
// };

// myChart.setOption(option);

// var chartDom1 = document.getElementById('main1');
// var myChart1 = echarts.init(chartDom1);
// var option1;

// option1 = {
//     tooltip: {
//         trigger: 'item'
//     },
//     // legend: {
//     //     top: '5%',
//     //     left: 'center'
//     // },
//     series: [
//         {
//             name: 'Calories Status',
//             type: 'pie',
//             radius: ['40%', '70%'],
//             avoidLabelOverlap: false,
//             itemStyle: {
//                 borderRadius: 10,
//                 borderColor: '#fff',
//                 borderWidth: 2
//             },
//             label: {
//                 show: false,
//                 position: 'center'
//             },
//             emphasis: {
//                 label: {
//                     show: true,
//                     fontSize: '40',
//                     fontWeight: 'bold',
//                     color: 'white'
//                 }
//             },
//             labelLine: {
//                 show: false
//             },
//             data: [
//                 {value: 50,name: 'Calories Intake'},
//                 {value: 735, name: 'Calories Quota'}
//             ]
//         }
//     ]
// };

// myChart1.setOption(option1);

// var chartDom2 = document.getElementById('main2');
// var myChart2 = echarts.init(chartDom2);
// var option2;

// option2 = {
//     tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//             type: 'shadow'
//         }
//     },
//     legend: {
//         data: ['Standard', 'Actual Intake']
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     xAxis: {
//         type: 'value',
//         boundaryGap: [0, 0.01]
//     },
//     yAxis: {
//         type: 'category',
//         data: ['Sodium','Carbohydrates' , 'Fat', 'Suger','Fiber', 'Vitamin C','Protein']
//     },
//     series: [
//         {
//             name: 'Standard',
//             type: 'bar',
//             data: [2.3, 310, 70, 90, 30, 0.08,50]
//         },
//         {
//             name: 'Actual Intake',
//             type: 'bar',
//             data: [2.3, 310, 70, 90, 30, 0.08,50]
//         }
//     ]
// };

// option2 && myChart2.setOption(option2);
  }

  function test(){
	document.getElementById("circle-div").style.display = "none";
	document.getElementById("circle-div-second").style.display = "block";
  }
  function test1(){
	document.getElementById("circle-div").style.display = "block";
	document.getElementById("circle-div-second").style.display = "none";
  }
  function test2(){
	document.getElementById("nuitrition-div-2").style.display = "block";
	document.getElementById("nuitrition-div").style.display = "none";
  }
  function test3(){
	document.getElementById("nuitrition-div").style.display = "block";
	document.getElementById("nuitrition-div-2").style.display = "none";
  }
  function editInfo(){
	  var input_phone = document.getElementById("phone").value;
	  var input_age = document.getElementById("age").value;
	  var input_email = document.getElementById("email").value;
	  var input_gender = document.getElementById("gender").value;
	  var input_height = document.getElementById("height").value;
	  var input_weight = document.getElementById("weight").value;
	  var input_dislike = document.getElementById("dislike").value;
	  var firstName = document.getElementById("firstname").value;
	  var lastName = document.getElementById("lastname").value;
	  console.log(input_age);
	  
	  var params = {
		'token':getGlobalToken(),
		'phoneNumber':input_phone,
		'dislike':input_dislike,
		'age':input_age,
		'gender':input_gender,
		'height':input_height,
		'weight':input_weight,
		'email':input_email,
		'firstName':firstName,
		'lastName':lastName,
	  };
	  console.log(params);
	  var body = current_recipe;
	
	  var additionalParams = {
		headers: {},
		queryParams: {}
	  };
	  var apigClient = apigClientFactory.newClient();
	  apigClient.userPut(params, body, additionalParams)
    .then(function (result) {
      // Add success callback code here.
      console.log('apigClient: success')
      console.log(result.data)
	  location.reload();
      }).catch(function (result) {
      // Add error callback code here.
      console.log('apigClient: error')
    });
  }
function deletedish(input){
	var input_phone = document.getElementById("phone").value;
	var input_age = document.getElementById("age").value;
	var input_email = document.getElementById("email").value;
	var input_gender = document.getElementById("gender").value;
	var input_height = document.getElementById("height").value;
	var input_weight = document.getElementById("weight").value;
	var input_dislike = document.getElementById("dislike").value;
	var firstName = document.getElementById("firstname").value;
	var lastName = document.getElementById("lastname").value;
	console.log(input_age);
	
	var params = {
	  'token':getGlobalToken(),
	  'phoneNumber':input_phone,
	  'dislike':input_dislike,
	  'age':input_age,
	  'gender':input_gender,
	  'height':input_height,
	  'weight':input_weight,
	  'email':input_email,
	  'firstName':firstName,
	  'lastName':lastName,
	};
	console.log(params);
	var body = [];
	for(var j=0;j<current_recipe.length;j++){
		if(j!=parseInt(input)){
			body.push(current_recipe[j]);
		}
	}
	var additionalParams = {
	  headers: {},
	  queryParams: {}
	};
	var apigClient = apigClientFactory.newClient();
	apigClient.userPut(params, body, additionalParams)
  .then(function (result) {
	// Add success callback code here.
	console.log('apigClient: success')
	console.log(result.data)
	location.reload();
	}).catch(function (result) {
	// Add error callback code here.
	console.log('apigClient: error')
  });
}
  