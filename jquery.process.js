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
