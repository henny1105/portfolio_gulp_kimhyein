(function($){ 

    $.defaults = {
       active_class: "active"
    }
 
    $.fn.myTab = function(opt){
       option = $.extend({}, $.defaults, opt);
       new Tab(this, option);
       return this;
    }
 
    function Tab(selector, option){
       this.init(selector, option); 
       this.bindingEvent(); 
    }
 
    Tab.prototype.init = function(selector, option){
       this.opt = option; 
       this.$frame = selector; 
       this.$btns = this.$frame.find(".community_tab li"); 
       this.$boxs = this.$frame.find(".group>div");
    }
    
    Tab.prototype.bindingEvent = function(){
       var inst = this; 
       inst.$btns.on("click", function(e){
          e.preventDefault();    
          var i = $(this).index(); 
    
          inst.activation(i);     
       });
    }
    
    Tab.prototype.activation = function(index){
       this.$btns.removeClass(this.opt.active_class); 
       this.$boxs.removeClass(this.opt.active_class);
       this.$btns.eq(index).addClass(this.opt.active_class);     
       this.$boxs.eq(index).addClass(this.opt.active_class); 
    }
 
 })(jQuery)