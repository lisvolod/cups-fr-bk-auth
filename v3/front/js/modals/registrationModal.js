//
// ********* Модальне вікно для реєстрації ************
//
const registrationModalTitle = `Registration`;
const registrationModalContent = `<form name="registerForm" method="post">
                                <table class="form-table">
                                    <tr>
                                        <td class="form-label"><label for="userRegName">Name:</label> </td>
                                        <td class="form-input"><input type="text" name="userRegName" id="userRegName" class="form-control" required></td>
                                    </tr>    
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror"></td>
                                    </tr>
                                    <tr class="form-padding">
                                        <td class="form-label"><label for="userRegEmail">Email:</label> </td>
                                        <td class="form-input"><input type="email" name="userRegEmail" id="userRegEmail" class="form-control" required></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror" id="registerEmailError"></td>
                                    </tr>
                                    <tr>
                                        <td class="form-label"><label for="userRegPassword">Password:</label> </td>
                                        <td class="form-input"><input type="password" name="userRegPassword" id="userRegPassword" class="form-control" minlength="6" required></td>
                                    </tr>
                                    <tr>
                                        <td class="form-label"><label for="userRegConfirmPassword">Password confirm:</label> </td>
                                        <td class="form-input"><input type="password" name="userRegConfirmPassword" id="userRegConfirmPassword" class="form-control" minlength="6" required></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td class="form-email-eror" id="registerPasswordError"></td>
                                    </tr>
                                    
                                </table>
                                <div class="modal-form-footer">
                                    <input type="submit" class="btn btn-success" id="submitRegistrationtBtn" value="Submit">
                                </div>
                            </form>`  ;

const registrationModalFooter =`<div class="login-footer">
                                    <div>Already member? </div>
                                    <div class="switch-link" onclick="switchToLogin()"> LogIn </div>
                                </div>`;
const registrationModal = new CustomModal(registrationModalTitle, registrationModalContent, registrationModalFooter);
registrationModal.create('rgstr');

const switchToLogin = () => {
    registrationModal.close();
    loginModal.open();
}