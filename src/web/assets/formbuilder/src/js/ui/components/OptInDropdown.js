export default class OptInDropdown {
    constructor(selectEl, integrationHandle) {
        this.selectEl = selectEl;
        this.integrationHandle = integrationHandle;
        this.globalVar = Craft.FormBuilder.formState;
        // Rerender when settings menu is clicked
        document.getElementById('main-settings-btn').addEventListener('click', (e) => {
            this.renderOptions();
        });
    }

    renderOptions() {
        // Clear old options
        this.selectEl.innerHTML = '';

        // Get available fields from global Craft variable
        const availableFields = this.globalVar.fields || [];
        console.log(this.globalVar);
        console.log(this.integrationHandle);
        // Get current selected from integrations
        const currentSelected = this.globalVar.integrations[this.integrationHandle]?.optIn || '';
        this.selectEl.innerHTML = `<option value="">Select an option</option>`;
        // Populate dropdown
        availableFields.forEach(field => {
            if (field.type !== 'checkbox' || field.handle === '') {
                return;
            }
            const option = document.createElement('option');
            option.value = field.id;
            option.textContent = field.label;

            if (field.id === currentSelected) {
                option.selected = true;
            }

            this.selectEl.appendChild(option);
        });
    }
}
