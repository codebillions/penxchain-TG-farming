AOS.init();

const queryString = Telegram.WebApp.initData; 
// const queryString = "telegramBot";
// check if query string is initialised if not direct to error page (Login from telgeram)

// Function to make a POST request with JSON data
async function postData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) { 
      console.log( response );
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

async function getData(url = '') {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add bearer token to headers if provided
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

postData(`https://penxchain.onrender.com/api/v1/auth/login/${queryString}`)
  .then((data) => {
    console.log(data); // Log the response data for debugging (optional)

    accessToken = data.data.accessToken;
    console.log('Access token', accessToken);

    messageTag.innerText = data.data.message ?? 'Login successful'; // Handle potential missing message property
  })
  .catch((error) => {
    console.error('Error during login:', error);
    messageTag.innerText = 'Login failed. Check console for details.'; // Inform user about login failure
  } );
  
mainHead.addEventListener('click', () => {
    then((data) => {
      console.log(data); // Log the response data for debugging (optional)
      messageTag.innerText+= `
      User profile retrieved successfully
      ${JSON.stringify(data)}`
    })
    .catch((error) => {
      console.error('Error during profile retrieval', error);
    });
});