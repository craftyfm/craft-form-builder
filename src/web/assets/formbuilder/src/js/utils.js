
export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Renders a settings group container with a title.
 * @param {string} title - The title of the settings group.
 * @param {string} content - The HTML content of the settings group.
 * @param isHide
 * @returns {string} - The HTML string for the settings group.
 */
export const renderSettingGroup = (title, content, isHide= false) => {
    return `
        <div class="cfb:mb-7">
            <div class="cfb:flex cfb:justify-between cfb:text-gray-800 cfb:mb-3 cfb:border-b">
                <h4 class="cfb:text-lg cfb:font-semibold ">${title}</h4>
                <button data-open="${isHide ? '0' : '1' }" class="toggle-button-setting-group" id="toggle-${title.toLowerCase()}" data-content="group-settings-${title.toLowerCase()}">
                    ${isHide ? '<span class="cfb:iconify-[mdi--add]"></span>' : '<span class="cfb:iconify-[mdi--minus]"></span>'}
                </button>
            </div>
            <div class="cfb:flex-col cfb:gap-3  cfb:flex cfb:transition-all cfb:duration-500 ${isHide ? 'cfb:hidden' : '' }" id="group-settings-${title.toLowerCase()}">
                ${content}
            </div>
        </div>
    `;
};

export const renderIconSetting = (field) => {
    return `
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Icon</label>
            <div id="setting-icon" class="icon-picker">    
                <div class="icon-picker--icon" role="img" tabindex="0">
                    ${field.iconSvg ? field.iconSvg : '' }
                </div>
                <button type="button" class="icon-picker--choose-btn btn" tabindex="0">
                    Change
                </button>
                <button type="button" class="icon-picker--remove-btn btn" tabindex="0">Remove</button>
                <input type="hidden" name="name" value="">
            </div>
        </div>
    `
}

export const initSettingGroupButton = () => {
    const toggles = document.querySelectorAll('.toggle-button-setting-group');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const target = toggle.dataset.content;
            if (toggle.dataset.open === '0') {
                toggle.dataset.open = '1';
                toggle.querySelector('span').classList.replace('cfb:iconify-[mdi--add]', 'cfb:iconify-[mdi--minus]');
                document.getElementById(target).classList.remove('cfb:hidden');
            } else {
                toggle.dataset.open = '0';
                toggle.querySelector('span').classList.replace('cfb:iconify-[mdi--minus]', 'cfb:iconify-[mdi--add]');
                document.getElementById(target).classList.add('cfb:hidden');
            }
        })
    });
}

/**
 * Generates settings HTML for properties common to many input-like fields.
 * @param {object} element - The form element object.
 * @returns {string} - HTML string for common property settings.
 */
export const renderCommonPropertySettings = (element) => `
    <div>
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Label<span class="cfb:text-red-500 cfb:ml-1">*</span></label>
        <input type="text" id="setting-label" value="${element.label}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
    </div>
    <div>
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Description</label>
        <input type="text" id="setting-desc" value="${element.desc}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
    </div>
`;

export const renderAdvanceSettings = (element) => `
    <div>
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Handle<span class="cfb:text-red-500 cfb:ml-1">*</span></label>
        <input type="text" id="setting-handle" value="${element.handle}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
`


/**
 * Generates settings HTML for validation rules common to many fields.
 * @param {object} element - The form element object.
 * @returns {string} - HTML string for common validation settings.
 */
export const renderCommonValidationSettings = (element) => `
    <div>
        <label class="cfb:flex cfb:items-center cfb:gap-2">
            <input type="checkbox" id="setting-required" ${element.required ? 'checked' : ''} class="cfb:text-blue-600 cfb:border-gray-300 cfb:rounded">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-700">Required Field</span>
        </label>
    </div>
`;

/**
 * Initializes event listeners for common validation settings.
 * @param {function} updateElementValidation - Function to update an element's validation property.
 */
export const initCommonValidationSettings = (updateElementValidation) => {
    document.getElementById('setting-required')?.addEventListener('change', (e) => updateElementValidation('required', e.target.checked));
};

export const renderElementButtonHeader = () => `
        <div class="cfb:flex cfb:opacity-0 cfb:group-hover:opacity-100 cfb:transition-opacity cfb:justify-between">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-500 cfb:w-4 cfb:h-4 cfb:iconify-[mdi--drag-variant]"></span>
            <span class="delete-container cfb:delete-btn-wrapper cfb:mb-1"></span>
        </div>
`;
/**
 * Renders a label and a delete container for a form element.
 * @param {object} element - The form element object.
 * @returns {string} HTML for the element header.
 */
export const renderFieldHeader = (element) => {
    const required = element.required ?? false;
    return `
        <div class="cfb:mb-2 cfb:font-light cfb:flex-1">
            <div class="cfb:flex cfb:justify-between cfb:items-center">
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">
                    ${element.label}
                    ${required ? '<span class="cfb:text-red-500 cfb:ml-1">*</span>' : ''}
                </label>
            </div>
        </div>
    `;
};

export const renderDescription = (element) => {
    const required = element.required ?? false;
    return `
        <div class="">
            <p class="cfb:text-sm cfb:font-light">${element.desc ?? ''}</p>
        </div>
    `;
};


export const getDragAfterField = (container, y) => {
    const draggableFields = [...container.querySelectorAll('.form-field-wrapper')];

    return  draggableFields.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

export const createDropIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'cfb:relative cfb:my-4';

    // Line container
    const lineContainer = document.createElement('div');
    lineContainer.className = 'cfb:absolute cfb:inset-0 cfb:flex cfb:items-center';

    const line = document.createElement('div');
    line.className = 'cfb:w-full cfb:border-t cfb:border-blue-500';
    lineContainer.appendChild(line);

    // Text container
    const textContainer = document.createElement('div');
    textContainer.className = 'cfb:relative cfb:flex cfb:justify-center';

    const text = document.createElement('span');
    text.className = 'cfb:bg-white cfb:px-3 cfb:text-sm cfb:text-blue-500 cfb:font-medium';
    text.textContent = 'Drop here';
    textContainer.appendChild(text);

    // Append both parts to the wrapper
    indicator.appendChild(lineContainer);
    indicator.appendChild(textContainer);
    return indicator;
}

export const settingsInputListeners = (keys, updateElementProp) => {
    keys.forEach(key => {
        document.getElementById(`setting-${key}`)?.addEventListener('input', (e) => updateElementProp(key, e.target.value));
    })
}

export const settingInputOptionsListeners = (updateFieldData) => {
    document.getElementById('setting-options')?.addEventListener('input', (e) => {
        const options = e.target.value
            .split('\n')
            .filter(opt => opt.trim() !== '')
            .map(opt => ({
                name: opt.trim(),
                value: opt.trim(),
                isDefault: false,
            }));

        updateFieldData('options', options);
    });

}

export const escapeHtml = (str) =>
    str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

export const toKebabCase = (str) => {
    return str
        .toLowerCase() // lowercase everything
        .trim() // remove leading/trailing spaces
        .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric (except space and dash)
        .replace(/\s+/g, '-') // replace spaces with dashes
        .replace(/-+/g, '-') // collapse multiple dashes
}

export const toCamelCase = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '') // remove non-alphanumeric (except space)
        .replace(/\s+(.)/g, (_, char) => char.toUpperCase()) // capitalize letters after spaces
        .replace(/\s/g, ''); // remove any remaining spaces
};


export const autoGenerateHandleFromLabel = (updateFieldData) => {
    const labelInput = document.getElementById('setting-label');
    const handleInput = document.getElementById('setting-handle');
    if (!labelInput || !handleInput) {
        return;
    }
    if (handleInput.value !== '') {
        return;
    }
    let handleManuallyEdited = false;
    // Track if user manually changes the handle
    handleInput.addEventListener('input', () => {
        handleManuallyEdited = true;
    });

    labelInput.addEventListener('input', () => {
        if (!handleManuallyEdited) {
            handleInput.value = toCamelCase(labelInput.value);
            updateFieldData('handle', handleInput.value);
        }
    });
}