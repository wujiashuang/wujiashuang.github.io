//1.获取非行间样式
function getStyle(obj,name){
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

//2.补零
function toDouble(n){
    return n<10?'0'+n:''+n;
}

//3.随机数函数
function rnd(n,m){
    return parseInt(Math.random()*(m-n)+n);
}

//4.数组查重
function findInArr(n,arr){
    for(var i=0;i<arr.length; i++){
        if(n==arr[i]){
            return true;
        }
    }
    return false;
}

//5.查找最小值
function findMinIndex(arr,start){
    var iMin=arr[start];
    var iMinIndex=start;
    for(var i=start; i<arr.length; i++){
        if(arr[i]>iMin){
            iMin=arr[i];
            iMinIndex=i;
        }
    }
    return iMinIndex;
}

//6.求和函数
function sum(){
    var result=0;
    for(var i=0;i<arguments.length; i++){
        result+=arguments[i];
    }
    return result;
}

//7.通过className获取元素
function getByClass(oParent,sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
        var aEle=oParent.getElementsByTagName('*');
        var arr=[];
        for(var i=0; i<aEle.length; i++){
            var aClass=aEle[i].className.split(' ');
            if(findInArr(sClass,aClass)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}

//8.统计字符的字节长度
function getByLen(str,type){
    var n=0;
    for(var i=0;i<str.length; i++){
        if(str.charCodeAt(i)>='0x4e00'&& str.charCodeAt(i)<='0x9fa5' ){
            if(type=='utf8'||type=='utf-8'){
                n+=3;
            }else{
                n+=2;
            }
        }else{
            n+=1;
        }
    }
    return n;
}

//9.获取绝对位置
function getPos(obj){
    var l=0;
    var t=0;
    while(obj){
        l+=obj.offsetLeft;
        t+=obj.offsetTop;
        obj=obj.offsetParent;
    }
    return {left:l ,top:t};
}

//10.事件绑定
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn);
    }
}

//11.事件解绑
function removeEvent(obj,sEv,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(sEv,fn,false);
    }else{
        obj.detachEvent('on'+sEv,fn);
    }
}

//12.滚轮事件
function addWheel(obj,fn){
    function wheel(ev){
        var oEvent=ev||event;
        var bDown=true;
        if(oEvent.wheelDelta){
            if(oEvent.wheelDelta>0){
                bDown=false;
            }else{
                bDown=true;
            }
        }else{
            if(oEvent.detail<0){
                bDown=false;
            }else{
                bDown=true;
            }
        }
        fn && fn(bDown);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }
    if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
        addEvent(obj,'DOMMouseScroll',wheel);
    }else{
        addEvent(obj,'mousewheel',wheel);
    }
}

//13.domReady函数
function domReady(fn){
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',function(){
            fn && fn();
        },false);
    }else{
        document.onreadystatechange=function(){
            if(document.readyState=='complete'){
                fn && fn();
            }
        }
    }
}

//14.拖动窗口改变大小
function drag(obj1,obj2){
    obj1.onmousedown=function(ev){
        var oEvent=ev||event;
        if(obj1.className.indexOf('l')!=-1){
            var downX=oEvent.clientX;
            var oldW=obj2.offsetWidth;
            var oldL=obj2.offsetLeft;
        }
        if(obj1.className.indexOf('r')!=-1){
            var downX=oEvent.clientX;
            var oldW=obj2.offsetWidth;
        }
        if(obj1.className.indexOf('t')!=-1){
            var downY=oEvent.clientY;
            var oldH=obj2.offsetHeight;
            var oldT=obj2.offsetTop;
        }
        if(obj1.className.indexOf('b')!=-1){
            var downY=oEvent.clientY;
            var oldH=obj2.offsetHeight;
        }
        document.onmousemove=function(ev){
            var oEvent=ev||event;
            if(obj1.className.indexOf('l')!=-1){
                var targetX=downX-oEvent.clientX;
                var newW=oldW+targetX;
                var newL=oldL-targetX;
                obj2.style.width=newW+'px';
                obj2.style.left=newL+'px';
            }
            if(obj1.className.indexOf('r')!=-1){
                var targetX=oEvent.clientX-downX;
                var newW=oldW+targetX;
                obj2.style.width=newW+'px';
            }
            if(obj1.className.indexOf('t')!=-1){
                var targetY=downY-oEvent.clientY;
                var newH=oldH+targetY;
                var newT=oldT-targetY;
                obj2.style.height=newH+'px';
                obj2.style.top=newT+'px';
            }
            if(obj1.className.indexOf('b')!=-1){
                var targetY=oEvent.clientY-downY;
                var newH=oldH+targetY;
                obj2.style.height=newH+'px';
            }
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
        };
        return false;
    }
}

//15.拖拽
function drag(obj){
    obj.onmousedown=function(ev){
        var oEvent=ev||event;
        var disX=oEvent.clientX-obj.offsetLeft;
        var disY=oEvent.clientY-obj.offsetTop;
        document.onmousemove=function(ev){
            var oEvent=ev||event;
            obj.style.left=oEvent.clientX-disX+'px';
            obj.style.top=oEvent.clientY-disY+'px';
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
        };
        return false;
    }
}

//16.碰撞测试
function collTest(obj1,obj2){
    var l1=obj1.offsetLeft;
    var r1=obj1.offsetWidth+l1;
    var t1=obj1.offsetTop;
    var b1=obj1.offsetHeight+t1;
    var l2=obj2.offsetLeft;
    var r2=obj2.offsetWidth+l2;
    var t2=obj2.offsetTop;
    var b2=obj2.offsetHeight+t2;
    if(r1>=l2 && l1<=r2 && b1>=t2 && t1<=b2){
        return true;
    }else{
        return false;
    }
}

//17.运动框架
function move(obj,json,option){
    var option=option||{};
    option.duration=option.duration || 800;
    option.easing=option.easing || 'ease-out';
    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj,name));
        if(isNaN(start[name])){
            switch(name){
                case 'marginLeft':
                    obj.style.marginLeft=obj.offsetLeft;
                    break;
                case 'marginTop':
                    obj.style.marginTop=obj.offsetTop;
                    break;
                case 'Left':
                    obj.style.left=obj.offsetLeft;
                    break;
                case 'top':
                    obj.style.top=obj.offsetTop;
                    break;
                case 'opacity':
                    obj.style.opacity=1;
                    break;
            }
        }
        dis[name]=json[name]-start[name];
    }
    var n=0;
    var count=Math.round(option.duration/30);

    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        for(var name in json){
            switch(option.easing){
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+dis[name]*(1-a*a*a);
            }
            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }

        if(n==count){
            clearInterval(obj.timer);
            option.complete && option.complete();
        }
    },30);
}
//18.圆
function move2(obj,iTarget){
    obj.a=obj.a||0;
    var start=obj.a;
    var dis=iTarget-start;
    var count=Math.round(1000/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        var a=n/count;
        var cur=start+dis*a;
        obj.a=cur;
        obj.style.left=R+Math.sin(cur*Math.PI/180)*R+'px';
        obj.style.top=R-Math.cos(cur*Math.PI/180)*R+'px';
        if(n==count){
            clearInterval(obj.timer);
        }
    },30);
}
//19.判断滑入方向 return 0 1 2 3 右 下 左 上
function hoverDir(obj,ev){
    var x=obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
    var y=obj.offsetTop+obj.offsetHeight/2-ev.clientY;
    return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}
//20.计算两个物体之间的距离
function getDis(obj,obj2){
    var l1=obj.offsetLeft+obj.offsetWidth/2;
    var t1=obj.offsetTop+obj.offsetHeight/2;
    var l2=obj2.offsetLeft+obj2.offsetWidth/2;
    var t2=obj2.offsetTop+obj2.offsetHeight/2;
    var a=l1-l2;
    var b=t1-t2;
    return Math.sqrt(a*a+b*b);
}
//21.查找离得最近的元素
function findNearest(obj){
    var iMin=99999999999999;
    var iMinIndex=-1;
    for(var i=0;i<aLi.length;i++){
        if(obj==aLi[i])continue;
        if(collTest(obj,aLi[i])){
            var dis=getDis(obj,aLi[i]);
            if(dis<iMin){
                iMin=dis;
                iMinIndex=i;
            }
        }
    }
    if(iMinIndex==-1){
        return null;
    }else{
        return aLi[iMinIndex];
    }
}
//22.存cookie
function addCookie(name, value, iDay){
    if(iDay){
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=name+'='+value+'; path=/; expires='+oDate.toGMTString();
    }else{
        document.cookie=name+'='+value+'; path=/';
    }
}
// 23.获取Cookie
function getCookie(name){
    var arr=document.cookie.split('; ');
    for(var i=0; i<arr.length; i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name){
            return arr2[1];
        }
    }
    return '';
}
//24.删除cookie
function removeCookie(name){
    addCookie(name, '123', -1);
}

//25.ajax
function json2url(json){
    json.t=Math.random();
    var arr=[];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}
function ajax(json){
    //json:url,data,type,timeout,success,error,loading,complete
    var json=json||{};
    if(!json.url)return;
    json.data=json.data||{};
    json.type=json.type||'get';
    json.timeout=json.timeout||50000;

    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest;
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }
    json.fnLoading && json.fnLoading();
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            json.complete &&json.complete();
            if((oAjax.status>=200 && oAjax.status<300)||oAjax.status==304){
                json.success && json.success(oAjax.responseText);
            }else{
                json.error && json.error(oAjax.status);
            }
            clearTimeout(timer);
        }
    };

    var timer=setTimeout(function(){
        alert('网速太慢！');
        oAjax.onreadystatechange=null;
    },json.timeout);
}

//26.jsonp

function jsonp(json){
    //json:url,data,cbName,success
    var json=json||{};
    if(!json.url)return;
    json.data=json.data||{};
    json.cbName=json.cbName||'cb';

    var fnName='show'+Math.random();
    fnName=fnName.replace('.','');

    json.data[json.cbName]=fnName;
    var arr=[];
    for(var name in json.data){
        arr.push(name+'='+json.data[name])
    }
    var str=arr.join('&');

    window[fnName]=function(data){
        json.success && json.success(data);
        oHead.removeChild(oS);
    };

    var oS=document.createElement('script');
    oS.src=json.url+'?'+str;
    var oHead=document.getElementsByTagName('head')[0];
    oHead.appendChild(oS);
}