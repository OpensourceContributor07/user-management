$(document).ready(function() {
    $("#add_user").validate({
        
        rules:{
            name:'required',
            lname:'required',
            email:{
                required:true,
                email:true
            },
            mobileNumber:{
               required:true,
               maxlength:10, 
            },
            hobby:'required',
            gender:'required',
            password:{
                required:true,
                minlength : 5
            },
            confirmPassword : {
                minlength : 5,
                equalTo : "#password"
            }


        },
        messages: {
            name: 'This field is required',
            lname: 'This field is required',
            email: 'Enter a valid email',
            mobileNumber:'Enter valid mobile',
            hobby:'This field is required',
            gender:'This field is required',
            password:'password must be greater than 5',
            confirmPassword:'it should be same as password'


         },
        

         submitHandler: function(form) {
            form.submit()
            
            
         }

    });
 });


 




$("#update_user").submit(function(event){
    event.preventDefault();
    var unindexed_array = $("#update_user").serializeArray();
    var data = {}
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
    console.log(data)
    var request = {
        "url":`http://localhost:8080/api/users/${data._id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        $(document).ready($(location).attr("href", "http://localhost:8080/user"));
    })

})

if(window.location.pathname == "/user"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")
        console.log(id)
        var request = {
            "url" : `http://localhost:8080/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}