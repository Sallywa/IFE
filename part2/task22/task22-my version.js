var div1 = document.getElementsByClassName('div1');
var div2 = document.getElementsByClassName('div2');
var div3 = document.getElementsByClassName('div3');
var div4 = document.getElementsByClassName('div4');
var queue = [];

document.getElementById('前序').addEventListener('click',function(){
	queue = [];
	preorder(div1[0]);
	show();
},false);
document.getElementById('中序').addEventListener('click',function(){
	queue = [];
	inorder(div1[0]);
	show();
},false);
document.getElementById('后序').addEventListener('click',function(){
	queue = [];
	postorder(div1[0]);
	show();
},false);

function preorder(node){
	if (node != null) {
		queue.push(node);
		preorder(node.children[0]);
		preorder(node.children[1]);
	}
}; 
function inorder(node){
	if (node != null) {
		inorder(node.children[0]);
		queue.push(node);
		inorder(node.children[1]);
	}
}; 
function postorder(node){
	if (node != null) {
		postorder(node.children[0]);
		postorder(node.children[1]);
		queue.push(node);
	}
}; 

function show(){ //settimeinterval里面不能放异步语句for等
	queue[0].style.background = 'pink';
	var i = 0;
	timer = setInterval(function(){
		i++;
		if (i < queue.length) {
			queue[i - 1].style.background = 'white';
			queue[i].style.background = 'pink';
		}
		else{
			clearInterval(timer);
	      	queue[queue.length - 1].style.background = 'white';}
	},500)
};
