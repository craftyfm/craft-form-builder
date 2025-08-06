import {
    initSettingGroupButton,
    labelHandleListener,
    renderAdvanceSettings,
    renderSettingGroup,
    settingsInputListeners
} from '../utils.js';

const config = {
    defaultData: {
        handle:'image',
        src: '',
        alt: '',
        width: null,
        height: null,
        alignment: 'start',
    },
};
const validate = (field) => {
    return !(!field.handle);
}
const render = (field, _l) => {
    const width = field.width ? `${field.width}px` : 'auto';
    const height = field.height ? `${field.height}px` : 'auto';
    const widthAttr = field.width ? `width="${field.width}"` : '';
    const heightAttr = field.height ? `height="${field.height}"` : '';

    return `
    <div class="cfb:flex cfb:justify-${field.alignment} cfb:items-start">
        <img 
            ${widthAttr} ${heightAttr}
            src="${field.src}" 
            alt="${field.alt || ''}" 
            style="width: ${width}; height: ${height};"
            class="cfb:object-fill" 
        />
    </div>
`;

};

const renderSettings = (field) => {
    const propertySettings = `
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Image URL</label>
            <textarea id="setting-src" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">${field.src}</textarea>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Alt</label>
            <textarea id="setting-alt" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">${field.alt}</textarea>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Width (px)</label>
            <input type="number" id="setting-width" value="${field.width ? field.width : ''}" 
                placeholder="auto" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Height (px)</label>
            <input type="number" id="setting-height" value="${field.height ? field.height : ''}" 
                placeholder="auto" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
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
    settingsInputListeners(['handle', 'src', 'alt', 'width', 'height'], updateFieldData);
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