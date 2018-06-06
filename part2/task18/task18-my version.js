var buttonlist = document.getElementsByTagName('input');
var container = document.getElementById('container');

buttonlist[1].onclick = function(){
	var num = buttonlist[0].value;
	var node = document.createElement("div");
	node.innerHTML = num;
	container.insertBefore(node,container.childNodes[0]);
	myListener(node);
}
buttonlist[2].onclick = function(){
	var num = buttonlist[0].value;
	var node = document.createElement("div");
	node.innerHTML = num;
	container.appendChild(node);
	// myListener(node);
}
buttonlist[3].onclick = function(){
	var node = container.childNodes[0];
	container.removeChild(node);
}
buttonlist[4].onclick = function(){
	var node = container.lastChild;
	container.removeChild(node);
}
function myListener(node){
	node.addEventListener("click",function(i){
		return function(){
			alert("你删除的数是"+ i.innerHTML);
			deletediv(i);
		};
	}(node),false);
}
// function checkdelete(){
// 	for (var i = 0; i < container.childElementCount; i++) {
// 		// container.childNodes[i].removeEventListener("click",deletediv,false)
// 		container.childNodes[i].addEventListener("click",function(i){
// 			return function(){
// 				deletediv(i);
// 			};
// 		}(i),false);
// 		console.log(container.childNodes[i].innerHTML)
// 	}
// }

function deletediv(node){
	container.removeChild(node);
}