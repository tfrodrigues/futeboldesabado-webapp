var $=require("jquery"),ko=require("knockout"),base=require("./base");require("bootstrap");var external=this;exports.save=function(e,n,a){$.ajax({type:"POST",contentType:"application/json",url:"/"+e+"/save",data:JSON.stringify(n)}).done(function(e){a&&a(e)})},exports.remove=function(e,n,a){$.ajax({type:"DELETE",url:"/"+e+"/remove/"+n}).done(function(e){a&&a(e)})},exports.getFields=function(e){var n=[];for(var a in e)n.push({name:a,label:e[a].label,type:e[a].type,value:ko.observable()});return n},exports.selectCurrentMenu=function(){var e=document.location.pathname,n=$('ul > li > a[href="'+e+'"]');n.parent().addClass("active")},exports.ViewModel=function(e,n){var a=this;a.selectedId=ko.observable(),a.fields=ko.observableArray(external.getFields(n)),a.dataValues=ko.observableArray([]),a.clearTitle=ko.computed(function(){return a.selectedId()?"Novo":"Limpar"}),a.selectRow=function(e){a.selectedId(e._id),a.fields().forEach(function(n){n.value(e[n.name])})},a.find=function(){a.dataValues([]),base.findAll(e,a.dataValues)},a.save=function(){var n={_id:a.selectedId()};a.fields().forEach(function(e){n[e.name]=e.value()}),external.save(e,n,function(){a.clear(),a.find()})},a.clear=function(){a.selectedId(void 0),a.fields().forEach(function(e){e.value(void 0)})},a.remove=function(){external.remove(e,a.selectedId(),function(){a.clear(),a.find()})},a.find(),external.selectCurrentMenu(),ko.utils.extend(a,new base.ViewModel)};