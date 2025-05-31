let memoryImg;
let noiseImg;
let fade = 0;
let targetFade = 0;
let autoPlay = true;
let lastMouseX = 0;
let mouseSpeed = 0;

/**
 * 预加载图片资源
 */
function preload() {
  memoryImg = loadImage('./images/memory.jpg');
  noiseImg = loadImage('./images/noise.png');
}

/**
 * 初始化画布设置
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  lastMouseX = mouseX;
}

/**
 * 主绘制循环
 */
function draw() {
  background(0);
  
  // 计算鼠标移动速度
  mouseSpeed = mouseX - lastMouseX;
  lastMouseX = mouseX;
  
  // 根据鼠标位置和移动控制变换
  if (mouseIsPressed || abs(mouseSpeed) > 1) {
    autoPlay = false;
    // 鼠标X位置控制变换进度
    targetFade = map(mouseX, 0, width, 0, 255);
    // 鼠标移动速度影响变换速度
    const speedMultiplier = map(abs(mouseSpeed), 0, 50, 1, 5);
    const direction = mouseSpeed > 0 ? 1 : -1;
    fade += (targetFade - fade) * 0.1 * speedMultiplier;
  } else {
    // 自动播放模式
    if (autoPlay && fade < 255) {
      fade += 0.8;
    }
  }
  
  fade = constrain(fade, 0, 255);
  
  // 绘制记忆图片（透明度随fade减少）
  tint(255, 255 - fade);
  const memoryScale = map(fade, 0, 255, 1, 0.8);
  image(memoryImg, width/2, height/2, 
        memoryImg.width * memoryScale, 
        memoryImg.height * memoryScale);
  
  // 绘制噪声图片（透明度随fade增加）
  tint(255, fade);
  const noiseScale = map(fade, 0, 255, 0.5, 1.2);
  image(noiseImg, width/2, height/2, 
        width * noiseScale, 
        height * noiseScale);
  
  // 重置tint
  noTint();
  
  // 进度指示器
  // drawProgressIndicator();
}

/**
 * 绘制进度指示器
 */
function drawProgressIndicator() {
  const progress = fade / 255;
  const barWidth = width * 0.6;
  const barHeight = 4;
  const barX = (width - barWidth) / 2;
  const barY = height - 50;
  
  // 进度条背景
  fill(255, 100);
  rect(barX, barY, barWidth, barHeight);
  
  // 进度条填充
  fill(255, 200);
  rect(barX, barY, barWidth * progress, barHeight);
  
  // 鼠标控制提示
  fill(255, 150);
  textAlign(CENTER);
  textSize(14);
  // text('移动鼠标控制时间轴 | 按住拖拽精确控制', width/2, barY - 15);
}

/**
 * 鼠标移动事件处理
 */
function mouseMoved() {
  // 鼠标移动时暂停自动播放
  autoPlay = false;
  
  // 根据鼠标位置设置目标fade值
  targetFade = map(mouseX, 0, width, 0, 255);
}

/**
 * 鼠标按下事件处理
 */
function mousePressed() {
  autoPlay = false;
}

/**
 * 鼠标释放事件处理
 */
function mouseReleased() {
  // 延迟恢复自动播放
  setTimeout(() => {
    if (!mouseIsPressed) {
      autoPlay = true;
    }
  }, 2000);
}

/**
 * 键盘事件处理
 */
function keyPressed() {
  if (key === ' ') {
    // 空格键切换自动播放
    autoPlay = !autoPlay;
  } else if (key === 'r' || key === 'R') {
    // R键重置
    fade = 0;
    autoPlay = true;
  }
}

/**
 * 窗口大小改变时重新调整画布
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}