/**
 * Created by ling on 16/12/6.
 */
var userDire = angular.module('my.user.directive',[]);

//userDire.directive('myFocus',[function(){
//    return {
//        restrict:"A",
//        require:"ngModel",
//        link:function(scope,element,attrs,ctrl){
//            ctrl.$focused = false;
//
//            element.on('focus',function(){
//                scope.$apply(function(){
//                    ctrl.$focused=true;
//                });
//            }).on('blur',function(){
//                scope.$apply(function(){
//                    ctrl.$focused=false;
//                });
//            });
//
//            element.on("keydown",function(e){
//                if(e.keyCode === 13 || e.keyCode === 10){
//                    setTimeout(function () {
//                        element[0].blur();
//                    });
//                }
//            })
//        }
//    }
//}]);
userDire.directive("userList", ['passData','sort',function (passData, sort) {
    return {
        restrict: 'E',
        scope: {
            'curSearch': '='
        },
        replace: true,
        templateUrl: './views/template/userList_temp.html',
        link: function (scope, element, attr) {
            console.log('dfdfdfdfdf');
            //异步获取用户列表
            passData.httpGet('./dist/userList.json')
                .then(function (result) {
                    if (result.code == 0) {
                        //alert('11');
                        //console.log(window.location.reload());
                        //分类及排序
                        var sortResult = sort.sortByInitial(result.data);
                        scope.listData = sortResult;

                    } else {
                        alert(result.msg);
                    }
                }, function (error) {
                    console.log(error);
                });
        }
    }
}]);