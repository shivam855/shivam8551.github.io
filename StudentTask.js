/* Global variable*/

let userData = [];
let inputs = document.getElementsByClassName("input-group");
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var ModelcloseBtn = document.querySelector("#close-btn-m");
var closeBtn = document.querySelector(".btn-close");
var firstname = document.querySelector("#firstname");
var lastname = document.getElementById("lastname");
var email = document.querySelector("#email");
var age = document.querySelector("#age");
var gender = document.querySelectorAll('input[name="gender"]');
var country = document.querySelector("#country");
var state = document.querySelector("#state");
var city = document.querySelector("#city");
var qualification = document.querySelectorAll('input[name="qualification"]');
var submitBtn = document.querySelector("#submit-btn");
var registerForm = document.querySelector("#register-form");
var tableData = document.querySelector("#table-data");

// ---------------------------------- //

// user form button for open 

addBtn.onclick = function () {
  modal.classList.add("active");
  $('#firstname').next().hide();
  $('#lastname').next().hide();
  $('#age').next().hide();
  $('#email').next().hide();
  $('#country').next().hide();
  $('#state').next().hide();
  $('#city').next().hide();
}

ModelcloseBtn.addEventListener("click", () => {
  closeBtn.click()
})

// close button [ X ]

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  window.location.reload(); // removing the active class from model to remove the model
})

function IsEmail(email) {
  var regex =  /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}

function validateData() {
  let verifyData = [];
  verifyData.push({
    firstname: false,
    lastname: false,
    email: false,
    age: false,
    country: false,
    state: false,
    city: false
  });

  if (firstname.value === '') {
    verifyData.firstname = true;
  }
  if (lastname.value === '') {
    verifyData.lastname = true;
  }
  if (IsEmail(email.value) == false) {
    console.log(IsEmail(email.value))
    verifyData.email = true;
  }
  if (age.value === '' || age.value === '0' || parseInt(age.value) > 100) {
    verifyData.age = true;
  }
  if (country.value === '') {
    verifyData.country = true;
  }
  if (document.querySelector("#state").value === '') {
    verifyData.state = true;
  }
  if (document.querySelector("#city").value === '') {
    verifyData.city = true;
  }
  if (verifyData.firstname === true) {
    $('#firstname').next().show();
  }
  if (verifyData.lastname === true) {
    $('#lastname').next().show();
  }
  if (verifyData.age === true) {
    $('#age').next().show();
  }
  if (verifyData.email === true) {
    $('#email').next().show();
  }
  if (verifyData.country === true) {
    $('#country').next().show();
  }
  if (verifyData.state === true) {
    $('#state').next().show();
  }
  if (verifyData.city === true) {
    $('#city').next().show();
  }
  if (verifyData.firstname != true && verifyData.lastname != true && verifyData.age != true && verifyData.email != true && verifyData.country != true && verifyData.state != true && verifyData.city != true)
    return true;

}
// code for submit button 

submitBtn.onclick = function (e) {
  e.preventDefault();
  validateData() === true ? InsertData() : this;
}

// for storing the data after clicking on submit button



// Getting data from localStorage and storaging into the userData variable
if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}


// insert method to insert the data into the local storage from registration form
function InsertData() {

  // for checking gender radio button is enabled or not and store the value
  let selectedGender;
  for (let radioButton of gender) {
    if (radioButton.checked) {
      selectedGender = radioButton.value;
      break;
    }
  }

  // for checking qualification check button is enabled or not and store the value
  let selectedQualification = "", count = 0;
  for (let radioButton of qualification) {
    if (radioButton.checked) {
      count++ > 0 ? selectedQualification = selectedQualification + " , " + radioButton.value : selectedQualification = radioButton.value;
    }
  }

  // insert the data into local storage by using push method
  userData.push({
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    age: age.value,
    gender: selectedGender,
    country: country.value,
    state: document.querySelector("#state").value,
    city: document.querySelector("#city").value,
    qualification: selectedQualification
  });
  var userString = JSON.stringify(userData);  // --- convert list into the string
  localStorage.setItem("userData", userString);  // ---- set the data into local storage 
  swal("UserData Submitted", "Registration Succesfull", "success").then((e) => {
    e === true ? closeBtn.click() : this;
  })

  // calling method for showing data on UI from localstorage
  getDataFromLocal(); // --- to show the data on UI
}

// feting data from local storage and show on UI

let getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
         <tr index='${index}'>
         <td>${data.firstname}</td>
         <td>${data.lastname}</td>
         <td>${data.age}</td>
         <td>${data.gender}</td>
         <td>${data.email}</td>
         <td>${data.country}</td>
         <td>${data.state}</td>
         <td>${data.city}</td>
         <td>${data.qualification}</td>
         <td id=edit-dlt><button  class= "edit-btn btn-sm btn-primary"><i class="fa fa-pen"> Edit</i> </button>
         <button  class="del-btn btn-sm btn-danger"><i class="fa fa-trash"> Delete</i> </button>
         </td>
     </tr>`;
  });

  //start delete the data
  var allDelBtn = document.querySelectorAll(".del-btn")
  for (let i = 0; i < allDelBtn.length; i++) {

    // take value from that row on which you click for delete button
    allDelBtn[i].onclick = function (e) {
      var tr = this.parentElement.parentElement;
      var index = tr.getAttribute("index");

      swal({
        title: " Confirm?",
        text: "want to delete  Userdata",
        buttons: { confirm: 'Yes', cancel: 'No' }
      })
        .then((deleteRow) => {
          if (deleteRow) {
            tr.remove(); // row ko delete krne k lye from table from UI
            userData.splice(index, 1); // delete row from local storage by using splice method 
            localStorage.setItem("userData", JSON.stringify(userData));
            swal("remove it!", "Data removed successfully !!!", "success");
          } else {
            swal("Cancelled", "Good to see safe data", "warning");
          }
        });
    }
  }

  // Data Update  

  var allEdit = document.querySelectorAll(".edit-btn");
  for (let i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {

      var tr = this.parentElement.parentElement;
      var td = tr.getElementsByTagName("TD");
      var index = tr.getAttribute("index");
      let xfirstname = td[0].innerHTML;
      let xlastname = td[1].innerHTML;
      let xage = td[2].innerHTML;
      let xgender = td[3].innerHTML;
      let xemail = td[4].innerHTML;
      let xcountry = td[5].innerHTML;
      let xstate = td[6].innerHTML;
      let xcity = td[7].innerHTML;
      let xqualification = td[8].innerHTML;

      // opening the form

      addBtn.click();
      submitBtn.innerHTML = "Update"; // changing the name from submit to update
      submitBtn.id = "update-btn"; // changing the id from submit to update 

      // code for pre-population on form 

      firstname.setAttribute("value", xfirstname);  // --- tag m value add krta h setAttribute method
      lastname.setAttribute("value", xlastname);
      age.setAttribute("value", xage);
      email.setAttribute("value", xemail);

      xgender === "Male" ? document.querySelector("#male").setAttribute("checked", "") : document.querySelector("#female").setAttribute("checked", "")

      document.querySelector("#state").innerHTML = "";
      document.querySelector("#city").innerHTML = "";
      $('#country option:contains(' + xcountry + ')').each(function () {
        if ($(this).val() == xcountry) {
          $(this).attr('selected', true);
        }
      });

      state(xcountry);

      $('#state option:contains(' + xstate + ')').each(function () {
        if ($(this).val() == xstate) {
          $(this).attr('selected', true);
        }
      });


      city(xstate);

      $('#city option:contains(' + xcity + ')').each(function () {
        if ($(this).val() == xcity) {
          $(this).attr('selected', true);
        }
      });

      if (xqualification.includes(",")) {
        document.querySelector("#computer").setAttribute("checked", "");
        document.querySelector("#it").setAttribute("checked", "");
      }
      else {
        if (xqualification === "Computer")
          document.querySelector("#computer").setAttribute("checked", "")
        else if (xqualification === "IT")
          document.querySelector("#it").setAttribute("checked", "")
      }

      let updateBtn = document.querySelector("#update-btn");
      let a = localStorage.getItem("userData");
      let b = JSON.parse(a)

      //  Calling the Update method by clicking on update button on form 

      updateBtn.onclick = function () {
        let verData = validateData();
        console.log(verData)
        if (verData == true)
        //logic to update the data into the table
        {
          let selectedGender;
          for (let radioButton of gender) {
            if (radioButton.checked) {
              selectedGender = radioButton.value;
              break;
            }
          }
          let selectedQualification = "", count = 0;
          for (let radioButton of qualification) {
            if (radioButton.checked) {
              count++ > 0 ? selectedQualification = selectedQualification + " , " + radioButton.value : selectedQualification = radioButton.value;
            }
          }
          b[index].firstname = firstname.value;
          b[index].lastname = lastname.value;
          b[index].age = age.value;
          b[index].email = email.value;
          b[index].gender = selectedGender;
          b[index].country = country.value;
          b[index].state = document.querySelector("#state").value;
          b[index].city = document.querySelector("#city").value;
          b[index].qualification = selectedQualification;

          userData = "";
          userData = JSON.stringify(b)
          localStorage.setItem("userData", userData);
        
          swal("UserData Updated", "updation completed Succesfully", "success");
        }
        else {
          console.log("Hello")
        }
      }
    }
  }

}
getDataFromLocal(); // --- calling the getData method
