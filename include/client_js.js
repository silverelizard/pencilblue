global.includeJS = function(url)
{
    return '<script type="text/javascript" src="' + url + '"></script>';
};

global.getJSTag = function(jsCode)
{
    return '<script type="text/javascript">' + jsCode + '</script>';
};

global.getAngularController = function(objects, modules)
{
    if(typeof modules === 'undefined')
    {
        modules = [];
    }
    var angularController = 'var pencilblueApp = angular.module("pencilblueApp", ' + JSON.stringify(modules) + ');';
    
    var scopeString = '';
    for(var key in objects)
    {
        if(typeof objects[key] === 'string')
        {
            if(objects[key].indexOf('function(') == 0)
            {
                scopeString = scopeString.concat('$scope.' + key + ' = ' + objects[key] + ';');
                continue;
            }
        }
        scopeString = scopeString.concat('$scope.' + key + ' = ' + JSON.stringify(objects[key]) + ';');
    }
    
    angularController = angularController.concat('function PencilBlueController($scope, $sce) {' + scopeString + '};');
    
    return getJSTag(angularController);
};

global.addAngularRepeatDirective = function(directiveName, directiveJS)
{
    return getJSTag('pencilblueApp.directive("' + directiveName + '", function(){return function(scope, element, attrs) {if(scope.$last){' + directiveJS + ';}};})');
};

function ClientJS(){}

ClientJS.getAngularController = function(objects, modules) {
    if(typeof modules === 'undefined') {
        modules = [];
    }
    var angularController = 'var pencilblueApp = angular.module("pencilblueApp", ' + JSON.stringify(modules) + ');';
    
    var scopeString = '';
    for(var key in objects) {
        
    	if(typeof objects[key] === 'string') {
            
    		if(objects[key].indexOf('function(') == 0) {
                scopeString = scopeString.concat('$scope.' + key + ' = ' + objects[key] + ';');
                continue;
            }
        }
        scopeString = scopeString.concat('$scope.' + key + ' = ' + JSON.stringify(objects[key]) + ';');
    }
    
    angularController = angularController.concat('function PencilBlueController($scope, $sce) {' + scopeString + '};');
    
    return getJSTag(angularController);
};

ClientJS.includeJS = function(url) {
    return '<script type="text/javascript" src="' + url + '"></script>';
};

ClientJS.getJSTag = function(jsCode) {
    return '<script type="text/javascript">' + jsCode + '</script>';
};

//exports
module.exports.ClientJS = ClientJS;
