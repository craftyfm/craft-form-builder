import {
    initSettingGroupButton,
    labelHandleListener,
    renderAdvanceSettings,
    renderSettingGroup,
    settingsInputListeners
} from '../utils.js';

const config = {
    defaultData: {
        handle: 'submit',
        submitText: 'Submit',
        resetText: 'Reset',
        submitStyle: 'primary',
        resetStyle: 'secondary',
        spacing: 'wide',
    },
};
const validate = (field) => {
    return !(!field.handle);
}
const render = (field, _) => {
    const submitClass = field.submitStyle === 'primary'
        ? 'cfb:bg-blue-600 cfb:text-white'
        : 'cfb:bg-gray-600 cfb:text-white';

    const resetClass = field.resetStyle === 'primary'
        ? 'cfb:bg-blue-600 cfb:text-white'
        : field.resetStyle === 'secondary'
            ? 'cfb:bg-gray-500 cfb:text-white'
            : 'cfb:bg-red-500 cfb:text-white';

    const spacingClass = field.spacing === 'wide'
        ? 'cfb:justify-between'
        : field.spacing === 'tight'
            ? 'cfb:gap-2'
            : 'cfb:gap-4';

    return `
        <div>
            <div class="cfb:flex cfb:justify-between cfb:items-center cfb:mb-3">
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">Submit Button</label>
            </div>
            <div class="cfb:flex ${spacingClass}">
                <button type="reset" class="cfb:px-3 cfb:py-1 cfb:rounded-sm cfb:text-sm cfb:cursor-not-allowed ${resetClass}" disabled>
                    ${field.resetText}
                </button>
                <button type="submit" class="cfb:px-3 cfb:py-1 cfb:rounded-sm cfb:text-sm cfb:cursor-not-allowed ${submitClass}" disabled>
                    ${field.submitText}
                </button>
            </div>
        </div>
    `;
};

const renderSettings = (field) => {
    const propertySettings = `
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Submit Text</label>
            <input type="text" id="setting-submit-text" value="${field.submitText}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Reset Text</label>
            <input type="text" id="setting-reset-text" value="${field.resetText}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Submit Style</label>
            <select id="setting-submit-style" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="primary" ${field.submitStyle === 'primary' ? 'selected' : ''}>Primary</option>
                <option value="secondary" ${field.submitStyle === 'secondary' ? 'selected' : ''}>Secondary</option>
            </select>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Reset Style</label>
            <select id="setting-reset-style" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="primary" ${field.resetStyle === 'primary' ? 'selected' : ''}>Primary</option>
                <option value="secondary" ${field.resetStyle === 'secondary' ? 'selected' : ''}>Secondary</option>
                <option value="danger" ${field.resetStyle === 'danger' ? 'selected' : ''}>Danger</option>
            </select>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Spacing</label>
            <select id="setting-spacing" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="wide" ${field.spacing === 'wide' ? 'selected' : ''}>Wide</option>
                <option value="normal" ${field.spacing === 'normal' ? 'selected' : ''}>Normal</option>
            </select>
        </div>
    `;
    return renderSettingGroup('Property', propertySettings)  + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData) => {
    document.getElementById('setting-submit-text')?.addEventListener('input', (e) => updateFieldData('submitText', e.target.value));
    document.getElementById('setting-reset-text')?.addEventListener('input', (e) => updateFieldData('resetText', e.target.value));
    document.getElementById('setting-submit-style')?.addEventListener('change', (e) => updateFieldData('submitStyle', e.target.value));
    document.getElementById('setting-reset-style')?.addEventListener('change', (e) => updateFieldData('resetStyle', e.target.value));
    document.getElementById('setting-spacing')?.addEventListener('change', (e) => updateFieldData('spacing', e.target.value));
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