/* Retirement Calculator function */

$.fn.calcRetirementWireUp = function (options)
{
  var element = this;
  var settings = $.extend ({}, options);

  var form_calculate = $(element).find ('.calculator-item');
  var result_calculate = $(element).find ('.calculated-result');
  var btn_calculate = $(element).find ('.calculator-calculate-button');

  var input_returnrate = $(element).find ('.input-exp-returnrate');
  var input_inflaterate = $(element).find ('.input-exp-inflate');

  var input_expenditure = $(element).find ('.input-exp-expenditure');

  var input_currage = $(element).find ('.input-curr-age');
  var input_desired_retirage = $(element).find ('.input-desiretire-age');
  var input_retire_period = $(element).find ('.input-retire-period');

  var input_delayear = $(element).find ('.input-delay-year');

  var input_assets_liquidate = $(element).find ('.input-assets-liquidate');

  var output_lump = $(element).find ('.calc-result.output-retire-amount');
  var output_monthly = $(element).find ('.calc-result.output-monthly-income');

  var output_lump_need = $(element).find ('.label-summary.output-lumpsum');
  var output_month_need = $(element).find ('.label-summary.output-monthsum');

  var output_lump_need_delay = $(element).find ('.label-summary-delay.output-lumpsum');
  var output_month_need_delay = $(element).find ('.label-summary-delay.output-monthsum');

  var fv;
  var pv;
  var annual_retirement_income;
  var lump;
  var monthly;
  var amount_needed;
  var pmt;
  var pmt_monthly;
  var delay_lump;
  var delay_month;

  var asst_liquidate;
  var delayear_timeout;

  function get_assets_liquidate()
  {
    var liquidate = $(input_assets_liquidate).val ();
    return liquidate;
 
  }

  function get_returnrate ()
  {
    var returnrate = $(input_returnrate).val ();
    var inflaterate = $(input_inflaterate).val ();
    return returnrate - inflaterate;
  }

  function get_annualexpenditure ()
  {
    var expenditure = $(input_expenditure).val ();
    return (expenditure * 12);
  }

  function get_yearsbeforetire ()
  {
    var desired_retirage = $(input_desired_retirage).val ();
    var curr_age = $(input_currage).val ();
    return desired_retirage - curr_age;
  }

  function get_fv ()
  {
    var inflrate = $(input_inflaterate).val () / 100;
    return FV (inflrate, get_yearsbeforetire (), 0, -1);
  }

  function get_pv ()
  {
    var retrate = get_returnrate () / 100;
    var desired_retireperiod = $(input_retire_period).val ();
    return PV (retrate, desired_retireperiod, -1, 0, 1);
  }

  function get_annual_retirement_income ()
  {
    var inflrate = $(input_inflaterate).val () / 100;
    var yearstoretire = get_yearsbeforetire ();
    var expenditure = $(input_expenditure).val () * 12;
    return FV (inflrate, yearstoretire, 0, expenditure * -1, 0);
  }

  function get_amountneeded ()
  {
    var retrate = get_returnrate () / 100;
    var yearstoretire = get_yearsbeforetire ();
    return PV (retrate, yearstoretire, 0, lump) * -1;
  }

  function get_pmt ()
  {
    var retrate = get_returnrate () / 100;
    var yearstoretire = get_yearsbeforetire ();
    return PMT (retrate, yearstoretire, 0, lump) * -1;
  }

  function calc_delay_lump ()
  {
    var retrate = get_returnrate () / 100;
    var yearstoretire = get_yearsbeforetire ();
    var delayear = $(input_delayear).val ();
    var desired_retireperiod = $(input_retire_period).val ();
    var year_left = yearstoretire - delayear;
    var fpv = PV (retrate, desired_retireperiod, -1, 0, 1);
    var retneed = (fpv * annual_retirement_income) - asst_liquidate;
    return PV(retrate, year_left, 0, retneed) * -1;
  }

  function calc_delay_month ()
  {
    var retrate = get_returnrate () / 100;
    var delayear = $(input_delayear).val ();
    var yearstoretire = get_yearsbeforetire ();
    var desired_retireperiod = $(input_retire_period).val ();
    var year_left = yearstoretire - delayear;
    var fpv = PV (retrate, desired_retireperiod, -1, 0, 1);
    var retneed = (fpv * annual_retirement_income) - asst_liquidate;
    return (PMT(retrate, year_left, 0, retneed) * -1) / 12;
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
        currage_val = Number (currage_val);
        desired_retirage_val = Number (desired_retirage_val);
        delayyear_val = Number (delayyear_val);
        diffRetireNCurrAge = Number (diffRetireNCurrAge);
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
     
      var currage_val = $('.input-curr-age').val();
      var desired_retirage_val = $('.input-desiretire-age').val();
      var delayyear_val = $('.input-delay-year').val();
      var diffRetireNCurrAge = desired_retirage_val - currage_val;
      var retireperiod = $('.input-retire-period').val();
      retireperiod = Number(retireperiod);
      currage_val = Number (currage_val);
      desired_retirage_val = Number (desired_retirage_val);
      delayyear_val = Number (delayyear_val);
      diffRetireNCurrAge = Number (diffRetireNCurrAge );
      var maxValueRetired = desired_retirage_val + retireperiod;


      // retire age must not elder than current age
      // if (desired_retirage_val < currage_val)
      // {
      //   $(".input-desiretire-age").addClass("error");
      //   $(".input-desiretire-age").parent ().find (".calc-error").show ();
      // } 
      // else
      // {
      //   $(".input-desiretire-age").removeClass ("error");
      //   $(".input-desiretire-age").parent ().find (".calc-error").hide ();
      // }
      console.log(maxValueRetired);
      if (maxValueRetired > 120)
      {
        $(".input-desiretire-age").addClass("error");
        $(".input-desiretire-age").parent ().find (".calc-error").show ();
      } 
      else
      {
        $(".input-desiretire-age").removeClass ("error");
        $(".input-desiretire-age").parent ().find (".calc-error").hide ();
      }

      //Current Age + Expected Retirement Period >= Desired Retirement Age
      // if ((currage_val + retireperiod) >= desired_retirage_val) {
      //     $(".input-retire-period").removeClass ("calc-minmax");

      //     $(".input-retire-period").addClass("error");
      //     $(".input-retire-period").parent ().find (".retire-period").show().html ('Please enter an appropriate value for Expected Retirement Years and try again..');
      //   }

      //Current Age + Expected Retirement Period >= Desired Retirement Age
      //motified by CF
      if ((desired_retirage_val + retireperiod) >= 120) {
          $(".input-retire-period").removeClass ("calc-minmax");

          $(".input-retire-period").addClass("error");
          $(".input-retire-period").parent ().find (".retire-period").show().html ('Please enter an appropriate value for Expected Retirement Years and try again..');
        }  

      // check if input is empty
      if ($('.input-delay-year').val()=='') {
        // to resolve conflict from other js
          $(".input-delay-year").removeClass ("calc-minmax");

        // expected result
          $(".input-delay-year").addClass ("error");
          $(".input-delay-year").parent ().find (".delay-period-error").html ('Please enter a value between 1 and 99 years.');

          output_lump_need_delay.html('-'); 
          output_month_need_delay.html('-');
      }


      $(".input-delay-year").on("keypress", function(e){

            // strictly allow numbers only
            if (e.which < 48 || e.which > 57) 
            { 
              e.preventDefault(); 
            }

          var currentValue = String.fromCharCode(e.which);
          var finalValue = $('.input-delay-year').val() + currentValue;

          var currage_val = $('.input-curr-age').val();
          var desired_retirage_val = $('.input-desiretire-age').val();
          var diffRetireNCurrAge = desired_retirage_val - currage_val;

          if( (finalValue > diffRetireNCurrAge) && (finalValue > 0) )
          {
            // to resolve conflict from other js
              $(".input-delay-year").removeClass ("calc-minmax");

            // expected result
              $(".input-delay-year").addClass("error");
              $(".input-delay-year").parent ().find (".delay-period-error").show().html ('Error: Years of delay exceed the years to retirement.');

              output_lump_need_delay.html('-'); 
              output_month_need_delay.html('-'); 
          }
          else if ( (finalValue < diffRetireNCurrAge) && (finalValue <= 0) )
          {
            // to resolve conflict from other js
              $(".input-delay-year").removeClass ("calc-minmax");

            // expected result
            $(".input-delay-year").addClass ("error");
            $(".input-delay-year").parent ().find (".delay-period-error").show().html ('Please enter a value between 1 and 99 years.');

            output_lump_need_delay.html('-'); 
            output_month_need_delay.html('-');
          }
          else 
          {
            // to resolve conflict from other js
              $(".input-delay-year").addClass ("calc-minmax");

            // expected result
            $(".input-delay-year").removeClass ("error");
            $(".input-delay-year").parent ().find (".delay-period-error").html ('');
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

    fv = get_fv ();
    pv = get_pv ();
    asst_liquidate = get_assets_liquidate();

    annual_retirement_income = get_annual_retirement_income ();
    lump = (annual_retirement_income * pv) - asst_liquidate;

    monthly = annual_retirement_income / 12;
    amount_needed = get_amountneeded (lump);
    pmt = get_pmt (lump);
    pmt_monthly = pmt / 12;
    delay_lump = calc_delay_lump ();
    delay_month = calc_delay_month ();
      // // error if result is negative
      //   var output_val = [ lump | monthly | amount_needed | pmt_monthly | delay_lump | delay_month ];

      //   if (output_val < 0) {
      //     alert('Error - number of years delayed is higher than the years to retirement');
      //     return;
      //   }




        delay_lump = isFinite(delay_lump) ? delay_lump : 0.0; 
        delay_month = isFinite(delay_month) ? delay_month : 0.0;
        lump = isFinite(lump) ? lump : 0.0;
        monthly = isFinite(monthly) ? monthly : 0.0;
        amount_needed = isFinite(amount_needed) ? amount_needed : 0.0;
        pmt_monthly = isFinite(pmt_monthly) ? pmt_monthly : 0.0;

    $(output_lump).outputCalcValue (lump);
    $(output_monthly).outputCalcValue (monthly);
    $(output_lump_need).outputCalcValue (amount_needed);
    $(output_month_need).outputCalcValue (pmt_monthly);
    $(output_lump_need_delay).outputCalcValue (delay_lump);
    $(output_month_need_delay).outputCalcValue (delay_month);


    $(result_calculate).show ();
    $(btn_calculate).scrollPageToThis ();
  });

  $(input_delayear).on ("keyup.retireDelayChange", function (keyvent) {
    clearTimeout (delayear_timeout);

    if ($(input_delayear).val () == "")
    {
      return;
    }

    var delayear = $(input_delayear).val ();
    var desired_retireperiod = $(input_retire_period).val ();
    var yearstoretire = get_yearsbeforetire ();
    var year_left = yearstoretire - delayear; 
    if (year_left < 1)
    {
      return;
    }

    if (validate_fields () == false)
    {
      return;
    }

    delayear_timeout = setTimeout (
      function () {
        delay_lump = calc_delay_lump ();
        delay_month = calc_delay_month ();
        $(output_lump_need_delay).outputCalcValue (delay_lump);
        $(output_month_need_delay).outputCalcValue (delay_month);

      },
      333
    );

  });

  $(btn_calculate).prop ({ 'disabled': false });

  $(element).addClass ("-calc-retirement-wired-");
};

function _calc_retirement_disablecalcbutton ()
{
  $('.calc-retirement').calcFormDisableButtonFirst ();
}

function _calc_retirement_wireup ()
{
  $('.calc-retirement').filter (":not(.-calc-retirement-wired-)").each (function (index, item) {
    $(item).calcRetirementWireUp ();
  });
}

$(document).ready (function () {
  _calc_retirement_wireup ();
});

_calc_retirement_disablecalcbutton ();