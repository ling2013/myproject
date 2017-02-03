/**
 * Created by ling on 16/12/6.
 */

var userCtr = angular.module('my.user.controller',['my.data.server']);

userCtr.controller("loginController",["$scope","dataServer",function($scope,dataServer){

    console.log('登录页面');
    console.log($scope);//$id,$parent



}]);



userCtr.controller('sortLetController', ['$scope', function ($scope) {

}]);