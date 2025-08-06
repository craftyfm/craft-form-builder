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
        placeholder: 'Enter your message...',
        desc:'',
        rows: 4,
        required: false,
        minlength: 0,
        maxlength: 0,
    },
};
const validate = (field) => {
    return !(!field.handle || !field.label);
}
const render = (field, layout) => `
     <div class="cfb:flex ${layout === 'horizontal' ? 'cfb:flex-row' : 'cfb:flex-col'}">
        ${renderFieldHeader(field)}
        <div class="${layout === 'horizontal' ? 'cfb:w-3/4' : ''}">
            <textarea placeholder="${field.placeholder}" 
                      rows="${field.rows}" 
                      class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50 cfb:resize-none" 
                      disabled></textarea>
            ${renderDescription(field)}
        </div>
    </div>
`;

const renderSettings = (field) => {
    const propertySettings = `
        ${renderCommonPropertySettings(field)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${field.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Rows</label>
            <input type="number" id="setting-rows" value="${field.rows}" min="1" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `;

    const validationSettings = `
        ${renderCommonValidationSettings(field)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Min Length</label>
            <input type="number" id="setting-minlength" value="${field.minlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max Length</label>
            <input type="number" id="setting-maxlength" value="${field.maxlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `;

    return renderSettingGroup('Property', propertySettings)
        + renderSettingGroup('Validation', validationSettings)  + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData,) => {
    settingsInputListeners(['desc', 'placeholder'], updateFieldData);
    document.getElementById('setting-rows')?.addEventListener('input', (e) => updateFieldData('rows', parseInt(e.target.value, 10)));
    initCommonValidationSettings(updateFieldData);
    document.getElementById('setting-minlength')?.addEventListener('input', (e) => updateFieldData('minlength', parseInt(e.target.value, 10)));
    document.getElementById('setting-maxlength')?.addEventListener('input', (e) => updateFieldData('maxlength', parseInt(e.target.value, 10)));
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