var ko=require("knockout"),base=require("../../common/base"),cryptoJS=require("crypto-js");ViewModel=function(){var e=this;e.dataModel={},e.equipeList=ko.observableArray([]),e.login=function(o,a){var i=cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(e.dataModel.senha,"futebolDeSabadoPassKey")),n={};n.email=e.dataModel.email,n.senha=i,base.findAll("equipe",e.equipeList,n,function(e){if(e){var o=e.pagina+e.email+e.senha,a=cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(o,"futebolDeSabadoSessionKey"));document.cookie="SESSION_ID="+a+";path=/",window.location="/"+e.pagina}else console.log("login errado")})},ko.utils.extend(e,new base.ViewModel)},ko.applyBindings(new ViewModel,document.getElementById("main"));