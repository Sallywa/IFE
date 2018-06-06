var text = document.getElementById("text");
var input = document.getElementsByTagName('input');
	leftin = input[0];
	rightin = input[1];
	leftout = input[2];
	rightout = input[3];
	search = input[4];
	searchbtn = input[5];
var container = document.getElementById("container");
var queue = [];
var highlight = [];

(function(){
	searchbtn.addEventListener("click",Search,false);
	leftin.addEventListener("click",Leftin,false);
	rightin.addEventListener("click",Rightin,false);
	leftout.addEventListener("click",Leftout,false);
	rightout.addEventListener("click",Rightout,false);
})();

function Search(){
	var key = search.value;
	highlight = [];
	for (var i = 0; i < queue.length; i++) {
		if (Match(key,queue[i])) {
			highlight.push(i);
		};
	};
	if (highlight.length == 0) {
		alert("没有匹配项");
	}
	else{
		highlight_paint();
	}
};

function Match(key,content){
	var text = new RegExp(key);
	if (content.match(text)) {
		return true;
	};
	return false;
};

function highlight_paint(){
	var text ="";
	for (var i = queue.length - 1; i >= 0; i--) {
		if (isinarr(i)) {
			text += '<div class="highlight">'+ queue[i] + '</div>';
		}
		else{
			text += '<div>'+ queue[i] + '</div>';
		}
	};
	container.innerHTML = text;
	for (var i = 0; i < container.childElementCount; i++) {
		container.childNodes[i].addEventListener("click",function(node){
		return function(){
			deletediv(node);
		};
	}(i),false)
	};
};

function isinarr(num){
	for (var i = 0; i < highlight.length; i++) {
		if(num == highlight[i]){
			return true;
		}
	};
	return false;
};

function Leftin(){
	var num = dealInput(text.value); 
	if (num.length == 0) {
		alert("请输入任何字符");
	}
	for (var i = 0; i < num.length; i++) {
		queue.unshift(num[i]);
	}
	paint();
};

function Rightin(){
	var num = dealInput(text.value); 
	if (num.length == 0) {
		alert("请输入任何字符");
	}
	for (var i = 0; i < num.length; i++) {
		queue.push(num[i]);
	}
	paint();
};


function Leftout(){
	if (queue.length == 0) {
		alert("队列已为空");
	}
	else{
		queue.shift();
		paint();
	}
};

function Rightout(){
	if (queue.length == 0) {
		alert("队列已为空");
	}
	else{
		queue.pop();
		paint();
	}
};


function deletediv(id){
	queue.splice(queue.length-1-id,1);
	paint();
};



function dealInput(input) {
  var arr = input.split(/[^\u4e00-\u9fa5\w]+/g).filter(function(e) {
    return e.length !== 0; });
  return arr;
}

function paint(){
	var text ="";
	for (var i = queue.length - 1; i >= 0; i--) {
		text += '<div>'+ queue[i] + '</div>';
	};
	container.innerHTML = text;
	for (var i = 0; i < container.childElementCount; i++) {
		container.childNodes[i].addEventListener("click",function(node){
		return function(){
			deletediv(node);
		};
	}(i),false)
	};
};