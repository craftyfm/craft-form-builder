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
        desc: '',
        allowedExtensions: '',
        limit: 1,
        required: false,
        maxSize: 0,
    },
};
const validate = (field) => {
    return !(!field.handle || !field.label);
}
const render = (field, orientation) => `
    <div class="cfb:flex ${orientation === 'horizontal' ? 'cfb:flex-row' : 'cfb:flex-col'}">
        ${renderFieldHeader(field)}
        <div class="${orientation === 'horizontal' ? 'cfb:w-3/4' : ''}">
            <div class="">
                <div class="cfb:flex cfb:items-center cfb:justify-center cfb:w-full cfb:flex-3">
                  <input type="file"
                           class="cfb:w-full cfb:text-slate-500 cfb:font-medium cfb:text-sm cfb:bg-gray-100
                           cfb:file:cursor-pointer cfb:cursor-pointer cfb:file:border-0 cfb:file:py-2 cfb:file:px-4 cfb:file:mr-4
                           cfb:file:bg-blue-500 cfb:file:hover:bg-gray-700 cfb:file:text-white cfb:rounded" disabled/>
                </div>
            </div>
            ${renderDescription(field)}
        </div>
    </div>
`;

const renderSettings = (field) => {
    const propertySettings = `
        ${renderCommonPropertySettings(field)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Accepted Extensions</label>
            <input type="text" id="setting-allowedExtensions" value="${field.allowedExtensions}" placeholder="e.g. pdf, jpg" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
            <p class="cfb:mt-1 cfb:text-sm cfb:text-gray-500">
              Enter file extensions, separated by commas (e.g. jpg, png, pdf). Leave empty to allow all.
            </p>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Limit</label>
            <input type="number" id="setting-limit" value="${field.limit}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `;

    const validationSettings = `
        ${renderCommonValidationSettings(field)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max File Size in MBs</label>
            <input type="number" id="setting-maxSize" value="${field.maxSize ? field.maxSize : ''}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;

    return renderSettingGroup('Property', propertySettings) + renderSettingGroup('Validation', validationSettings)  + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData) => {
    settingsInputListeners(['allowedExtensions', 'limit', 'desc'], updateFieldData);
    initCommonValidationSettings(updateFieldData);
    document.getElementById('setting-maxSize')?.addEventListener('input', (e) => updateFieldData('maxSize', e.target.value));
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