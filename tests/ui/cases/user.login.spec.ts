import { test } from '../../../fixtures/application';
import { UserVariables } from '../variables/user-variables';

const login_error_message_1 = 'Epic sadface: Username and password do not match any user in this service';
const login_error_message_2 = 'Epic sadface: Username is required';
const login_error_message_3 = 'Epic sadface: Password is required';
const login_error_message_4 = 'Epic sadface: Sorry, this user has been locked out.';


test('tc-login-success-0001: Be Able to Login to Swab Labs with Valid User Credentails #1', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
});

test('tc-login-success-0002: Be Able to Login to Swab Labs with Valid User Credentails #2', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn('problem_user', UserVariables.valid_standard_password);
});

test('tc-login-success-0003: Be Able to Login to Swab Labs with Valid User Credentails #3', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn('error_user', UserVariables.valid_standard_password);
});

test('tc-login-success-0004: Be Able to Login to Swab Labs with Valid User Credentails #4', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn('visual_user', UserVariables.valid_standard_password);
});

test('tc-login-failure-0001: Unable to Login to Swab Labs with Invalid Username', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.failToLogIn('abcd', UserVariables.valid_standard_password, login_error_message_1);
});

test('tc-login-failure-0002: Unable to Login to Swab Labs with Invalid Password', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.failToLogIn(UserVariables.valid_standard_username, '12345', login_error_message_1);
});

test('tc-login-failure-0003: Unable to Login to Swab Labs with Invalid Username and Password', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.failToLogIn('PowerGirl', 'Beam', login_error_message_1);
});

test('tc-login-failure-0004: Unable to Login to Swab Labs with Empty Username', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.failToLogIn('', UserVariables.valid_standard_password, login_error_message_2);
});

test('tc-login-failure-0005: Unable to Login to Swab Labs with Empty Password', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.failToLogIn('visual_user', '', login_error_message_3);
});

test('tc-login-failure-0006: Unable to Login to Swab Labs with Empty Username and Password', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.failToLogIn('', '', login_error_message_2);
});

test('tc-login-failure-0007: Unable to Login to Swab Labs with Locked Out Username', async ({ uiFunctions }) => {
    await uiFunctions.navigateToWebsite();
    await uiFunctions.failToLogIn('locked_out_user', UserVariables.valid_standard_password, login_error_message_4);
});