/**
 * Created by liuxiaona on 2016/4/27.
 */
function getStyle(obj,name){
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
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