import {useState } from 'react';
import Input from './Input';
import style from './styles/App.module.scss'
import axios from 'axios'

function App() {

  const [price,setPrice]=useState(1000000)
  const [initial,setInitial]=useState(0)
  const [months,setMonths]=useState(1)
  const [loading,setLoading] = useState(false)

  let monthPay = ((price - (price*initial/100)) * ((0.035 * Math.pow((1 + 0.035), months)) / (Math.pow((1 + 0.035), months) - 1))).toFixed(0);
  let firstPay =(price*initial/100).toFixed(0)
  let totalPrice = ((price*initial/100)+months*monthPay).toFixed(0)
  
  
  const add = ()=>{
    if(price<1000000){
      setPrice(1000000)
    }
    if(price>6000000){
      setPrice(6000000)
    }
    setLoading(true)
    let item = {
      price,
      initial,
      months,
      firstPay,
      monthPay,
      totalPrice
    }
    axios.post('https://eoj3r7f3r4ef6v4.m.pipedream.net',item)
    .then((resp)=>setLoading(false))

}

  return (
   <div className={style.container}>
    <h1 className={style.h1}>
    Рассчитайте стоимость автомобиля в лизинг
    </h1>
    <div className={style.main}>
    <Input  
          loading={loading}
          label={'Стоимость автомобиля'} 
          more={'₽'}  
          count1={price} 
          count2={price}
          min={1000000} 
          max={6000000}
          change1={e=>setPrice(e.target.value)}
          change2={e=>setPrice(e.target.value)}
          />
    <Input  
          loading={loading}
          label={'Первоначальный взнос'} 
          more={`${initial}%`} 
          count1={firstPay} 
          count2={initial} 
          change1={null}
          change2={e=>setInitial(e.target.value)}
          min={10} 
          max={60}/>
    <Input  
          loading={loading}
          label={'Срок лизинга'} 
          more={'мес.'}
          count1={months} 
          count2={months}
          min={1} 
          max={60}
          change1={e=>{
            if(e.target.value<1)e.target.value=1
            if(e.target.value>60)e.target.value=60
            setMonths(e.target.value)
          }}
          change2={e=>{
            if(e.target.value<1)e.target.value=1
            if(e.target.value>60)e.target.value=60
            setMonths(e.target.value)
          }} />
    </div>
    <div className={style.bottom}>
      <div className={style.sum}>
        <p className={style.title}>Сумма договора лизинга</p>
        <p className={style.count}>{totalPrice} ₽</p>
      </div>
      <div className={style.everyMon}>
        <p className={style.title}>Ежемесячный платеж от</p>
        <p className={style.count}>{monthPay} ₽</p>
      </div>
      <button onClick={()=>add()}  disabled={loading?true:false} className={loading?style.disbtn:style.btn}>
        {loading
        ?<div className={style.loading}><div></div><div></div><div></div><div></div></div>
        :'Оставить заявку'}
      </button>
    </div>
   </div>
  );
}

export default App;
