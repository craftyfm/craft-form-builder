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
    settingsInputListeners,
} from '../utils.js';

const config = {
    defaultData: {
        handle: '',
        label: '',
        desc: '',
        placeholder: 'Enter Date...',
        required: false,
    },
};
const validate = (field) => {
    return !(!field.handle || !field.label);
}
const render = (field, orientation) => `
        <div class="cfb:flex ${orientation === 'horizontal' ? 'cfb:flex-row' : 'cfb:flex-col'}">
            ${renderFieldHeader(field)}
            <div class="${orientation === 'horizontal' ? 'cfb:w-3/4' : ''}">
                <input type="date" 
                           placeholder="${field.placeholder}" 
                           class="cfb:pl-3 cfb:pr-3 cfb:py-2 cfb:w-full cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" 
                           disabled>
                ${renderDescription(field)}
            </div>
        </div>

`;

const renderSettings = (field, formState) => {
    let propertySettings = `
        ${renderCommonPropertySettings(field)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${field.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
       
    `;
    return renderSettingGroup('Property', propertySettings)
        + renderSettingGroup('Validation', renderCommonValidationSettings(field))  + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData, renderer) => {
    settingsInputListeners(['desc', 'placeholder'], updateFieldData);
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