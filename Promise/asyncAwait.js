//async await 是嵌套最深的一个promise的语法糖

//async声明一个function是异步的，async函数返回值是个promise对象
//所以就是async用于声明一个function是异步的，而await用于等待一个异步方法执行完成
//await关键字只在async函数内有效，在async函数体之外使用它，会有syntax error
//reject状态
  //promise错误通过catch捕捉
  //async await一般用try catch 捕捉

const buyFruit = (fruit)=>{
  return new Promise(function(resolve,reject){
    setTimeout(()=>{
      console.log(fruit);
      resolve(fruit)
    },1000)
  })
}

const fetchFruit = async()=>{
  try {
    const res1 = await buyFruit('apple')
    await buyFruit('banana')
    await buyFruit('orange')
  } catch (error) {
    console.error(error);
  }
  
}