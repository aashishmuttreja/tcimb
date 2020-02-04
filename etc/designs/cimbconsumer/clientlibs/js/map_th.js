$(function() {

  populateRegion();
  populateListing();
  refreshMap();

  // Referesh Region/Province/
  $('.type select').change(function() {
    populateRegion();
    populateListing();
    refreshMap();
  });

  // Populate Province
  $('.region select').change(function() {
    populateProvince();
  });

  $('.province select').change(function() {
    populateDistrict();
  });

  // Refresh map on selection change
  $('select').change(function() {
    populateListing();
    refreshMap();
  });

  function populateRegion() {
    $('.region select').html('<option value="all">' + allRegionsLabel + '</option>');
    for (i = 0; i < regionList.length; i++) {
      regiontemplate = '<option>' + regionList[i].name + '</option>'
      $('.region select').append(regiontemplate);
    }
    populateProvince();
  }

  function populateProvince() {
    $('.province select').html('<option value="all">' + allProvincesLabel + '</option>');
    if ($('.region select option:selected').val() === 'all') {
      if ($('.province .disabled-block').length === 0) {
        $('.province').append('<div class="disabled-block"></div>');
      }
    } else {
      $('.province .disabled-block').remove();
      selectedRegion = $('.region select option:selected').val();
      provinceList = $.grep(regionList, function(n, i) {
        return n.name == selectedRegion;
      })
      for (j = 0; j < provinceList[0].province.length; j++) {
        provincetemplate = '<option>' + provinceList[0].province[j].name + '</option>'
        $('.province select').append(provincetemplate);
      }
    }
    populateDistrict();
  }

  function populateDistrict() {
    $('.district select').html('<option value="all">' + allDistrictsLabel + '</option>');
    if ($('.province select option:selected').val() === 'all') {
      if ($('.district .disabled-block').length === 0) {
        $('.district').append('<div class="disabled-block"></div>');
      }
    } else {
      $('.district .disabled-block').remove();
      selectedProvince = $('.province select option:selected').val();

      districtList = $.grep(provinceList[0].province, function(n, i) {
        return n.name == selectedProvince;
      })

      for (k = 0; k < districtList[0].district.length; k++) {
        districtTemplate = '<option>' + districtList[0].district[k] + '</option>'
        $('.district select').append(districtTemplate);
      }
    }
  }

  function populateListing() {
    // Push the right items into markerLocations[]
    type = $('.type select option:selected').val();
    typetoPush = type;

    region = $('.region select option:selected').val();
    province = $('.province select option:selected').val();
    district = $('.district select option:selected').val();

    markerLocations.length = 0;

    if (typetoPush === "branch") {
      // Check if that particular fits Region, Province and District
      for (var i = 0; i < branchMarkers.length; i++) {
        branchMarker = branchMarkers[i].split(";");
        if (region === 'all' || region === branchMarker[8]) {
          if (province === 'all' || province === branchMarker[9]) {
            if (district === 'all' || district === branchMarker[10]) {
              markerLocations.push(branchMarker);
            }
          }
        }
      }
    } else if (typetoPush === "atm") {
      for (var i = 0; i < atmMarkers.length; i++) {
        atmMarker = atmMarkers[i].split(";");
        if (region === 'all' || region === atmMarker[8]) {
          if (province === 'all' || province === atmMarker[9]) {
            if (district === 'all' || district === atmMarker[10]) {
              markerLocations.push(atmMarker);
            }
          }
        }
      }
    } else if (typetoPush === "business") {
      for (var i = 0; i < businessMarkers.length; i++) {
        businessMarker = businessMarkers[i].split(";");
        if (region === 'all' || region === businessMarker[8]) {
          if (province === 'all' || province === businessMarker[9]) {
            if (district === 'all' || district === businessMarker[10]) {
              markerLocations.push(businessMarker);
            }
          }
        }
      }
    } else if (typetoPush === "exchange") {
      for (var i = 0; i < exchangeMarkers.length; i++) {
        exchangeMarker = exchangeMarkers[i].split(";");
        if (region === 'all' || region === exchangeMarker[8]) {
          if (province === 'all' || province === exchangeMarker[9]) {
            if (district === 'all' || district === exchangeMarker[10]) {
              markerLocations.push(exchangeMarker);
            }
          }
        }
      }
    } else {
      markerLocations.length = 0;
    }

    // Populate Listing
    $('.filter-location ul').html('');
    for (i = 0; i < markerLocations.length; i++) {
      template = '<li mapadd="http://maps.google.com/maps?saddr=&amp;daddr=' + markerLocations[i][3] + '"><div class="location-filter-title"><h6>' + markerLocations[i][0] + '</h6></div><div class="location-filter-address"><p>' + markerLocations[i][3] + '</p></div><div class="location-filter-link"><a href="javascript:void(0);" data-count="' + i + '" onclick="clickedLink(' + i + ')">View Details &raquo;</a></div></li>'
      $('.filter-location ul').append(template);
    }

    $('.filter-location li').click(function() {
      if ($(window).width() < 1020) {
        //console.log($(this).attr('mapadd'))
        var obj = $(this)
        callExternalLinks(obj.attr("mapadd"));
      }
    });

  }

  // REFRESH MAP
  function refreshMap() {
    gmarkers = new Array();

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        // Default lat lng for Thai
        lat: 15.1139501,
        lng: 100.4115691
      },
      scrollwheel: true,
      zoom: 15
    });

    // Marker
    var infowindow = new google.maps.InfoWindow();
    var marker, i;

    for (i = 0; i < markerLocations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerLocations[i][1], markerLocations[i][2]),
        map: map,
        icon: markerLocations[i][7],
        markerAddress: markerLocations[i][3]
          // markerType: markerLocations[i][7]
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          regex = /<br\s*[\/]?>/gi;
          markerLocation = markerLocations[i][3].replace(regex, '');

          //Individual Pop Up Content
          var popTel = "";
          var popFax = "";
          var popOpen = "";
          var popClose = "";

          if (markerLocations[i][4].replace(/\<br \/\>/g, "").length > 0) {
            popTel = "<tr><td class=\"title\"><strong>" + telLabel + "</strong></td><td>" + markerLocations[i][4] + "</td></tr>";
          }
          if (markerLocations[i][5].replace(/\<br \/\>/g, "").length > 0) {
            popFax = "<tr><td class=\"title\"><strong>" + faxLabel + "</strong></td><td>" + markerLocations[i][5] + "</td></tr>";
          }
          if (markerLocations[i][13].replace(/\<br \/\>/g, "").length > 0) {
            popOpen = "<tr><td class=\"title\"><strong>" + openLabel + "</strong></td><td>" + markerLocations[i][11] + "</td></tr>";
          }
          if (markerLocations[i][12].replace(/\<br \/\>/g, "").length > 0) {
            popClose = "<tr><td class=\"title\"><strong>" + closeLabel + "</strong></td><td>" + markerLocations[i][12] + "</td></tr>";
          }

          infowindow.setContent(
            "<div class=\"map-popup\">" +
            "<h5>" + markerLocations[i][0] + "</h5>" +
            "<div class=\"map-popup-content\">" +
            "<table cellpadding=\"0\" cellspacing=\"0\">" +
            "<tr><td class=\"title\"><strong>" + addLabel + "</strong></td><td>" + markerLocations[i][3] + "</td></tr>" +
            popTel + popFax + popOpen + popClose +
            "</table>" +
            "<p><a href=\"javascript:void(0);\" onclick=\"callExternalLinks('http://maps.google.com/maps?saddr=&amp;daddr='+markerLocation)\"><i class=\"icon icon-map_location3\"></i>" + directionsLabel + " &raquo;</a><a href=\"" + markerLocations[i][13] + "\" class=\"btn-show-map\"><i class=\"icon icon-map\"></i>" + mapLabel + " &raquo;</a></div></div>"
          );
          infowindow.open(map, marker);

          popupMap();
        }
      })(marker, i));
      gmarkers.push(marker);

    }

    var latLng = gmarkers[0].getPosition(); // returns LatLng object
    map.setCenter(latLng); // setCenter takes a LatLng object

    popupMap();

  }

});

function popupMap() {
  $('.btn-show-map').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });
}

function callExternalLinks(links1) {
  $('.modal#external-site').addClass('active');
  $("#external-site .more-link").prop("href", links1);
}

function clickedLink(i) {
  google.maps.event.trigger(gmarkers[i], "click");
}