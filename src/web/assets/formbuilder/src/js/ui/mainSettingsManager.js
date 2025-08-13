/**
 * Manages main settings functionality for the form builder
 */
export class MainSettingsManager {
    // Add this to your mainSettingsManager.js class

    initializeSettingsModal() {
        // Initialize tab functionality
        const tabButtons = document.querySelectorAll('.cfb-settings-tab');
        const tabContents = document.querySelectorAll('.cfb-tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.getAttribute('data-tab');
                
                // Remove active state from all tabs
                tabButtons.forEach(btn => {
                    btn.classList.remove('cfb:text-blue-600', 'cfb:border-blue-600', 'cfb:bg-blue-50', 'cfb-settings-tab-active');
                    btn.classList.add('cfb:text-gray-500', 'cfb:hover:text-gray-700', 'cfb:hover:bg-gray-50');
                });
                
                // Add active state to clicked tab
                e.currentTarget.classList.remove('cfb:text-gray-500', 'cfb:hover:text-gray-700', 'cfb:hover:bg-gray-50');
                e.currentTarget.classList.add('cfb:text-blue-600', 'cfb:border-blue-600', 'cfb:bg-blue-50', 'cfb-settings-tab-active');
                
                // Hide all tab contents
                tabContents.forEach(content => {
                    content.classList.add('cfb:hidden');
                });
                
                // Show target tab content
                const targetContent = document.querySelector(`.cfb-tab-${targetTab}`);
                if (targetContent) {
                    targetContent.classList.remove('cfb:hidden');
                }
            });
        });
        
        // Initialize action on submit radio button functionality
        const actionRadios = document.querySelectorAll('input[name="settings\\[actionOnSubmit\\]"]');;
        const successMessageField = document.querySelector('.cfb-success-message-field');
        const redirectUrlField = document.querySelector('.cfb-redirect-url-field');
        actionRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const selectedAction = e.target.value;
                if (selectedAction === 'message') {
                    successMessageField.style.display = 'block';
                    redirectUrlField.style.display = 'none';
                } else if (selectedAction === 'redirect') {
                    successMessageField.style.display = 'none';
                    redirectUrlField.style.display = 'block';
                }
            });
        });
        this.initializeAdminNotifTab();
        this.initializeIntegrationTab();
    }

    initializeIntegrationTab() {
        document.querySelectorAll('[data-integration]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const selected = button.getAttribute('data-integration');

                // Toggle integration settings
                document.querySelectorAll('.integration-settings').forEach(el => {
                    el.classList.add('cfb:hidden');
                });
                document.getElementById(`integration-${selected}`).classList.remove('cfb:hidden');

                // Remove highlight from all buttons
                document.querySelectorAll('[data-integration]').forEach(btn => {
                    btn.classList.remove('cfb:bg-blue-100', 'cfb:text-blue-700');
                });

                // Add highlight to selected button
                button.classList.add('cfb:bg-blue-100', 'cfb:text-blue-700');
            });
        });

    }
    initializeAdminNotifTab() {
        const manager = this;
        const enabledButton = document.getElementById('form-admin-notif-enabled');
        enabledButton.addEventListener('click', function (e) {
            manager.adminNotifCondition(enabledButton);
        });
        manager.adminNotifCondition(enabledButton)
    }

    adminNotifCondition(enabledButton ) {
        const value = enabledButton.getAttribute('aria-checked');
        const isChecked = value === 'true';
        const adminNotifElements = document.querySelectorAll('.cfb-admin-notif');
        adminNotifElements.forEach(elem => {
            if (isChecked === false) {
                elem.style.display = 'none';
            } else {
                elem.style.display = 'block';
            }
        })
    }
    /**
     * Creates a new main settings manager
     * @param {Object} formState - The form state object
     * @param {Function} onSettingsUpdated - Callback for when settings are updated
     */
    constructor(formState, onSettingsUpdated) {
        // ... your existing constructor code ...
        this.formState = formState;
        this.onSettingsUpdated = onSettingsUpdated;

        // Form settings modal elements
        this.formSettingsModal = document.getElementById('main-settings-modal');
        this.formSettingsButton = document.getElementById('main-settings-btn');
        this.formSettings = document.getElementById('main-settings-form');
        this.closeSettingModals = document.querySelectorAll('.cfb-close-main-settings-modal');

        this.init();
        // Make sure to call this method when initializing your manager
        this.initializeSettingsModal();
    }

    /**
     * Initializes event listeners for the settings modal
     */
    init() {
        // Set up modal event listeners
        this.formSettingsButton.addEventListener('click', () => this.openSettingsModal());
        this.formSettings.addEventListener('submit', (e) => this.updateFormSetting(e));

        this.closeSettingModals.forEach(closeButton =>
            closeButton.addEventListener('click', () => this.closeSettingsModal())
        );

        this.formSettingsModal.addEventListener('click', (e) => {
            if (e.target === this.formSettingsModal) {
                console.log('click');
                this.closeSettingsModal();
            }
        });
    }

    /**
     * Opens the settings modal
     */
    openSettingsModal() {
        this.formSettingsModal.classList.remove('cfb:hidden');
    }

    /**
     * Closes the settings modal
     */
    closeSettingsModal() {
        this.formSettingsModal.classList.add('cfb:hidden');
    }

    /**
     * Updates form settings when the form is submitted
     * @param {Event} e - The form submit event
     */
    updateFormSetting(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const integrationBuffer = {};

        formData.forEach((value, key) => {
            // Match keys like: integrations[test][enabled]
            const integrationMatch = key.match(/^integrations(\[[^\]]+])+$/);
            if (integrationMatch) {
                // Extract all keys inside brackets (allow anything except closing bracket)
                const keys = [...key.matchAll(/\[([^\]]+)]/g)].map(m => m[1]);

                const integrationKey = keys[0];

                if (!integrationBuffer[integrationKey]) {
                    integrationBuffer[integrationKey] = {};
                }

                let current = integrationBuffer[integrationKey];
                for (let i = 1; i < keys.length - 1; i++) {
                    if (!current[keys[i]]) current[keys[i]] = {};
                    current = current[keys[i]];
                }

                current[keys[keys.length - 1]] = value;
                return;
            }

            // Match normal nested keys: settings[collectIp], adminNotif[email], etc.
            const nestedMatch = key.match(/^(\w+)\[(\w+)\]$/);
            if (nestedMatch) {
                const parentKey = nestedMatch[1];
                const childKey = nestedMatch[2];

                if (!this.formState[parentKey]) {
                    this.formState[parentKey] = {};
                }

                this.formState[parentKey][childKey] = value;
            } else {
                // Top-level fields
                this.formState[key] = value;
            }
        });

        // Only save integrations that have at least one setting (non-empty object)
        if (Object.keys(integrationBuffer).length > 0) {
            this.formState.integrations = {};

            for (const [key, settings] of Object.entries(integrationBuffer)) {
                if (Object.keys(settings).length > 0) {
                    this.formState.integrations[key] = settings;
                }
            }
        }
        console.log(this.formState);
        this.closeSettingsModal();
        if (this.onSettingsUpdated) {
            this.onSettingsUpdated();
        }
    }

}