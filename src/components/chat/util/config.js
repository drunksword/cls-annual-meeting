export function randomColor () {
  var colors = ['#ff0000', '#ff00f0', '#0000ff', '#00ff00', '#fff000', '#fff']
  return colors[parseInt(6 * Math.random())]
}
export function genUid () {
  return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100)
}
export function randomPhoto () {
  var photos = ['./static/photo/cute.png', './static/photo/haha.png', './static/photo/heisenberg.png',
    './static/photo/mj.png', './static/photo/ji.png', './static/photo/qwe.png',
    './static/photo/niu.png', './static/photo/shu.png', './static/photo/yaseng.png',
    './static/photo/1.png', './static/photo/2.png', './static/photo/3.png',
    './static/photo/4.png', './static/photo/5.png', './static/photo/6.png', './static/photo/7.png']
  return photos[parseInt(9 * Math.random())]
}
