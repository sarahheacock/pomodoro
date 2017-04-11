var START_TIME = '';
var SECONDS;
$(".my_audio").trigger('load');

//$('#myDiv').style.animationDuration = START_TIME;
$('input').on('click', function(){
  //START_TIME = '0';
  //format(START_TIME);
  $('.reset').click();
});

$('input').on('keyup', function(event){
  $('.start').text("START");
  var key = event.which || event.keyCode;
  //make sure key is a number
  if(key >= 48 && key <= 57) {
    START_TIME = START_TIME + (key-48);
  }
  //when delete or backspace are pressed, clears input
  if(key === 8 || key === 46){  
    START_TIME = '0';
  } 
  //pressing enter triggers clicking start button
  if(key == 13){
    $('.start').click();
  }
  //document.getElementById("myDiv").style.animationDuration = START_TIME;
  $('input').fadeOut(700, function(){
     //self.setState({winner: user}); 
    //$('input').val(string.join(''));
    //$('input').fadeIn(700);
    format(START_TIME);
  });
  
  
});

//parameter is an int and changes input form to xxh xxm xxs
function format(time){
  var num = time.toString().split('');
  var string = "00h 00m 00s".split('');
  var place = [9, 8, 5, 4, 1, 0];
  var j = 0;
  for(var i = num.length - 1; i >= 0; i--) {
    string[place[j]] = num[i];
    j++;
  }
  //$('input').fadeOut(700, function(){
     //self.setState({winner: user}); 
    $('input').val(string.join(''));
    $('input').fadeIn(700);
  //});
  
}

//parameter is a string from input text that removes non-digit characters and returns and int
function unformat(chartime){
  chartime = chartime.split('');
  //console.log(chartime);
  var filtered = chartime.filter(function(value){
    if(value >= '0' && value <= '9') return value;
  });
  var num = parseInt(filtered.join(''));
  //console.log(num);
  return num;
}

function countDown(time){
  //$("#inputDiv").removeClass("myDiv");
  
  if(time === 0){
      return done();
  }  
  $('.start').on('click', function() {
    $(this).text("START");
    var thiscolor = $(".timer").css("border-color");
    $(".timer").css({"border-color": thiscolor});
    return start();
  }); 
  
  $('.reset').on('click', function() {
    $(".timer").css({"border-color": "White", "transition": "border-color 500ms"});
    $("#inputDiv").removeClass('timer');
    return start();
  });
  
  //start();
  setTimeout(function(){   
    time--;
    if(time%100 === 99){
      time = time - 40;
    }
    if(time%10000 === 9959){
      time = time - 4000;
    }
    if($('.start').text() === "STOP"){
       format(time);
       countDown(time);
    }   
  }, 1000);
}

function done() {
  $('.start').text("OK");
  $('.my_audio').trigger('play');

  //console.log($("#inputDiv").hasClass('timer'));

  $('.start').on('click', function(){
    $(".my_audio").trigger("pause");
    $(".my_audio").prop("currentTime",0);
    
    
    //$("#inputDiv").addClass('myDiv');
    $(".timer").css({"border-color": "White", "transition": "border-color 500ms"});
    $("#inputDiv").removeClass('timer');
    //return start();
    $('.reset').click();
  });
}

//takes int xx xx xx and converts to mseconds and then string
function calculate(time){
  //get seconds
  var calc = time%100;
  //get minutes
  var minutes = 60*(time/100);
  calc += minutes;
  //get hours
  calc += 60*(minutes/100);
  //convert to ms and string
  return ((calc-1)*1000).toString();
}

function start() { 
  $('.start').on('click', function() {
    //SECONDS = (START_TIME*1000).toString();
    var time = unformat($('input').val());
    //var seconds = (time*1000).toString();
    var seconds = calculate(time);
    if(time === 0) return;
    $(this).text("STOP");
    
    
    //console.log(time);
    if($("#inputDiv").hasClass('timer') === false){
      $("#inputDiv").addClass("timer");
    }
    //console.log($(".timer").css("border-color"));
    $(".timer").css({"border-color": "#1d3030", "transition": "border-color " + seconds + "ms"});
    console.log($(".time").html())
    //console.log($(".timer").css("border-color"));
    return countDown(time);   
  });
  $('.reset').on('click', function() {
     $('.start').text("START");
     format(START_TIME);
  }); 
}

$(document).ready(function(){
  $('input').val("00h 25m 00s");
  START_TIME = "2500";
  //SECONDS = (25*60*1000).toString();
  start();  
});