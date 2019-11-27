(function () {
  /**
   * 配置
   */
  var config = {
    divSmall: {//小图显示框
      dom: document.querySelector(".small"),
      width: 430,
      height: 430,
    },
    divBig: {//大图显示框
      dom: document.querySelector(".big"),
      width: 430,
      height: 430,
    },
    divMove: {//镜头移动框
      dom: document.querySelector(".move"),
    },
    imgSmall: {//小图信息
      url: "./img/1x.jpg",
      width: 430,
      height: 430
    },
    imgBig: {//大图信息
      url: "./img/2x.jpg",
      width: 800,
      height: 800,
    },
  }

  computeMoveSize();
  initDivStyle();
  initImg();
  divSmallMouseEvent();
 

  /**
   * 计算move镜头的尺寸
   */
  function computeMoveSize(){
    config.divMove.width = config.divBig.width / config.imgBig.width * config.divSmall.width;
    config.divMove.height = config.divBig.height / config.imgBig.height * config.divSmall.height;
  }

  /**
   * 初始化div显示框样式
   */
  function initDivStyle(){
    config.divSmall.dom.style.width = config.divSmall.width + "px";
    config.divSmall.dom.style.height = config.divSmall.height + "px";
    config.divBig.dom.style.width = config.divBig.width + "px";
    config.divBig.dom.style.height = config.divBig.height + "px";
    config.divMove.dom.style.width = config.divMove.width + "px";
    config.divMove.dom.style.height = config.divMove.height + "px";
  }

  /**
   * 初始化显示框背景图片
   */
  function initImg(){
    config.divSmall.dom.style.backgroundImage = `url(${config.imgSmall.url})`;
    config.divBig.dom.style.backgroundImage = `url(${config.imgBig.url})`;
  }

  /**
   * 小图显示框的鼠标事件
   */
  function divSmallMouseEvent(){
    config.divSmall.dom.onmouseenter = function(e){//鼠标进入
      config.divMove.dom.style.display = "block";//镜头显示
      config.divBig.dom.style.display = "block";//大图显示
    }
    config.divSmall.dom.onmouseleave = function(e){//鼠标离开
      config.divMove.dom.style.display = "none";//镜头隐藏
      config.divBig.dom.style.display = "none";//大图隐藏
    }
    divMoveMouseEvent();//触发镜头事件
  }

  /**
   * move镜头的移动事件
   */
  function divMoveMouseEvent(){
    config.divSmall.dom.onmousemove = function(e){//镜头移动
      var mouseOffset = computeMousePositon(e);//计算鼠标位置
      var moveOffset = computeMovePositon(mouseOffset);//计算镜头位置
      var imgBigOffset = computeImgBigPositon(moveOffset); //计算大图偏移量
      setMovePosition(moveOffset);//更新镜头位置
      setImgBigPosition(imgBigOffset);//更新大图位置
    }
  }

  /**
   * 根据move镜头偏移量，计算大图偏移量
   * @param {*} move 
   */
  function computeImgBigPositon(move){
    return {
      left: move.left / config.imgSmall.width * config.imgBig.width,
      top: move.top / config.imgSmall.height * config.imgBig.height
    }
  }

  /**
   * 根据鼠标位置，计算move镜头位置
   * @param {*} mouse 
   */
  function computeMovePositon(mouse){
    var left = mouse.x - config.divMove.width/2;//镜头左偏移量
    var top = mouse.y - config.divMove.height/2;//镜头右偏移量
    if(left < 0){//左边界
      left = 0
    }
    if(top < 0){//上边界
      top = 0
    }
    if(left > config.divSmall.width - config.divMove.width){//右边界
      left = config.divSmall.width - config.divMove.width
    }
    if(top > config.divSmall.height - config.divMove.height){//下边界
      top = config.divSmall.height - config.divMove.height
    }
    return {//镜头位置
      left,
      top
    }
  }

  /**
   * 根据事件源，计算鼠标位置
   * @param {MouseEvent} e 
   */
  function computeMousePositon(e){
    var moveOffset = getMovePosition();//获取镜头位置
    if(e.target === config.divSmall.dom){//在小图显示框中鼠标的位置
      return {
        x: e.offsetX,
        y: e.offsetY
      }
    }else{//在镜头显示框中鼠标的位置
      return {
        x: e.offsetX + moveOffset.left,
        y: e.offsetY + moveOffset.top
      }
    }
  }

  /**
   * 获取move镜头的最新位置
   */
  function getMovePosition(){
    config.divMove.left = parseFloat(getComputedStyle(config.divMove.dom).left);
    config.divMove.top = parseFloat(getComputedStyle(config.divMove.dom).top);
    return {
      left: config.divMove.left,
      top: config.divMove.top
    }
  }

  /**
   * 更新move镜头的偏移量
   */
  function setMovePosition(move){
    config.divMove.left = move.left;
    config.divMove.top = move.top;
    config.divMove.dom.style.left = move.left + "px";
    config.divMove.dom.style.top = move.top + "px";
  }

  /**
   * 更新大图偏移量
   * @param {*} img 
   */
  function setImgBigPosition(img){
    config.imgBig.left = img.left;
    config.imgBig.top = img.top;
    config.divBig.dom.style.backgroundPosition = `-${img.left}px -${img.top}px`;
  }
}())