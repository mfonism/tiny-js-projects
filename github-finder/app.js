GITHUB_ID = 'd9fb74cb17cf5535cf76';
GITHUB_SECRET = '1e756ce5d5846ac41b09ec8525e8aaa2d826fb6b';

const github = new Github(GITHUB_ID, GITHUB_SECRET);
const ui = new UI();

const searchUser = document.getElementById('searchUser');
searchUser.addEventListener('keyup', (event) => {
    const inputText = event.target.value;

    if (inputText === '') {
        return
    }

    github.getUser(inputText)
        .then((resp) => {
            if (resp.status === 200) {
                ui.displayProfile(resp.data);
                github.getRepos(resp.data.login)
                    .then((resp) => {
                        ui.displayRepos(resp.data);
                    })
            } else {
                ui.clearAlertDisplay();
                ui.showAlert(`User with username '${resp.requestData.username}' doesn't exist!`, isError = true);
            }
        })
        .catch((err) => { })
});