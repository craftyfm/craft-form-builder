import {
    renderSettingGroup,
    renderCommonPropertySettings,
    renderCommonValidationSettings,
    initCommonValidationSettings,
    renderFieldHeader,
    settingsInputListeners,
    settingInputOptionsListeners,
    initSettingGroupButton,
    renderAdvanceSettings, renderDescription, autoGenerateHandleFromLabel
} from '../utils.js';

const config = {
    defaultData: {
        handle: '',
        label: '',
        desc: '',
        placeholder: 'Choose an option...',
        options: [{name: 'Option 1', value: 'Option 1', isDefault: false}, {name: 'Option 2', value: 'Option 2', isDefault: false}],
        required: false,
    },
};

const validate = (field) => {
    return !(!field.handle || !field.label);
}

const render = (field, layout) => {
    const options = field.options.map(opt => `<option value="${opt.value}">${opt.name}</option>`).join('');
    return `
         <div class="cfb:flex ${layout === 'horizontal' ? 'cfb:flex-row' : 'cfb:flex-col'}">
            ${renderFieldHeader(field)}
            <div class="${layout === 'horizontal' ? 'cfb:w-3/4' : ''}">
                <select class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" disabled>
                    <option value="">${field.placeholder}</option>
                    ${options}
                </select>
                ${renderDescription(field)}
            </div>
        </div>
    `;
};

const renderSettings = (field) => {
    const propertySettings = `
        ${renderCommonPropertySettings(field)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${field.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${field.options.map(opt => opt.name).join('\n')}</textarea>
        </div>
    `;
    return renderSettingGroup('Property', propertySettings)
        + renderSettingGroup('Validation', renderCommonValidationSettings(field))  + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData) => {
    settingsInputListeners(['label', 'handle', 'desc', 'placeholder'], updateFieldData);
    settingInputOptionsListeners(updateFieldData);
    initCommonValidationSettings(updateFieldData);
    initSettingGroupButton();
    autoGenerateHandleFromLabel(updateFieldData);
};

export default {
    config,
    validate,
    render,
    renderSettings,
    initSettings,
};