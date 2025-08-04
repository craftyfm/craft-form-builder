import {
    initCommonValidationSettings,
    initSettingGroupButton,
    labelHandleListener,
    renderAdvanceSettings,
    renderCommonPropertySettings,
    renderCommonValidationSettings,
    renderDescription,
    renderFieldHeader,
    renderSettingGroup,
    settingsInputListeners
} from '../utils.js';

const config = {
    defaultData: {
        handle: '',
        label: '',
        checkboxLabel: '',
        desc: '',
        required: false,
    },
};
const validate = (field) => {
    return !(!field.handle || !field.label);

}
const render = (field, layout) => {
    return `
        <div class="cfb:flex ${layout === 'horizontal' ? 'cfb:flex-row cfb:gap-3' : 'cfb:flex-col'}">
            ${renderFieldHeader(field)}
            <div class="${layout === 'horizontal' ? 'cfb:w-3/4' : ''}">
                <div class="cfb:flex cfb:items-center cfb:gap-2 ">
                    <input type="checkbox" id="${field.id}" name="${field.id}" value="1" class="cfb:border-gray-300 cfb:rounded" disabled>
                    <label for="${field.id}" class="cfb:text-sm cfb:text-gray-700">${field.checkboxLabel}</label>
                </div>
                ${renderDescription(field)}
            </div>
        </div>
    `;
};

const renderSettings = (field) => {
    const propertySettings = `
        ${renderCommonPropertySettings(field)}
            <div>
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Checkbox Label</label>
                <input type="text" id="setting-checkboxLabel" value="${field.checkboxLabel}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
            </div>
    `;
    return renderSettingGroup('Property', propertySettings) + renderSettingGroup('Validation', renderCommonValidationSettings(field)) + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData, renderer) => {
    settingsInputListeners(['desc', 'checkboxLabel'], updateFieldData);
    initCommonValidationSettings(updateFieldData);
    initSettingGroupButton();
    labelHandleListener(updateFieldData);
};

export default {
    config,
    validate,
    render,
    renderSettings,
    initSettings,
};