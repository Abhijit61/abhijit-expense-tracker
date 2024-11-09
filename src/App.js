import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import Incomeform from './Incomeform';
import Expenseform from './Expenseform';
import './App.css';
import Expense from './Expense';

function App() {
  const [walletbalance,setwalletbalance] = useState(localStorage.getItem("walletbalance") ? localStorage.getItem("walletbalance") : 5000);
  const [expenselist,setexpenselist] = useState(localStorage.getItem("expenselist")? JSON.parse(localStorage.getItem("expenselist")):[]);

  const [addingincome,setaddingincome] = useState(false);
  const [addingexpense,setaddingexpense] = useState(false);

  const getfoodexpense = () => {
    let sum =0;
    expenselist.forEach((expense) => {
      if(expense.Category==="Food")
      {
        sum+=parseInt(expense.Price);
      }
    })
    console.log("getfoodexp",sum);
    return sum;
  }

  const foodexpense = getfoodexpense();

  const getentexpense = () => {
    let sum =0;
    expenselist.forEach((expense) => {
      if(expense.Category==="Entertainment")
      {
        sum+=parseInt(expense.Price);
      }
    })
    return sum;
  }

  const entexpense = getentexpense();

  const gettravelexpense = () => {
    let sum =0;
    expenselist.forEach((expense) => {
      if(expense.Category==="Travel")
      {
        sum+=parseInt(expense.Price);
      }
    })
    return sum;
  }

  const travelexpense = gettravelexpense();


  console.log(foodexpense,entexpense,travelexpense);
  const data = [
    { name: 'FOOD', value: foodexpense },
    { name: 'ENTERTAINMENT', value: entexpense },
    { name: 'TRAVEL', value: travelexpense },
  ];
  
  const COLORS = ['#0088FE','#FFBB28', '#FF8042'];

  const handleaddincomebutton = () => {
    setaddingincome(true);
  }

  const handleaddexpensebutton = () => {
    setaddingexpense(true);
  }

  const gettotalexpense = () => {
    let sum = 0;
    expenselist.forEach((expense) => {
      sum+=parseInt(expense.Price);
    })
    return sum;
  }

  useEffect(()=>{
    localStorage.setItem("expenselist",JSON.stringify(expenselist));
    localStorage.setItem("walletbalance",walletbalance);
  },[expenselist,walletbalance])

  return ( 
    <div className="App">
      <h1>Expense Tracker</h1>

      <div className="forms">
        <div className="walletform">
          <h3>Wallet Balance: {walletbalance}</h3>
          <button onClick={handleaddincomebutton} className="incomebutton">Add Income</button>
        </div>
        <div className="expenseform">
          <h3>Expenses: {gettotalexpense()}</h3>
          <button onClick={handleaddexpensebutton} className="expensebutton">Add Expense</button>
        </div>
        <div className='pie'>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index   
    % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        </div>
      </div>

      {
          addingincome && <Incomeform changewallet={setwalletbalance} addinginco={setaddingincome}/>
      }

      {
          addingexpense && <Expenseform chnageexpenselist={setexpenselist} addingexp={setaddingexpense} chnagebalance={setwalletbalance}/>
      }

      {
        expenselist.length>0 && 
        <div className='expensessection'>
            <div className='expenses-list'>
              <h2>Expenses List</h2>
              {
                expenselist.map(expense => (
                  <div key={expense.Title+expense.Category}>
                    <Expense name={expense.Title} price={expense.Price} category={expense.Category} date={expense.Date} changeexpenselist={setexpenselist} chnagebalance={setwalletbalance}/>
                  </div>
                ))
              }
            </div>

            <div>
              <h2>Top Expenses</h2>
              <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          </div>  
      }
    </div>
  );
}

export default App;
