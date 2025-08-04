export const saveForm = (formState) => {
    const csrfInput = document.getElementById('csrf-input');
    const csrfToken = csrfInput.value;
    const data = {
        form: formState
    };

    return fetch(Craft.getActionUrl('form-builder/forms/save'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    // Helper: Handle HTTP response
    async function handleResponse(response) {
        const data = await response.json();

        if (!response.ok) {
            // logError(data);
            throw createError(data.message || 'Unknown error', data);
        }

        return data;
    }

    // Helper: Handle successful data
    function handleData(data) {
        if (data.success === false) {
            throw createError(data.message || 'Unknown error', data);
        }
        location.reload();

        // Disable this, just reload when success.
        // Update the formState object properties instead of reassigning
        // if (data.form) {
        //     // Update UID
        //     if (data.form.uid) {
        //         formState.uid = data.form.uid;
        //     }
        //
        //     // Update settings
        //     if (data.form.name !== undefined) formState.settings.name = data.form.name;
        //     if (data.form.handle !== undefined) formState.settings.handle = data.form.handle;
        //     if (data.form.layout !== undefined) formState.settings.orientation = data.form.layout;
        //     if (data.form.icons !== undefined) formState.settings.icons = data.form.icons;
        //     if (data.form.framework !== undefined) formState.settings.framework = data.form.framework;
        //     if (data.form.class !== undefined) formState.settings.class = data.form.class;
        //     if (data.form.actionOnSubmit !== undefined) formState.settings.actionOnSubmit = data.form.actionOnSubmit;
        //     if (data.form.successMessage !== undefined) formState.settings.successMessage = data.form.successMessage;
        //     if (data.form.redirectUrl !== undefined) formState.settings.redirectUrl = data.form.redirectUrl;
        //
        //     // Update fields if provided
        //     if (data.form.fields !== undefined) {
        //         formState.fields = data.form.fields;
        //     }
        // }
        //
        // Craft.cp.displayNotice(data.message);
        //
        // // Return the updated formState for promise chaining
        // return formState;
    }

    // Helper: Handle errors
    function handleError(error) {
        Craft.cp.displayError(error.message);
        throw error; // Re-throw to allow promise chaining
    }

    // Utility: Log error data
    function logError(data) {
        console.error('API Error Response:', data);
    }

    // Utility: Create standardized error
    function createError(message, data) {
        const error = new Error(message);
        error.data = data;
        return error;
    }
}