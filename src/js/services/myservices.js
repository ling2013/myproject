/**
 * Created by ling on 16/12/5.
 */

var dataServer = angular.module("my.data.server",[]);

dataServer.factory("dataServer",["$q",function($q){
    var dataServer = {};
    dataServer.user= new model.UserInfo();
    return dataServer;
}]);


//获取数据
dataServer.factory('passData', ['$http', '$q', 'baseConfig', function ($http, $q, baseConfig) {

    var httpGet = function (url, data) {
        var defered = $q.defer();
        $http({
            method: 'GET',
            url: baseConfig.baseUrl + url,
            params: data
        }).success(function (data) {
            defered.resolve(data);
        })
            .error(function (data) {
                defered.reject(data);
            });
        return defered.promise;
    };

    return {'httpGet': httpGet}

}]);

//按首字母排序
dataServer.factory('sort', function () {

    var sortByInitial = function (data) {

        var userList = {}, chars = [], newList = [], firstchar = '';

        //转化数据
        for (var i = 0; i < data.length; i++) {
            firstchar = '';
            var userInfo = new model.UserInfo();
            userInfo.id = data[i].id;
            userInfo.name = data[i].name;
            firstchar = util.ChineseCharacter.getPortraitChar2(data[i].name);

            if (firstchar != '' && chars.indexOf(firstchar) == -1) {
                chars.push(firstchar);
                userList[firstchar] = {
                    firstWord: firstchar,
                    children: []
                };
            }
            userList[firstchar].children.push(userInfo);
        }

        //排序
        function objKeySort(obj) {//排序的函数
            var newkey = Object.keys(obj).sort();
            //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
            var newObj = [];//创建一个新的数组，用于存放排好序的键值对
            for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
                newObj.push(obj[newkey[i]]);
            }
            return newObj;//返回排好序的新对象
        }

        newList = objKeySort(userList);
        return newList;
    };
    return {
        sortByInitial: sortByInitial
    }

});