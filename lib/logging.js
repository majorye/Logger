/**
* Author: Zhouquan.yezq
* Date: 1/17/2012
 */
(function($){
   //the Logger constructor
   $.Logger=function(){};
   $.Logger.level=4; //default level
   $.Logger.setLevel=function(level){//set logger level to filter the logger , so just show the logger level you focus.
     $.Logger.level=level;
   };
   
   var methods = [ "error", "warn", "info", "debug", "log"];//0-4 level
   
   $.extend($.Logger.prototype, {
     level:$.Logger.level,//default level is 4, so all the log will be print out.,
     setEnableLevel: function(level) {
       if(level>4 || level<0) {
         this.error(['wrong level setting. level should be 0-4, the int type,you set ',level,", so stupided."].join(''));
       }
       this.level=parseInt(level);
     },
     enabled: function(lev) {
       if(lev>$.Logger.level) {
         return false;
       }
       return true;
     },
     name: function() {
       return this._name;
     },
     log: function() {
        this._log(4, arguments);
     },
     debug: function() {
        this._log(3, arguments);
     },
     info: function() {
        this._log(2, arguments);
     },
     warn: function() {
        this._log(1, arguments);
     },
     error: function() {
        this._log(0, arguments);
     },
     _handler: function(level, name, msg){
       if(self.console){
           var method=methods[level];
           //var _args=Array.prototype.slice.call(msg).join(' | ');
           msg=[[method,name+" |"].join(" | ")].concat(Array.prototype.slice.call(msg));
           if(console.log.apply){//IE8 do not work on this way. undefined
              console[method].apply(console, msg);       
           }else{
              console[console[method]?method:'log'](msg);
           }
       }
     },
    _log: function(level, msg) {
      if (this.enabled(level)) {
         this._handler(level,this.name(),msg);
      }
    }
     
   });
   
   var logs={};//logs container
   $.getLogger= function(name) {
       if (!logs[name]) {
          logs[name] = new $.Logger(name);
          logs[name]._name=name;
        }
        return logs[name];
   };
 
})(jQuery);
