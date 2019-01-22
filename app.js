const github = new Github;
const ui = new UI; 

// focus on the text input 
window.onload = () => document.getElementById("searchUser").focus();

const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup',(e)=>{
    // get input text 
    const userText = e.target.value;

    if ( userText !== '' ){
        github.getUser(userText)
        .then((data)=>{
            if (data.profile.message === 'Not Found'){
                // show Alert
                ui.showAlert('user not found','alert alert-danger');
            }else {
                console.log(data)
                console.log(data.repos);
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }

        });
    } else {
        ui.clearProfile();
    }
});