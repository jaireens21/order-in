import {useState} from "react";
//gives me a piece of state & a function to toggle that state between true & false

function useToggleState(initialVal=false){
    const [state, setState]=useState(initialVal);
    const toggle=()=>{
        setState(!state);
    }
    return [state,toggle];
}

export default useToggleState;