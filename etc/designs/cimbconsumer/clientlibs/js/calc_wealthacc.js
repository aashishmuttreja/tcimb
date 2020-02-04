/* Wealth Accumulation Calculator function */

$.fn.calcWealthAccWireUp = function (options)
{
  var element = this;
  var settings = $.extend ({}, options);

  var form_calculate = $(element).find ('.calculator-item');
  var result_calculate = $(element).find ('.calculated-result');
  var btn_calculate = $(element).find ('.calculator-calculate-button');

  var input_desired_amount = $(element).find ('.input-accmt-desired');
  var input_accmt_period = $(element).find ('.input-accmt-period');

  var input_returnrate = $(element).find ('.input-exp-returnrate');
  var input_inflaterate = $(element).find ('.input-exp-inflate');

  var input_delayear = $(element).find ('.input-delay-year');

  var output_lump = $(element).find ('.calc-result.output-lump-amount');
  var output_monthly = $(element).find ('.calc-result.output-monthly-amount');

  var output_lump_need_delay = $(element).find ('.label-summary-delay.output-lumpsum');
  var output_month_need_delay = $(element).find ('.label-summary-delay.output-monthsum');

  var lump;
  var monthly;
  var delay_lump;
  var delay_month;

  var retrate;

  var delayear_timeout;

  function get_returnrate ()
  {
    var returnrate = $(input_returnrate).val ();
    var inflaterate = $(input_inflaterate).val ();
    return returnrate - inflaterate;
  }

  function get_ffv ()
  {
    var accmt_period = $(input_accmt_period).val ();
    return FV (retrate, accmt_period, 0, -1);
  }

  function get_lump ()
  {
    var accmt_period = $(input_accmt_period).val ();
    var desired_lump = $(input_desired_amount).val ();
    return PV (retrate, accmt_period, 0, desired_lump) * -1;
  }

  function get_monthly ()
  {
    var accmt_period = $(input_accmt_period).val ();
    var desired_lump = $(input_desired_amount).val ();
    return (PMT (retrate, accmt_period, 0, desired_lump) * -1) / 12;
  }

  function get_ffv_delayed ()
  {
    var delayear = $(input_delayear).val ();
    var accmt_period = $(input_accmt_period).val ();
    var yearleft = accmt_period - delayear;
    return FV (retrate, yearleft, 0, -1);
  }

  function get_lump_delayed ()
  {
    var delayear = $(input_delayear).val ();
    var accmt_period = $(input_accmt_period).val ();
    var yearleft = accmt_period - delayear;
    var desired_lump = $(input_desired_amount).val ();
    return PV (retrate, yearleft, 0, desired_lump) * -1;
  }

  function get_monthly_delayed ()
  {
    var delayear = $(input_delayear).val ();
    var accmt_period = $(input_accmt_period).val ();
    var yearleft = accmt_period - delayear;
    var desired_lump = $(input_desired_amount).val ();
    return (PMT (retrate, yearleft, 0, desired_lump) * -1) / 12;
  }

  function validate_fields ()
  {
    var result = true;

    $(".calculator-item, .calculated-result").find (".calc-required").filter (":visible").each (function (index, item) {
      if ($(item).val () == "")
      {
        $(item).addClass ("error");
        $(item).parent ().find (".calc-error").show ();
        result = false;
      }
      else
      {
        $(item).removeClass ("error");
        $(item).parent ().find (".calc-error").hide ();
      }
    });

    $(".calculator-item, .calculated-result").find (".calc-minmax").filter (":visible").filter (":not(.calc-required.error)").each (function (index, item) {
      var item_val = $(item).val ();
      var item_min = $(item).attr ('data-val-min');
      var item_max = $(item).attr ('data-val-max');
      var item_min_valid = true;
      var item_max_valid = true;
      
      if ($(item).hasClass ("numeric-only"))
      {
        item_val = Number (item_val);
        item_min = Number (item_min);
        item_max = Number (item_max);
      }

      if (item_min != undefined)
      {
        if (item_val < item_min)
        {
          item_min_valid = false;
          result = false;
        }
      }

      if (item_max != undefined)
      {
        if (item_val > item_max)
        {
          item_max_valid = false;
        }
      }

      if (item_min_valid == false || item_max_valid == false)
      {
        $(item).addClass ("error");
        $(item).parent ().find (".calc-error").show ();
      }
      else
      {
        $(item).removeClass ("error");
        $(item).parent ().find (".calc-error").hide ();
      }
    });

    return result;
  }

  $(form_calculate).find ('.calc-input').each (function (index, item) {
    $(item).on ("keyup.retireInputChange", function (keyvent) {
      if (!$(result_calculate).is (":hidden"))
      {
        $(result_calculate).hide ();
      }
      validate_fields ();
    });
  });

  $(result_calculate).find ('.calc-input').each (function (index, item) {
    $(item).on ("keyup.retireInputChange", function (keyvent) {
      validate_fields ();
    });
  });

  $(btn_calculate).on ("click.retireCalc", function (clickevent) {
    clickevent.preventDefault ();
    if (validate_fields () === false)
    {
      return;
    }

    retrate = get_returnrate () / 100;

    lump = get_lump ();
    monthly = get_monthly ();
    delay_lump = get_lump_delayed ();
    delay_month = get_monthly_delayed ();

    $(output_lump).outputCalcValue (lump);
    $(output_monthly).outputCalcValue (monthly);
    $(output_lump_need_delay).outputCalcValue (delay_lump);
    $(output_month_need_delay).outputCalcValue (delay_month);

    $(result_calculate).show ();
    $(btn_calculate).scrollPageToThis ();
  });

  $(input_delayear).on ("keyup.wealthaccDelayChange", function (keyvent) {
    clearTimeout (delayear_timeout);

    if ($(input_delayear).val () == "")
    {
      return;
    }

    var delayear = $(input_delayear).val ();
    var accmt_period = $(input_accmt_period).val ();
    var yearleft = accmt_period - delayear;
    if (yearleft < 1)
    {
      return;
    }

    if (validate_fields () == false)
    {
      return;
    }

    delayear_timeout = setTimeout (
      function () {
        delay_lump = get_lump_delayed ();
        delay_month = get_monthly_delayed ();
        $(output_lump_need_delay).outputCalcValue (delay_lump);
        $(output_month_need_delay).outputCalcValue (delay_month);
      },
      333
    );

  });

  $(btn_calculate).prop ({ 'disabled': false, });

  $(element).addClass ("-calc-wealthacc-wired-");
};

function _calc_wealthacc_disablecalcbutton ()
{
  $('.calc-wealthacc').calcFormDisableButtonFirst ();
}

function _calc_wealthacc_wireup ()
{
  $('.calc-wealthacc').filter (":not(.-calc-wealthacc-wired-)").each (function (index, item) {
    $(item).calcWealthAccWireUp ();
  });
}

$(document).ready (function () {
  _calc_wealthacc_wireup ();
  _calc_wealthacc_disablecalcbutton ();
});
