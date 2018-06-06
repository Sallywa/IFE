var createTag = (function(){
		var tag = function(input, output, button){
		this.input = document.getElementById(input);
		this.output = document.getElementsByClassName(output)[0];
		this.button = document.getElementById(button);
		this.number = 0;

		this.getdata = function(value){
			switch(value){
				case 'tag':
					 var value = this.input.value.match(/(^[^,\， ]*)/)[0];
					 break;
				case 'hobby':
					var value = this.input.value.trim().split(/,|，|、|\s|\n|\r|\t/);
			}
			return value;
		};

		this.repeatdata = function(value){
			for (var i = 0; i < this.output.length; i++) {
				if(this.output.childnodes[i] === value ){
					return true;
				};
			};
			return false;
		};

		this.renderdata = function(value){
			if (value === '' || value === ',' || value === '.'|| value === ', ') {
				return;
			};
			var node = document.createElement("div");
			node.innerHTML = value;
			this.output.appendChild(node);
			this.number++;
		};

		this.deldata = function(node){
			this.output.removeChild(node);
		};

		this.initdata = function(type){
			self = this;
			this.output.addEventListener('mouseover',function(event){
				event.target.innerHTML = '删除：' + event.target.innerHTML,false
			});
			this.output.addEventListener('mouseout',function(event){
				event.target.innerHTML = event.target.innerHTML.replace(/删除：/,''),false
			});
			this.output.addEventListener('click',function(event){
				self.deldata(event.target)
			});
			switch (type){
				case 'tag':
				document.addEventListener('keyup',function(){
					self.repeatdata(self.getdata('tag')) || self.renderdata(self.getdata('tag'));
					if (self.number >= 10) {
						self.deldata(self.output.firstChild);
					}
				},false);
				break;
				case 'hobby':
				this.button.addEventListener('click',function(){
					for (var i = 0; i < self.getdata().length; i++) {
						self.repeatdata(self.getdata()[i]) || self.render(self.getdata()[i]);
						if (self.number >= 10) {
						self.deldata(self.output.firstChild);
						}
					}
				},false);
				break;
			}
		};
		this.button?this.initdata('hobby'):this.initdata('tag');
	};
	return tag;
})();
var tag = new createTag('tag','tagContainer');
var hobby = new createTag('hobby','hobbyContainer', 'confirm');
