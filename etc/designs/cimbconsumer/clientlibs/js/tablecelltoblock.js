/* responsive table cells to blocks */
$.fn.tableHeadBody = function ()
{
  var table = this;
  /* provide <thead> if has tr th */
  if ($(table).find ('thead').length == 0)
  {
    var new_thead = $('<thead></thead>');
    $(table).find ('tr').each (function (index, tr) {
      if ($(tr).find ('th').length > 0)
      {
        $(tr).appendTo ($(new_thead));
      }
    });

    if ($(new_thead).children ().length > 0)
    {
      $(new_thead).prependTo ($(table));
    }
  }

  /* wrap tr's in <tbody> but this is already done by default in most browsers */
  if ($(table).find ('tbody').length == 0)
  {
    /* but don't bother if the table is without any tr's */
    if ($(table).find ('tr').length > 0)
    {
      var new_tbody = $('<tbody></tbody>');
      $(table).find ('tr').each (function (index, tr) {
        /* ignore th's -- we are doing the body data here */
        if ($(tr).find ('th').length == 0)
        {
          $(tr).appendTo ($(new_tbody));
        }
      });
      $(new_tbody).appendTo ($(table));
    }
  }

  return table;
}

function _tableToArray (table)
{
  var data = [];
  table.find ('tr').each (function (rowIndex, r) 
  {
    var cols = [];
    $(this).find ('th, td').each (function (colIndex, c) 
    {
      if (parseInt ($(c).attr ('colspan')) > 1)
      {
        for (var i = 0; i < parseInt ($(c).attr ('colspan')); i++)
        {
          cols.push ($(c).html ());
        }
      }
      else
      {
        cols.push ($(c).html ());
      }
    });

    data.push (cols);
  });

  return data;
}

$.fn.tableCellToBlock = function (options) {
  var table = this;
  var table_data = _tableToArray (table);
  var outables = Array ();

  var settings = $.extend ({
    exclude_class: "table-th-to-block",
  }, options);

  $(table).tableHeadBody ();

  if ($(table).find ('thead').length == 1)
  {
    $(table_data[0]).each (function (trindex, trcol) {

      var new_table = $('<table>');
      $(new_table).addClass ($(table).attr ('class'));
      $(new_table).removeClass (settings.exclude_class);
      $(new_table).addClass ("-th-block-");

      /* attach the head first */
      var new_thead = $('<thead>');
      var new_th = $('<th>');
      $(new_th).html (trcol);
      $(new_th).appendTo ($(new_thead));
      $(new_thead).appendTo ($(new_table));

      for (var i = 1; i < table_data.length; i++)
      {
        var new_tr = $('<tr>');
        var new_td = $('<td>');
        $(new_td).html (table_data[i][trindex]);
        $(new_td).appendTo ($(new_tr));
        $(new_tr).appendTo ($(new_table));
      }

      outables.push ($(new_table));
    });

    /* reverse order .after each table */
    for (var i = outables.length - 1; i >= 0; i--)
    {
      $(table).after ($(outables[i]));
    }

  }

  $(table).addClass ("-has-th-block-");
};

function _apply_table_th_to_blocks ()
{
  $('.table-th-to-block').filter (':not(.-has-th-block-)').each (function (index, item) {
    $(item).tableCellToBlock ();
  });
}

$(document).ready (function () {
  _apply_table_th_to_blocks ();
});

$(document).ajaxComplete (function () {
  _apply_table_th_to_blocks ();
});