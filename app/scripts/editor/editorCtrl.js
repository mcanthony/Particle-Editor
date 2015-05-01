angular.module("particle.editor")
  .controller("EditorCtrl", ["$scope", "$rootScope", "$timeout", function($scope, $rootScope, $timeout){

    $scope.line = 1;
    $scope.char = 1;

    $scope.id = 0;

    $scope.activeTab = "0";
    $scope.selectedTab = 0;
    $scope.tabs = {};

    $scope.fs = require('fs');

    $scope.init = function(){

    };

    $scope.saveFile = function(path, data){
      $scope.fs.writeFile(path, data, function(err){
        if(err)
          alert("Failed To Save File: " + err);
      });

        alert("File Saved");

    };

    //Creates a new editor tab.
    $scope.createTab = function(name, path, data){
      //If the tab for this file does not already exist, then create it.
      if($scope.tabs[path] == null){

        var id = "tab-" + $scope.id++;

        $scope.tabs[path] = {
          "id": id,
          "name": name,
          "path": path,
          "data": data,
          "edited": false
        };

        $timeout(function(){
          document.querySelector("paper-tabs").selected = $("#" + id).index();
        }, 0, false);

        //Set the tab that was just created as the active tab.
        $scope.activeTab = path;
        $scope.$apply();
      }
    };

    $scope.closeTab = function(id){
      delete $scope.tabs[id];
      $timeout(function(){
        document.querySelector("paper-tabs").selected = $(".file-tabs").last().index();
        $scope.activeTab = $(".file-tabs").last().attr('data-path');
        $scope.$apply();
      }, 0, false);

    };

    $scope.activateTab = function(path){
      $scope.activeTab = path;
    };

    $scope.createTab("Untitled Document", "0", "New Untitled Document");
    $scope.init();

  }]);
