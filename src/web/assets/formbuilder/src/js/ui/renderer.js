import {components} from '../form_components';
import {deepCopy, renderElementButtonHeader} from '../utils.js';
import {handleDragEnd, handleDragStart} from "./dragDrop";
import {IconifyPicker} from "./components/IconPicker";

/**
 * Handles all rendering-related functionality for the form builder
 */
export class Renderer {
    constructor(formState, selectionCallback) {
        this.formContainer = document.getElementById('form-container');
        this.settingsContainer = document.getElementById('settings-container');
        this.formState = formState;
        this.selectedFieldId = null;
        this.selectionCallback = selectionCallback;
        this.iconPicker = new IconifyPicker(this.updateFieldData);
    }

    /**
     * Checks if the form is empty and shows/hides the empty state
     */
    checkEmptyState() {
        if (this.formState.fields.length === 0) {
            this.formContainer.innerHTML = ` <div class="empty-state cfb:flex cfb:flex-col cfb:items-center cfb:justify-center cfb:h-full cfb:text-gray-500 cfb:text-center"
                 id="emptyState">
                <span class="cfb:iconify-[mdi--add-bold] cfb:text-5xl cfb:mb-4"></span>
                <p class="cfb:text-lg">Drag components here to build your form</p>
            </div>`;
        }
    }

    /**
     * Renders the entire form based on current form state
     */
    renderForm() {
        this.formContainer.innerHTML = '';
        this.formState.fields.forEach((field, index) => {
            const component = components[field.type];
            if (component) {
                const isError = component.validate(field) === false;
                const fieldElementWrapper = document.createElement('div');
                fieldElementWrapper.classList.add(
                    'form-field-wrapper',
                    'cfb:group',
                    'cfb:px-4',
                    'cfb:pb-4',
                    'cfb:pt-2',
                    'cfb:border',
                    'cfb:hover:border-blue-500',
                    'cfb:rounded-md',
                    'cfb:cursor-pointer',
                );

                if (field.id === this.selectedFieldId) {
                    fieldElementWrapper.classList.add('cfb:border-blue-500', 'cfb:bg-blue-50');
                } else if (isError) {
                    fieldElementWrapper.classList.add('cfb:border-red-500', 'cfb:bg-red-50');
                } else {
                    fieldElementWrapper.classList.add('cfb:border-transparent');
                }

                fieldElementWrapper.dataset.id = field.id;
                fieldElementWrapper.dataset.index = index.toString();
                const elementButton = renderElementButtonHeader();

                fieldElementWrapper.innerHTML = `<div>${elementButton}</div>
                                            ${component.render(field, this.formState.settings.orientation)}`;

                fieldElementWrapper.draggable = true;
                fieldElementWrapper.querySelector('.delete-container').innerHTML = `
                    <div class="cfb:relative">
                        <button class="delete-field cfb:text-gray-400 hover:cfb:text-red-500 cfb:transition-colors" data-id="${field.id}">
                            <span class="cfb:iconify-[mdi-light--delete] cfb:w-4 cfb:h-4 cfb:text-red-600"></span>
                        </button>
                        <span class="cfb:delete-tooltip">
                            Remove
                        </span>
                    </div>
                `;

                this.formContainer.appendChild(fieldElementWrapper);

                // Set drag handlers
                fieldElementWrapper.addEventListener('dragstart', handleDragStart);
                fieldElementWrapper.addEventListener('dragend', handleDragEnd);
            }
        });

        this.checkEmptyState();
    }

    /**
     * Renders the settings panel for the selected element
     */
    renderSettings() {
        const selectedField = this.formState.fields.find(el => el.id === this.selectedFieldId);
        if (selectedField) {
            const component = components[selectedField.type];
            if (component && component.renderSettings) {
                this.settingsContainer.innerHTML = component.renderSettings(selectedField, this.formState);
                if (component.initSettings) {
                    component.initSettings(this.updateFieldData, this);
                }
            } else {
                this.settingsContainer.innerHTML = '<div class="cfb:p-4 cfb:text-gray-500">No settings available.</div>';
            }
        } else {
            this.settingsContainer.innerHTML = ` <div class="no-selection cfb:text-center cfb:text-gray-500 cfb:mt-10">
                                                        <span class="cfb:iconify-[mdi--settings] cfb:text-5xl cfb:mb-4"></span>
                                                    <p>Select a component to edit</p>
                                                </div>`;
                }
    }

    /**
     * Sets the selected field and updates the UI
     * @param {string} fieldId - The ID of the field to select
     */
    selectField(fieldId) {
        this.selectedFieldId = fieldId;
        this.renderForm();
        this.renderSettings();

        if (this.selectionCallback) {
            this.selectionCallback(fieldId);
        }
    }

    /**
     * Attaches event listeners to form fields
     */
    setupEventListeners() {
        // Click handler for selecting fields and delete buttons
        this.formContainer.addEventListener('click', (e) => {
            const wrapper = e.target.closest('.form-field-wrapper');
            if (wrapper) {
                this.selectField(wrapper.dataset.id);
            }

            const deleteButton = e.target.closest('.delete-field');
            if (deleteButton) {
                e.stopPropagation();
                const id = deleteButton.dataset.id;
                this.deleteField(id);
            }
        });
    }

    updateFieldData = (attr, value, renderForm = true) => {
        const element = this.formState.fields.find(el => el.id === this.selectedFieldId);
        if (element) {
            element[attr] = value;
            if (renderForm) {
                this.renderForm();
            }
        }
    }

    deleteField = (id) => {
        this.formState.fields = this.formState.fields.filter(el => el.id !== id);
        if (this.selectedFieldId === id) {
            this.selectedFieldId = null;
            this.selectField(null);
        } else {
            this.renderForm();
        }
    }

    /**
     * Generates the next available handle for a field
     * @param {string} baseHandle - The base handle from the component config
     * @returns {string} - The next available unique handle
     */
    generateUniqueHandle(baseHandle) {
        // If the base handle is already unique, use it as-is
        const isHandleAvailable = (handle) => {
            return !this.formState.fields.some(field => field.handle === handle);
        };

        if (isHandleAvailable(baseHandle)) {
            return baseHandle;
        }

        // Find all existing handles with the same base
        const existingNumbers = this.formState.fields
            .map(field => field.handle)
            .filter(handle => handle && handle.startsWith(baseHandle))
            .map(handle => {
                // Extract number from handle (e.g., "textField2" -> 2)
                const match = handle.match(new RegExp(`^${baseHandle}(\\d+)$`));
                return match ? parseInt(match[1], 10) : 0;
            })
            .filter(num => !isNaN(num))
            .sort((a, b) => a - b);

        // Find the next available number
        let nextNumber = 1;
        for (const num of existingNumbers) {
            if (num === nextNumber) {
                nextNumber++;
            } else if (num > nextNumber) {
                break;
            }
        }

        return `${baseHandle}${nextNumber}`;
    }

    /**
     * Checks if only one captcha field is active in the form
     * @param {string} excludeFieldId - Optional field ID to exclude from the check (useful when adding a new captcha)
     * @returns {boolean} - True if only one or no captcha is active, false if multiple captchas are found
     */
    checkOnlyCaptchaActive(excludeFieldId = null) {
        const captchaTypes = ['recaptcha', 'hcaptcha', 'captcha']; // Add more captcha types as needed
        
        const activeCaptchas = this.formState.fields.filter(field => {
            // Skip the excluded field if provided
            if (excludeFieldId && field.id === excludeFieldId) {
                return false;
            }
            
            // Check if field is a captcha type and is enabled/active
            return captchaTypes.includes(field.type);
        });
        
        return activeCaptchas.length < 1;
    }

    addField = (type, index) => {
        const component = components[type];
        if (component) {
            // Check if trying to add a captcha when one is already active
            const captchaTypes = ['recaptcha', 'hcaptcha', 'captcha'];
            if (captchaTypes.includes(type) && !this.checkOnlyCaptchaActive()) {
                // Show warning or prevent adding
                alert('Only one captcha field can be active at a time');
                // You might want to show a user-friendly notification here
                return false;
            }

            let newField = {
                id: crypto.randomUUID(),
                type: type,
                ...deepCopy(component.config.defaultData),
            };
            
            // Generate unique handle if the component has a handle
            if (component.config.defaultData.handle !== undefined || component.config.defaultData.handle !== '') {
                newField.handle = this.generateUniqueHandle(component.config.defaultData.handle);
            }
            
            if (index !== null) {
                this.formState.fields.splice(Math.max(index, 0), 0, newField);
            } else {
                this.formState.fields.push(newField);
            }
            this.selectField(newField.id);
            return true;
        }
        return false;
    }

    moveField = (from, to) => {
        if (to === null) {
            to = this.formState.fields.length;
        }

        // Clamp the `to` value
        to = Math.max(Math.min(to, this.formState.fields.length), 0);

        if (from === to || from < 0 || from >= this.formState.fields.length) {
            return; // no need to move
        }

        const fields = this.formState.fields;

        // Remove the item from the `from` index
        const [movedItem] = fields.splice(from, 1);

        // Insert it at the `to` index (adjust if needed after removal)
        if (from < to) {
            to--; // array is now one shorter
        }

        fields.splice(to, 0, movedItem);

        this.renderForm();
        this.renderSettings();
    };

}