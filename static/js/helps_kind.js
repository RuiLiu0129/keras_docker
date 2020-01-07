function postImg(){
        //执行post请求，识别图片
        jQuery("#billmodeltable").remove();//清空界面识别结果
        imgJson["textAngle"] = document.getElementById("textAngle").checked;//是否自动进行文字方向检测
         if(imgJson['num']==0)
         {   loadingGif('loadingGif');
             imgJson['num']=1;//防止重复提交
          //alert(imgJson["billModel"]);
             imgJson['ocrFlag']=true;
        jQuery.ajax({
            type: "post",
            url: 'kind',
            data:JSON.stringify({"imgString":imgJson["imgString"],
                                    "billModel":imgJson["billModel"],
                                    "textAngle":imgJson["textAngle"],
                                }),
          success:function(d){
              loadingGif('loadingGif');
              imgJson['num']=0;//防止重复提交
              res = JSON.parse(d);
              imgJson["imgString"] = res['imgString'];
              imgJson["kind"] = res['kind'];
              getChildDetail();
              W = imgJson["width"];
              H = imgJson["height"];
              imgJson['ocrFlag']=false;
          }
        });}
        
         }


function loadingGif(loadingGif){
        //加载请求时旋转动态图片
        var imgId=document.getElementById(loadingGif);
        if(imgId.style.display=="block")
        {imgId.style.display="none";}
        else
        {imgId.style.display="block";}}


function resize_im(w,h, scale, max_scale){
    f=parseFloat(scale)/Math.min(h, w);
    if(f*Math.max(h, w)>max_scale){
            f=parseFloat(max_scale)/Math.max(h, w);
    }
    newW = parseInt(w*f);
    newH = parseInt(h*f);
    
    return [newW,newH,f]
}


function FunimgPreview(avatarSlect,avatarPreview,myCanvas) {
                //avatarSlect 上传文件控件
                //avatarPreview 预览图片控件
                jQuery("#"+avatarSlect).change(function () {
                var obj=jQuery("#"+avatarSlect)[0].files[0];
                
                var fr=new FileReader();
                fr.readAsDataURL(obj);
                fr.onload=function () {
                      jQuery("#"+avatarPreview).attr('src',this.result);
                      imgJson.imgString = this.result;
                      var image = new Image();
                      image.onload=function(){
                                      var width = image.width;
                                      var height = image.height;
                                      newWH =resize_im(width,height, 800, 1200);
                                      newW = newWH[0];
                                      newH = newWH[1];
                                      imgRate = newWH[2];
                                      imgJson.width = width;
                                      imgJson.height = height;
                                      jQuery("#"+avatarPreview).attr('width',newW);
                                      jQuery("#"+avatarPreview).attr('height',newH);
                                      jQuery("#"+'myCanvas').attr('width',newW);
                                      jQuery("#"+'myCanvas').attr('height',newH);
                          
                                      /*
                                      if(width>height){
                                      jQuery("#"+avatarPreview).attr('width',1600);
                                      jQuery("#"+avatarPreview).attr('height',800);
                                      jQuery("#"+'myCanvas').attr('width',1600);
                                      jQuery("#"+'myCanvas').attr('height',800);
                                      }
                                      else{
                                          jQuery("#"+avatarPreview).attr('width',600);
                                          jQuery("#"+avatarPreview).attr('height',1000);
                                          jQuery("#"+myCanvas).attr('width',600);
                                          jQuery("#"+myCanvas).attr('height',1000);
                                      }
                                      */
                                      };
                      image.src= this.result;
                      //box = {"xmin":0,"ymin":0,"xmax":jQuery("#"+'myCanvas').width(),"ymax":jQuery("#"+'myCanvas').height()};                         //createNewCanvas(this.result,'myCanvas',box);
                      
                  
                postImg();//提交POST请求
                };//fr.onload
                
                })//jQuery("#"+avatarSlect)
 }
    
function getChildDetail(){
  jQuery("#billmodeltable").remove();
  childResult = imgJson["imgString"];
  createTable(childResult,imgJson['kind']);//新建table
}


  

//根据获取的数据，创建table
  //创建table
function createTable(result,kind){
        //根据获取的数据，创建table
        jQuery("#mytable").empty();
        imgBoxes=[];
        //var jsObject = [{"name":10,"value":20},{"name":10,"value":20}];
        var p = "<h3>种类为:"+kind+" </h3>";
        p += "<tr><td><img height=\"500\" id='billmodeltable' src='data:image/*;base64,"+result+"'> </td></tr>"
        jQuery("#mytable").append(p);
        // jQuery("#mytable").append(tableString);

    
    }
        
 
