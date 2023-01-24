import { useState, useEffect, useRef } from "react";
import "./index.css"

function App() {
  const move = useRef(false);
  const [pos,setPos] = useState({
    x:window.innerWidth/2,
    y:170
  });

  const [rot, setRot] = useState({x:0,y:0})




  const mouseDown = (event) =>{
    move.current = true;
    
    // console.log(pos);
  }
  const mouseUp = () =>{
    move.current = false;
    // document.querySelector(".content").style.transform = "rotateX(0deg)";
    // setRot({x:0,y:0});
    
     console.log( "ОТПУСКАНИЕ");
  }
const touchStart = (event) =>{
  move.current = true;
}

const touchEnd = (event) =>{
  move.current = false;
  console.log( "ОТПУСКАНИЕ НА ТЕЛЕФОНЕ");
}

const touchMove = (event) =>{
  event.preventDefault();
  const touches = event.changedTouches;
  

  if(move.current){

    let newRotX =rot.x;
    let newRotY = rot.y;
    let k_x=1;
    let k_y=1;
    k_x = (Math.abs(newRotX) % 360) <= 180 ? 1 : -1;
    
    // k_y = (Math.abs(newRotY) % 360) <= 180 ? 1 : -1;
    // console.log(k_x,k_y);
    // cont.style.transform = "rotateX(70deg)";
    if(touches[0].clientY < pos.y){
      newRotX= newRotX + k_y*(pos.y-touches[0].clientY)/2;
    }
    else if(touches[0].clientY > pos.y){
      newRotX= newRotX + k_y*(pos.y-touches[0].clientY)/2;
    }
    if(touches[0].clientX < pos.x){
      newRotY = newRotY - k_x*( pos.x-touches[0].clientX)/2;
    }
    else if(touches[0].clientX > pos.x){
      newRotY = newRotY - k_x*( pos.x-touches[0].clientX)/2;
    }
    setRot(
      {
        x: newRotX,
        y: newRotY
      }
    )
    setPos({
      x: touches[0].clientX,
      y: touches[0].clientY
    })
    // console.log("в ифе");

    // move.current = false;
  }
}


  


  const mouseMove = (event) =>{
    const cont = document.querySelector(".content");
   

    console.log(JSON.stringify({
      x: event.clientX,
      y: event.clientY
    }))
  if(move.current){

    let newRotX =rot.x;
    let newRotY = rot.y;
    let k_x=1;
    let k_y=1;
    k_x = (Math.abs(newRotX) % 360) <= 180 ? 1 : -1;
    
    // k_y = (Math.abs(newRotY) % 360) <= 180 ? 1 : -1;
    
    if(event.clientY < pos.y){
      newRotX= newRotX + k_y*(pos.y-event.clientY)/2;
    }
    else if(event.clientY > pos.y){
      newRotX= newRotX + k_y*(pos.y-event.clientY)/2;
    }
    if(event.clientX < pos.x){
      newRotY = newRotY - k_x*( pos.x-event.clientX)/2;
    }
    else if(event.clientX > pos.x){
      newRotY = newRotY - k_x*( pos.x-event.clientX)/2;
    }
    setRot(
      {
        x: newRotX,
        y: newRotY
      }
    )
    setPos({
      x: event.clientX,
      y: event.clientY
    })
    // console.log("в ифе");
    // console.log(pos);

    // move.current = false;
  }
  }
  

useEffect(() => {
  
  // const cont = document.querySelector(".content");
  document.documentElement.addEventListener("mousedown",mouseDown);
  document.documentElement.addEventListener("mouseup",mouseUp);
  document.documentElement.addEventListener("touchstart",touchStart);
  document.documentElement.addEventListener("touchend",touchEnd);
}, []);

useEffect(() => {
  // const cont = document.querySelector(".content");

  document.documentElement.addEventListener("mousemove",mouseMove);
  document.documentElement.addEventListener("touchmove",touchMove);

  return ()=>{
    document.documentElement.removeEventListener("touchmove",mouseMove);
  }
},[mouseMove]);


 

  return (
    <>
    <div className="container">
      <div className="content" style={ {transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`}}>
        <div className="cube cube__top">top</div>
        <div className="cube cube__front">front</div>
        <div className="cube cube__left">left</div>
        <div className="cube cube__right">right</div>
        <div className="cube cube__back">back</div>
        <div className="cube cube_bottom">bottom</div>
      </div>
      { }
    </div>
    {/* <div className="info">
      Текущая позиция pos : {JSON.stringify(pos)} Текущий угол : {JSON.stringify(rot)} 
    </div> */}
    </>
  );
}

export default App;
