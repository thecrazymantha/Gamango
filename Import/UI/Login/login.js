
// import du CSS et du HTML
import './login.html';
import './login.css';

// eslint-disable-next-line no-undef
Template.login.events({
  'click #create_acc'(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    if (password.length > 6){
        if(password == password2){
            if(username != '' && email!= '' && password != ''){
                Accounts.createUser({
                    username: username,
                    email: email,
                    password: password,
                });
            }else{
                alert('Please complete all informations')
            }

        }else{
            alert('Please choose the same password for the confirmation')  
    }else{
        alert('Your password is too short !')
    }
  }
});
