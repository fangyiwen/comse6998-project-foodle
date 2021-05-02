exports.handler = (event, context, callback) => {
    event.response.autoConfirmUser = true;

    // Return to Amazon Cognito
    callback(null, event);
};