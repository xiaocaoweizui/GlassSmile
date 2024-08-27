//await 只能出现async函数中
async  function asyncFunc() {
  const  result =  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("执行1");
    }, 1000)
  })
  console.log(result);
}

asyncFunc(); //等1s 后执行2
console.log("执行2"); //先执行2


// Async/Await
// async关键字将自动创建一个新的Promise并返回它
async function getJSONAsync(){

  // wait关键字使我们不必编写.then（）块
  let json = await axios.get('https://tutorialzine.com/misc/files/example.json');

  // GET请求的结果在JSON变量中可用
  // 我们返回它，就像正常同步函数一样
  return json;
}
