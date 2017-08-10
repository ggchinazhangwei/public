function getCookie(name) {
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var arr1 = arr[i].split("=");
		if(arr1[0] == name) {
			return arr1[1];
		}
	}

}

function setCookie(name, value, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	document.cookie = name + "=" + value + ";expires=" + oDate;
}

function removeCookie(name) {
	//删除cookie，把生命期设为过期时间
	setCookie(name, 1, -1);
}

function getByClass(cls) {
	if(document.getElementsByClassName) {
		return document.getElementsByClassName(cls);
	} else {
		var aNodes = document.getElementsByTagName("*");
		var newArr = [];
		for(var i = 0; i < aNodes.length; i++) {
			//获取某个标签下class属性的所有的值（类名）
			var aClass = aNodes[i].className;
			//将aClass转换成数组
			var arr = aClass.split(" ");
			//判断数组中是否含有cls
			for(var j = 0; j < arr.length; j++) {
				if(arr[j] === cls) {
					newArr.push(aNodes[i])
				}
			}
		}
		return newArr;
	}
}
//随机数生成
function getRandom(n, m) {
	var sum = 0;
	if(n > m) {
		var temp = n;
		n = m;
		m = temp;
	} else {
		sum = Math.floor(Math.random() * (m - n + 1) + n);
	}
	return sum;
}
//随机色
function getColor() {
	var color = "rgb(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + ")"
	return color;
}
//验证码verification code
function getVerCode() {
	var str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var sum = "";
	for(var j = 0; j < 4; j++) {
		sum = sum + str.substr(parseInt(Math.random() * 36), 1) + "";
	}
	return sum;
}
//获取非行内样式的兼容性
function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, json) { //json对象存的是运动物体（对象）的样式属性和目标值 fn称为回调函数
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true; //看到此定义时，先忽略，具体为什么要定义flag，参考下边的说明
		//px,透明度（注意区分透明度的处理方式，opacity和filter兼容以及取值问题）
		for(var attr in json) { //attr对应的是json对象的属性
			//判断属性中是否有透明度的变化
			if(attr == "opacity") {
				// *100 会有误差 0000007 之类的 所以要用 Math.round() 会四舍五入
				var iCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				//取得运动物体当前的属性值，parseInt()只取值，不带单位（比如px）
				var iCur = parseInt(getStyle(obj, attr));
			}
			//取得运动物体样式的一个终值,即目标值，通过对象取属性值[]的语法来获取，
			var iTarget = json[attr];
			//求缓冲运动的速率
			var iSpeed = (iTarget - iCur) / 8;
			//iSpeed有正负，注意取整问题，正值向上取整，因为运动对象的属性是无限接近目标值，如果向下取整的话，着iSpeed为小数时，直接变成0，没法到达目标值
			//负值向下取整
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			//此时让当前对象相应的属性发生改变，变化的速率就是iSpeed，还要考虑透明度的问题
			if(attr == "opacity") {
				obj.style.opacity = (iCur + iSpeed) / 100;

				obj.style.filter = "alpha(opacity=" + (iCur + iSpeed) + ")";
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
			//正常来讲，当当前值和目标值相等时要清除定时器，但是此时可能设计多个属性值同时发生变化
			//如果其中某一个属性值先达到目标值，直接清除，其他属性值没法再发生变化
			//考虑使用一个公共变量去相应各个属性值的变化 定义一个flag
			//只要没有达到目标值，就让flag值为flase，此时不清除定时器
			if(iCur != iTarget) {
				flag = false;
			}

		}

		//所有都到达了目标值
		if(flag) {
			clearInterval(obj.timer);

		}

	}, 30)
}
//求arr数组中最小值的索引
function getMinIndex(arr) {
	var minValue = Math.min.apply(null, arr);
	var minIndex = arr.indexOf(minValue);
	return minIndex;
}
//求arr数组中最大值的索引
function getMaxIndex(arr) {
	var maxValue = Math.max.apply(null, arr);
	var maxIndex = arr.indexOf(maxValue);
	return maxIndex;
}
