import React, { useEffect, useState } from 'react'

function useDebounce(value, delay) { //value: 검색어 delay: 함수 실행되기까지 기다릴 시간
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(()=>{ // value,delay값 바뀔 때마다 실행
    const handler = setTimeout(()=>{
      setDebounceValue(value);
    }, delay); //delay시간만큼 타이핑이 없을 때 value값을 debounceValue에 넣음
    
    return ()=>{ //더이상 실행되지 않을 때 return문 사용
      clearTimeout(handler);
    }

  },[value, delay])

  return debounceValue;
}

export default useDebounce