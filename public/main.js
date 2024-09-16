//add an event listener for when the form is submitted
document.getElementById('logInCard').addEventListener('submit', function(e) {
   //UNCHECKED: we process the form as a parameter 'e' and then prevent default form submission
   e.preventDefault();

   //get the data from the form's fields
   //UNCHECKED: we make a new object of formData using the parameters from our form
   //UNCHECKED: then we use that object to create an object 'data' containing our entry data
   const formData = new FormData(this);
   const data = Object.fromEntries(formData.entries());

   //fetch request to '/submit' endpoint
   fetch ('/submit', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      //?: redirect field set to follow
      redirect: 'follow'
   })
   //whatever response we get, we read it as a json file
   .then(response => {
      if (response.redirected) {
         window.location.href = response.url
      } else {
         return response.json();
      }
   })
   .then (data =>{
      //old handling of response when it was a json
      JSON.stringify(data);
      console.log(data.message);
   })
   .catch(error => {
      console.error('Error:', error);
   });
});