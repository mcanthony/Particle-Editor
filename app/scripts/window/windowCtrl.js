angular.module("particle.window")
  .controller("WindowCtrl", ["$scope", "$rootScope", function($scope, $rootScope){

    $scope.gui = require("nw.gui");
    $scope.win = $scope.gui.Window.get();

    $scope.windowSaveState = "";
    $scope.windowState = "unmaximized";

    $scope.init = function(){
      $scope.win.on("minimize", function(){
        $scope.windowSaveState = $scope.windowState;
        $scope.windowState = "mimimized";
        $scope.$apply();
      });

      $scope.win.on("maximize", function(){
        $scope.windowSaveState = $scope.windowState;
        $scope.windowState = "maximized";
        $scope.$apply();
      });

      $scope.win.on("unmaximize", function(){
        $scope.windowSaveState = $scope.windowState;
        $scope.windowState = "unmaximized";
        $scope.$apply();
      });

      $scope.win.on("restore", function(){
        $scope.windowState = $scope.windowSaveState;
        $scope.$apply();
      });

    };

    $scope.close = function(){
      window.close();
    };

    $scope.maximize = function(){
      $scope.win.maximize();
    };

    $scope.unmaximize = function(){
      $scope.win.unmaximize();
    };

    $scope.minimize = function(){
      $scope.win.minimize();
    };

    $scope.toggleMaximize = function(){
      if($scope.windowState == "unmaximized")
        $scope.maximize();
      else
        $scope.unmaximize();
    };

    //File Dialogs

    $scope.showFolderDialog = function(){
      $("#open-folder-dialog").trigger("click");
    };

    $scope.showFileDialog = function(){
      $("#open-file-dialog").trigger("click");
    };

    $scope.init();

  }]);
