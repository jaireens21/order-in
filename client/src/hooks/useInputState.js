import { useState } from "react";

//this is a hook that reserves a piece of state & also gives us 2 functions, all of which we will use in a form.

export default function useInputState(initialVal=""){

    const[state,setState]=useState(initialVal);

    const handleChange=(e)=>{
        setState(e.target.value);
    }
    //update the state as and when changes are made in the input field

    const reset=()=>{
        setState("");
    }
    
    return [state,handleChange,reset];
}