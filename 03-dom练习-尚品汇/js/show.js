var sw=goodData.goodsDetail;
getTag('.product-title').textContent=sw.title;
getTag('.product-message').textContent=sw.recommend;
getTag('.price').textContent=sw.price;
getTag('.p-content').textContent=sw.promoteSales.content;
getTag('.tag').textContent=sw.promoteSales.type;
getTag('.support').textContent=sw.support;
getTag('.address').textContent=sw.address;
getTag('.comment span').textContent=sw.evaluateNum;

var swData=goodData.goodsDetail.crumbData;
swData.forEach(function(items){
    var dl=document.createElement('dl');
    var dt=document.createElement('dt');
    dt.textContent=items.title;
    dl.appendChild(dt);
    items.data.forEach(function(item,index){
        var dd=document.createElement('dd');
        dd.textContent=item.type;
        if(index==0)dd.className='active';
        dd.money=item.changePrice;
        dl.appendChild(dd);
    })
    getTag('#optionsBox').appendChild(dl);
})