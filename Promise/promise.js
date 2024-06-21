//call back hell
// const buyFruit = function(fruit,callback){
//   setTimeout(()=>{
//     console.log(fruit);
//     callback()
//   },1000)
// }

// buyFruit('apple',function(){
//   buyFruit('banana',function(){
//     buyFruit('orange',function(){
//       console.log('end');
//     })
//   })
// })

const buyFruit = function(fruit){
  return new Promise (function(resolve,reject){
    setTimeout(()=>{
      console.log(fruit);
      resolve(fruit)
    },1000)
  })
}
//装填是resolved，则then中的函数会执行，如果状态是reject，则状态是reject，则catch中的函数会执行
//then()方法的返回值是一个promise对象，所以它支持链式写法
//reject()会走catch(),还有一个情况是，如果resolve回调的时候出现了某种错误，也会走入catch()
//then必须有返回值，否则下一个回调拿不到上一个回调的结果
buyFruit('apple')
.then((res)=>{
  return buyFruit('banana')
})
.then((res)=>{
  console.log('res',res);
  return buyFruit('orange')
})
.then((res)=>{
  console.log('end');
})