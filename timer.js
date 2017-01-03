$(document).ready(function(){
  //store the value for session, break and the middle number
  var sNumber = 25;
  var bNumber = 5;
  var number = 25;
  var progressInterval;
  var bool = true;
  var currProgress = 0;
  
  //Add or Substract a number based on the sign
  function change(number,sign){
    switch(sign){
        case "+":
          number++;
          break;
        case "-":
          number--;
          break;
               }
   return number;
  }
  
  //Increments/Decrements session number based on user clicking + or -
  //Assigns it to number then displays both of them
  $("#left button").on("click",function(){
    if(bool){
      var sign = this.name;
      if(sNumber !== 0){
        sNumber = change(sNumber,sign);
      }
      else{
        if(sign == "+"){
          sNumber = change(sNumber,sign);
        }
      }
      $("#session").html(sNumber);
      number = sNumber;
      $("#middle span").html(number);
    }
  });
    
  //Increments/Decrements break number based on what right button the user clicked
  //Displays it
  $("#right button").on("click",function(){
    if(bool){
      var sign = this.name;
      if(bNumber !== 0){
        bNumber = change(bNumber,sign);
      }
      else{
        if(sign == "+"){
          bNumber = change(bNumber,sign);
        }
      }
      $("#break").html(bNumber);
    }
  });
  
  //Timer Logic
  function timer(position){
    //set bool to false, thus not allowing sNumber or bNumber to change during the timer    
    bool = false;
    
    //determine if the current timer is session or break
    switch(position){
          case "left":
            number = sNumber;
            break;
          case "right":
            number = bNumber;
            break;
    }
    
    //Transform number in seconds
    number = number *  60;
    
    //Every updateInterval time, we should run update()
    var updateInterval = number / 1000;
    
    //Display Working/Break
    if(position === "left"){
            $("#middle #start").html("Working...");
    }
    else{
            $("#middle #start").html("Break!!");
    }
    
    if(number > 0){
      //update number every second
      subTimer(position);
      
      //update progress bar
      progressInterval = setInterval(function(){
        update();
        if($("#progressNumber").html() >= 100){
          $("#progressNumber").html("0");
          currProgress = 0;
          clearInterval(progressInterval);
        }
      },updateInterval * 1000);
    }
}
  
  //Every second, decrement number, display it(if it is 0, call timer for the opposite position)
  function subTimer(pos){
    if(bool){
      return ;
    }
    $("#middle span").html(transform(number));
    setTimeout(function(){
      if(number !== 0){
        number--;
        subTimer(pos);
      }
      else{
        if(pos === "left"){
          timer("right");
        }
        else{
          timer("left");
        }
      }
    },1000);
    
  }
  
  //Start timer if sNumber and bNumber !== 0
  $("#start").on("click",function(){
    if(bool){
     if((sNumber !== 0) && (bNumber !== 0)){
         timer("left"); 
      }
    }
  });
  
  //Reset All
  $("#reset").on("click",function(){
    sNumber = 25;
    bNumber = 5;
    number = 25;
    currProgress = 0;
    clearInterval(progressInterval);
    $("#progressNumber").html("0");
    $("#middle #start").html("Start timer");
    $("#progress").css("width",(0 + "%"));
    bool = true;
    $("#session").html(sNumber);
    $("#middle span").html(number);
    $("#break").html(bNumber);
    });
  
  //draws middle timer
  function middleText(text){
    $("#middle #start").html(text);
  }
  
  //Returns the time from seconds to HH:MM:SS format
  function transform(seconds){
  var minutes = 0;
  var hours = 0;
  if((seconds / 3600) > 0){
    hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
  }
  if(seconds > 60){
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
  }
  if(seconds < 10){
    seconds = "0" + seconds;
  }
  if(minutes < 10){
    minutes = "0" + minutes;
  }
  if(hours < 10){
    hours = "0" + hours;
  }
  if(hours === 0){
    if(minutes === 0){
      return seconds + "";
    }
    return (minutes + ":" + seconds);
  }
  else{
    return (hours + ":" + minutes + ":" + seconds);
  }
  
}
  
  //Visually update the bar every 0.1 seconds
  //Update the current progress number
  function update(){
    currProgress += 0.1;
    $("#progress").css("width",(currProgress + "%"));
    //console.log(parseInt(currProgress));
    $("#progressNumber").html(parseInt(currProgress));
  }
});