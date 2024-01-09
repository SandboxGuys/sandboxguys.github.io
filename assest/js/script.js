var canScroll = true,
scrollController = null;
$(this).on('mousewheel DOMMouseScroll', function(e){

if (!($('.outer-nav').hasClass('is-vis'))) {

var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

if (delta > 50 && canScroll) {
  canScroll = false;
  clearTimeout(scrollController);
  scrollController = setTimeout(function(){
    canScroll = true;
  }, 500);
  updateHelper(1);
}
else if (delta < -50 && canScroll) {
  canScroll = false;
  clearTimeout(scrollController);
  scrollController = setTimeout(function(){
    canScroll = true;
  }, 500);
  updateHelper(-1);
}

}

});




function updateHelper(param) {

    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if ( param.keyCode === 40 || param > 0) 
    {
        if (curPos !== lastItem)
        {
            nextPos = curPos + 1; 
            updateNavs(nextPos);
            updateContent(nextPos);

        }
        else 
        {
            updateNavs(nextPos);
            updateContent(nextPos);

        }
    }
    else if ( param.keyCode === 38 || param < 0)  
    {
        if (curPos !== 0)
        {
            nextPos = curPos - 1;
            updateNavs(nextPos);
            updateContent(nextPos);

        }
        else 
        {
            nextPos = lastItem;
            updateNavs(nextPos);
            updateContent(nextPos);
        }
    }
}


function updateNavs(nextPos) {

    $('.side-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
}

function updateContent(nextPos) {

    $('.main').children().removeClass('active');
    $('.main').children().eq(nextPos).addClass('active');
            
}



$('.side-nav li').click(function()
{
    if (!($(this).hasClass('is-active'))) 
    {

      var $this = $(this),
        next = $this.parent().children().index($this);

      updateNavs(next);
      updateContent(next);
    }
});


$(document).keyup(function(e){

    if (!($('.outer-nav').hasClass('is-vis'))) {
      e.preventDefault();
      updateHelper(e);
    }

  });