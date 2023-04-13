import React, { useEffect } from 'react'

function useOnClickOutside(ref, handler) {
  
  
  useEffect(()=>{
    console.log("ref >",ref)

    const listener = (e) => {
      if(!ref.current || ref.current.contains(e.target)){ //모달창이 존재하지 않는 경우 or 모달창(ref.current: div.modal) 안쪽을 클릭한 경우 이벤트 실행 안 함
        return;
      }
      handler(e); //모달창 닫음 () => {setModalOpen(false)}
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)
  },[ref, handler]);

  return (
    <div>useOnClickOutside</div>
  )
}

export default useOnClickOutside