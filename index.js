const apiKey = 'wBk4ZaVvf9OiNTZ1sGpUFNtmLw3hCVFnjW5nPV7J'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  
  function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('.results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
     
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].name}</h3>
        <a href={responseJson.data[i].url}>Visit</a>
        <p>${responseJson.data[i].addresses[0].line1}</p> <p>${responseJson.data[i].addresses[0].city}</p>
        <p> ${responseJson.data[i].addresses[0].stateCode}</p> 
        <p>${responseJson.data[i].description}</p>
        </li>
        <br>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };
  
  function getParks(query, limit=10) {
    const params = {
      api_key: apiKey,
      q: query,
      limit: limit
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
  
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      const limit = $('#js-max-results').val();
      getParks(searchTerm, limit);
    });
  }
  
  $(watchForm);
