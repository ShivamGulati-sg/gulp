/**
 * Created by RFreeman on 10/14/2016.
 */
/* use jquery which we just downloaded
find any html element with the class "confirmation"
attach a js confirmation popup to the click event of these html elements
 */
$('.confirmation').on('click', function() {
   return confirm('Are you sure you want to delete this?');
});

// password check on register Form
var validator = $('#registerForm').validate({
   rules: {
      confirm: {
         required: true,
         equalTo: '#password'
      }
   },
   messages: {
      confirm: {
         equalTo: 'Your passwords do not match'
      }
   }
});
