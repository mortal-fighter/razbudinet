/*! JQuery Tzine Clock */
!function(t){function e(){for(var e,r=["orange","blue","green"],o=0;o<3;o++)e=t("<div>").attr("class",r[o]+" clock").html('<div class="display"></div><div class="front left"></div><div class="rotate left"><div class="bg left"></div></div><div class="rotate right"><div class="bg right"></div></div>'),t(this).append(e),e.rotateLeft=e.find(".rotate.left"),e.rotateRight=e.find(".rotate.right"),e.display=e.find(".display"),a[r[o]]=e;setInterval(function(){var t=new Date,e=t.getHours(),r=t.getMinutes(),o=t.getSeconds();i(a.green,o,60),i(a.blue,r,60),i(a.orange,e,24)},1e3)}function i(t,e,i){var a,o=360/i*(e+1);0==e&&(t.rotateRight.hide(),r(t.rotateLeft,0)),o<=180?a=t.rotateLeft:(t.rotateRight.show(),t.rotateLeft.show(),r(t.rotateLeft,180),a=t.rotateRight,o-=180),r(a,o),t.display.html(e<10?"0"+e:e)}function r(t,e){var i="rotate("+e+"deg)";if(void 0!=t.css("MozTransform"))t.css("MozTransform",i);else if(void 0!=t.css("WebkitTransform"))t.css("WebkitTransform",i);else if(void 0!=t.css("filter")){var r=Math.cos(2*Math.PI/360*e),a=Math.sin(2*Math.PI/360*e);t.css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+r+",M12=-"+a+",M21="+a+",M22="+r+",SizingMethod='auto expand',FilterType='nearest neighbor')"),t.css("left",-Math.floor((t.width()-200)/2)),t.css("top",-Math.floor((t.height()-200)/2))}}var a={};t.fn.tzineClock=function(i){var r=this.eq(0);if(!r){try{console.log("Invalid selector!")}catch(t){}return!1}i||(i={});var a={};return t.each(a,function(t,e){i[t]=i[t]||a[t]}),e.call(r),this}}(jQuery);