/*©2018 A. Napolitano,  Elena Mills, RD*/
var TriviaGame = {
  bFirstTime:true,
  gameMusicPlayer:document.getElementById("MusicToggle"), 
  gameSFXPlayer:document.getElementById("SFX"),
  gameMusic:$("#MusicToggle"),
  gameSFX:$("#SFX"),
  bGameMusicOn: true,
  MaxTime: 10000,
  QuestionTime: 0,  
  TransitionTime: 5000,
  QuestionsRight: 0,
  QuestionsWrong: 0,
  QuestionTimedOut: 0,
  QuestionsLeft: 0,
  CurQuestion: 0,
  GameInterval:"",
  GameTimeOut:"",
  Question: function (Q, A, C){
    this.Question = Q;
    this.Answer = A;
    this.Choice = C;    
  },
  arrQuestion: [],
  reset: function () {
    
    TriviaGame.bFirstTime =false;
    clearTimeout(TriviaGame.GameTimeOut);
    clearInterval(TriviaGame.GameInterval);
    TriviaGame.arrQuestion.length=0;
    TriviaGame.gameMusicPlayer = document.getElementById("MusicToggle");
    $("#splash").show();
    $("#run").hide();
    $("#TriviaOutcome").hide();
    
    //gamedata reset
    TriviaGame.gameMusicPlayer=document.getElementById("MusicToggle"); 
    TriviaGame.gameSFXPlayer=document.getElementById("SFX");
    TriviaGame.gameMusic=$("#MusicToggle");
    TriviaGame.gameSFX=$("#SFX");
    TriviaGame.bGameMusicOn= true;
    TriviaGame.MaxTime= 10000;
    TriviaGame.QuestionTime=0;  
    TriviaGame.TransitionTime=5000;
    TriviaGame.QuestionsRight=0;
    TriviaGame.QuestionsWrong=0;
    TriviaGame.QuestionTimedOut=0;
    TriviaGame.QuestionsLeft=0;
    TriviaGame.CurQuestion=0;
    TriviaGame.GameInterval="";
    TriviaGame.GameTimeOut="";
    //gamedata reset

    var Qi = new TriviaGame.Question("How many calories are in one gram of fat?","9 calories",["9 calories","3.4 calories","15 calories","4 calories"]);
    TriviaGame.arrQuestion.push(Qi); 

    Qi = new TriviaGame.Question("Which of these foods is not a good source of polyunsaturated fats?","Beef",["Beef","Soy Bean Oil","Quinoa","Salmon"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("Which fat is not listed on the nutrition fact food label?","Biosaturated Fat",["Biosaturated Fat","Monounsaturated Fat","Trans Fat","Saturated Fat"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("Which of these is a high saturated fat snack?","Kettle Cooked Potato Chips",["Kettle Cooked Potato Chips","Carrots and hummus","Two chocolate chip cookies and glass of whole milk.","Pretzels"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("Which of the following condiments will add extra fat to your meal?","Mayonnaise",["Mayonnaise","Mustard","Salt and Pepper","Salsa"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("How do trans fats effect your health?","Raises LDL (bad cholesterol)",["Raises LDL (bad cholesterol)","Lowers total cholesterol","Raises HDL (good cholesterol)","Gives you more energy"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("Which is an example of eating a healthy dietary pattern?","All of the answers",["All of the answers","Includes good fats","Limits saturated fats","Keeps trans fats as low as possible"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("The majority of saturated fat comes from _____________ .","All of the answers",["All of the answers","Lamb","Butter","Poultry Skin"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("Eating a diet high in unsaturated and trans fat raises your risk of _____________ .","All of the answers",["All of the answers","Cancer","Cardiovascular Disease","Diabetes"]);
    TriviaGame.arrQuestion.push(Qi);

    Qi = new TriviaGame.Question("The best way to lower your cholesterol is to _____________ .","Eat more whole foods, inculding, veggies and whole grains",["Eat more whole foods, inculding, veggies and whole grains", "Eat more brownies", "Drink whole milk twice daily","Eat more Fast Foods"]);
    TriviaGame.arrQuestion.push(Qi);

    

    TriviaGame.QuestionsLeft = TriviaGame.arrQuestion.length;
    TriviaGame.CurQuestion = 0;
    TriviaGame.gameMusicPlayer.play(); 
  },
  start(){
      $("#splash").hide();
      $("#run").show();
      $("#TriviaOutcome").hide();
      $("#timer").text(TriviaGame.timeConverter(TriviaGame.QuestionTime/1000));
      document.getElementById("SFX").play();
      TriviaGame.newquestion();
  },
  newquestion: function (){
    if(TriviaGame.CurQuestion < TriviaGame.arrQuestion.length){
      $("#timer").text("00:10");
      $("#splash").hide();
      $("#TriviaOutcome").hide();      
      $("#run").show();
      TriviaGame.QuestionTime = TriviaGame.MaxTime;
      $("#AskQuestion").text(TriviaGame.arrQuestion[TriviaGame.CurQuestion].Question);
      
      clearInterval(TriviaGame.GameInterval);
      
      TriviaGame.GameInterval = setInterval(function(){TriviaGame.tick()},1000);
      var arrAns = [];
      var cnt = 1;
      $("#but1").empty();
      $("#but2").empty();
      $("#but3").empty();
      $("#but4").empty();
      
      while(arrAns.length < 4)
      {
        var rnd = Math.floor(Math.random() * 4);
        if(!arrAns.includes(rnd)){
          arrAns.push(rnd);
      
          var buttext = TriviaGame.arrQuestion[TriviaGame.CurQuestion].Choice[rnd];
        
          var but = $("<button onclick='TriviaGame.answer(this)' class='ansbutton' id='ansbutton" + rnd + "'>" + buttext + "</button>");
          $("#but" + cnt).append(but);
        
          cnt ++;
        } 
      }

    }else{
      TriviaGame.gameover();
    }
      
  },
  right: function() {
    clearInterval(TriviaGame.GameInterval);
    $("#TriviaOutcome").show();      
    $("#run").hide();
    
    $("#outcomeTime").text("Correct!!!");
    $("#outcome").text("Time Remaining: " + TriviaGame.timeConverter(TriviaGame.QuestionTime/1000) + " seconds") ;
    $("#outcomeAnswer").text("");


    TriviaGame.QuestionsRight ++;
    TriviaGame.CurQuestion++;
    TriviaGame.GameTimeOut = setTimeout(function(){TriviaGame.newquestion()},TriviaGame.TransitionTime);
  },
  wrong: function () {
    clearInterval(TriviaGame.GameInterval);
    
    $("#TriviaOutcome").show();      
    $("#run").hide();
    
    $("#outcomeTime").text("Incorrect");
    $("#outcome").text("Time Remaining: " + TriviaGame.timeConverter(TriviaGame.QuestionTime/1000) + " seconds") ;
    $("#outcomeAnswer").text("The correct answer was: " + TriviaGame.arrQuestion[TriviaGame.CurQuestion].Answer);

    TriviaGame.QuestionsWrong ++;
    TriviaGame.CurQuestion++;    
    TriviaGame.GameTimeOut = setTimeout(function(){TriviaGame.newquestion()},TriviaGame.TransitionTime);
  },
  gameover: function(){
    clearInterval(TriviaGame.GameInterval);
    $("#TriviaOutcome").show();      
    $("#run").hide();


    $("#outcomeTime").text("Game Over");
    $("#outcome").text("You answered " + TriviaGame.QuestionsRight + " question(s) out of " + TriviaGame.arrQuestion.length + " questions, correctly!");
    $("#outcomeAnswer").text("You didn't answer " + TriviaGame.QuestionTimedOut + " question(s) and got "+ TriviaGame.QuestionsWrong +" question(s) wrong.");

    TriviaGame.GameTimeOut = setTimeout(function(){TriviaGame.reset()},TriviaGame.TransitionTime*2);
  },
  tick: function(){
    TriviaGame.QuestionTime -= 1000;
    $("#timer").text(TriviaGame.timeConverter(TriviaGame.QuestionTime/1000));
    if(TriviaGame.QuestionTime <= 0){
      TriviaGame.timeout();      
    }    
  },
  answer: function(button){
      clearInterval(TriviaGame.GameInterval);
      document.getElementById("SFX").play();
      if(button.innerText===TriviaGame.arrQuestion[TriviaGame.CurQuestion].Answer){
        TriviaGame.right();
      }else{
        TriviaGame.wrong();
      }

  },
  timeout: function() {
    clearInterval(TriviaGame.GameInterval);
    document.getElementById("SFX").play();
    $("#TriviaOutcome").show();      
    $("#run").hide();

    $("#outcomeTime").text("Time Out");
    $("#outcome").text("Time Remaining: " + TriviaGame.timeConverter(TriviaGame.QuestionTime/1000) + " seconds") ;
    $("#outcomeAnswer").text("The correct answer was: " + TriviaGame.arrQuestion[TriviaGame.CurQuestion].Answer);

    TriviaGame.QuestionTimedOut++;
    TriviaGame.CurQuestion++;
    TriviaGame.GameTimeOut = setTimeout(function(){TriviaGame.newquestion()},TriviaGame.TransitionTime);
  },  
  mToggle: function () {    
    if(TriviaGame.bGameMusicOn){
      TriviaGame.gameMusicPlayer.pause();
      $("#MusicLabel").text("Music(Off)");
    }else{
      TriviaGame.gameMusicPlayer.play();  
      $("#MusicLabel").text("Music(On)");  
    }
    TriviaGame.bGameMusicOn = (!TriviaGame.bGameMusicOn);
  },
  timeConverter: function(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
}
