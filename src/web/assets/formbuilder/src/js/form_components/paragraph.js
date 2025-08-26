import {
    initSettingGroupButton,
    labelHandleListener,
    renderAdvanceSettings,
    renderSettingGroup,
    settingsInputListeners
} from '../utils.js';

const config = {
    defaultData: {
        handle: 'paragraph',
        text: 'This is a paragraph of text.',
        alignment: 'start',
    },
};
const validate = (field) => {
    return !(!field.handle);
}
const render = (field) => {
    const alignmentClass = `cfb:text-${field.alignment}`;
    return `
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <p class="${alignmentClass} cfb:w-full">${field.text}</p>
        </div>
    `;
};

const renderSettings = (field) => {
    const propertySettings = `
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Text</label>
            <textarea id="setting-text" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="6">${field.text}</textarea>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Alignment</label>
            <select id="setting-alignment" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="start" ${field.alignment === 'start' ? 'selected' : ''}>Left</option>
                <option value="center" ${field.alignment === 'center' ? 'selected' : ''}>Center</option>
                <option value="end" ${field.alignment === 'end' ? 'selected' : ''}>Right</option>
                <option value="justify" ${field.alignment === 'justify' ? 'selected' : ''}>Justify</option>
            </select>
        </div>
    `;
    return renderSettingGroup('Property', propertySettings)  + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData) => {
    settingsInputListeners(['text'], updateFieldData);
    document.getElementById('setting-alignment')?.addEventListener('change', (e) => updateFieldData('alignment', e.target.value));
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