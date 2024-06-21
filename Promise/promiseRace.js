//比如，点击按钮请求，请求超过3秒还没返回数据，提供用户请求超时

const data =()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let data = 'request timeout';
      resolve(data)
    },3000)
  })
}

const fetchData = ()=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let data = 'some data';
      resolve(data)
    },2000)
  })
}

const handleBrnClick = ()=>{
  let promiseArr = [timeout(),fetchData()]
  Promise.race(promiseArr).then(res=>{
    if(res==='request timeout'){
      console.log('request timeout');
    }else{
      console.log('do something');
    }
  })
}