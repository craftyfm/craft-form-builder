/**
 * Icon Picker - Vanilla JS version
 */
export class IconifyPicker {
    constructor(updateFieldData) {
        this.currentPage = 1;
        this.modal = null;
        this.cancelToken = null;
        this.searchInput = null;
        this.iconListContainer = null;
        this.iconList = null;
        this.hasMore = true;
        this.loading = false;
        this.set = null;
        this.spinner = null;
        this.updateFieldData = updateFieldData;

    }

    get listLength() {
        return this.iconListContainer.querySelectorAll('button').length;
    }


    init(containerId, set) {
        if (this.set !== set) {
            this.set = set;
            this.cleanState();
        }
        this.container = document.getElementById(containerId);
        this.preview = this.container.querySelector('.icon-picker--icon');
        this.chooseBtn = this.container.querySelector('.icon-picker--choose-btn');
        this.removeBtn = this.container.querySelector('.icon-picker--remove-btn');

        this.inputName = this.container.querySelector(`input[name="name"]`);
        
        this.chooseBtn.addEventListener('click', () => {
            this.showModal();
        });

        this.removeBtn.addEventListener('click', () => {
            this.removeIcon();
        });
    }

    cleanState() {
        this.currentPage = 1;
        this.hasMore = true;
        if (this.modal) {
            this.updateIcons();
        }
    }

    showModal() {
        if (!this.set) {
            return;
        }
        if (!this.modal) {
            this.createModal();
        } else {
            this.modal.style.display = 'flex';
        }
    }

    createModal() {
        const container = document.createElement('div');
        container.className = 'cfb:bg-white cfb:shadow-lg cfb:rounded-lg cfb:p-6';
        
        const body = document.createElement('div');
        body.className = 'body';
        container.appendChild(body);

        // Search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'cfb:relative cfb:w-full';
        body.appendChild(searchContainer);

        const searchIcon = document.createElement('span');
        searchIcon.className = 'cfb:iconify-[mdi--magnify] cfb:absolute cfb:inset-y-2 cfb:left-3 cfb:flex cfb:items-center cfb:pointer-events-none';
        searchIcon.setAttribute('aria-hidden', 'true');
        searchContainer.appendChild(searchIcon);

        this.searchInput = document.createElement('input');
        this.searchInput.type = 'text';
        this.searchInput.name = 'search';
        this.searchInput.className = 'cfb:w-full cfb:pl-10 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:focus:ring-blue-500 cfb:focus:border-blue-500';
        this.searchInput.placeholder = 'Search';
        this.searchInput.setAttribute('aria-label', 'Search');
        searchContainer.appendChild(this.searchInput);

        const clearBtn = document.createElement('button');
        clearBtn.className = 'clear-btn  cfb:absolute cfb:inset-y-0 cfb:right-3 cfb:flex cfb:items-center cfb:justify-center cfb:text-gray-400 cfb:hover:text-gray-600 cfb:focus:outline-none hidden';
        clearBtn.title = 'Clear search';
        clearBtn.setAttribute('aria-label', 'Clear search');
        searchContainer.appendChild(clearBtn);

        // Icon list container
        this.iconListContainer = document.createElement('div');
        this.iconListContainer.className = 'cfb:grid cfb:grid-cols-8 cfb:gap-2 cfb:max-h-96 cfb:overflow-y-auto cfb:p-4 border cfb:rounded-lg cfb:bg-gray-50 icon-picker-modal--list';
        body.appendChild(this.iconListContainer);

        // this.iconList = document.createElement('div');
        // this.iconList.tabIndex = -1;
        // this.iconListContainer.appendChild(this.iconList);

        this.updateLangAttribute(this.iconList);

        this.spinner = document.createElement('div');
        this.spinner.className = 'spinner spinner-absolute';
        this.spinner.style.display = 'none';
        this.iconListContainer.appendChild(this.spinner);

        // Event listeners
        this.iconListContainer.addEventListener('scroll', this.onScroll.bind(this));

        let searchTimeout;
        this.searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.updateIcons();
            }, 300);
            
            if (this.searchInput.value) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }
        });



        clearBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.searchInput.dispatchEvent(new Event('input'));
        });

        this.iconListContainer.addEventListener('click', (ev) => {
            let button;
            if (ev.target.nodeName === 'BUTTON') {
                button = ev.target;
            } else {
                button = ev.target.closest('button');
                if (!button) {
                    return;
                }
            }

            this.selectIcon(button);
        });

        this.modal = document.createElement('div');
        this.modal.className = 'cfb:fixed cfb:z-50 cfb:inset-0 cfb:flex cfb:items-center cfb:justify-center cfb:bg-white/50'
        const wrapper = document.createElement('div');
        wrapper.className = 'cfb:w-full cfb:max-w-2xl';
        wrapper.appendChild(container);
        this.modal.appendChild(wrapper);
        document.body.appendChild(this.modal);
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = 'none';
            }
        })

        this.updateIcons();
    }


    async onScroll() {
        if (this.loading || !this.hasMore) return;
        
        const scrollTop = this.iconListContainer.scrollTop;
        const scrollHeight = this.iconListContainer.scrollHeight;
        const clientHeight = this.iconListContainer.clientHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 200) {
            this.loadMore();
        }
    }

    async updateIcons() {
        this.iconListContainer.innerHTML = await this.loadIcons();
    }

    async loadMore() {
        this.currentPage += 1;
        const listHtml = await this.loadIcons();
        if (listHtml.length <= 0) {
            this.hasMore = false;
            return;
        }
        this.iconListContainer.innerHTML += listHtml;
    }

    async loadIcons() {
        if (this.cancelToken) {
            this.cancelToken.abort();
        }
        const csrfInput = document.getElementById('csrf-input');
        const csrfToken = csrfInput.value;
        this.loading = true;
        const search = this.searchInput.value;
        this.spinner.style.display = 'block';
        this.cancelToken = new AbortController();

        try {
            // Replace this with your actual API endpoint
            const response = await fetch(Craft.getActionUrl('form-builder/icons/picker'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
                body: JSON.stringify({
                    search,
                    set: this.set,
                    page: this.currentPage,
                }),
                signal: this.cancelToken.signal,
            });

            const data = await response.json();
            return data.listHtml;
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error loading icons:', error);
            }
            return '';
        } finally {
            this.spinner.style.display = 'none';
            this.cancelToken = null;
            this.loading = false;
        }
    }

    updateLangAttribute(element) {
        const htmlLang = document.documentElement.lang;

        if (!htmlLang.startsWith('en')) {
            element.setAttribute('lang', 'en');
        }
    }

    selectIcon(button) {
        this.modal.style.display = 'none';
        const name = button.getAttribute('title');
        const iconName = button.getAttribute('data-iconName');
        
        this.preview.innerHTML = button.innerHTML;
        this.preview.setAttribute('title', name);
        this.preview.setAttribute('aria-label', name);
        this.preview.setAttribute('role', 'img');

        this.updateLangAttribute(this.preview);
        this.inputName.value = iconName;
        
        const label = this.chooseBtn.querySelector('.label');
        if (label) {
            label.textContent = 'Change';
        }

        this.updateFieldData('icon', iconName);
        this.updateFieldData('iconSvg', button.innerHTML);
        
        this.chooseBtn.focus();
        this.removeBtn.classList.remove('hidden');
        
        if (this.container.classList.contains('small')) {
            this.chooseBtn.classList.add('hidden');
        }
    }

    removeIcon() {
        this.preview.innerHTML = '';
        this.preview.removeAttribute('title');
        this.preview.removeAttribute('aria-label');
        this.inputName.value = '';
        this.updateFieldData('icon', '');
        this.updateFieldData('iconSvg', null);
        const label = this.chooseBtn.querySelector('.label');
        if (label) {
            label.textContent = 'Choose';
        }
        
        this.removeBtn.classList.add('hidden');
        
        if (this.container.classList.contains('small')) {
            this.chooseBtn.classList.remove('hidden');
            this.chooseBtn.focus();
        } else {
            this.chooseBtn.focus();
        }
    }
}

// Usage example:
// const picker = new IconifyPicker(document.querySelector('.icon-picker-container'), {
//     iconSets: { 'mdi': 'Material Design Icons', 'fa': 'Font Awesome' },
//     defaultSet: 'mdi'
// });