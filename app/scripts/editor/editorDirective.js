angular.module("particle.editor")
  .directive("codeEditor", ['$timeout', "$compile", function($timeout, $compile){
    return{
      restrict: 'E',
      template: '<div class="ace-editor" id="{{uniqid}}"></div>',
      transclude: false,
      scope: true,
      link: function(scope, element, attrs){

        scope.uniqid = 'item' + Date.now();
        scope.editor = null;

        $timeout(function(){

          var modelist = require("ace/ext/modelist")
          scope.editor = ace.edit(scope.uniqid);

          scope.editor.setValue(attrs.content, -1);

          scope.editor.setOptions({
            enableBasicAutocompletion: true
          });

          scope.editor.getSession().setMode(modelist.getModeForPath(attrs.path).mode);
        }, 0, false);

        $(window).keypress(function(event) {
            if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;

            if(scope.activeTab === attrs.path)
              scope.saveFile(attrs.path, scope.editor.getValue());
        });

      }
    }
  }]);
