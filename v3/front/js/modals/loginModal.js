//
// ********* Модальне вікно для авторизації ************
//
const loginModalTitle = `LogIn`;
const loginModalContent = `<form name="loginForm" method="post">
                                <table class="form-table">
                                    <tr>
                                        <td class="form-label"><label for="userLoginEmail">Email:</label> </td>
                                        <td class="form-input"><input type="text" name="userLoginEmail" id="userLoginEmail" class="form-control" required></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror" id="loginEmailError"></td>
                                    </tr>
                                    <tr>
                                        <td class="form-label"><label for="userLoginPassword">Password:</label> </td>
                                        <td class="form-input"><input type="password" name="userLoginPassword" id="userLoginPassword" class="form-control" required></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror" id="loginPasswordError"></td>
                                    </tr>
                                    
                                </table>
                                <div class="modal-form-footer">
                                    <input type="submit" class="btn btn-success" id="submitLoginBtn" value="LogIn">
                                </div>
                            </form>`  ;

const loginModalFooter =`<div class="login-footer">
                            <div>Not a member? </div>
                            <div class="switch-link" onclick="switchToRegistration()"> SignUp </div>
                        </div>`;
const loginModal = new CustomModal(loginModalTitle, loginModalContent, loginModalFooter);
loginModal.create('lgn');

const switchToRegistration = () => {
    loginModal.close();
    document.getElementById('registerEmailError').innerText = '';
    registrationModal.open();
}