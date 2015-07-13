(function ($) {
    $.fn.checkboxSelect = function () {
        return this.each(function (index, element) {
            var $this = $(this);
            var $allSelectItems = $this.find('.select');

            $allSelectItems.on('change', function(){
                var $thisItemState = $(this).prop("checked");
                if ($thisItemState === false) {
                    $('.all-select').prop("checked", false);
                }
            });

            $this.find('.all-select').on('change', function() {
                var $this = $(this);
                var $allSelectState = $this.prop("checked");

                if ($allSelectState === true) {
                    $allSelectItems.each(function(index, el) {
                        $(this).prop("checked", true);
                    });
                }
                else {
                    $allSelectItems.each(function(index, el) {
                        $(this).prop("checked", false);
                    });
                }
            });
        });
    };
})(jQuery);
