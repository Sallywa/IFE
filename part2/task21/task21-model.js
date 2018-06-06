/**
* 创建一个可复用的对象给tag以及hobby
* @param {String} - input 输入框的id
* @param {String} - output 输出框的class名
* @param {String} - button 按钮的id，可选，如果不选则默认触发键盘事件
*/

var createTag = (function() {
  // 创建类
  function _tag(input, output, button) {//this指针指向_tag
    // 私有变量
    var number;
    // 特权方法
    this.getNumber = function() {
      return number;
    };
    // this.setNumber = function(newNumber) {
    //   number = newNumber;
    // };
    // 公有属性
    this.input = document.getElementById(input);
    this.output = document.getElementsByClassName(output)[0];
    this.button = document.getElementById(button);
    // 特权方法
    this.getData = function() {
      switch (input) {
        case 'tag':
          var value = this.input.value.match(/(^[^,\， ]*)/)[0];//将输入以分隔符分为两部分，第一部分为输入值，第二部分为分割符逗号，空格等
          break;
        case 'hobby':
        default:
          var value = this.input.value.trim().split(/,|，|、|\s|\n|\r|\t/);
      }
      return value;
    };
    this.render = function(value) {
      if (value === '' || value === ',' || value === '，') {//输入为空格，‘，’，‘， ’的时候立即去掉，恢复一开始的输入状态
        return ;
      }
      var wrap = document.createElement('div');
      wrap.textContent = value;
      this.output.appendChild(wrap);
      number ++;
    };

     this.repeatData = function(data) {
      for (var i = 0; i < this.output.children.length; i++) {
        if (this.output.children[i].textContent.localeCompare(data) === 0) {
          // this.input.value = '';
          // this.setNumber(this.output.children.length);//多余的代码
          return true;
        }
      }
    };

    this.delData = function(ele) {
      this.output.removeChild(ele);
      // this.setNumber(this.output.children.length);
    };

    this.init = function(type) {
      var self = this;
      this.output.addEventListener('mouseover',function(event) {//这里用this来添加监听器，当触发事件的时候this的指向就变了
       event.target.textContent = '删除：' + event.target.textContent;
      });
      this.output.addEventListener('mouseout',function(event) {
        event.target.textContent = event.target.textContent.replace(/删除：/,'');//要用正则表达式
      });
      this.output.addEventListener('click', function(event) {
        self.delData(event.target);//注意！！注意！！这里用的是target，即事件的目标对象，不必一个个为子节点添加监听了//delData是
      });                         //是_tag里面的函数，在一第一遍的执行的时候this始终指向_tag，在我们添加了tag之后点击删除会导致this
      switch (type) {      //不再指向_tag而是指向div.container了，所以这里要使用self
        case 'keyEvent':
        document.addEventListener('keyup',function(event) {
          if (/(,| |\，)$/.test(self.input.value) || event.keyCode===13) {//翻译：当输入中有逗号空格或者回车的时候，blabla，keycode 13 = Enter
            self.repeatData(self.getData().trim()) || self.render(self.getData().trim());
            self.input.value = '';
            if (self.getNumber() > 10) {
              self.delData(self.output.firstChild);
            }
          }
        });
        break;
        case 'buttonEvent':
        self.button.addEventListener('click',function() {
          for (var i = 0; i < self.getData().length; i++) {
            self.repeatData(self.getData()[i]) || self.render(self.getData()[i]);
            if (self.getNumber() > 10) {
              self.delData(self.output.firstChild);
            }
          }
          self.input.value = '';
        });
        break;
      }
    };
    // 构造器
    // this.setNumber(0);
    // 初始化
    this.button ? this.init('buttonEvent') : this.init('keyEvent');
  };
  
  /** 
   * 构造原型方法，也是公有方法
   */
  
  _tag.prototype = {
    
    /**
     * 检测输入数据是否有重复
     * @param {String} - data 输入的数据
     * @return {Boolean} - 数据是否重复
     */
    
    // repeatData: function(data) {
    //   for (var i = 0; i < this.output.children.length; i++) {
    //     if (this.output.children[i].textContent.localeCompare(data) === 0) {
    //       // this.input.value = '';
    //       // this.setNumber(this.output.children.length);//多余的代码
    //       return true;
    //     }
    //   }
    // },
    
    /**
     * 删除特定的数据
     * @param {HTMLDOMElement} - ele 被删除的元素
     */
    
    // delData: function(ele) {
    //   this.output.removeChild(ele);
    //   // this.setNumber(this.output.children.length);
    // },
    
    /**
     * 初始化
     * @param {String} - type 判断是用否需要按钮选择不同的初始化方式
     */
    
    // init: function(type) {
    //   var self = this;
    //   this.output.addEventListener('mouseover',function(event) {//这里用this来添加监听器，当触发事件的时候this的指向就变了
    //    event.target.textContent = '删除：' + event.target.textContent;
    //   });
    //   this.output.addEventListener('mouseout',function(event) {
    //     event.target.textContent = event.target.textContent.replace(/删除：/,'');//要用正则表达式
    //   });
    //   this.output.addEventListener('click', function(event) {
    //     self.delData(event.target);//注意！！注意！！这里用的是target，即事件的目标对象，不必一个个为子节点添加监听了//delData是
    //   });                         //是_tag里面的函数，在一第一遍的执行的时候this始终指向_tag，在我们添加了tag之后点击删除会导致this
    //   switch (type) {      //不再指向_tag而是指向div.container了，所以这里要使用self
    //     case 'keyEvent':
    //     document.addEventListener('keyup',function(event) {
    //       if (/(,| |\，)$/.test(self.input.value) || event.keyCode===13) {//翻译：当输入中有逗号空格或者回车的时候，blabla，keycode 13 = Enter
    //         self.repeatData(self.getData().trim()) || self.render(self.getData().trim());
    //         self.input.value = '';
    //         if (self.getNumber() > 10) {
    //           self.delData(self.output.firstChild);
    //         }
    //       }
    //     });
    //     break;
    //     case 'buttonEvent':
    //     self.button.addEventListener('click',function() {
    //       for (var i = 0; i < self.getData().length; i++) {
    //         self.repeatData(self.getData()[i]) || self.render(self.getData()[i]);
    //         if (self.getNumber() > 10) {
    //           self.delData(self.output.firstChild);
    //         }
    //       }
    //       self.input.value = '';
    //     });
    //     break;
    //   }
    // }
  };
  // 返回类
  return _tag;
})();

/**
* 实例化tag和hobby
*/
var tag = new createTag('tag','tagContainer');
var hobby = new createTag('hobby','hobbyContainer', 'confirm');
