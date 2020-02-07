//播放暂停按钮
var playBtn = document.querySelector('.playNode'),
	playBln = true,
	//音量按钮
	volumeNode = document.querySelector('.volumeNode'),
	volumeBln = true,
	//进度条
	trueLine = document.querySelector('.trueLine'),
	//进度条外层的元素
	progressNode = document.querySelector('.progressNode'),
	outerNode = document.querySelector('.outerNode'),
	//选择封面背景
	topNode = document.querySelector('.topNode'),
	//下一首歌按钮
	nextNode = document.querySelector('.nextNode'),
	//上一首歌按钮
	lastNode = document.querySelector('.lastNode'),
	//音乐名称
	musicName = document.querySelector('.musicName');
//创建audio对象
var myAudio = new Audio();
//给audio对象添加 src
//所有的数据存在数组里面
let allMusic = [{
	'musicSrc':'music/mus/AcousticGuitar1.mp3',
	'musicPic':'music/pic/fmt01.jpg',
	'musicName':'AcousticGuitar1'
},{
	'musicSrc':'music/mus/AmazingGrace.mp3',
	'musicPic':'music/pic/fmt02.png',
	'musicName':'AmazingGrace'
},{
	'musicSrc':'music/mus/FeelsGood2B.mp3',
	'musicPic':'music/pic/fmt03.jpg',
	'musicName':'FeelsGood2B'
},{
	'musicSrc':'music/mus/FunBusyIntro.mp3',
	'musicPic':'music/pic/fmt04.jpg',
	'musicName':'FunBusyIntro'
},{
	'musicSrc':'music/mus/GreenDaze.mp3',
	'musicPic':'music/pic/fmt05.jpg',
	'musicName':'GreenDaze'
},{
	'musicSrc':'music/mus/Limosine.mp3',
	'musicPic':'music/pic/fmt06.jpg',
	'musicName':'Limosine'
}],Index = 0;
myAudio.src = allMusic[Index].musicSrc;
//给封面赋值
topNode.style.backgroundImage = 'url('+allMusic[Index].musicPic+')';
//音乐名称
musicName.innerHTML = allMusic[Index].musicName;
//下一首歌的事件
nextNode.onclick = function () {
	Index ++;
	if (Index == allMusic.length) {
		Index = 0;
	}
	musicPlayFn();
};
//封装函数音乐上一首下一首
function musicPlayFn() {
	myAudio.src = allMusic[Index].musicSrc;
	myAudio.currentTime = 0;
	trueLine.style.width = '0%';
	if (playBln == false) {
		myAudio.play();
	}else{
		myAudio.pause();
	}
	//给封面赋值
	topNode.style.backgroundImage = 'url('+allMusic[Index].musicPic+')';
	//音乐名称
	musicName.innerHTML = allMusic[Index].musicName;
}
//下一首歌的事件
lastNode.onclick = function () {
	Index --;
	if (Index == -1) {
		Index = allMusic.length -1;
	}
	musicPlayFn();
}

playBtn.onclick = function () {
	playBln = !playBln;
	if (playBln == false) {
		myAudio.play();
	}else{
		myAudio.pause();
	}
}
volumeNode.onclick = function () {
	volumeBln = !volumeBln;
	if (volumeBln == false) {
		myAudio.volume = 0;
		this.className = 'no_volumeNode';
	}else{
		myAudio.volume = 1;
		this.className = 'volumeNode';
	}
}
//播放时 进度条的长度控制计算
myAudio.addEventListener('timeupdate',function () {
	trueLine.style.width = myAudio.currentTime / myAudio.duration *  99 +'%';
})
//点击progressNode元素，让进度条直接到达点击位置
progressNode.onclick = function (e) {
	var ev = e || event;
	//console.log(ev.clientX - (this.offsetLeft + outerNode.offsetLeft));
	//算法：算出 点击的位置 在 外层进度条的 多少像素
	myAudio.currentTime = myAudio.duration * 
	((ev.clientX - (this.offsetLeft + outerNode.offsetLeft)) / this.offsetWidth);
	trueLine.style.width = ((ev.clientX - (this.offsetLeft + outerNode.offsetLeft)) / this.offsetWidth) * 100 + '%';
}