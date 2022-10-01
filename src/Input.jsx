import React from 'react'
import style from './styles/Input.module.scss'

function Input({label,more,count1,count2,min,max,change1,change2, loading}) {
  return (
    <div className={style.main}>
        <label className={style.inputMain}>{label}
            <div className={style.container}>
                <div className={style.rightPart}>
                    <input disabled={loading?true:false} className={loading?style.disabled:style.textInput}  value={count1} onChange={change1} type='text'/><p>{more}</p></div>
                    <input disabled={loading?true:false} className={loading?style.disabled1:style.rangeInput} min={min} max={max} value={count2} onChange={change2} type='range'/>
             </div>
      </label>
    </div>
  )
}

export default Input