import { useState } from "react"

const useInput = (value = "") => {
     const [enteredValue, setEnteredValue] = useState(value)

     const valueChangeHandler = (event) =>{
        setEnteredValue(event.target.value)
     }

     const reset = (value = "") => {
        setEnteredValue(value)
     }

   return [enteredValue, valueChangeHandler, reset]
}

export default useInput;