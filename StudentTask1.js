// list of state according to the country

var stateList = [
  { Country: 'India', State: 'Maharashtra' },
  { Country: 'India', State: 'Delhi' },
  { Country: 'India', State: 'Punjab' },
  { Country: 'US', State: 'Albama' },
  { Country: 'US', State: 'Arizona' },
  { Country: 'US', State: 'California' }
];
// list of city according to the state

var cityList = [
  { State: 'Maharashtra', city: 'Pune' },
  { State: 'Maharashtra', city: 'Mumbai' },
  { State: 'Maharashtra', city: 'Hydrabad' },
  { State: 'Maharashtra', city: 'Firozabad' },
  { State: 'Delhi', city: 'New Delhi' },
  { State: 'Delhi', city: 'Balijt Vihar' },
  { State: 'Punjab', city: 'Ludhiyana' },
  { State: 'Punjab', city: 'Amritsar' },
  { State: 'Punjab', city: 'Patiyala' },
  { State: 'Punjab', city: 'Jalandhar' },
  { State: 'Albama', city: 'Abbeville' },
  { State: 'Albama', city: 'Adamsville' },
  { State: 'Arizona', city: 'Phoenix' },
  { State: 'Arizona', city: 'Tucson' },
  { State: 'California', city: 'Los Angeles' },
  { State: 'California', city: 'Vernon' }
];
function state(xcountry) {
  $("#state").html("<option value=''  selected> ---select--- </option>");
  const states = stateList.filter(m => m.Country == xcountry);  // -- filter the state value according to country
  states.forEach(element => {
    let option = "<option value='" + element.State + "'>" + element.State + "</option>";
    $("#state").append(option); // --- used to insert the states in the state column
  });
}

function city(xstate) {
  $("#city").html("<option value='' selected> ---select--- </option>");
  const cities = cityList.filter(m => m.State == xstate);
  cities.forEach(element => {
    let option = "<option value='" + element.city + "'>" + element.city + "</option>";
    $("#city").append(option);
  });
}

// reading the country and showing states on UI according to the country
$(document).ready(function () {
  $("#country").change(function () {
    $("#state").html("<option value=''  selected> ---select--- </option>");
    $("#city").html("<option value='' selected> ---select--- </option>");
    const states = stateList.filter(m => m.Country == $("#country").val());  // -- filter the state value according to country
    states.forEach(element => {
      let option = "<option value='" + element.State + "'>" + element.State + "</option>";
      $("#state").append(option); // --- used to insert the states in the state column
    });
  });

  // reading the state and showing city on UI according to the state
  $("#state").change(function () {
    $("#city").html("<option value=''  selected> ---select--- </option>");
    const cities = cityList.filter(m => m.State == $("#state").val());
    cities.forEach(element => {
      let option = "<option value='" + element.city + "'>" + element.city + "</option>";
      $("#city").append(option);
    });
  });
})