import {
    renderSettingGroup,
    renderCommonValidationSettings,
    initCommonValidationSettings,
    initSettingGroupButton,
    renderFieldHeader,
    renderElementButtonHeader,
    settingsInputListeners, renderAdvanceSettings
} from '../utils.js';

const config = {
    defaultData: {
        handle: 'hcaptcha',
        siteKey: '',
        privateKey: '',
        required: true,
    },
};
const validate = (field) => {
    return true;
}
const render = (field) => `
    <div>
        <div class="cfb:flex cfb:justify-between cfb:items-center cfb:mb-3">
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">hCaptcha</label>
        </div>
        <div class="cfb:p-4 cfb:border cfb:border-gray-200 cfb:rounded-md cfb:bg-gray-50">
            <div class="cfb:flex cfb:items-center cfb:gap-4">
                <div class="cfb:w-8 cfb:h-8 cfb:flex cfb:items-center cfb:justify-center cfb:bg-gray-200 cfb:rounded-sm">
                    <span class="cfb:iconify-[mdi--check] cfb:text-gray-600 cfb:w-6 cfb:h-6"></span>
                </div>
                <span class="cfb:text-sm cfb:text-gray-700">I am human</span>
            </div>
        </div>
    </div>
`;

const renderSettings = (field) => {
    // hCaptcha is always required.
    return  renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData) => {
    settingsInputListeners(['handle'], updateFieldData);
    initSettingGroupButton();
};

export default {
    config,
    validate,
    render,
    renderSettings,
    initSettings,
};