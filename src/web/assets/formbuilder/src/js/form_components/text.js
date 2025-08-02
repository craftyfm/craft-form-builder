import {
    renderSettingGroup,
    renderCommonPropertySettings,
    renderCommonValidationSettings,
    initCommonValidationSettings,
    renderFieldHeader,
    settingsInputListeners,
    initSettingGroupButton,
    renderAdvanceSettings,
    renderDescription,
    autoGenerateHandleFromLabel
} from '../utils.js';

const config = {
    defaultData: {
        handle: '',
        label: '',
        desc: '',
        placeholder: 'Enter text...',
        icon: '',
        iconSvg: null,
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
                <div class="cfb:relative cfb:w-full cfb:flex-3">
                    ${
                        field?.iconSvg
                            ? `
                                    <div class="cfb:absolute cfb:inset-y-0 cfb:left-0 cfb:pl-3 cfb:flex cfb:items-center pointer-events-none">
                                        <div class="cfb:w-5 cfb:h-5 cfb:text-gray-700 cfb:flex cfb:items-center cfb:justify-center">
                                            ${field.iconSvg}   
                                        </div>
                                    </div>
                                    `
                            : ''
                    }
                    <input type="text" 
                           placeholder="${field.placeholder}" 
                           class="${field.iconSvg ? 'cfb:pl-10' : 'cfb:pl-3'} cfb:pr-3 cfb:py-2 cfb:w-full cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" 
                           disabled>
                </div>
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
    if (formState.settings.icons !== '') {
        propertySettings += `<div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Icon</label>
            <div id="setting-icon" class="icon-picker">    
                <div class="icon-picker--icon" role="img" tabindex="0">
                    ${field.iconSvg ? field.iconSvg : '' }
                </div>
                <button type="button" class="icon-picker--choose-btn btn" tabindex="0">
                    Change
                </button>
                <button type="button" class="icon-picker--remove-btn btn" tabindex="0">Remove</button>
                <input type="hidden" name="name" value="">
            </div>
        </div>`
    }
    return renderSettingGroup('Property', propertySettings)
        + renderSettingGroup('Validation', renderCommonValidationSettings(field))  + renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData, renderer) => {
    settingsInputListeners(['label', 'handle', 'desc', 'placeholder'], updateFieldData);
    initCommonValidationSettings(updateFieldData);
    initSettingGroupButton();
    if(renderer.formState.settings.icons !== '') {
        renderer.iconPicker.init('setting-icon', renderer.formState.settings.icons)
    }
    autoGenerateHandleFromLabel(updateFieldData);

};

export default {
    config,
    validate,
    render,
    renderSettings,
    initSettings,
};