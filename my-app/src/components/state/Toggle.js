import React, { useState } from "react";
import "./ToggleStyle.css";
//stateless functional components: components nhưng  không sử dụng state
// function Toggle() {
//   return <div className="toggle"></div>;
// }

//stateful functional components: component có sử dụng state

//Nguyên tác sử dụng useState
//1. Viết trên cùng sau khi khởi tạo function
//2. Không viết trong vòng lặp, câu điều kiện, trong function con
const Toggle = () => {
  //1. enabling state : useState( initialize value)
  // --> initializ value : boolean(true,false), numberm, string, undefined, null, object, array.
  const [on, setOn] = useState(false);
  //2. initialize state : useState(false)
  //3. reading state
  // console.log(on, setOn);
  //4. update state --> setOn là 1 function dùng để update state
  // setOn(true);
  // --> không nên dùng cách này để update state vì sẽ vị loop vô hạn

  const handleToggle = () => {
    // setOn(callback) --> setOn(prevState => !prevState)
    setOn((on) => !on);
  };

  return (
    <div>
      <div className={`toggle ${on ? "active" : ""}`} onClick={handleToggle}>
        <div className={`spinner ${on ? "active" : ""}`}></div>
      </div>
    </div>
  );
};

export default Toggle;
