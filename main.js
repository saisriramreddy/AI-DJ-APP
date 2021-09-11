song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
   console.log('PoseNet ModelLoaded is intialized');
}


function preload(){
    song=loadSound("music.mp3");

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}   
function gotPoses(results){
    if(results.length>0){console.log(results);
    scoreRightWrist=results[0].pose.keypoints[10].score;
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist="+scoreRightWrist+"scorLeftWrist="+scoreLeftWrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
    
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    
    console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
                        }
}
    
 function draw(){
     image(video,0,0,600,500);
     fill("#FF0000");
     stroke("#FF0000");
     
if(scoreRightWrist>0){
     circle(rightWristX,rightWristY,20);
if(rightWristY>0 && rightWristY<=100){
    document.getElementById("speed").innerHTML="speed is = 0.5x";
song.rate(0.5);}
    
else if(rightWristY>100 && rightWristY<=200){
    document.getElementById("speed").innerHTML="speed is = 1x";
song.rate(1);   
    }
         
else if(rightWristY>200 && rightWristY<=300){
    document.getElementById("speed").innerHTML="speed is = 1.5x";
song.rate(1.5);   
    }
         
else if(rightWristY>300 && rightWristY<=400){
    document.getElementById("speed").innerHTML="speed is = 2x";
song.rate(2);   
    }
         
 else if(rightWristY>100 && rightWristY<=200){
    document.getElementById("speed").innerHTML="speed is = 2.5x";
song.rate(2.5);   
    }
         
     }
     if(scoreLeftWrist >0.2){
         circle(leftWristX,leftWristY,20);
         InnumberLeftWristY=Number(leftWristY);
         removedecimals=floor(InnumberLeftWristY);
         volume=removedecimals/500;
         document.getElementById("volume").innerHTML="VOLUME="+volume;
         song.setVolume(volume);
     }
 }

