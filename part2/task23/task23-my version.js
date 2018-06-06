var div1 = document.getElementsByClassName('root');
var queue = [];
var BFindex = 0;

document.getElementById('DFS遍历').addEventListener('click',function(){
	queue = [];
	DFStranverse(div1[0]);
	show();
},false);
document.getElementById('BFS遍历').addEventListener('click',function(){
	queue = [];
	BFStranverse(div1[0]);
	show();
},false);
document.getElementById('DFS搜索').addEventListener('click',function(){
	queue = [];
	DFStranverse(div1[0]);
	show(document.getElementById("value").value.trim());
},false);
document.getElementById('BFS搜索').addEventListener('click',function(){
	queue = [];
	BFStranverse(div1[0]);
	show(document.getElementById("value").value.trim());
},false);

function DFStranverse(node){
	if (node != null) {
		queue.push(node);
		for (var i = 0; i < node.children.length; i++) {
			DFStranverse(node.children[i]);
		};
	};
}; 
 
function BFStranverse(node){
	if (node) {
		queue.push(node);
		BFStranverse(node.nextElementSibling);
		node = queue[BFindex++];
		BFStranverse(node.firstElementChild);
	}
		
};


function show(value){ //settimeinterval里面不能放异步语句for等
	queue[0].style.background = 'pink';
	if (queue[0].firstChild.data.trim() === value) {
		return;
	};
	var i = 0;
	timer = setInterval(function(){
		i++;
		if (queue[i].firstChild.data.trim() === value) {
			queue[i - 1].style.background = 'white';
			queue[i].style.background = 'pink';
			return;
		}
		if (i < queue.length) {
			queue[i - 1].style.background = 'white';
			queue[i].style.background = 'pink';
		}
		else{
			clearInterval(timer);
	      	queue[queue.length - 1].style.background = 'white';}
	},500)
};
