
    var $addUserBtn;
    var $updateBtn
    var $userBody;
    var $userName;
    var $password;
    var $firstNm
    var $lastNm;
    var $role;
    var userService = new AdminUserServiceClient()


    var users = [
        // {Username: 'kaasf', Password: '&nbsp;', FirstName: 'Lwy', LastName: 'Pie', Role: 'FACULTY'},
        // {Username: 'aeadf', Password: '&nbsp;', FirstName: 'Puer', LastName: 'Iuer', Role: 'STUDENT'},
        // {Username: 'pwdf', Password: '&nbsp;', FirstName: 'Nea', LastName: 'SAW', Role: 'FACULTY'},
        // {Username: 'zfedf', Password: '&nbsp;', FirstName: 'Ore', LastName: 'Sandy', Role: 'STUDENT'}
    ];


    function main(){
        $addUserBtn = $(".wbdv-create");
        $userBody = $(".wbdv-tbody");
        $updateBtn = $(".wbdv-update")
        $userName = $("input#usernameFld")
        $password = $("input#passwordFld")
        $firstNm = $("input#firstNameFld")
        $lastNm = $("input#lastNameFld")
        $role = $("select#roleFld")

        $updateBtn.click(updateUser);
        $addUserBtn.click(createUser);
        userService.findAllUsers().then(function (newUser) {
            users = newUser
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

    function Clear()
    {
        $('.wbdv-form input').each(function () {
            $(this).val("");
            x=1;
        });
        $('.wbdv-form input').first().focus();

    }

    $(main)

// (function () {
//     var $usernameFld, $passwordFld;
//     var $firstNameFld, $lastNameFld, $roleFld;
//     var $removeBtn, $editBtn, $createBtn;
//     var $userRowTemplate, $tbody;
//     var userService = new AdminUserServiceClient();
//     $(main);
//
//     function main() { … }
//     function createUser() { … }
//     function deleteUser() { … }
//     function selectUser() { … }
//     function updateUser() { … }
//     function renderUsers(users) { … }
//     function findAllUsers() { … } // optional - might not need this
//     function findUserById() { … } // optional - might not need this
// })();

