import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
// module.exports = function (app) {
//   app.get('/', function (req, res) {
//     res.send('Hello world');
//   });
//   app.get('/customer', function(req, res){
//     res.send('customer page');
//   });
//   app.get('/admin', function(req, res){
//     res.send('admin page');
//   });
// };
