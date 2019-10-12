function handleErrors(response, errorCallback) {
    if (!response.ok && response.status != 404) {
        if (errorCallback) {
            errorCallback()
        }
        return null;
    }
    return response.json();
}

export default handleErrors