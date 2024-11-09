import { useState } from "react"

const Incomeform = ({changewallet,addinginco}) => {
  const [inpu,setinpu] = useState(0);
  const handleincomechange = (e) => {
    setinpu(e.target.value);
  }
  const handleaddbalance = () => {
    //changewallet(inpu);
    changewallet(t=>parseInt(t)+parseInt(inpu));
    addinginco(false);
  }

  const handlecancelbutton = () => {
    addinginco(false);
  }

  return (
    <div>
      <form>
        <input type="text" onChange={handleincomechange}></input>
        <button onClick={handleaddbalance}>Add Balance</button>
        <button onClick={handlecancelbutton}>Cancel</button>
      </form>
    </div>
  )
}

export default Incomeform;