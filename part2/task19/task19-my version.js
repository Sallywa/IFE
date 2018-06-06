var input = document.getElementsByTagName('input');
	leftin = input[1];
	rightin = input[2];
	leftout = input[3];
	rightout = input[4];
	bubblesort = input[5];
var container = document.getElementById("container");
var queue = [];

(function(){
	leftin.addEventListener("click",Leftin,false);
	rightin.addEventListener("click",Rightin,false);
	leftout.addEventListener("click",Leftout,false);
	rightout.addEventListener("click",Rightout,false);
	bubblesort.addEventListener("click",Bubblesort,false);
})();

function Leftin(){
	num = Number(input[0].value); 
	if(!is_legal(num)){
		return; 
	};
	queue.unshift(num);
	paint();
};

function Rightin(){
	num = Number(input[0].value); 
	if(!is_legal(num)){
		return; 
	};
	queue.push(num);
	paint();
}

function Leftout(){
	if(!is_legal(num)){
		return; 
	};
	queue.shift();
	paint();
}

function Rightout(){
	if(!is_legal(num)){
		return; 
	};
	queue.pop();
	paint();
}

function Bubblesort(num){
	if(!is_legal(num)){
		return; 
	};
    for(i = 0;i < queue.length - 1;i++){
        for(j = 0;j < queue.length - 1 - i;j++){   
            if(queue[j] > queue[j + 1]){
                var temp = queue[j];
                queue[j] = queue[j + 1];
                queue[j + 1] = temp;
                paint();
            }
        }
    }
};


function deletediv(id){
	if(!is_legal(num)){
		return; 
	};
	queue.splice(id,1);
	paint();
};

function is_legal(num){
	if (num < 10 || num > 100) {
		alert("请输入10-100的数字");
		return false;
	};
	if (queue.length > 60) {
		alert("超过最大容纳数目");
		return false;
	};
	return true;
};

function paint(){
	var text ="";
	for (var i = 0; i < queue.length; i++) {
		text += '<div style="height:' + queue[i] + 'px;"></div>';
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