var accounting=require("accounting");accounting.settings={number:{precision:0,thousand:".",decimal:","}},exports.capitalize=function(e){return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()},exports.formatNumber=function(e,r){return accounting.formatNumber(e,r)},exports.removeInvalidAttributes=function(e){for(var r in e)e[r]||delete e[r]},exports.removeAccents=function(e){var r={a:"[àáâãäå]",ae:"æ",c:"ç",e:"[èéêë]",i:"[ìíîï]",n:"ñ",o:"[òóôõö]",oe:"œ",u:"[ùúûűü]",y:"[ýÿ]"};for(var o in r)e=e.replace(new RegExp(r[o],"g"),o),e=e.replace(new RegExp(r[o].toUpperCase(),"g"),o.toUpperCase());return e},exports.urlKey=function(e){return this.removeAccents(e).replace(/\s+/g,"-").toLowerCase()},exports.showErrorMessage=function(e,r){for(var o="<li><strong>Ocorreram erros:</strong></li>",t=0;t<=e.length-1;t++)o+=e[t]+"<br>";for(var t=0;t<=r.length-1;t++)$("#"+r[t]).addClass("error-field");$(".error-container").css("display","block"),$(".alert-error > span").html(o),setTimeout(function(){$(".alert-error > span").html(""),$(".error-container").css("display","none")},1e4)};