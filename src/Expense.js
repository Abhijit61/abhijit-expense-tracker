import { useState } from "react";
import Editexpenseform from "./Editexpenseform";
import "./Expense.css"
const Expense = ({name,price,category,date,changeexpenselist,chnagebalance}) => {

  const [editexpense,seteditexpense] = useState(false);
  const handledeletebutton = () => {
    changeexpenselist ((list) => {
      return list.filter((li) => {
        if(li.Price === price && li.Title===name && li.Category === category && li.Date===date)
        {
          return false;
        }
        else
        {
          return true;
        }
      })
    })
    console.log("del exp",typeof(price));
    chnagebalance(b=>parseInt(b)+parseInt(price));
  }

  return (
    <div>
      <div className="expense">
      <div className="expense-item">
      <h2>{name}</h2>
      <p>{date}</p>
      </div>
      <div className="expense-item">
        <p>${price}</p>
        <p>{category}</p>
      </div>
      <div className="expense-item">
        <button onClick={() => {
          seteditexpense(true);
        }} className="editbutton">Edit</button>
        <button onClick={handledeletebutton}className="deletebutton">Delete</button>
      </div>
      </div>
      <div>
        {editexpense && <Editexpenseform chnageexpenselist={changeexpenselist} editingexp={seteditexpense} chnagebalance={chnagebalance}/>}
      </div>
    </div>
    
    
  );
};

export default Expense;