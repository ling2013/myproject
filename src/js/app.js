/**
 * Created by ling on 17/1/24.
 */
//新建一个module
var myApp = angular.module("myApp", ["ui.router","my.user.controller","my.user.directive","my.data.server"]);

//全局配置
myApp.constant('baseConfig', {
    "baseUrl": "http://localhost:2020/myproject/"
});

//基本配置
myApp.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.when('/index', ['$state','dataServer', function ($state,dataServer) {
        $state.go('main');
        //var userid = util.CookieHelper.getCookie('loginuserid');
        //
        //console.log('dfdf');
        //console.log('获取用户信息');
        //if(userid){
        //    $state.go('main');
        //}else{
        //    $state.go('assign.login');
        //}

    }])
    //    .when('/main/other',['$state','dataServer',function($state,dataServer) {
    //    if (!dataServer.user.id) {
    //        $state.go('main');
    //    }
    //}]);
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: './views/main.html'
    }).state('assign',{
        url:'/assign',
        templateUrl:'assign.html',
    }).state('assign.login',{
        url:'/login',
        templateUrl:'login.html',
        controller:'loginController'
    }).state('main.sortLetter', {
        url: '/sortLetter',
        templateUrl: './views/sortLetter.html',
        controller: 'sortLetController'
    }).state('main.structure', {
        url: '/structure',
        templateUrl: './views/structure.html'
    }).state('main.other', {
        url: '/other',
        templateUrl: './views/other.html'
    })

}]);

myApp.run(function () {
    console.log('开始运行');
});