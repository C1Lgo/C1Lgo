// 手机最终价格，和最终总价
var phone_price=5289;
var final_price=0;

// 盒子放大镜效果
var zoom=document.querySelector(".small-zoom");
var smimg=document.querySelector(".small-zoom img");
var opacityBox=document.querySelector('.opacity-box');
var bigzoom=document.querySelector(".big-zoom");
var bigimg=document.querySelector(".big-zoom img");

//放大镜效果
zoom.onmousemove=function(e){
    opacityBox.style.display="block";
    bigzoom.style.display="block";
// 自动设置放大镜大小（遮罩/小盒子=大盒子/大图）
    opacityBox.style.width=bigzoom.offsetWidth/bigimg.offsetWidth*smimg.offsetWidth+'px';
    opacityBox.style.height=bigzoom.offsetHeight/bigimg.offsetHeight*smimg.offsetHeight+'px';
    var x=e.clientX;
    var y=e.clientY;
    var left=x-zoom.getBoundingClientRect().left;
    var gl=left-opacityBox.offsetWidth/2;
    var top=y-zoom.getBoundingClientRect().top;
    var gt=top-opacityBox.offsetHeight/2;
    var maxsgl=zoom.offsetWidth-opacityBox.offsetWidth;
    var maxsgt=zoom.offsetHeight-opacityBox.offsetHeight;
    var maxbgl=bigimg.offsetWidth-bigzoom.offsetWidth;
    var maxbgt=bigimg.offsetHeight-bigzoom.offsetHeight;
    if(gl<0)gl=0;
    else if(gl>maxsgl)gl=maxsgl;
    if(gt<0)gt=0;
    else if(gt>maxsgt)gt=maxsgt;
    opacityBox.style.left=gl+'px';
    opacityBox.style.top=gt+'px';
    // 动态计算大盒子移动距离（小移动/大移动=小的最大移动距离/大的最大移动距离）
    bigimg.style.left=-gl*maxbgl/maxsgl+'px';
    bigimg.style.top=-gt*maxbgt/maxsgt+'px';
}
zoom.onmouseleave=function(){
    opacityBox.style.display="none";
    bigzoom.style.display="none";
}


// 底部图片切换
var zul=document.querySelector(".thumb-wrapper>ul");
goodData.imgsrc.forEach(function(a,i){
 var li=document.createElement('li');
 var img=document.createElement('img');
 img.src=goodData.imgsrc[i].s;
 li.appendChild(img);
 zul.appendChild(li);
})
var zlis=document.querySelectorAll(".thumb-wrapper>ul>li");
var imgs=document.querySelectorAll(".thumb-wrapper>ul>li>img");
imgs[0].className="active";
zul.style.width=(zlis[0].offsetWidth+16)*zlis.length-16+'px';

// 图片切换排他的封装
function pt(index){
    zlis.forEach(function(t,i){
        imgs[i].className=""
    })
    imgs[index].className="active";
}

zlis.forEach(function(a,b){
    a.onclick=function(){
        smimg.src=goodData.imgsrc[b].s;
        bigimg.src=goodData.imgsrc[b].b;
        pt(b);
        index=b;
    }
})

var index=0;
var arrowl=document.querySelector(".arrow-left");
var arrowr=document.querySelector(".arrow-right");
var move=0;
lmax=(zlis[0].offsetWidth+16)*(zlis.length-5);

//右按钮
arrowr.onclick=function(){
    move+=-zlis[0].offsetWidth-16;
    if(Math.abs(move)>=lmax)
    move=-lmax;
    zul.style.left=move+'px';
    index++;
    if(index>goodData.imgsrc.length-1)index=goodData.imgsrc.length-1;
    pt(index);
    smimg.src=goodData.imgsrc[index].s;
    bigimg.src=goodData.imgsrc[index].b;
}

//左按钮
arrowl.onclick=function(){
    move-=-zlis[0].offsetWidth-16;
    if(move>=0)
        move=0;
    zul.style.left=move+'px';
    index--;
    if(index<0)index=0;
    pt(index);
    smimg.src=goodData.imgsrc[index].s;
    bigimg.src=goodData.imgsrc[index].b;
}

// 选项卡
// var goods_t=getTags(".goods-detail-tab a");
// var goods_d=getTags(".goods-detail div");
// goods_t.forEach(function(a,b){
//     a.onclick=function(e){
//         goods_t.forEach(function(x,y){
//             x.className=""
//             goods_d[y].style.display="none";
//         })
//         goods_t[b].className="check"
//         goods_d[b].style.display="block";
//     }
// })
// 选项卡封装
/**
 * 处理选项卡的切换
 * @param aurl tab 选项卡的头部切换对象
 * @param burl tab 选项卡的切换内容
 * @param change 要切换的高亮类名
 */
var getTab=function(aurl,burl,change){
    var alis=getTags(aurl);
    var blis=getTags(burl);
    alis.forEach(function(a,b){
        a.onclick=function( ){
            alis.forEach(function(x,y){
                x.className=""
                blis[y].style.display="none";
            })
            console.log(b);
            alis[b].className=change;
            blis[b].style.display="block";
        }
    })
}
getTab(".goods-intro ul li",".pro-intros>div","active");
getTab(".goods-detail-tab a",".goods-detail div","block");


var selectbox=getTag(".selected-box")
// 选择种类
// var c_color=getTags("#optionsBox dl:nth-of-type(1) dd");
// c_color.forEach(function(a){
//     a.onclick=function(){
//         c_color.forEach(function(x){
//             x.className="";
//         })
//         a.className="active";
//         var divnode=document.createElement('div');
//         divnode.innerText=a.textContent;
//         divnode.className="color";
//         if(divnode.className);
//         var inode=document.createElement('i');
//         inode.innerText="X";
//         divnode.appendChild(inode);
//         selectbox.appendChild(divnode);
//         inode.onclick=function(){
//             divnode.remove();
//         }
//     }
// })


// 选择种类的封装
/**
 * 选择样式的切换，自动生成可编辑的选项
 * @param where 选择的对象
 * @param active 要切换的高亮类名
 * @param cname 准备设置的类名（数组的索引）
 * 运用数组来保存数据
 */
// var arr=new Array(4);
// function choice(where,active,cname){
//     var t=getTags(where);
//     t.forEach(function(a,b){
//     a.onclick=function(){
//         // 对应内容添加到数组
//         t.forEach(function(x){
//             x.className="";
//         })
//         a.className=active;
//         arr[cname]=a.textContent;
//         selectbox.innerHTML="";
//         // 用数组自动生成所选信息
//         phone_price=5289;
//         arr.forEach(function(item,index){
//             console.log(arr);
//             var divnode=document.createElement('div');
//             divnode.innerText=item;
//             divnode.className=index;
//             var inode=document.createElement('i');
//             inode.innerText="X";
//             divnode.appendChild(inode);
//             selectbox.appendChild(divnode);
//             // 删除功能
//             inode.onclick=function(){
//                 divnode.remove();
//                 arr[cname]=goodData.goodsDetail.crumbData[cname].data[0].type;
//                 t.forEach(function(x){
//                     x.className="";
//                 })
//                 t[0].className=active;
//             }
//         })   
//     }
//   })
// }
// choice("#optionsBox dl:nth-of-type(1) dd","active","0");
// choice("#optionsBox dl:nth-of-type(2) dd","active","1")
// choice("#optionsBox dl:nth-of-type(3) dd","active","2")
// choice("#optionsBox dl:nth-of-type(4) dd","active","3")


// 选择所有种类
var arr=new Array(4);
var dls=getTags('#optionsBox dl');
dls.forEach(function(it,ind){
    var dds=it.querySelectorAll('dd');
    dds.forEach(function(a,b){
        a.onclick=function(){
            // 对应内容添加到数组
            dds.forEach(function(x){
                x.className="";
            })
            a.className='active';
            arr[ind]=a.textContent;
            selectbox.innerHTML="";
            // 用数组自动生成所选信息
            arr.forEach(function(item,index){
                if(!item)return;
                var divnode=document.createElement('div');
                divnode.innerText=item;
                divnode.className=index;
                var inode=document.createElement('i');
                inode.innerText="X";
                divnode.appendChild(inode);
                selectbox.appendChild(divnode);
                // 改变对应的价格   
                // 删除功能
                inode.onclick=function(){
                    divnode.remove();
                    arr[divnode.className]=null;
                    var u=dls[divnode.className].querySelectorAll('dd');
                    u.forEach(function(x){
                        x.className="";
                    })
                    u[0].className="active";
                    money();
                    changep();  
                }
            console.log(arr);
            money();
            changep();
            })  
        }
    })
})

function money(){
    phone_price=5289;
    var lj=goodData.goodsDetail.crumbData;
    arr.forEach(function(x,y){
        lj[y].data.forEach(function(z){
           if(z.type==x)
           phone_price+=z.changePrice;
           console.log(z.changePrice);
           console.log(phone_price);
        })
    })
}
money();

var price=getTag('.price');
//购物车数量
var plus=getTag('.plus');
var minus=getTag('.minus');
var shopcartNum=getTag('#shopcartNum');
var pprice=getTag('.chooes-con-left i');
// 封装改变的价格
 function changep(){
    var p=phone_price;  
    price.textContent=p*shopcartNum.value;
    pprice.textContent=p*shopcartNum.value;
    final_price=p*shopcartNum.value;
    chooes.forEach(function(item){
        if(getcheck(item).checked)
        final_price+=parseInt(getspan(item));
        setprice.textContent=final_price;
        })   
 }

plus.addEventListener('click',function(){
    shopcartNum.value++;
    changep();
})
var i=0;
minus.addEventListener('click',function(){
    if(shopcartNum.value>1)
    shopcartNum.value--;
    else shopcartNum.value=1;
    console.log(shopcartNum.value);
    changep();
})


// 选择搭配
var chooes=getTags('.chooes-con-left li');
var setprice=getTag('.chooes-con-right span');
//找到搭配的选择
function getcheck(a){
    return a.lastElementChild.firstElementChild;
}
//找到搭配的价格
function getspan(b){
    return b.lastElementChild.lastElementChild.lastElementChild.textContent;
}

var number=getTag('#get-number');
var num=0;
chooes.forEach(function(item){
    final_price=phone_price;
    getcheck(item).addEventListener('change',function(){
        if(getcheck(item).checked){
            final_price+=parseInt(getspan(item));
            num++;
        }
        else{
            final_price-=parseInt(getspan(item));
            num--;
        }
        number.textContent=num;
        setprice.textContent=final_price;
    })   
})

