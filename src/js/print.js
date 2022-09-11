export default function printMe() {
  // console.log('通过 print.js 调用 printMe()');
  let msg = document.createElement('div');
  msg.innerHTML = '通过 print.js 调用 printMe()';
  
  document.body.appendChild(msg);
}