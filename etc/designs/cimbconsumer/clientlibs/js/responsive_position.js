/* handle ".responsive-position" - THIS FUNCTION IS EXPERIMENTAL */
$.fn.responsivePosition = function () {
  var this_element = this;

  if ($(window).width () >= 768)
  {
    var this_first = $(this_element).find ('.responsive-pos.md-first').first ();
    $(this_first).prependTo ($(this_element));
  }

  if ($(window).width () < 768)
  {
    var this_first = $(this_element).find ('.responsive-pos.xs-first').first ();
    $(this_first).prependTo ($(this_element));
  }
};

function _apply_responsivePosition ()
{
  $('.responsive-pos-wrapper').each (function (index, item) {
    $(item).responsivePosition ();
  });
}

/* document ready functions */
$(document).ready (function () {
  _apply_responsivePosition ();
});

/* AJAX complete functions */
$(document).ajaxComplete (function () {
  _apply_responsivePosition ();
});

/* window resize functions */
$(window).resize (function () {
  if ($('input:focus').length == 0)
  {
    _apply_responsivePosition ();
  }
});