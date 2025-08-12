export default class IntegrationMappingManager {
    constructor({ listDropdownEl, fieldMappingContainerEl, listEndpoint, globalFieldsVar }) {
        if (!listDropdownEl || !fieldMappingContainerEl || !listEndpoint || !globalFieldsVar) {
            throw new Error("Missing required parameters.");
        }

        this.listDropdownEl = listDropdownEl;
        this.fieldMappingContainerEl = fieldMappingContainerEl;
        this.listEndpoint = listEndpoint;
        this.globalFieldsVar = globalFieldsVar;

        this.init();
    }

    async init() {
        await this.loadLists();
        this.listDropdownEl.addEventListener("change", () => {
            this.generateFieldMapping();
        });
    }

    async loadLists() {
        try {
            const res = await fetch(this.listEndpoint);
            if (!res.ok) throw new Error(`Failed to load lists: ${res.statusText}`);

            const data = await res.json();
            this.populateListDropdown(data);
        } catch (err) {
            console.error("Error loading lists:", err);
        }
    }

    populateListDropdown(lists) {
        this.listDropdownEl.innerHTML = `<option value="">Select a list</option>`;
        lists.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.id;
            opt.textContent = item.name;
            this.listDropdownEl.appendChild(opt);
        });
    }

    generateFieldMapping() {
        this.fieldMappingContainerEl.innerHTML = "";

        if (!window[this.globalFieldsVar] || !Array.isArray(window[this.globalFieldsVar])) {
            console.warn(`Global variable ${this.globalFieldsVar} is missing or not an array.`);
            return;
        }

        window[this.globalFieldsVar].forEach(field => {
            const row = document.createElement("div");
            row.className = "cfb:grid cfb:grid-cols-2 cfb:border-b cfb:border-gray-100 cfb:hover:bg-gray-50 cfb:transition-colors";

            const labelCol = document.createElement("div");
            labelCol.className = "cfb:px-6 cfb:border-r cfb:border-gray-200 cfb:flex cfb:items-center";
            labelCol.innerHTML = `<span class="cfb:text-gray-800">${field.label}</span>${field.required ? '<span class="cfb:text-red-500 cfb:ml-1">*</span>' : ''}`;

            const selectCol = document.createElement("div");
            selectCol.className = "cfb:px-6 cfb:py-2";

            const select = document.createElement("select");
            select.id = `${field.name}Map`;
            select.className = "cfb:px-3 cfb:py-2 cfb:w-64 cfb:border cfb:border-gray-300 cfb:rounded-lg focus:cfb:outline-none focus:cfb:ring-2 focus:cfb:ring-blue-500 focus:cfb:border-blue-500";

            select.innerHTML = `<option value="">Select an option</option>`;
            (field.options || []).forEach(optData => {
                const opt = document.createElement("option");
                opt.value = optData.value;
                opt.textContent = optData.label;
                select.appendChild(opt);
            });

            selectCol.appendChild(select);

            row.appendChild(labelCol);
            row.appendChild(selectCol);

            this.fieldMappingContainerEl.appendChild(row);
        });
    }

    refreshLists() {
        return this.loadLists();
    }
}
