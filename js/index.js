window.onload=function(){
	//选项卡
    var onearr=[];
    var twoarr=[];
    var threearr=[];
    var fourarr=[];
    var remenpinpaicenter=$(".remenpinpaicenter");
    var pinpaifenlei=$(".pinpaifenlei");
    var huanyipi=$(".huanyipi")[0];
    for(var i=0;i<34;i++){
        onearr.push("./img/tu-"+i+".jpg");
        twoarr.push("./img/tu-"+i+".jpg");
        threearr.push("./img/tu-"+i+".jpg");
        fourarr.push("./img/tu-"+i+".jpg");
    }
    function randomImg(arr){
        var newarr=[];
        for(var i=0;i<24;i++){
            newarr.push(arr[parseInt(Math.random()*34)])
        }
        return newarr;
    }
    var arr=[onearr,twoarr,threearr,fourarr];
    function show(num){
        var imgarr=randomImg(arr[num]);
        for(var i=0;i<imgarr.length;i++){
            imgarr[i].index=i;
            var divs=document.createElement("div");
            divs.style.cssText="width:130px;height:80px;float:left;position: relative;border-bottom: 2px solid #f5f5f5;border-right: 2px solid #f5f5f5;"
             var classess=document.createAttribute("class");
            classess.nodeValue="box";
            divs.setAttributeNode(classess);
            var as=document.createElement("a");
            as.href="#";
            var imgs=document.createElement("img");
            imgs.style.cssText="width: 90px;height: 45px;float: left;margin-top: 17px;margin-left: 21px;"
            imgs.src=imgarr[i];
            var imgtx=document.createElement("img");
            imgtx.src="./img/xin1.png";
            imgtx.style.cssText="float:left;position: absolute;top:10px;right:10px;display: none;"
            var classes=document.createAttribute("class");
            classes.nodeValue="taoxin";
            imgtx.setAttributeNode(classes);
            as.appendChild(imgtx);
            as.appendChild(imgs);
            divs.appendChild(as);
            remenpinpaicenter[num].appendChild(divs);
            
           
        }
       
    }
    show(0)
    var numb=0;
    for(var i=0;i<pinpaifenlei.length;i++){
        pinpaifenlei[i].index=i;
        pinpaifenlei[i].onclick=function(){
            numb=this.index;
            for(var j=0;j<pinpaifenlei.length;j++){
                remenpinpaicenter[j].style.display="none";
                pinpaifenlei[j].style.fontWeight="normal";
                pinpaifenlei[j].style.textDecoration="none"
            }
            remenpinpaicenter[this.index].style.display="block";
            show(this.index);
            this.style.fontWeight="800";
            this.style.textDecoration="underline";
            this.style.color="#333";
           
        }
    }
     huanyipi.onclick=function(){
        remenpinpaicenter[numb].innerHTML="";
        show(numb);
     }
	
	//桃心
    var box=getClass("box");
    var taoxin=getClass("taoxin");
    for(var i=0;i<box.length;i++){
        box[i].index=i;
        box[i].onmouseover=function(){
            taoxin[this.index].style.display="block";
        }
        box[i].onmouseout=function(){
            taoxin[this.index].style.display="none";
        }
    }



    //banner的轮播
	var bannerCenterImgs=getClass("banner-center-imgs");
    
	var bannerCenterBtn=getClass("banner-center-btn");
    var backarr=["#B90AF9","#7AF7CF","#DBDBDB","yellow","#DBDBDB"];
    var bbigbannerbox=$(".bbigbannerbox")[0];
	var num=1;
	function move(){
		if(num==5){
			num=0;
		}
		for(var i=0;i<bannerCenterImgs.length;i++ ){
			bannerCenterImgs[i].style.zIndex=3;
			bannerCenterBtn[i].style.background="#333";
		}
		bannerCenterImgs[num].style.zIndex=4;
		bannerCenterBtn[num].style.background="#ccc";
        bbigbannerbox.style.background=backarr[num];
		num++;
	}
	var t=setInterval(move,2000);

	for(var i=0;i<bannerCenterBtn.length;i++){
		bannerCenterBtn[i].index=i;
		bannerCenterBtn[i].onmouseover=function(){
			clearInterval(t);
			for(var j=0;j<bannerCenterImgs.length;j++){
				bannerCenterBtn[j].style.background="#333";
				bannerCenterImgs[j].style.zIndex=3;
                bbigbannerbox.style.background=backarr[j];
			}
			bannerCenterBtn[this.index].style.background="#ccc";
			bannerCenterImgs[this.index].style.zIndex=4;
            bbigbannerbox.style.background=backarr[this.index];
		}
		bannerCenterBtn[i].onmouseout=function(){
			t=setInterval(move,2000);
			num=this.index+1;
		}
	}

//banner菜单

  var dhcdbox=$(".dhcdbox")[0];
   var bannercd=$(".bannercd");
   for(var i=0;i<bannercd.length;i++){
    bannercd[i].index=i;
      bannercd[i].onmouseover=function(){
        clearInterval(t);
        dhcdbox.style.display="block";
      }
      bannercd[i].onmouseout=function(){
        dhcdbox.style.display="none";
        t=setInterval(move,2000);
      }
   }




    //搜索框
function sousuo(a){
    var sousuotext=$(".sousuotext")[a];
    sousuotext.onfocus=function(){
    	if(sousuotext.value=="猫猫狗狗的购物狂欢，给他最好的"){
    		sousuotext.value="";
    	}
    }
    sousuotext.onblur=function(){
    	if(sousuotext.value){

    	}else{
    		sousuotext.value="猫猫狗狗的购物狂欢，给他最好的"
    	}
    }
}
var sousuotext=$(".sousuotext");
for(var i=0;i<sousuotext.length;i++){
    sousuo(i);
}

    //左侧导航,
    var jumpLeft=$(".jump-left")[0];
    var dhbtn=$("li",jumpLeft);
    var ch=document.documentElement.clientHeight;
    var floors=$(".floors");
   
    for(var i=0;i<dhbtn.length;i++){
        dhbtn[i].index=i;
        dhbtn[i].onmouseover=function(){
            dhbtn[this.index].style.background="#c40000";
        }
        dhbtn[i].onmouseout=function(){
            dhbtn[this.index].style.background="#2d2d2d";
        }
        dhbtn[i].onclick=function(){
            var obj=document.documentElement.scrollTop?document.documentElement:document.body;
    		animate(obj,{scrollTop:floors[this.index].t},600);
    	}
    }
    
    

    //楼层logo的轮播
    function lunbo(a){
        var logolunboImgbox=$(".logolunbo-imgbox")[a];
        var lunbozuojian=$(".lunbozuojian")[a];
        var lunboyoujian=$(".lunboyoujian")[a];
        //alert(first)
        function moveleft(){
            var last=getLast(logolunboImgbox);
            var first=getFirst(logolunboImgbox);
            animate(logolunboImgbox,{left:-90},function(){
           	logolunboImgbox.appendChild(first,last);
           	logolunboImgbox.style.left=0
           })
        }
        function moveright(){
            var last=getLast(logolunboImgbox);
            var first=getFirst(logolunboImgbox);
        	logolunboImgbox.style.left=-90+"px";
        	logolunboImgbox.insertBefore(last,first);
        	animate(logolunboImgbox,{left:0});
        }
        var s=setInterval(moveleft,2000);
        lunbozuojian.onmouseover=lunboyoujian.onmouseover=function(){
        	clearInterval(s);
        }
        lunbozuojian.onmouseout=lunboyoujian.onmouseout=function(){
        	s=setInterval(moveleft,2000);
        }
        lunboyoujian.onclick=function(){
        	moveright();
        }
        lunbozuojian.onclick=function(){
        	moveleft();
        }
    }
    var logolunbobox=$(".logolunbobox");
    //alert(logolunbobox.length);
   for(var a=0;a<logolunbobox.length;a++){
       lunbo(a);
   }
    

    //图片左移事件
    var loucengimgs=$(".loucengimgs");
    for(var j=0;j<loucengimgs.length;j++){
        loucengimgs[j].index=j;
        loucengimgs[j].onmouseover=function(){
    	     loucengimgs[this.index].style.left=3+"px";
    	     loucengimgs[this.index].style.top=-3+"px";
             loucengimgs[this.index].style.cssText="box-shadow:1px 0 5px rgba(0,0,0,0.2)";

    	 }
    	    loucengimgs[j].onmouseout=function(){
    	     loucengimgs[this.index].style.left=0+"px";
    	     loucengimgs[this.index].style.top=0+"px";
             loucengimgs[this.index].style.cssText="box-shadow:none";

    	 }
    }
    
    //按需加载    
    var floors2=$(".floors");
    //alert(floors2.length)
        var ch=document.documentElement.clientHeight; 
        window.onscroll=function(){
        var scrollT=getScrollT();
        for(var i=0;i<floors2.length;i++){
            if(floors2[i].offsetTop<scrollT+ch){
             var imgss=$("img",floors2[i]);
        //alert(img.length)
            for(var c=0;c<imgss.length;c++){
                imgss[c].src=imgss[c].getAttribute("aa");
               
            }
        }
      }


       //楼层跳转
       var flagdown=true;
       var flagup=true;
       var xiahuasousuokuangbox=$(".xiahuasousuokuangbox")[0];
        //document.title=scrollT;

        //下拉搜索框
        if(scrollT>=680){
            if(flagdown){
                animate(xiahuasousuokuangbox,{top:0});
                flagdown=false;
                flagup=true;
            }
        }
        else{
            if(flagup){
                animate(xiahuasousuokuangbox,{top:-50});
                flagup=false;
                flagdown=true;
            }
        }

      //
        if(scrollT>=800&&scrollT<=6550){
            jumpLeft.style.display="block";
        }
        else{
            jumpLeft.style.display="none";
        }
        
        //alert(floors.length);
        for(var i=0;i<floors.length;i++){
            floors[i].t=floors[i].offsetTop;
            if(floors[i].t<(scrollT+ch/2)){
                for(var j=0;j<dhbtn.length;j++){
                    dhbtn[j].style.background="#2d2d2d";
                }
                dhbtn[i].style.background="#c40000";
            }
        } 

        var scrollT=getScrollT();
     if(scrollT>=50){
        huidingbu.style.display="block";
     }else{
        huidingbu.style.display="none";
     }

    }

  //右侧导航
  //出现  
     var youdhbox=$(".youdhbox")[0];
     animate(youdhbox,{right:0},800,Tween.Linear);
//特权
     var tequan=$(".tequan")[0];
     var wodetequan=$(".wodetequan")[0];
    hover(tequan,function(){
        tequan.style.background="#c40000";
        wodetequan.style.display="block";
        animate(wodetequan,{right:35},Tween.Linear)
    },function(){
        tequan.style.background="";
        wodetequan.style.display="none";
        animate(wodetequan,{right:40},Tween.Linear)
    })
    //购物车
    var gwc=$(".gwc")[0];
    var gwcimg=$("img",gwc)[0];
    hover(gwc,function(){
        gwcimg.src=gwcimg.getAttribute("bb");
        gwcimg.style.marginTop=10+"px";
        gwc.style.background="#c40000";
        gwc.style.border="none";
    },function(){
        gwc.style.background="";
        gwcimg.src=gwcimg.getAttribute("aa");
    })


    //钱包
     var qian=$(".qian")[0];
     var wodezichan=$(".wodezichan")[0];
    hover(qian,function(){
        qian.style.background="#c40000";
        wodezichan.style.display="block";
        animate(wodezichan,{right:35},Tween.Linear)
    },function(){
        qian.style.background="";
        wodezichan.style.display="none";
        wodezichan.style.right="40px";
    })

//我的关注
    var xin=$(".xin")[0];
     var wodeguanzhu=$(".wodeguanzhu")[0];
    hover(xin,function(){
        xin.style.background="#c40000";
        wodeguanzhu.style.display="block";
        animate(wodeguanzhu,{right:35},Tween.Linear)
    },function(){
        xin.style.background="";
        wodeguanzhu.style.display="none";
        wodeguanzhu.style.right="40px";
    })


    //我的收藏
    var soucang=$(".soucang")[0];
     var wodeshoucang=$(".wodeshoucang")[0];
    hover(soucang,function(){
        soucang.style.background="#c40000";
        wodeshoucang.style.display="block";
        animate(wodeshoucang,{right:35},Tween.Linear)
    },function(){
        soucang.style.background="";
        wodeshoucang.style.display="none";
        wodeshoucang.style.right="40px";
    })

    //我看过的

      var biao=$(".biao")[0];
     var wokanguode=$(".wokanguode")[0];
    hover(biao,function(){
        biao.style.background="#c40000";
        wokanguode.style.display="block";
        animate(wokanguode,{right:35},Tween.Linear)
    },function(){
        biao.style.background="";
        wokanguode.style.display="none";
        wokanguode.style.right="40px";
    })

    //我要充值
    var chongzhi=$(".chongzhi")[0];
     var woyaochongzhi=$(".woyaochongzhi")[0];
    hover(chongzhi,function(){
        chongzhi.style.background="#c40000";
        woyaochongzhi.style.display="block";
        animate(woyaochongzhi,{right:35},Tween.Linear)
    },function(){
        chongzhi.style.background="";
        woyaochongzhi.style.display="none";
        woyaochongzhi.style.right="40px";
    })

     // 用户反馈
     var fankui=$(".fankui")[0];
     var yonghufankui=$(".yonghufankui")[0];
    hover(fankui,function(){
        fankui.style.background="#c40000";
        yonghufankui.style.display="block";
        animate(yonghufankui,{right:35},Tween.Linear)
    },function(){
        fankui.style.background="";
        yonghufankui.style.display="none";
        yonghufankui.style.right="40px";
    })

    //大礼包
    var dalibao=$(".dalibao")[0];
     var dalibaoss=$(".dalibaoss")[0];
    hover(dalibao,function(){
        dalibao.style.background="#c40000";
        dalibaoss.style.display="block";
    },function(){
        dalibao.style.background="";
        dalibaoss.style.display="none";
    })
    //回顶部
    var huidingbu=$(".huidingbu")[0];
     var fanhuidingbu=$(".fanhuidingbu")[0];

    hover(huidingbu,function(){
        huidingbu.style.background="#c40000";
        fanhuidingbu.style.display="block";
        animate(fanhuidingbu,{right:35},Tween.Linear)
    },function(){
        huidingbu.style.background="";
        fanhuidingbu.style.display="none";
        fanhuidingbu.style.right=40+"px";
        
    })
    huidingbu.onclick=function(){
        fanhuidingbu.style.display="none";
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
        animate(obj,{scrollTop:0});
    }

var wdtb=$(".wdtb");
var wotbxlbox=$(".wodtbxlbox");
   for(var i=0;i<wdtb.length;i++){
        wdtb[i].index=i;
        wdtb[i].onmouseover=function(){
            animate(wotbxlbox[this.index],{height:70});
        }
        wdtb[i].onmouseout=function(){
            animate(wotbxlbox[this.index],{height:0});
        }
   }


   var shoujiban=$("#shoujiban");
   var sjberbox=$("#sjberbox");
   shoujiban.onmouseover=function(){
    animate(sjberbox,{height:105})
   }
   shoujiban.onmouseout=function(){
    animate(sjberbox,{height:0})
   }


   var shangjia=$(".shangjia")[0];
   //alert(shangjia)
   var sjzc=$(".sjzc")[0];
   shangjia.onmouseover=function(){
    animate(sjzc,{height:110})
   }
   shangjia.onmouseout=function(){
    animate(sjzc,{height:0})
   }


   var dhcdbox1=$(".dhcdbox1")[0];
   var bannercd1=$(".bannercd1")[0];
   bannercd1.onmouseover=function(){
    dhcdbox1.style.display="block";
   }
   bannercd1.onmouseout=function(){
    dhcdbox1.style.display="none";
   }



 

}
