//1.功能：用于解决IE8里不能用getElementsByClassName的兼容问题的函数
//参数说明：classname:定义的类名
//          obj:表示查找范围（document或者自定义）
function getClass(classname,obj){
      	var obj=obj||document;
      	if(obj.getElementsByClassName){//判断是W3C浏览器
      		return obj.getElementsByClassName(classname);//结果返回
      	}else{//否则是IE8
      		var all=obj.getElementsByTagName("*");//获取所有的标签
      		var arr=[];//新数组，用来保存找到的元素
      		for(var i=0;i<all.length;i++){//遍历所有的标签即all
      			if(checkRel(all[i].className,classname)){//如果找到对应的类名
      				arr.push(all[i]);//将他放到新的数组arr
      			}
      		}
      		return arr;//返回结果
      	}
      }
      //解决当出现多个class名时IE认为只有一个class名的问题
      //参数说明：str：多个class（类）名集合以后的字符串
      //          val：想找的类名
      function checkRel(str,val){
      	var newarr=str.split(" ");//将class名分割成数组
      	for(var i=0;i<newarr.length;i++){//遍历数组
      		if(newarr[i]==val){//如果找到一个元素与val相同
      			return true;//返回真
      		}
      	}
      	return false;//如果遍历完都没有找到符合上面条件的，返回假
      }



/* 2.可以获取与设置纯文本的兼容函数
     val：接收第二个实参，表示设置一个文本
*/
function getText(obj,val){//没有写val时，即val为undefined
      if(val==undefined){//当val为undefined时，完成获取
            if(obj.innerText){
                  return obj.innerText;
            }else{
                  return obj.textContent;
            }
      }else{//当val不为undefined时，完成赋值
            if(obj.innerText||obj.innerText==""){//IE8，当浏览器有innerText这个属性或者当对象的内容为空字符串时，都可以给这个对象设置文本
                  obj.innerText=val;
            }else{//W3C
                  obj.textContent=val;
            }
      }
}

/*3.通用的方式获取样式
  attr:哪个属性
*/
function getStyle(obj,attr){
      if(obj.currentStyle){
            return obj.currentStyle[attr];
      }else{
            return getComputedStyle(obj,null)[attr];
      }
}

   /*4.用于获取
     $(".box")//类名
     $("#first")//Id名
     $("div")//标签名
   */  
   function $(select,obj){
      var obj=obj||document;
      if(typeof select=="string"){
            //去掉字符串前后的空格
            select=select.replace(/^\s*|\s*$/g,"");
            if(select.charAt(0)=="."){//判断是类名
                  return getClass(select.slice(1),obj);
            }
            else if(select.charAt(0)=="#"){//判断是id命
                  return obj.getElementById(select.slice(1));
            }
            else if(/^[a-z|1-6]{1,10}$/g.test(select)){//判断是标签
                  return obj.getElementsByTagName(select);
            }
         }   
            else if(typeof select=="function"){//如果是function类型
                  window.onload=function(){//让$能够代替window.onload
                        select();
            }
         }
      
   }  



       /*5.getChilds(parent);
   获取元素子节点的兼容函数
   "a":获取元素子节点
   "b":获取元素子节点和文本节点
   原理：先获取所有的儿子，然后根据节点的类型判断，如果为1表示是元素节点，保存到数组里。*/ 


   function getChilds(parent,type){
      var type=type||"a";
      var childs=parent.childNodes;//所有儿子
      var arr=[];
      for(var i=0;i<childs.length;i++){//遍历所有儿子
         if(type=="a"){//如果只需获取元素节点
            if(childs[i].nodeType==1){//判断儿子的noneType的值，如果为1则是元素节点，那么就获取
               arr.push(childs[i]);
            }
         }else if(type=="b"){//获取元素节点和文本节点
             if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){//如果是元素节点，或者文本节点
               arr.push(childs[i]);
            }
         }
      }
      return arr;
   }  



   /*6.获得第一个子节点*/
   function getFirst(parent){
      return getChilds(parent)[0];
   }
   // 7.获得最后一个子节点
   function getLast(parent){
      return getChilds(parent)[getChilds(parent).length-1];
   }
   // 8.获得一个指定子节点
   function getNum(parent,num){
      return getChilds(parent)[num];
   }
   //9.获取下一个兄弟节点
   function getNext(obj){
      var next=obj.nextSibling;
      if(next==null){
            return false;
         }
      while(next.nodeType==3||next.nodeType==8){
         next=next.nextSibling;
         if(next==null){
            return false;
         }
      }
      return next;
   }
   //10.获取上一个兄弟节点
   function getUp(obj){
      var up=obj.previousSibling;
       if(up==null){
            return false;
         }
      while(up.nodeType==3||up.nodeType==8){
         up=up.previousSibling;
         if(up==null){
            return false;
         }
      }
      return up;
   }



//11.插入到某个对象之后
/*对象。insertBefore(obj,obj1)
插入到下一个之前
重点：给对象的原型添加此方法

原理：找到第二个参数的下一个兄弟节点，将第一个参数插入到此兄弟节点之前（插入到下一个对象之前）
obj1:需要插入的元素
obj2：插入到obj2之后*/

Object.prototype.insertAfter=function(obj1,obj2){
    var next=getNext(obj2);
    if(next){
      this.insertBefore(obj2,next);
    }else{
      this.appendChild(obj1);
    }
}



//12.获取滚动条与页面顶部的距离
function getScrollT(){
   var obj=document.documentElement.scrollTop?document.documentElement:document.body;
   var ScrollT=obj.scrollTop;
   return ScrollT;
}



//13.给同一个元素添加多个事件
/*obj:给那个对象添加
 ev:什么事件
 fun:事件处理程序*/
function addEvent(obj,ev,fun){
   if(obj.addEventLisener){
      return obj.addEventLisener(ev,function(){
         fun.call(obj);
      },false);
   }
   else{
      return obj.attachEvent("on"+ev,function(){
         fun.call(obj);
      });
      //在IE8中this不指当前对象，指的是Window
   }
}
//14.删除事件
function delEvent(obj,ev,fun){
   if(obj.removeEventListener){
      return obj.removeEventListener(ev,function(){
         fun.call(obj);
      },false);
   }
   else{
      return obj.detachEvent("on"+ev,function(){
         fun.call(obj);
      });
      //在IE8中this不指当前对象，指的是Window
   }
}


//15
function getCW(){
   return document.documentElement.clientWidth;
}
function getCH(){
   return document.documentElement.clientHeight;
}
//16.拖拽
function drag(obj){
   var cw=getCW();
   var ch=getCH();
   var ow=obj.offsetWidth;
   var oh=obj.offsetHeight;
   obj.onmousedown=function(e){
      var ev=e||window.event;
      var ox=ev.offsetX;
      var oy=ev.offsetY;//阻止浏览器的默认行为
      if (ev.preventDefault ){
      ev.preventDefault(); //阻止默认浏览器动作(W3C)
      }
      else{
      ev.returnValue = false;//IE中阻止函数器默认动作的方式
      }
            //事件委托的思想
      document.onmousemove=function(e){
         var ev=e||window.event;
         var cx=ev.clientX;
         var cy=ev.clientY;
         var x=cx-ox;
         var y=cy-oy;
         if(x<=0){
            x=0;
         }
         if(x>=(cw-ow)){
            x=cw-ow;
         }
         if(y<=0){
            y=0;
         }
         if(y>=(ch-oh)){
            y=ch-oh;
         }
         obj.style.left=x+"px";
         obj.style.top=y+"px";
      }
   }
   obj.onmouseup=function(){
      document.onmousemove=null;
   }
}

//17.鼠标滚动事件
/*obj:那个对象添加滚轮事件
upfun:处理滚轮向上的函数
downfun:处理滚轮向下的函数*/

function mouseWheel(obj,upfun,downfun){
   if(obj.attachEvent){
   obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
   }else if(obj.addEventListener){
   obj.addEventListener("mousewheel",scrollFn,false);
   //chrome,safari -webkitdocument.
    addEventListener("DOMMouseScroll",scrollFn,false);
   //firefox -moz-
   }
   function scrollFn(e){
      var ev=e||window.event;
      if(ev.preventDefault ){
      ev.preventDefault();//阻止默认浏览器动作(W3C)
   }else{
      ev.returnValue = false;//IE中阻止函数器默认动作的方式
   }

      var num=ev.detail||ev.wheelDelte;
      if(num==-3||num==120){
         if(upfun){
            upfun()
         }
      }else if(num==3||num==-120){
         if(downfun){
            downfun();
         }
      }
   }
}



//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
       
