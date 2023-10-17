import {useEffect, useRef, useState} from "react";

/**
 * Effect that uses the AbortController that cancels requests when components are terminated.
 */

function useApiEffect(callback, deps) {
  const controller = new AbortController();
  const destroyFunc = useRef();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  // const [val, setVal] = useState(0);

  if (effectCalled.current) {
      renderAfterCalled.current = true;
  }
// console.log({val})
  useEffect(() => {
    if (!effectCalled.current || deps?.length > 0 ) { 
      destroyFunc.current = callback();
      effectCalled.current = true;
      // console.log("effectCalled.current" , effectCalled.current , {val})
    }



    // setVal(val => val + 1);

    return ()=> {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) { return; }
      if (destroyFunc.current && destroyFunc.current !== undefined) {
         destroyFunc.current(); 
        }
      controller.abort();
    };
    //return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);


}

export default useApiEffect;
