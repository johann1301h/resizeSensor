const resizeSensor = new ResizeSensor('.test', () => {
  console.log('worked');

});

document.querySelector('.test').style.height = 300 + 'px';
