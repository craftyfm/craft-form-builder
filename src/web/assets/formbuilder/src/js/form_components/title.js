import {
    initSettingGroupButton,
    renderAdvanceSettings,
    renderElementButtonHeader,
    renderSettingGroup
} from '../utils.js';

const config = {
    defaultData: {
        handle: 'title',
        text: 'Title Text',
        level: 'h2',
        alignment: 'start',
    },
};
const validate = (field) => {
    return !(!field.handle);
}
const render = (field, _l) => {
    const Tag = field.level;
    const alignmentClass = `cfb:text-${field.alignment}`;
    return `
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <${Tag} class="${alignmentClass} cfb:w-full cfb:font-bold">${field.text}</${Tag}>
        </div>
    `;
};

const renderSettings = (field) => {
    const propertySettings = `
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Text</label>
            <input type="text" id="setting-text" value="${field.text}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Level</label>
            <select id="setting-level" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="h1" ${field.level === 'h1' ? 'selected' : ''}>H1</option>
                <option value="h2" ${field.level === 'h2' ? 'selected' : ''}>H2</option>
                <option value="h3" ${field.level === 'h3' ? 'selected' : ''}>H3</option>
                <option value="h4" ${field.level === 'h4' ? 'selected' : ''}>H4</option>
                <option value="h5" ${field.level === 'h5' ? 'selected' : ''}>H5</option>
                <option value="h6" ${field.level === 'h6' ? 'selected' : ''}>H6</option>
            </select>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Alignment</label>
            <select id="setting-alignment" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="start" ${field.alignment === 'start' ? 'selected' : ''}>Left</option>
                <option value="center" ${field.alignment === 'center' ? 'selected' : ''}>Center</option>
                <option value="end" ${field.alignment === 'end' ? 'selected' : ''}>Right</option>
            </select>
        </div>
    `;
    return renderSettingGroup('Property', propertySettings)  + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData) => {
    document.getElementById('setting-handle')?.addEventListener('input', (e) => updateFieldData('handle', e.target.value));
    document.getElementById('setting-text')?.addEventListener('input', (e) => updateFieldData('text', e.target.value));
    document.getElementById('setting-level')?.addEventListener('change', (e) => updateFieldData('level', e.target.value));
    document.getElementById('setting-alignment')?.addEventListener('change', (e) => updateFieldData('alignment', e.target.value));
    initSettingGroupButton();
};

export default {
    config,
    validate,
    render,
    renderSettings,
    initSettings,
};