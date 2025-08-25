export default class IntegrationMappingManager {
    constructor({ listDropdownContainer, fieldMappingContainerEl, listEndpoint, integrationHandle, selectedListId }) {
        if (!listDropdownContainer || !fieldMappingContainerEl || !listEndpoint || !integrationHandle) {
            throw new Error("Missing required parameters.");
        }

        this.refreshBtn = listDropdownContainer.querySelector("button");
        this.listDropdownEl = listDropdownContainer.querySelector("select");
        this.fieldMappingContainerEl = fieldMappingContainerEl;
        this.listEndpoint = listEndpoint;
        this.globalFieldsVar = Craft.FormBuilder.formState;
        this.integrationHandle = integrationHandle;
        this.selectedListId = selectedListId === undefined ? null : selectedListId;
        this.lists = [];
        this.init();
    }

    async init() {
        await this.loadLists();
        this.listDropdownEl.addEventListener("change", () => {
            this.selectedListId = this.listDropdownEl.value;
            this.generateFieldMapping();
        });
        document.getElementById('main-settings-btn').addEventListener('click', () => {
            this.generateFieldMapping();
        })
        this.refreshBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await this.loadLists();
        })
    }

    loading() {
        this.refreshBtn.classList.add("cfb:loading");
    }

    finishedLoading() {
        if (this.refreshBtn.classList.contains("cfb:loading")) {
            this.refreshBtn.classList.remove("cfb:loading");
        }
    }

    async loadLists() {
        this.loading();
        try {
            const res = await fetch(this.listEndpoint, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!res.ok) throw new Error(`Failed to load lists: ${res.statusText}`);

            const data = await res.json();
            this.lists = data.lists;
            this.populateListDropdown();
            if (this.selectedListId) {
                this.generateFieldMapping();
            }
        } catch (err) {
            console.error("Error loading lists:", err);
        }

        this.finishedLoading();
    }

    currentList() {
        return this.lists.find(list => list.id === this.selectedListId);
    }

    populateListDropdown() {
        this.listDropdownEl.innerHTML = `<option value="">Select a list</option>`;
        this.lists.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.id;
            opt.textContent = item.name;
            if (item.id === this.selectedListId) {
                opt.selected = true;
            }
            this.listDropdownEl.appendChild(opt);
        });
    }

    generateFieldNameHandle(name) {
        return 'integrations[' + this.integrationHandle + '][fieldMapping][' + name + ']';
    }
    generateFieldMapping() {
        this.fieldMappingContainerEl.innerHTML = "";
        this.fieldMappingContainerEl.className = "";
        const currentList = this.currentList();

        if (!currentList) return;
        this.fieldMappingContainerEl.className = "cfb:border cfb:border-gray-200 cfb:rounded";
        const currentFields = this.globalFieldsVar.integrations[this.integrationHandle].fieldMapping ?? {};

        currentList.fields.forEach(field => {
            const row = document.createElement("div");
            row.className = "cfb:grid cfb:grid-cols-2 cfb:border-b cfb:border-gray-100 cfb:hover:bg-gray-50 cfb:transition-colors";

            const labelCol = document.createElement("div");
            labelCol.className = "cfb:px-6 cfb:border-r cfb:border-gray-200 cfb:flex cfb:items-center";
            labelCol.innerHTML = `<span class="cfb:text-gray-800">${field.label}</span>${field.required ? '<span class="cfb:text-red-500 cfb:ml-1">*</span>' : ''}`;

            const selectCol = document.createElement("div");
            selectCol.className = "cfb:px-6 cfb:py-2";

            const select = document.createElement("select");
            select.name = this.generateFieldNameHandle(field.handle);
            select.className = "cfb:px-3 cfb:py-2 cfb:w-64 cfb:border cfb:border-gray-300 cfb:rounded-lg focus:cfb:outline-none focus:cfb:ring-2 focus:cfb:ring-blue-500 focus:cfb:border-blue-500";

            select.innerHTML = `<option value="">Select an option</option>`;
            const currentValue = currentFields[field.handle] ?? null;
            (this.getFieldOptions(field)).forEach(optData => {
                const opt = document.createElement("option");
                opt.value = optData.id;
                opt.textContent = optData.label;
                if (optData.id === currentValue) {
                    opt.selected = true;
                }
                select.appendChild(opt);
            });

            selectCol.appendChild(select);

            row.appendChild(labelCol);
            row.appendChild(selectCol);

            this.fieldMappingContainerEl.appendChild(row);
        });
    }

    getFieldOptions(field) {
        const formFields = this.globalFieldsVar.fields;
        if (!formFields) return [];
        return formFields.filter(opt => {
            if (field.handle === '') {
                return false;
            }
            if (field.type === 'string') {
                return ['text', 'url', 'textarea', 'email', 'phone'].includes(opt.type);
            } else if (field.type === 'date') {
                return opt.type === 'date';
            }
            return false; // or true if you want to allow all others
        });
    }
    refreshLists() {
        return this.loadLists();
    }
}
