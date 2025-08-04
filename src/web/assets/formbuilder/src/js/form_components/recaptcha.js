import {
    initSettingGroupButton, renderAdvanceSettings,
    renderElementButtonHeader,
    renderSettingGroup,
    settingsInputListeners
} from '../utils.js';

const config = {
    defaultData: {
        handle:'recaptcha',
    }
};

const validate = (field) => {
    return !(!field.handle);
}
const render = (_e, _l) => `
    <div>
        <div class="cfb:flex cfb:justify-between cfb:items-center cfb:mb-1">
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">reCAPTCHA</label>
        </div>
        <div class="cfb:mb-3">
            <p class="cfb:text-sm">The version to use is Recaptcha V3.</p>
        </div>
        <div class="cfb:p-4 cfb:border cfb:border-gray-200 cfb:rounded-md cfb:bg-gray-50">
            <div class="cfb:flex cfb:items-center cfb:gap-4">
                <div class="cfb:w-8 cfb:h-8 cfb:flex cfb:items-center cfb:justify-center cfb:bg-gray-200 cfb:rounded-sm">
                    <span class="cfb:iconify-[mdi--check] cfb:text-gray-600 cfb:w-6 cfb:h-6"></span>
                </div>
                <span class="cfb:text-sm cfb:text-gray-700">I'm not a robot</span>
            </div>
        </div>
    </div>
`;

const renderSettings = (field) => {

    return renderSettingGroup('Advanced', renderAdvanceSettings(field));
};

const initSettings = (updateFieldData) => {
    settingsInputListeners([ 'handle'], updateFieldData);
    initSettingGroupButton();
};

export default {
    config,
    validate,
    render,
    renderSettings,
    initSettings,
};