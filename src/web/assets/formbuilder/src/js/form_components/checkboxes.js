import {
    renderSettingGroup,
    renderCommonValidationSettings,
    initCommonValidationSettings,
    renderFieldHeader,
    settingsInputListeners,
    settingInputOptionsListeners,
    renderCommonPropertySettings,
    initSettingGroupButton, renderAdvanceSettings, renderDescription, autoGenerateHandleFromLabel
} from '../utils.js';

const config = {
    defaultData: {
        handle: '',
        label: '',
        desc: '',
        options: [{name: 'Option 1', value: 'Option 1', isDefault: false}, {name: 'Option 2', value: 'Option 2', isDefault: false}],
        required: false,
    },
};

const validate = (field) => {
    return !(!field.handle || !field.label);
}

const render = (field, layout) => {
    const options = field.options.map((opt, idx) => `
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${field.id}_${idx}" name="${field.id}[]" value="${opt.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${field.id}_${idx}" class="cfb:text-sm cfb:text-gray-700">${opt.name}</label>
        </div>
    `).join('');

    return `
        <div class="cfb:flex ${layout === 'horizontal' ? 'cfb:flex-row' : 'cfb:flex-col'}">
            ${renderFieldHeader(field)}
             <div class="${layout === 'horizontal' ? 'cfb:w-3/4' : ''}">
                <div class="cfb:space-y-2 cfb:flex-3">
                    ${options}
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
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${field.options.map(opt => opt.name).join('\n')}</textarea>
        </div>
    `;
    return renderSettingGroup('Property', propertySettings) + renderSettingGroup('Validation', renderCommonValidationSettings(field)) + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData) => {
    settingsInputListeners(['label', 'handle', 'desc'], updateFieldData);
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