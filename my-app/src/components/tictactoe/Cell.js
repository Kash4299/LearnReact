import React from "react";

// object destructuring
// const student = {
//     name: "duy",
//     age : 23
// }
// const name = student.name;
// const age = student.age;
// const  {name,age} = student; Dùng thay thế cho biến name,age gọi ở 2 line trên

const Cell = ({ value, onClick, className }) => {
  // const {value,onClick} =  props;
  return (
    <div className={`game-cell ${className}`} onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;
