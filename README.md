# plugin
the plugin i create

## jquery.process.js
#### 特征：
1. 该插件仅使用在与后台交互的进程，主要是通过用jq来控制箭头样式。对于列表不适用，因为我没有为li绑定时间。

#### 使用说明：
+ 显示当前进度，添加 `.current` 类
+ 增加步骤，插入如下代码段。
``` html
	<li class="step normal-step">
    	<span>步骤名称</span>
    	<span class="arrow right-arrow"></span><span class="arrow right-white-arrow"></span>
	</li>
```

#### 例子：
``` html
<!-- HTML部分: -->
<div class="progress-status">
    <ol class="clearfix">
        <li class="step first-step">
            <span>1. Confirm</span>
            <span class="arrow right-arrow"></span><span class="arrow right-white-arrow"></span>
        </li>
        <li class="step normal-step">
            <span>2. Reset Password</span>
            <span class="arrow right-arrow"></span><span class="arrow right-white-arrow"></span>
        </li>
        <!--增加步骤 start-->
        <li class="step normal-step">
            <span>3. Reset Password</span>
            <span class="arrow right-arrow"></span><span class="arrow right-white-arrow"></span>
        </li>
        <!--增加步骤 end-->
        <li class="step final-step current">
            <span>4. Finished</span>
        </li>
    </ol>
</div>
```
``` css
/* css部分 */
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1; /*For IE 6&7 only*/
}

.progress-status .current {
    background: #f6891c;
    color: #ffffff;
}

.progress-status .step {
    padding: 5px 0;
    text-indent: -2%;
    border: 1px solid #f6891c;
    border-left: 0;
    border-right: 0;
    position: relative;
}

.progress-status .first-step {
    border-left: 1px solid #f6891c;
    border-radius: 4px 0 0 4px;
}

.progress-status .final-step {
    border-right: 1px solid #f6891c;
    border-radius: 0 4px 4px 0;
}

.progress-status ol {
    list-style: none;
    padding: 0;
    text-align: center;
}

.progress-status ol li {
    display: block;
    float: left;
    width: 33.33%;
}
/* arrow公共样式 */
.arrow {
    position: absolute;
    top: 0;
    border-style: solid;
    border-width: 15px;
    height: 0;
    width: 0;
    font-size: 0;
    _filter: chroma(color=tomato);
}
/* 产生左边三色箭头 */
.left-mix-arrow {
    left: -20px;
    border-color: #f6891c #f6891c #f6891c transparent;
    _border-color: #f6891c #f6891c #f6891c tomato;  
}

/* 产生白色三边，作用时遮罩层 */
.right-mix-arrow {
    right: -10px;
    border-color: #ffffff #ffffff #ffffff transparent;
    _border-color: #ffffff #ffffff #ffffff tomato;
}

/* 产生有色箭头 */
.right-arrow {
    right: -10px;
    border-color: transparent transparent transparent #f6891c;
    _border-color: tomato tomato tomato #f6891c;
}
/* 产生白色三边箭头  配合 .right-arrow 类产生 1px箭头 */
.right-white-arrow {
    right: -9px;
    border-color: transparent transparent transparent #ffffff;
    _border-color: tomato tomato tomato #ffffff;
}
```
``` jq
<!-- jq部分 -->
(function ($) {
    $.fn.process = function () {
        return this.each(function (index, element) {
            var normalArrow = '<span class="arrow right-arrow"></span><span class="arrow right-white-arrow"></span>';
            var leftMixArrow = '<span class="arrow left-mix-arrow"></span>';
            var rightMixArrow = '<span class="arrow right-mix-arrow"></span>';

            var $allStep = $('.progress-status').find('ol > li');
            var $stepLength = $allStep.length;
            var $stepWidth = Math.round(1/$stepLength * 10000) / 100.00 + "%";
            console.log($stepWidth);
            if ($stepLength !== 3) {
                $allStep.each(function(index, el) {
                    $(this).css('width', $stepWidth);
                });
            }
            $allStep.each(function(){
                $this = $(this);
                if ($this.hasClass('current')) {
                    $this.find('.arrow').remove();
                    if ($this.hasClass('first-step')) {
                        $this.append(rightMixArrow);
                    }
                    else if ($this.hasClass('normal-step')) {
                        $this.prev().find('.arrow').remove();
                        $this.find('.arrow').remove();
                        $this.append(leftMixArrow + rightMixArrow);
                    }
                    else {
                        $this.prev().find('.arrow').remove();
                        $this.append(leftMixArrow);
                    }
                }
           });
        });
    };
})(jQuery);
```
