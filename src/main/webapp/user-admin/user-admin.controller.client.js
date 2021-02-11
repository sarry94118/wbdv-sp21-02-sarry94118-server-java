var $addUserBtn;
var $updateBtn
var $userBody;
var $userName;
var $password;
var $firstNm
var $lastNm;
var $role;
var userService = new AdminUserServiceClient()


var users = [];


function main(){
    $addUserBtn = $(".wbdv-create")
    $userBody = $(".wbdv-tbody")
    $updateBtn = $(".wbdv-update")
    $userName = $(".usernameFld")
    $password = $(".passwordFld")
    $firstNm = $(".firstNameFld")
    $lastNm = $(".lastNameFld")
    $role = $(".roleFld")

    // $updateBtn.click(updateUser)
    // $addUserBtn.click(createUser)
    userService.findAllUsers().then(function (actualUser) {
        users = actualUser
        renderUser(users)
    })
}

function createUser() {
    addUserInList({
        Username: $userName.val(),
        Password: $password.val(),
        FirstName: $firstNm.val(),
        LastName: $lastNm.val(),
        Role: $role.val()
    })
}

function addUserInList(user) {
    userService.createUser(user)
        .then(function(actualUser){
            users.push(actualUser)
            renderUser(users)
        })
}



function renderUser(user) {
    $userBody.empty()
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        $userBody.append(`
            <tr class="wbdv-template wbdv-user wbdv-hidden">
                <td class="wbdv-username">${user.Username}</td>
                <td>&nbsp;</td>
                <td class="wbdv-first-name">${user.FirstName}</td>
                <td class="wbdv-last-name">${user.LastName}</td>
                <td class="wbdv-role">${user.Role}</td>
                <td class="wbdv-actions">
                <span class="pull-right">
                <a></a>
                <i class="fa-2x fas fa-edit float-right wbdv-edit" id="${i}"></i>
                  <i class="fa-2x fas fa-trash float-right wbdv-remove" id="${i}"></i>
            
                </span></td></tr>`
        )
    }
    $(".wbdv-remove").click(deleteUser)
    $(".wbdv-edit").click(selectUser)
}

function deleteUser(event){
    var i = $(event.target)
    var index = i.attr("id")
    var id = users[index]._id
    userService.deleteUser(id)
        .then(function (status){
            users.splice(index, 1)
            renderUser(users)
        })
}

var selectedUser = null
function selectUser(event) {
    var i = $(event.target)
    var index = i.attr("id")
    var id = users[index]._id
    selectedUser = users.find(user => user._id==id)
    $userName.val(selectedUser.Username),
        $password.val(selectedUser.Password),
        $firstNm.val(selectedUser.FirstName),
        $lastNm.val(selectedUser.LastName),
        $role.val(selectedUser.Role)
}

function updateUser() {
    selectedUser.Username = $userName.val()
    selectedUser.Password = $password.val()
    selectedUser.FirstName = $firstNm.val()
    selectedUser.LastName = $lastNm.val()
    selectedUser.Role = $role.val()
    userService.updateUser(selectedUser._id, selectedUser)
        .then(function (status){
            var index = users.findIndex(user => user._id==selectedUser._id)
            users[index] = selectedUser
            renderUser(users)
        })
}



$(document).ready(function() {
    $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "text"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass( "fa-eye-slash" );
            $('#show_hide_password i').removeClass( "fa-eye" );
        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass( "fa-eye-slash" );
            $('#show_hide_password i').addClass( "fa-eye" );
        }
    });
});

// $(".wbdv-create").click(function(){
//     $(".wbdv-form").trigger("reset");
// })


function clear_create() {
    createUser()
    document.getElementById("header").reset();
}

function clear_update() {
    updateUser()
    document.getElementById("header").reset();
}


$(main)