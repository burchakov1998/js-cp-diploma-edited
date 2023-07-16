function getRequest(body,callback){
let promise = new XMLHttpRequest();
promise.open('POST', 'https://jscp-diplom.netoserver.ru/', true);
promise.responseType = 'json';
promise.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
promise.send(body);
promise.onload = ()=> {
   callback(promise.response);
}
   //    let promise =  fetch( '',{
// method: 'POST',
// headers: {
//    'Content-Type': 'application/json;charset=utf-8'
// },

// body: JSON.stringify()
//    })
}
