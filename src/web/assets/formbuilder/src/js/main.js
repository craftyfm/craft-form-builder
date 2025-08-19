import '../css/main.css';
import {Renderer} from './ui/renderer.js';
import {MainSettingsManager} from './ui/mainSettingsManager.js';
import {initDragDrop} from "./ui/dragDrop";
import {registerPreviewEventListeners} from "./ui/preview";
import {saveForm} from "./ui/saveForm";
import IntegrationMappingManager from './ui/components/IntegrationMappingManager.js';
import OptInDropdown from "./ui/components/OptInDropdown";

if (typeof Craft.FormBuilder === typeof undefined) {
    Craft.FormBuilder = {};
}

Craft.FormBuilder.IntegrationMappingManager = IntegrationMappingManager;
Craft.FormBuilder.OptInDropdown = OptInDropdown;

let formState = {
    name: window.FormBuilderData?.name || 'Form',
    handle: window.FormBuilderData?.handle || '',
    id: window.FormBuilderData?.id || null,
    settings: window.FormBuilderData?.settings,
    adminNotif: {
        enabled: window.FormBuilderData?.adminNotif.enabled || false,
        subject: window.FormBuilderData?.adminNotif.subject || '',
        recipients: window.FormBuilderData?.adminNotif.recipients || '',
        message: window.FormBuilderData?.adminNotif.message || '',
    },
    userNotif: {
        enabled: window.FormBuilderData?.userNotif.enabled || false,
        subject: window.FormBuilderData?.userNotif.subject || '',
        templateId: window.FormBuilderData?.userNotif.templateId || '',
        recipients: window.FormBuilderData?.userNotif.recipients || '',
        message: window.FormBuilderData?.userNotif.message || '',
    },
    fields:window.FormBuilderData?.fields || [],
    integrations:window.FormBuilderData?.integrations || [],
};

Object.defineProperty(Craft.FormBuilder, 'formState', {
    get() {
        return formState;
    },
    configurable: false,
    enumerable: true
});

document.addEventListener('DOMContentLoaded', () => {
    // Main containers
    const formContainer = document.getElementById('form-container');

    let selectedFieldId = null;


    // Initialize the renderer
    const renderer = new Renderer(formState, (fieldId) => {
        selectedFieldId = fieldId;
    });

    // Initialize the main settings manager
    const mainSettingsManager = new MainSettingsManager(formState, () => {
        renderer.renderForm();
        renderer.renderSettings();
    });

    // Set up event handlers for the renderer
    renderer.setupEventListeners();
    initDragDrop(renderer, formState, formContainer);

    // --- Initial Render ---
    renderer.checkEmptyState();
    renderer.renderForm();
    renderer.renderSettings();

    registerPreviewEventListeners(formState);

    document.getElementById('save-form').addEventListener('click', () => {
        saveForm(formState)
            .then((updatedFormState) => {
                // FormState has been updated, now refresh any UI that depends on it
                console.log('Form saved successfully, formState updated:', updatedFormState);
                
                // Re-render components that might depend on the updated formState
                renderer.renderForm();
                renderer.renderSettings();
                
                // Update any other components that might need refreshing
                // For example, if you have breadcrumbs or page title that show form name:
                updatePageTitle(formState.settings.name);
            })
            .catch((error) => {
                console.error('Failed to save form:', error);
                // Error message is already displayed by saveForm function
            });
    });
    
    // Helper function to update page title or other UI elements
    function updatePageTitle(formName) {
        const pageTitle = document.querySelector('h1, .page-title');
        if (pageTitle && formName) {
            pageTitle.textContent = formName;
        }
        document.title = formName;
    }
});