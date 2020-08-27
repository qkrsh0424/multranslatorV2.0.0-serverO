
var rangeSlider = function(){
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');
      
    slider.each(function(){
  
      value.each(function(){
        var value = $(this).prev().attr('value');
        $(this).html(value);
      });
  
      range.on('input', function(){
        //   console.log(this.value)
        $(this).next(value).html(this.value);
        $(".Mtl-textarea").css("font-size",`${this.value}px`);
        $(".Mtl-Target-Textarea").css("font-size",`${this.value}px`);
      });
    });
  };
  
  rangeSlider();