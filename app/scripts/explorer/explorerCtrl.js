angular.module("particle.explorer")
  .controller("ExplorerCtrl", ["$scope", "$rootScope", function($scope, $rootScope){

    $scope.fs = require('fs');
    $scope.path = require('path');
    $scope.directory = null;
    $scope.id = 0;

    $scope.opts = {
        injectClasses: {
            "ul": "c-ul",
            "li": "c-li",
            "liSelected": "c-liSelected",
            "iExpanded": "c-iExpanded",
            "iCollapsed": "c-iCollapsed",
            "iLeaf": "c-iLeaf",
            "label": "c-label",
            "labelSelected": "c-labelSelected"
        }
    };

    $scope.init = function(){

      $("#open-folder-dialog").on("change", function(e){

        var filelist = {};
        $scope.directory = $scope.readFilesDir($(this).val());
        $scope.$apply();
        console.log($scope.directory);

        $(this).val('');
      });

      $("#open-file-dialog").on("change", function(e){
        $scope.openFile({
          "name": $scope.path.basename($(this).val()),
          "path": $(this).val()
        });
      });

    };

    $scope.readFilesDir = function(filename){

      $scope.id++;

        var stats = $scope.fs.lstatSync(filename),
          info = {
              path: filename,
              name: $scope.path.basename(filename)
          };

      if (stats.isDirectory()) {
          info.id = $scope.id;
          info.type = "folder";
          info.children = $scope.fs.readdirSync(filename).map(function(child) {
              return $scope.readFilesDir(filename + '/' + child);
          });
      } else {
          // Assuming it's a file. In real life it could be a symlink or
          // something else!
          info.type = "file";
      }

      return info;
    };

    $scope.treeRightClick = function(node){
      alert("Right Click");
    };

    $scope.openFile = function(node){
      if(node.type != "folder"){
        $scope.fs.readFile(node.path, 'utf8', function(err, data){
          if(err)
            alert("Cannot open file." + err);
            $scope.createTab(node.name, node.path, data);
        });
      }
    };

    $scope.init();

  }]);
