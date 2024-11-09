import { useState } from "react";

const Expenseform = ({chnageexpenselist,addingexp,chnagebalance}) => {
  const [selectedoption,setselectedoption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [title,settitle] = useState("");
  const [price,setprice] = useState(0);

  const handledateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handlecategorychange = (event) => {
    setselectedoption(event.target.value);
  }

  const handletitlechange = (event) => {
    settitle(event.target.value);
  }

  const handlepricechange = (event) => {
    setprice(event.target.value);
  }
  const handlesubmit = (event) => {
    event.preventDefault();
    let walletbalance = localStorage.getItem("walletbalance");
    if(walletbalance<parseInt(price))
    {
      alert("NOT ENOUGH BALANCE");
      return;
    }
    chnageexpenselist(t=>[...t,
      {
        Title : title,
        Price : price,
        Date : selectedDate,
        Category : selectedoption
      }
    ]);
    chnagebalance(b=>parseInt(b)-parseInt(price));

    addingexp(false);
  }

  const handlecancel = () => {
    addingexp(false);
  }
  return (
    <div>
      <h3>Add Expenses</h3>
      <form onSubmit={handlesubmit}>
        <input type="text" placeholder="Enter title" onChange={handletitlechange}></input>
        <input type="number" placeholder="Enter Price" onChange={handlepricechange}></input>
        <select value={selectedoption} onChange={handlecategorychange}>
          <option></option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
        </select>
        <input type="date" id="dateInput" value={selectedDate} onChange={handledateChange} />
        <button type="submit">Add Expense</button>
        <button onClick={handlecancel}>Cancel</button>
      </form>
    </div>
  )
};

export default Expenseform;