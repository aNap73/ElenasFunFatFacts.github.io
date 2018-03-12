 /*© 2018 A. Napolitano, Elena Mills RD*/
 var ElsFunNutQuiz={
   authRatings: 'pg',
   bPageRatings: false,
   bPageAnimate:true,
   newgif:"",
   colGiffys:[],
   antGif: function(sStillImg, sAnimatedImg, sRating){
    this.Still = sStillImg;
    this.Animated = sAnimatedImg;
    this.Rating = sRating;
    this.bAnimated = false;
   },    
    getGiffyCol: function(inSrch){
      let col = [];
      
      col =  ElsFunNutQuiz.getGiffyCol1(inSrch);      
      return col;
    },
    /*public project had to remove---getGiffyCol1: function(inSrch){
        let col = [];
        let curfn = "keyremoved";
        let offset = Math.floor(Math.random()*125);    
         $.ajax({           
           url: "https://api.giphy.com/v1/gifs/search?api_key=" + curfn + "&rating=" + ElsFunNutQuiz.authRatings + "&q='" + inSrch + "'&offset=" + offset + "&limit=15",
           method: "GET"
         }).then(function(response) {
           ElsFunNutQuiz.colGiffys = [];
           for(i=0;i<response.data.length;i++){
             let rd = response.data[i];
             let gif = new ElsFunNutQuiz.antGif(rd.images.fixed_height_still.url,
               rd.images.fixed_height.url,
               rd.rating);
               ElsFunNutQuiz.colGiffys.push(gif);
           }
           ElsFunNutQuiz.colGiffys.forEach(function(item,i){             
             let myitem = "";
             if(ElsFunNutQuiz.bPageAnimate){
               myitem = item.Animated; 
             }else{
               myitem = item.Still;
             }
             let Rats = "Rated: " + item.Rating;
             if(!ElsFunNutQuiz.bPageRatings){
              Rats ="";
             }
             
             let myimg = $("<div class='mcimg giffy'>");          
             
             myimg.attr('data-ani',item.Animated);
             myimg.attr('data-still',item.Still);
             myimg.attr('data-flag','still');
             if(Rats.length>0){
                myimg.append($("<p class='gipRat'>").text(Rats));
                     
                };
             myimg.css('background-image','url("'+ myitem +'")');
             myimg.css('background-size','cover');
             myimg.css('background-repeat','no-repeat');

             myimg.on('click',function(event){
               if($(this).attr('data-flag')==='still'){
                 $(this).css('background-image','url("'+ $(this).attr('data-ani') +'")');
                 $(this).attr('data-flag','animated');
               }else{
                 //$(this).attr('src',$(this).attr('data-still'));
                 $(this).css('background-image','url("'+ $(this).attr('data-still') +'")');
                 $(this).attr('data-flag','still');
               }      
             });
             $("#maincontent").append(myimg);       
           });       
         }); 
      },
    ThemePage: function(inTheme){ 
      if(inTheme.length < 1){inTheme="Iron Man"};           
      ElsFunNutQuiz.getGiffyCol(inTheme);     
    }
}*/    
    getGiffyCol1: function(inSrch){
      
        let col = [];
        let colord =[4,3,5,9, 2,14,15,10, 8,15,14,7, 6,11,16,12];
        ElsFunNutQuiz.colGiffys.length = 0;                    
        for(j=0;j<colord.length;j++){       
        ElsFunNutQuiz.newgif =  new ElsFunNutQuiz.antGif("./assets/images/" + colord[j] + ".gif",
        "./assets/images/" + colord[j] + ".gif",
          "g");       
          ElsFunNutQuiz.colGiffys.push(ElsFunNutQuiz.newgif);
         };
         
         ElsFunNutQuiz.colGiffys.forEach(function(item,i){             
             let myitem = "";
             if(ElsFunNutQuiz.bPageAnimate){
               myitem = item.Animated; 
             }else{
               myitem = item.Still;
             }
             let Rats = "Rated: " + item.Rating;
             if(!ElsFunNutQuiz.bPageRatings){
              Rats ="";
             }
             
             let myimg = $("<div class='mcimg giffy'>");          
             
             myimg.attr('data-ani',item.Animated);
             myimg.attr('data-still',item.Still);
             myimg.attr('data-flag','still');
             if(Rats.length>0){
                myimg.append($("<p class='gipRat'>").text(Rats));
                     
                };
             myimg.css('background-image','url("'+ myitem +'")');
             myimg.css('background-size','cover');
             myimg.css('background-repeat','no-repeat');

             myimg.on('click',function(event){
               if($(this).attr('data-flag')==='still'){
                 $(this).css('background-image','url("'+ $(this).attr('data-ani') +'")');
                 $(this).attr('data-flag','animated');
               }else{
                 //$(this).attr('src',$(this).attr('data-still'));
                 $(this).css('background-image','url("'+ $(this).attr('data-still') +'")');
                 $(this).attr('data-flag','still');
               }      
             });
             $("#maincontent").append(myimg);       
           });       
         },
    ThemePage: function(inTheme){ 
      if(inTheme.length < 1){inTheme="Iron Man"};           
      ElsFunNutQuiz.getGiffyCol(inTheme);     
    }
}
$(document).ready(function(){{

  ElsFunNutQuiz.ThemePage('Nutrition');
  TriviaGame.reset();
  if(TriviaGame.bGameMusicOn){TriviaGame.gameMusicPlayer.play();}
  $("#Go").on('click', function(){TriviaGame.start();});  
 }});