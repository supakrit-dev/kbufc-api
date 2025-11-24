export const createUserValidationSchemas = {
    username: {
        notEmpty: {
            errorMessage: "Username cannot be empty",
        },
        isString: true,
    },
    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty",
        },
        isString: true,
    },
    role: {
        notEmpty: {
            errorMessage: "Role cannot be empty",
        },
        isString: true,
    },
    status: {
        notEmpty: {
            errorMessage: "Status cannot be empty",
        },
        isString: true,
    },
};