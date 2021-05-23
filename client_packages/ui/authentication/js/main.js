// state ;; 0 = login, 1 = register
function sendData(state)
{
    let loginName = document.getElementById("loginName"),
        loginPass = document.getElementById("loginPass");

    mp.trigger("loginDataToClient", loginName.value, loginPass.value, state);
}
