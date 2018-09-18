'use strict';
angular.module('myApp')
.controller('appController',function($scope,$location,$http){
  $scope.errorMessage = "";
  $scope.kgraphRecords = [];
  document.getElementsByClassName('navStyle')[0].style.display="none";
  $scope.homePage = function(){
    $location.path("/homepage");
  }
  $scope.aboutPage = function(){
    $location.path("/about");
  }
  $scope.contactPage = function(){
    $location.path("/contact");
  }
  $scope.registerFn = function(){
    $location.path("/register");
  }
  $scope.logoutFn = function(){
    $location.path("/login");
  }

  $scope.onFocusFn = function(){
    $scope.errorMessage = "";
  }

  $scope.registerUser = function(regForm){
    if(regForm.pwd == regForm.cPwd){
      localStorage.setItem('user', JSON.stringify(regForm));
      swal({
        title: "Registration Completed",
        text: "Success",
        icon: "success",
        button: "okay",
      });
      $location.path("/login");
    }else{
      swal({
        title: "Registration Failed",
        text: "Passwords not matched",
        icon: "error",
        button: "okay",
      });
    }
  }

  $scope.login = function(form){
    localStorage.setItem('myVal',true);
    console.log(form);
    var user = JSON.parse(localStorage.getItem('user'));
    if(form == undefined){
      $scope.errorMessage = "Inavlid Email ID or Password";
    }else if(form.eMail == user.eMail && form.pwd == user.pwd){
      console.log("Login Successful");
      document.getElementsByClassName('navStyle')[0].style.display="block";
      $location.path("/homepage");
    }else {
      $scope.errorMessage = "Inavlid Email ID or Password";
    }
  }

  $scope.onGoogleLogin = function(){
    var params = {
      'clientid': '127336819684-iqf6ppdloemrh0jt2se0s6ailhl77feo.apps.googleusercontent.com',
      'cookiepolicy':'single_host_origin',
      'callback': function(result){
        if(result['status']['signed_in']){
          $scope.$apply(function(){
            document.getElementsByClassName('navStyle')[0].style.display="block";
            $location.path("/homepage");
          });
        }
      },
      'approvalprompt': 'force',
      'scope': 'https://www.googleapis.com/auth/gmail.readonly'
    };
    gapi.auth.signIn(params);
  }

  $scope.onFacebookLogin = function(){
    FB.login(function(response){
      if(response.authResponse){
        FB.api('/me', 'GET', {fields: 'email, first_name, name, id, picture'}, function(response){
          $scope.$apply(function(){
            document.getElementsByClassName('navStyle')[0].style.display="block";
            $location.path("/homepage");
          });
        });
      }else{

      }
    }, {
      scope: 'email, user_likes',
      return_scopes: true
    });
  }

  $scope.KGSearch = function(name){
    console.log("faf");
    $http({
      url: 'https://kgsearch.googleapis.com/v1/entities:search',
      method: "GET",
      params: {'query': name,
      'limit': 10,
      'indent': true,
      'key' : 'AIzaSyCKP40Is7s-Hu7_ajoifKTnXYuFND86_d8'}
    })
    .then(function(res) {
      console.log(res);
      $scope.kgraphRecords = res.data.itemListElement;
    }
  )
}

$scope.itemName = "";
$scope.ingrData = {};
$scope.viewContent = false;

var url ="http://numbersapi.com/42/math?callback=showNumber";
$scope.ingrSearch = function(ingrName){
  if(ingrName == undefined){
    alert('Please enter valid Ingredient Name');
  }
  else{
    $http.get("http://numbersapi.com/"+ ingrName+"/math?callback=showNumber")
    .then(function(res) {

     $scope.data=res.data;
     console.log($scope.data);
    }
  )
}
}

});
var r = document.getElementById('result');

function startConverting () {
    if('webkitSpeechRecognition' in window){
        var speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = 'en-IN';
        speechRecognizer.start();

        var finalTranscripts = '';

        speechRecognizer.onresult = function(event){
            var interimTranscripts = '';
            for(var i = event.resultIndex; i < event.results.length; i++){
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if(event.results[i].isFinal){
                    finalTranscripts += transcript;
                }else{
                    interimTranscripts += transcript;
                }
            }
            r.innerHTML = finalTranscripts + '<span style="color:#999">' + interimTranscripts + '</span>';
        };
        speechRecognizer.onerror = function (event) {
        };
    }else{
        r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
    }
}


