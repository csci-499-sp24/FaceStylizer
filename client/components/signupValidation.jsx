function Validation(values) {
    let error = {};
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit";
    } else {
        error.password = "";
    }
    return error;
}
export default Validation;
