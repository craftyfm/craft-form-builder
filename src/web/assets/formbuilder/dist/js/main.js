var O=Object.defineProperty;var D=(e,t,c)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:c}):e[t]=c;var E=(e,t,c)=>D(e,typeof t!="symbol"?t+"":t,c);const F=e=>JSON.parse(JSON.stringify(e)),a=(e,t,c=!1)=>`
        <div class="cfb:mb-7">
            <div class="cfb:flex cfb:justify-between cfb:text-gray-800 cfb:mb-3 cfb:border-b">
                <h4 class="cfb:text-lg cfb:font-semibold ">${e}</h4>
                <button data-open="${c?"0":"1"}" class="toggle-button-setting-group" id="toggle-${e.toLowerCase()}" data-content="group-settings-${e.toLowerCase()}">
                    ${c?'<span class="cfb:iconify-[mdi--add]"></span>':'<span class="cfb:iconify-[mdi--minus]"></span>'}
                </button>
            </div>
            <div class="cfb:flex-col cfb:gap-3  cfb:flex cfb:transition-all cfb:duration-500 ${c?"cfb:hidden":""}" id="group-settings-${e.toLowerCase()}">
                ${t}
            </div>
        </div>
    `,k=e=>`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Icon</label>
            <div id="setting-icon" class="icon-picker">    
                <div class="icon-picker--icon" role="img" tabindex="0">
                    ${e.iconSvg?e.iconSvg:""}
                </div>
                <button type="button" class="icon-picker--choose-btn btn" tabindex="0">
                    Change
                </button>
                <button type="button" class="icon-picker--remove-btn btn" tabindex="0">Remove</button>
                <input type="hidden" name="name" value="">
            </div>
        </div>
    `,d=()=>{document.querySelectorAll(".toggle-button-setting-group").forEach(t=>{t.addEventListener("click",c=>{const s=t.dataset.content;t.dataset.open==="0"?(t.dataset.open="1",t.querySelector("span").classList.replace("cfb:iconify-[mdi--add]","cfb:iconify-[mdi--minus]"),document.getElementById(s).classList.remove("cfb:hidden")):(t.dataset.open="0",t.querySelector("span").classList.replace("cfb:iconify-[mdi--minus]","cfb:iconify-[mdi--add]"),document.getElementById(s).classList.add("cfb:hidden"))})})},p=e=>`
    <div>
        <label class="cfb:flex cfb:items-center cfb:gap-2">
            <input type="checkbox" id="setting-required" ${e.required?"checked":""} class="cfb:text-blue-600 cfb:border-gray-300 cfb:rounded">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-700">Required Field</span>
        </label>
    </div>
`,h=e=>{var t;(t=document.getElementById("setting-required"))==null||t.addEventListener("change",c=>e("required",c.target.checked))},R=()=>`
        <div class="cfb:flex cfb:opacity-0 cfb:group-hover:opacity-100 cfb:transition-opacity cfb:justify-between">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-500 cfb:w-4 cfb:h-4 cfb:iconify-[mdi--drag-variant]"></span>
            <span class="delete-container cfb:delete-btn-wrapper cfb:mb-1"></span>
        </div>
`,v=e=>{const t=e.required??!1;return`
        <div class="cfb:mb-2 cfb:font-light cfb:flex-1">
            <div class="cfb:flex cfb:justify-between cfb:items-center">
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">
                    ${e.label}
                    ${t?'<span class="cfb:text-red-500 cfb:ml-1">*</span>':""}
                </label>
            </div>
        </div>
    `},y=e=>(e.required,`
        <div class="">
            <p class="cfb:text-sm cfb:font-light">${e.desc??""}</p>
        </div>
    `),q=(e,t)=>[...e.querySelectorAll(".form-field-wrapper")].reduce((s,n)=>{const i=n.getBoundingClientRect(),r=t-i.top-i.height/2;return r<0&&r>s.offset?{offset:r,element:n}:s},{offset:Number.NEGATIVE_INFINITY}).element,U=()=>{const e=document.createElement("div");e.className="cfb:relative cfb:my-4";const t=document.createElement("div");t.className="cfb:absolute cfb:inset-0 cfb:flex cfb:items-center";const c=document.createElement("div");c.className="cfb:w-full cfb:border-t cfb:border-blue-500",t.appendChild(c);const s=document.createElement("div");s.className="cfb:relative cfb:flex cfb:justify-center";const n=document.createElement("span");return n.className="cfb:bg-white cfb:px-3 cfb:text-sm cfb:text-blue-500 cfb:font-medium",n.textContent="Drop here",s.appendChild(n),e.appendChild(t),e.appendChild(s),e},B=e=>{var t;(t=document.getElementById("setting-options"))==null||t.addEventListener("input",c=>{const s=c.target.value.split(`
`).filter(n=>n.trim()!=="").map(n=>({name:n.trim(),value:n.trim(),isDefault:!1}));e("options",s)})},V=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),x=e=>`
    <div>
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Label<span class="cfb:text-red-500 cfb:ml-1">*</span></label>
        <input type="text" id="setting-label" value="${e.label}" 
            class="cfb:peer cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:invalid:border-red-500 cfb:focus:invalid:border-transparent">
        <p class="cfb:hidden cfb:peer-invalid:block cfb:font-light cfb:text-sm cfb:text-red-500 cfb:pt-0 cfb:mt-0">
            This field is required.
        </p>
    </div>
    <div>
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Description</label>
        <input type="text" id="setting-desc" value="${e.desc}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
    </div>
`,f=e=>`
    <div>
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Handle<span class="cfb:text-red-500 cfb:ml-1">*</span></label>
        <input type="text" id="setting-handle" value="${e.handle}" class="cfb:peer cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:invalid:border-red-500 cfb:focus:invalid:border-transparent">
        <p class="cfb:hidden cfb:peer-invalid:block cfb:font-light cfb:text-sm cfb:text-red-500 cfb:pt-0 cfb:mt-0">
            This field is required.
        </p>   
    </div>     
`,u=(e,t)=>{e.forEach(c=>{var s;(s=document.getElementById(`setting-${c}`))==null||s.addEventListener("input",n=>t(c,n.target.value))})},m=e=>{const t=document.getElementById("setting-label"),c=document.getElementById("setting-handle");let s=c.value!=="";const n=i=>{i.setCustomValidity(i.value.trim()===""?"This field is required.":"")};t&&n(t),n(c),t&&t.addEventListener("input",()=>{n(t),e("label",t.value),s||(c.value=_(t.value),e("handle",c.value,!1),n(c))}),c.addEventListener("input",()=>{s=!0,e("handle",c.value),n(c)})},_=e=>e.toLowerCase().trim().replace(/[^a-z0-9\s]/g,"").replace(/\s+(.)/g,(t,c)=>c.toUpperCase()).replace(/\s/g,""),J={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter text...",icon:"",iconSvg:null,required:!1}},K=e=>!(!e.handle||!e.label),Y=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:relative cfb:w-full cfb:flex-3">
                    ${e!=null&&e.iconSvg?`
                                    <div class="cfb:absolute cfb:inset-y-0 cfb:left-0 cfb:pl-3 cfb:flex cfb:items-center pointer-events-none">
                                        <div class="cfb:w-5 cfb:h-5 cfb:text-gray-700 cfb:flex cfb:items-center cfb:justify-center">
                                            ${e.iconSvg}   
                                        </div>
                                    </div>
                                    `:""}
                    <input type="text" 
                           placeholder="${e.placeholder}" 
                           class="${e.iconSvg?"cfb:pl-10":"cfb:pl-3"} cfb:pr-3 cfb:py-2 cfb:w-full cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" 
                           disabled>
                </div>
                ${y(e)}
            </div>
        </div>

`,W=(e,t)=>{let c=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
       
    `;return t.settings.icons!==""&&(c+=`<div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Icon</label>
            <div id="setting-icon" class="icon-picker">    
                <div class="icon-picker--icon" role="img" tabindex="0">
                    ${e.iconSvg?e.iconSvg:""}
                </div>
                <button type="button" class="icon-picker--choose-btn btn" tabindex="0">
                    Change
                </button>
                <button type="button" class="icon-picker--remove-btn btn" tabindex="0">Remove</button>
                <input type="hidden" name="name" value="">
            </div>
        </div>`),a("Property",c)+a("Validation",p(e))+a("Advanced",f(e))},G=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},X={config:J,validate:K,render:Y,renderSettings:W,initSettings:G},Q={defaultData:{handle:"",label:"",placeholder:"Enter your message...",desc:"",rows:4,required:!1,minlength:0,maxlength:0}},Z=e=>!(!e.handle||!e.label),ee=(e,t)=>`
     <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
        ${v(e)}
        <div class="${t==="horizontal"?"cfb:w-3/4":""}">
            <textarea placeholder="${e.placeholder}" 
                      rows="${e.rows}" 
                      class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50 cfb:resize-none" 
                      disabled></textarea>
            ${y(e)}
        </div>
    </div>
`,te=e=>{const t=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Rows</label>
            <input type="number" id="setting-rows" value="${e.rows}" min="1" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `,c=`
        ${p(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Min Length</label>
            <input type="number" id="setting-minlength" value="${e.minlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max Length</label>
            <input type="number" id="setting-maxlength" value="${e.maxlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `;return a("Property",t)+a("Validation",c)+a("Advanced",f(e))},ce=e=>{var t,c,s;u(["desc","placeholder"],e),(t=document.getElementById("setting-rows"))==null||t.addEventListener("input",n=>e("rows",parseInt(n.target.value,10))),h(e),(c=document.getElementById("setting-minlength"))==null||c.addEventListener("input",n=>e("minlength",parseInt(n.target.value,10))),(s=document.getElementById("setting-maxlength"))==null||s.addEventListener("input",n=>e("maxlength",parseInt(n.target.value,10))),d(),m(e)},ne={config:Q,validate:Z,render:ee,renderSettings:te,initSettings:ce},se={defaultData:{handle:"",label:"",desc:"",placeholder:"Choose an option...",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},ie=e=>!(!e.handle||!e.label),ae=(e,t)=>{const c=e.options.map(s=>`<option value="${s.value}">${s.name}</option>`).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <select class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" disabled>
                    <option value="">${e.placeholder}</option>
                    ${c}
                </select>
                ${y(e)}
            </div>
        </div>
    `},re=e=>{const t=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(c=>c.name).join(`
`)}</textarea>
        </div>
    `;return a("Property",t)+a("Validation",p(e))+a("Advanced",f(e))},le=e=>{u(["desc","placeholder"],e),B(e),h(e),d(),m(e)},oe={config:se,validate:ie,render:ae,renderSettings:re,initSettings:le},be={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},de=e=>!(!e.handle||!e.label),fe=(e,t)=>{const c=e.options.map((s,n)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${n}" name="${e.id}[]" value="${s.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${n}" class="cfb:text-sm cfb:text-gray-700">${s.name}</label>
        </div>
    `).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
          ${v(e)}
             <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:w-full">
                    <div class="cfb:space-y-2 cfb:flex-3">
                        ${c}
                    </div>
                    ${y(e)}
                </div>
            </div>
        </div>
    `},me=e=>{const t=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(c=>c.name).join(`
`)}</textarea>
        </div>
    `;return a("Property",t)+a("Validation",p(e))+a("Advanced",f(e))},ue=e=>{u(["desc"],e),B(e),h(e),d(),m(e)},ge={config:be,validate:de,render:fe,renderSettings:me,initSettings:ue},pe={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},he=e=>!(!e.handle||!e.label),ve=(e,t)=>{const c=e.options.map((s,n)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${n}" name="${e.id}[]" value="${s.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${n}" class="cfb:text-sm cfb:text-gray-700">${s.name}</label>
        </div>
    `).join("");return`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
             <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:space-y-2 cfb:flex-3">
                    ${c}
                </div>
                ${y(e)}
            </div>
            
            
        </div>
    `},ye=e=>{const t=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(c=>c.name).join(`
`)}</textarea>
        </div>
    `;return a("Property",t)+a("Validation",p(e))+a("Advanced",f(e))},xe=e=>{u(["desc"],e),B(e),h(e),d(),m(e)},$e={config:pe,validate:he,render:ve,renderSettings:ye,initSettings:xe},Se={defaultData:{handle:"",label:"",desc:"",allowedExtensions:"",limit:1,required:!1,maxSize:0}},we=e=>!(!e.handle||!e.label),Ee=(e,t)=>`
    <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
        ${v(e)}
        <div class="${t==="horizontal"?"cfb:w-3/4":""}">
            <div class="">
                <div class="cfb:flex cfb:items-center cfb:justify-center cfb:w-full cfb:flex-3">
                  <input type="file"
                           class="cfb:w-full cfb:text-slate-500 cfb:font-medium cfb:text-sm cfb:bg-gray-100
                           cfb:file:cursor-pointer cfb:cursor-pointer cfb:file:border-0 cfb:file:py-2 cfb:file:px-4 cfb:file:mr-4
                           cfb:file:bg-blue-500 cfb:file:hover:bg-gray-700 cfb:file:text-white cfb:rounded" disabled/>
                </div>
            </div>
            ${y(e)}
        </div>
    </div>
`,Le=e=>{const t=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Accepted Extensions</label>
            <input type="text" id="setting-allowedExtensions" value="${e.allowedExtensions}" placeholder="e.g. pdf, jpg" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
            <p class="cfb:mt-1 cfb:text-sm cfb:text-gray-500">
              Enter file extensions, separated by commas (e.g. jpg, png, pdf). Leave empty to allow all.
            </p>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Limit</label>
            <input type="number" id="setting-limit" value="${e.limit}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `,c=`
        ${p(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max File Size in MBs</label>
            <input type="number" id="setting-maxSize" value="${e.maxSize?e.maxSize:""}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return a("Property",t)+a("Validation",c)+a("Advanced",f(e))},ke=e=>{var t;u(["allowedExtensions","limit","desc"],e),h(e),(t=document.getElementById("setting-maxSize"))==null||t.addEventListener("input",c=>e("maxSize",c.target.value)),d(),m(e)},Ce={config:Se,validate:we,render:Ee,renderSettings:Le,initSettings:ke},Ie={defaultData:{handle:"submit",submitText:"Submit",resetText:"Reset",submitStyle:"primary",resetStyle:"secondary",spacing:"wide"}},Be=e=>!!e.handle,Te=(e,t)=>{const c=e.submitStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":"cfb:bg-gray-600 cfb:text-white",s=e.resetStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":e.resetStyle==="secondary"?"cfb:bg-gray-500 cfb:text-white":"cfb:bg-red-500 cfb:text-white";return`
        <div>
            <div class="cfb:flex cfb:justify-between cfb:items-center cfb:mb-3">
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">Submit Button</label>
            </div>
            <div class="cfb:flex ${e.spacing==="wide"?"cfb:justify-between":e.spacing==="tight"?"cfb:gap-2":"cfb:gap-4"}">
                <button type="reset" class="cfb:px-3 cfb:py-1 cfb:rounded-sm cfb:text-sm cfb:cursor-not-allowed ${s}" disabled>
                    ${e.resetText}
                </button>
                <button type="submit" class="cfb:px-3 cfb:py-1 cfb:rounded-sm cfb:text-sm cfb:cursor-not-allowed ${c}" disabled>
                    ${e.submitText}
                </button>
            </div>
        </div>
    `},Ae=e=>{const t=`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Submit Text</label>
            <input type="text" id="setting-submit-text" value="${e.submitText}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Reset Text</label>
            <input type="text" id="setting-reset-text" value="${e.resetText}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Submit Style</label>
            <select id="setting-submit-style" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="primary" ${e.submitStyle==="primary"?"selected":""}>Primary</option>
                <option value="secondary" ${e.submitStyle==="secondary"?"selected":""}>Secondary</option>
            </select>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Reset Style</label>
            <select id="setting-reset-style" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="primary" ${e.resetStyle==="primary"?"selected":""}>Primary</option>
                <option value="secondary" ${e.resetStyle==="secondary"?"selected":""}>Secondary</option>
                <option value="danger" ${e.resetStyle==="danger"?"selected":""}>Danger</option>
            </select>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Spacing</label>
            <select id="setting-spacing" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="wide" ${e.spacing==="wide"?"selected":""}>Wide</option>
                <option value="normal" ${e.spacing==="normal"?"selected":""}>Normal</option>
            </select>
        </div>
    `;return a("Property",t)+a("Advanced",f(e))},Me=e=>{var t,c,s,n,i;(t=document.getElementById("setting-submit-text"))==null||t.addEventListener("input",r=>e("submitText",r.target.value)),(c=document.getElementById("setting-reset-text"))==null||c.addEventListener("input",r=>e("resetText",r.target.value)),(s=document.getElementById("setting-submit-style"))==null||s.addEventListener("change",r=>e("submitStyle",r.target.value)),(n=document.getElementById("setting-reset-style"))==null||n.addEventListener("change",r=>e("resetStyle",r.target.value)),(i=document.getElementById("setting-spacing"))==null||i.addEventListener("change",r=>e("spacing",r.target.value)),d(),m(e)},Ne={config:Ie,validate:Be,render:Te,renderSettings:Ae,initSettings:Me},qe={defaultData:{handle:"title",text:"Title Text",level:"h2",alignment:"start"}},Pe=e=>!!e.handle,je=(e,t)=>{const c=e.level,s=`cfb:text-${e.alignment}`;return`
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <${c} class="${s} cfb:w-full cfb:font-bold">${e.text}</${c}>
        </div>
    `},ze=e=>{const t=`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Text</label>
            <input type="text" id="setting-text" value="${e.text}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Level</label>
            <select id="setting-level" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="h1" ${e.level==="h1"?"selected":""}>H1</option>
                <option value="h2" ${e.level==="h2"?"selected":""}>H2</option>
                <option value="h3" ${e.level==="h3"?"selected":""}>H3</option>
                <option value="h4" ${e.level==="h4"?"selected":""}>H4</option>
                <option value="h5" ${e.level==="h5"?"selected":""}>H5</option>
                <option value="h6" ${e.level==="h6"?"selected":""}>H6</option>
            </select>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Alignment</label>
            <select id="setting-alignment" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="start" ${e.alignment==="start"?"selected":""}>Left</option>
                <option value="center" ${e.alignment==="center"?"selected":""}>Center</option>
                <option value="end" ${e.alignment==="end"?"selected":""}>Right</option>
            </select>
        </div>
    `;return a("Property",t)+a("Advanced",f(e))},He=e=>{var t,c,s;(t=document.getElementById("setting-text"))==null||t.addEventListener("input",n=>e("text",n.target.value)),(c=document.getElementById("setting-level"))==null||c.addEventListener("change",n=>e("level",n.target.value)),(s=document.getElementById("setting-alignment"))==null||s.addEventListener("change",n=>e("alignment",n.target.value)),d(),m(e)},Oe={config:qe,validate:Pe,render:je,renderSettings:ze,initSettings:He},De={defaultData:{handle:"image",src:"",alt:"",width:null,height:null,alignment:"start"}},Fe=e=>!!e.handle,Re=(e,t)=>{const c=e.width?`${e.width}px`:"auto",s=e.height?`${e.height}px`:"auto",n=e.width?`width="${e.width}"`:"",i=e.height?`height="${e.height}"`:"";return`
    <div class="cfb:flex cfb:justify-${e.alignment} cfb:items-start">
        <img 
            ${n} ${i}
            src="${e.src}" 
            alt="${e.alt||""}" 
            style="width: ${c}; height: ${s};"
            class="cfb:object-fill" 
        />
    </div>
`},Ue=e=>{const t=`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Image URL</label>
            <textarea id="setting-src" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">${e.src}</textarea>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Alt</label>
            <textarea id="setting-alt" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">${e.alt}</textarea>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Width (px)</label>
            <input type="number" id="setting-width" value="${e.width?e.width:""}" 
                placeholder="auto" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Height (px)</label>
            <input type="number" id="setting-height" value="${e.height?e.height:""}" 
                placeholder="auto" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Alignment</label>
            <select id="setting-alignment" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="start" ${e.alignment==="start"?"selected":""}>Left</option>
                <option value="center" ${e.alignment==="center"?"selected":""}>Center</option>
                <option value="end" ${e.alignment==="end"?"selected":""}>Right</option>
            </select>
        </div>
    `;return a("Property",t)+a("Advanced",f(e))},Ve=e=>{var t;u(["handle","src","alt","width","height"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",c=>e("alignment",c.target.value)),d(),m(e)},_e={config:De,validate:Fe,render:Re,renderSettings:Ue,initSettings:Ve},Je={defaultData:{handle:"paragraph",text:"This is a paragraph of text. You can edit it in the settings panel.",alignment:"start"}},Ke=e=>!!e.handle,Ye=e=>`
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <p class="${`cfb:text-${e.alignment}`} cfb:w-full">${e.text}</p>
        </div>
    `,We=e=>{const t=`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Text</label>
            <textarea id="setting-text" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="6">${e.text}</textarea>
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Alignment</label>
            <select id="setting-alignment" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
                <option value="start" ${e.alignment==="start"?"selected":""}>Left</option>
                <option value="center" ${e.alignment==="center"?"selected":""}>Center</option>
                <option value="end" ${e.alignment==="end"?"selected":""}>Right</option>
                <option value="justify" ${e.alignment==="justify"?"selected":""}>Justify</option>
            </select>
        </div>
    `;return a("Property",t)+a("Advanced",f(e))},Ge=e=>{var t;u(["text"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",c=>e("alignment",c.target.value)),d(),m(e)},Xe={config:Je,validate:Ke,render:Ye,renderSettings:We,initSettings:Ge},Qe={defaultData:{html:"",handle:"html"}},Ze=e=>!!e.handle,et=e=>`
    <div class="cfb:flex cfb:justify-between cfb:items-start">
        <div class="cfb:w-full cfb:prose">
            <code class="cfb:line-clamp-3">${V(e.html)}</code>
        </div>
    </div>
`,tt=e=>{const t=`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">HTML Content</label>
            <textarea id="setting-html" placeholder="Put your HTML code here"
                class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:font-mono" rows="10">${e.html}</textarea>
            <small class="cfb:text-sm cfb:font-light">Please ensure your code contains only HTML and no scripts.</small>
        </div>
    `;return a("Property",t)+a("Advanced",f(e))},ct=e=>{u(["html"],e),d(),m(e)},nt={config:Qe,validate:Ze,render:et,renderSettings:tt,initSettings:ct},st={defaultData:{handle:"hcaptcha",siteKey:"",privateKey:"",required:!0}},it=e=>!0,at=e=>`
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
`,rt=e=>a("Advanced",f(e)),lt=e=>{d(),m(e)},ot={config:st,validate:it,render:at,renderSettings:rt,initSettings:lt},bt={defaultData:{handle:"recaptcha"}},dt=e=>!!e.handle,ft=(e,t)=>`
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
`,mt=e=>a("Advanced",f(e)),ut=e=>{d(),m(e)},gt={config:bt,validate:dt,render:ft,renderSettings:mt,initSettings:ut},pt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter email...",icon:"",iconSvg:null,required:!1}},ht=e=>!(!e.handle||!e.label),vt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:relative cfb:w-full cfb:flex-3">
                        ${e!=null&&e.iconSvg?`
                                        <div class="cfb:absolute cfb:inset-y-0 cfb:left-0 cfb:pl-3 cfb:flex cfb:items-center pointer-events-none">
                                            <div class="cfb:w-5 cfb:h-5 cfb:text-gray-700 cfb:flex cfb:items-center cfb:justify-center">
                                                ${e.iconSvg}   
                                            </div>
                                        </div>
                                        `:""}
                        <input type="email" 
                               placeholder="${e.placeholder}" 
                               class="${e.iconSvg?"cfb:pl-10":"cfb:pl-3"} cfb:pr-3 cfb:py-2 cfb:w-full cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" 
                               disabled>
                    </div>
                    ${y(e)}
            </div>
        </div>

`,yt=(e,t)=>{let c=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(c+=`${k(e)}`),a("Property",c)+a("Validation",p(e))+a("Advanced",f(e))},xt=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},$t={config:pt,validate:ht,render:vt,renderSettings:yt,initSettings:xt},St={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter url...",icon:"",iconSvg:null,required:!1}},wt=e=>!(!e.handle||!e.label),Et=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:relative cfb:w-full cfb:flex-3">
                    ${e!=null&&e.iconSvg?`
                                    <div class="cfb:absolute cfb:inset-y-0 cfb:left-0 cfb:pl-3 cfb:flex cfb:items-center pointer-events-none">
                                        <div class="cfb:w-5 cfb:h-5 cfb:text-gray-700 cfb:flex cfb:items-center cfb:justify-center">
                                            ${e.iconSvg}   
                                        </div>
                                    </div>
                                    `:""}
                    <input type="url" 
                           placeholder="${e.placeholder}" 
                           class="${e.iconSvg?"cfb:pl-10":"cfb:pl-3"} cfb:pr-3 cfb:py-2 cfb:w-full cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" 
                           disabled>
                </div>
                ${y(e)}
            </div>
        </div>

`,Lt=(e,t)=>{let c=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(c+=`${k(e)}`),a("Property",c)+a("Validation",p(e))+a("Advanced",f(e))},kt=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},Ct={config:St,validate:wt,render:Et,renderSettings:Lt,initSettings:kt},It={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter phone number...",icon:"",iconSvg:null,required:!1}},Bt=e=>!(!e.handle||!e.label),Tt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:relative cfb:w-full cfb:flex-3">
                    ${e!=null&&e.iconSvg?`
                                    <div class="cfb:absolute cfb:inset-y-0 cfb:left-0 cfb:pl-3 cfb:flex cfb:items-center pointer-events-none">
                                        <div class="cfb:w-5 cfb:h-5 cfb:text-gray-700 cfb:flex cfb:items-center cfb:justify-center">
                                            ${e.iconSvg}   
                                        </div>
                                    </div>
                                    `:""}
                    <input type="tel" 
                           placeholder="${e.placeholder}" 
                           class="${e.iconSvg?"cfb:pl-10":"cfb:pl-3"} cfb:pr-3 cfb:py-2 cfb:w-full cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" 
                           disabled>
                </div>
                ${y(e)}
            </div>
        </div>

`,At=(e,t)=>{let c=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(c+=`${k(e)}`),a("Property",c)+a("Validation",p(e))+a("Advanced",f(e))},Mt=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},Nt={config:It,validate:Bt,render:Tt,renderSettings:At,initSettings:Mt},qt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter number...",icon:"",iconSvg:null,required:!1}},Pt=e=>!(!e.handle||!e.label),jt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:relative cfb:w-full cfb:flex-3">
                    ${e!=null&&e.iconSvg?`
                                    <div class="cfb:absolute cfb:inset-y-0 cfb:left-0 cfb:pl-3 cfb:flex cfb:items-center pointer-events-none">
                                        <div class="cfb:w-5 cfb:h-5 cfb:text-gray-700 cfb:flex cfb:items-center cfb:justify-center">
                                            ${e.iconSvg}   
                                        </div>
                                    </div>
                                    `:""}
                    <input type="number" 
                           placeholder="${e.placeholder}" 
                           class="${e.iconSvg?"cfb:pl-10":"cfb:pl-3"} cfb:pr-3 cfb:py-2 cfb:w-full cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" 
                           disabled>
                </div>
                ${y(e)}
            </div>
        </div>

`,zt=(e,t)=>{let c=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(c+=`${k(e)}`),a("Property",c)+a("Validation",p(e))+a("Advanced",f(e))},Ht=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},Ot={config:qt,validate:Pt,render:jt,renderSettings:zt,initSettings:Ht},Dt={defaultData:{handle:"",label:"",checkboxLabel:"",desc:"",required:!1}},Ft=e=>!(!e.handle||!e.label),Rt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row cfb:gap-3":"cfb:flex-col"}">
            ${v(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:flex cfb:items-center cfb:gap-2 ">
                    <input type="checkbox" id="${e.id}" name="${e.id}" value="1" class="cfb:border-gray-300 cfb:rounded" disabled>
                    <label for="${e.id}" class="cfb:text-sm cfb:text-gray-700">${e.checkboxLabel}</label>
                </div>
                ${y(e)}
            </div>
        </div>
    `,Ut=e=>{const t=`
        ${x(e)}
            <div>
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Checkbox Label</label>
                <input type="text" id="setting-checkboxLabel" value="${e.checkboxLabel}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
            </div>
    `;return a("Property",t)+a("Validation",p(e))+a("Advanced",f(e))},Vt=(e,t)=>{u(["desc","checkboxLabel"],e),h(e),d(),m(e)},_t={config:Dt,validate:Ft,render:Rt,renderSettings:Ut,initSettings:Vt},C={text:X,email:$t,url:Ct,phone:Nt,number:Ot,textarea:ne,select:oe,radio:ge,checkbox:_t,checkboxes:$e,fileUpload:Ce,submitButton:Ne,title:Oe,image:_e,paragraph:Xe,html:nt,hcaptcha:ot,recaptcha:gt};let g=null,L=null;function z(e){L=this,this.classList.add("dragging"),g=U()}const H=e=>{L.classList.remove("dragging"),g&&g.parentNode&&g.parentNode.removeChild(g),L=null,g=null},Jt=(e,t,c)=>{document.querySelectorAll(".form-element").forEach(n=>{n.addEventListener("dragstart",i=>{i.dataTransfer.setData("text/plain",n.dataset.type)}),n.addEventListener("dragstart",z),n.addEventListener("dragend",H)}),c.addEventListener("dragover",n=>{if(n.preventDefault(),!g||e.formState.fields.length===0)return;const i=200,r=20;n.clientY<i?c.scrollBy(0,-r):n.clientY>window.innerHeight-i&&c.scrollBy(0,r);const o=q(c,n.clientY);g.parentNode&&g.parentNode.removeChild(g),o?c.insertBefore(g,o):c.appendChild(g)}),c.addEventListener("drop",n=>{if(n.preventDefault(),!g)return;const i=q(c,n.clientY),r=n.dataTransfer.getData("text/plain"),o=i?i.dataset.index:null;if(r)e.addField(r,o);else{const l=L.dataset.index;e.moveField(l,o,t,e)}})};class Kt{constructor(t){this.currentPage=1,this.modal=null,this.cancelToken=null,this.searchInput=null,this.iconListContainer=null,this.iconList=null,this.hasMore=!0,this.loading=!1,this.set=null,this.spinner=null,this.updateFieldData=t}get listLength(){return this.iconListContainer.querySelectorAll("button").length}init(t,c){this.set!==c&&(this.set=c,this.cleanState()),this.container=document.getElementById(t),this.preview=this.container.querySelector(".icon-picker--icon"),this.chooseBtn=this.container.querySelector(".icon-picker--choose-btn"),this.removeBtn=this.container.querySelector(".icon-picker--remove-btn"),this.inputName=this.container.querySelector('input[name="name"]'),this.chooseBtn.addEventListener("click",()=>{this.showModal()}),this.removeBtn.addEventListener("click",()=>{this.removeIcon()})}cleanState(){this.currentPage=1,this.hasMore=!0,this.modal&&this.updateIcons()}showModal(){this.set&&(this.modal?this.modal.style.display="flex":this.createModal())}createModal(){const t=document.createElement("div");t.className="cfb:bg-white cfb:shadow-lg cfb:rounded-lg cfb:p-6";const c=document.createElement("div");c.className="body",t.appendChild(c);const s=document.createElement("div");s.className="cfb:relative cfb:w-full",c.appendChild(s);const n=document.createElement("span");n.className="cfb:iconify-[mdi--magnify] cfb:absolute cfb:inset-y-2 cfb:left-3 cfb:flex cfb:items-center cfb:pointer-events-none",n.setAttribute("aria-hidden","true"),s.appendChild(n),this.searchInput=document.createElement("input"),this.searchInput.type="text",this.searchInput.name="search",this.searchInput.className="cfb:w-full cfb:pl-10 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:focus:ring-blue-500 cfb:focus:border-blue-500",this.searchInput.placeholder="Search",this.searchInput.setAttribute("aria-label","Search"),s.appendChild(this.searchInput);const i=document.createElement("button");i.className="clear-btn  cfb:absolute cfb:inset-y-0 cfb:right-3 cfb:flex cfb:items-center cfb:justify-center cfb:text-gray-400 cfb:hover:text-gray-600 cfb:focus:outline-none hidden",i.title="Clear search",i.setAttribute("aria-label","Clear search"),s.appendChild(i),this.iconListContainer=document.createElement("div"),this.iconListContainer.className="cfb:grid cfb:grid-cols-8 cfb:gap-2 cfb:max-h-96 cfb:overflow-y-auto cfb:p-4 border cfb:rounded-lg cfb:bg-gray-50 icon-picker-modal--list",c.appendChild(this.iconListContainer),this.updateLangAttribute(this.iconList),this.spinner=document.createElement("div"),this.spinner.className="spinner spinner-absolute",this.spinner.style.display="none",this.iconListContainer.appendChild(this.spinner),this.iconListContainer.addEventListener("scroll",this.onScroll.bind(this));let r;this.searchInput.addEventListener("input",()=>{clearTimeout(r),r=setTimeout(()=>{this.updateIcons()},300),this.searchInput.value?i.classList.remove("hidden"):i.classList.add("hidden")}),i.addEventListener("click",()=>{this.searchInput.value="",this.searchInput.dispatchEvent(new Event("input"))}),this.iconListContainer.addEventListener("click",l=>{let b;if(l.target.nodeName==="BUTTON")b=l.target;else if(b=l.target.closest("button"),!b)return;this.selectIcon(b)}),this.modal=document.createElement("div"),this.modal.className="cfb:fixed cfb:z-50 cfb:inset-0 cfb:flex cfb:items-center cfb:justify-center cfb:bg-white/50";const o=document.createElement("div");o.className="cfb:w-full cfb:max-w-2xl",o.appendChild(t),this.modal.appendChild(o),document.body.appendChild(this.modal),this.modal.addEventListener("click",l=>{l.target===this.modal&&(this.modal.style.display="none")}),this.updateIcons()}async onScroll(){if(this.loading||!this.hasMore)return;const t=this.iconListContainer.scrollTop,c=this.iconListContainer.scrollHeight,s=this.iconListContainer.clientHeight;t+s>=c-200&&this.loadMore()}async updateIcons(){this.iconListContainer.innerHTML=await this.loadIcons()}async loadMore(){this.currentPage+=1;const t=await this.loadIcons();if(t.length<=0){this.hasMore=!1;return}this.iconListContainer.innerHTML+=t}async loadIcons(){this.cancelToken&&this.cancelToken.abort();const c=document.getElementById("csrf-input").value;this.loading=!0;const s=this.searchInput.value;this.spinner.style.display="block",this.cancelToken=new AbortController;try{return(await(await fetch(Craft.getActionUrl("form-builder/icons/picker"),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":c},body:JSON.stringify({search:s,set:this.set,page:this.currentPage}),signal:this.cancelToken.signal})).json()).listHtml}catch(n){return n.name!=="AbortError"&&console.error("Error loading icons:",n),""}finally{this.spinner.style.display="none",this.cancelToken=null,this.loading=!1}}updateLangAttribute(t){document.documentElement.lang.startsWith("en")||t.setAttribute("lang","en")}selectIcon(t){this.modal.style.display="none";const c=t.getAttribute("title"),s=t.getAttribute("data-iconName");this.preview.innerHTML=t.innerHTML,this.preview.setAttribute("title",c),this.preview.setAttribute("aria-label",c),this.preview.setAttribute("role","img"),this.updateLangAttribute(this.preview),this.inputName.value=s;const n=this.chooseBtn.querySelector(".label");n&&(n.textContent="Change"),this.updateFieldData("icon",s),this.updateFieldData("iconSvg",t.innerHTML),this.chooseBtn.focus(),this.removeBtn.classList.remove("hidden"),this.container.classList.contains("small")&&this.chooseBtn.classList.add("hidden")}removeIcon(){this.preview.innerHTML="",this.preview.removeAttribute("title"),this.preview.removeAttribute("aria-label"),this.inputName.value="",this.updateFieldData("icon",""),this.updateFieldData("iconSvg",null);const t=this.chooseBtn.querySelector(".label");t&&(t.textContent="Choose"),this.removeBtn.classList.add("hidden"),this.container.classList.contains("small")?(this.chooseBtn.classList.remove("hidden"),this.chooseBtn.focus()):this.chooseBtn.focus()}}class Yt{constructor(t,c){E(this,"updateFieldData",(t,c,s=!0)=>{const n=this.formState.fields.find(i=>i.id===this.selectedFieldId);n&&(n[t]=c,s&&this.renderForm())});E(this,"deleteField",t=>{this.formState.fields=this.formState.fields.filter(c=>c.id!==t),this.selectedFieldId===t?(this.selectedFieldId=null,this.selectField(null)):this.renderForm()});E(this,"addField",(t,c)=>{const s=C[t];if(s){if(["recaptcha","hcaptcha","captcha"].includes(t)&&!this.checkOnlyCaptchaActive())return alert("Only one captcha field can be active at a time"),!1;let i={id:crypto.randomUUID(),type:t,...F(s.config.defaultData)};return(s.config.defaultData.handle!==void 0||s.config.defaultData.handle!=="")&&(i.handle=this.generateUniqueHandle(s.config.defaultData.handle)),c!==null?this.formState.fields.splice(Math.max(c,0),0,i):this.formState.fields.push(i),this.selectField(i.id),!0}return!1});E(this,"moveField",(t,c)=>{if(c===null&&(c=this.formState.fields.length),c=Math.max(Math.min(c,this.formState.fields.length),0),t===c||t<0||t>=this.formState.fields.length)return;const s=this.formState.fields,[n]=s.splice(t,1);t<c&&c--,s.splice(c,0,n),this.renderForm(),this.renderSettings()});this.formContainer=document.getElementById("form-container"),this.settingsContainer=document.getElementById("settings-container"),this.formState=t,this.selectedFieldId=null,this.selectionCallback=c,this.iconPicker=new Kt(this.updateFieldData)}checkEmptyState(){this.formState.fields.length===0&&(this.formContainer.innerHTML=` <div class="empty-state cfb:flex cfb:flex-col cfb:items-center cfb:justify-center cfb:h-full cfb:text-gray-500 cfb:text-center"
                 id="emptyState">
                <span class="cfb:iconify-[mdi--add-bold] cfb:text-5xl cfb:mb-4"></span>
                <p class="cfb:text-lg">Drag components here to build your form</p>
            </div>`)}renderForm(){this.formContainer.innerHTML="",this.formState.fields.forEach((t,c)=>{const s=C[t.type];if(s){const n=s.validate(t)===!1,i=document.createElement("div");i.classList.add("form-field-wrapper","cfb:group","cfb:px-4","cfb:pb-4","cfb:pt-2","cfb:border","cfb:hover:border-blue-500","cfb:rounded-md","cfb:cursor-pointer"),t.id===this.selectedFieldId?i.classList.add("cfb:border-blue-500","cfb:bg-blue-50"):n?i.classList.add("cfb:border-red-500","cfb:bg-red-50"):i.classList.add("cfb:border-transparent"),i.dataset.id=t.id,i.dataset.index=c.toString();const r=R();i.innerHTML=`<div>${r}</div>
                                            ${s.render(t,this.formState.settings.orientation)}`,i.draggable=!0,i.querySelector(".delete-container").innerHTML=`
                    <div class="cfb:relative">
                        <button class="delete-field cfb:text-gray-400 hover:cfb:text-red-500 cfb:transition-colors" data-id="${t.id}">
                            <span class="cfb:iconify-[mdi-light--delete] cfb:w-4 cfb:h-4 cfb:text-red-600"></span>
                        </button>
                        <span class="cfb:delete-tooltip">
                            Remove
                        </span>
                    </div>
                `,this.formContainer.appendChild(i),i.addEventListener("dragstart",z),i.addEventListener("dragend",H)}}),this.checkEmptyState()}renderSettings(){const t=this.formState.fields.find(c=>c.id===this.selectedFieldId);if(t){const c=C[t.type];c&&c.renderSettings?(this.settingsContainer.innerHTML=c.renderSettings(t,this.formState),c.initSettings&&c.initSettings(this.updateFieldData,this)):this.settingsContainer.innerHTML='<div class="cfb:p-4 cfb:text-gray-500">No settings available.</div>'}else this.settingsContainer.innerHTML=` <div class="no-selection cfb:text-center cfb:text-gray-500 cfb:mt-10">
                                                        <span class="cfb:iconify-[mdi--settings] cfb:text-5xl cfb:mb-4"></span>
                                                    <p>Select a component to edit</p>
                                                </div>`}selectField(t){this.selectedFieldId=t,this.renderForm(),this.renderSettings(),this.selectionCallback&&this.selectionCallback(t)}setupEventListeners(){this.formContainer.addEventListener("click",t=>{const c=t.target.closest(".form-field-wrapper");c&&this.selectField(c.dataset.id);const s=t.target.closest(".delete-field");if(s){t.stopPropagation();const n=s.dataset.id;this.deleteField(n)}})}generateUniqueHandle(t){if((i=>!this.formState.fields.some(r=>r.handle===i))(t))return t;const s=this.formState.fields.map(i=>i.handle).filter(i=>i&&i.startsWith(t)).map(i=>{const r=i.match(new RegExp(`^${t}(\\d+)$`));return r?parseInt(r[1],10):0}).filter(i=>!isNaN(i)).sort((i,r)=>i-r);let n=1;for(const i of s)if(i===n)n++;else if(i>n)break;return`${t}${n}`}checkOnlyCaptchaActive(t=null){const c=["recaptcha","hcaptcha","captcha"];return this.formState.fields.filter(n=>t&&n.id===t?!1:c.includes(n.type)).length<1}}class Wt{initializeSettingsModal(){const t=document.querySelectorAll(".cfb-settings-tab"),c=document.querySelectorAll(".cfb-tab-content");t.forEach(r=>{r.addEventListener("click",o=>{const l=o.currentTarget.getAttribute("data-tab");t.forEach($=>{$.classList.remove("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),$.classList.add("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50")}),o.currentTarget.classList.remove("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50"),o.currentTarget.classList.add("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),c.forEach($=>{$.classList.add("cfb:hidden")});const b=document.querySelector(`.cfb-tab-${l}`);b&&b.classList.remove("cfb:hidden")})});const s=document.querySelectorAll('input[name="settings\\[actionOnSubmit\\]"]'),n=document.querySelector(".cfb-success-message-field"),i=document.querySelector(".cfb-redirect-url-field");s.forEach(r=>{r.addEventListener("change",o=>{const l=o.target.value;l==="message"?(n.style.display="block",i.style.display="none"):l==="redirect"&&(n.style.display="none",i.style.display="block")})}),this.initializeAdminNotifTab(),this.initializeIntegrationTab()}initializeIntegrationTab(){document.querySelectorAll("[data-integration]").forEach(t=>{t.addEventListener("click",c=>{c.preventDefault();const s=t.getAttribute("data-integration");document.querySelectorAll(".integration-settings").forEach(n=>{n.classList.add("cfb:hidden")}),document.getElementById(`integration-${s}`).classList.remove("cfb:hidden"),document.querySelectorAll("[data-integration]").forEach(n=>{n.classList.remove("cfb:bg-blue-100","cfb:text-blue-700")}),t.classList.add("cfb:bg-blue-100","cfb:text-blue-700")})})}initializeAdminNotifTab(){const t=this,c=document.getElementById("form-admin-notif-enabled");c.addEventListener("click",function(s){t.adminNotifCondition(c)}),t.adminNotifCondition(c)}adminNotifCondition(t){const s=t.getAttribute("aria-checked")==="true";document.querySelectorAll(".cfb-admin-notif").forEach(i=>{s===!1?i.style.display="none":i.style.display="block"})}constructor(t,c){this.formState=t,this.onSettingsUpdated=c,this.formSettingsModal=document.getElementById("main-settings-modal"),this.formSettingsButton=document.getElementById("main-settings-btn"),this.formSettings=document.getElementById("main-settings-form"),this.closeSettingModals=document.querySelectorAll(".cfb-close-main-settings-modal"),this.init(),this.initializeSettingsModal()}init(){this.formSettingsButton.addEventListener("click",()=>this.openSettingsModal()),this.formSettings.addEventListener("submit",t=>this.updateFormSetting(t)),this.closeSettingModals.forEach(t=>t.addEventListener("click",()=>this.closeSettingsModal())),this.formSettingsModal.addEventListener("click",t=>{t.target===this.formSettingsModal&&this.closeSettingsModal()})}openSettingsModal(){this.formSettingsModal.classList.remove("cfb:hidden")}closeSettingsModal(){this.formSettingsModal.classList.add("cfb:hidden")}updateFormSetting(t){t.preventDefault();const c=new FormData(t.target),s={};if(c.forEach((n,i)=>{const r=i.match(/^integrations\[(\w+)\]\[(\w+)\]$/);if(r){const l=r[1],b=r[2];s[l]||(s[l]={}),s[l][b]=n;return}const o=i.match(/^(\w+)\[(\w+)\]$/);if(o){const l=o[1],b=o[2];this.formState[l]||(this.formState[l]={}),this.formState[l][b]=n}else this.formState[i]=n}),Object.keys(s).length>0){this.formState.integrations={};for(const[n,i]of Object.entries(s))Object.keys(i).length>0&&(this.formState.integrations[n]=i)}console.log(this.formState),this.closeSettingsModal(),this.onSettingsUpdated&&this.onSettingsUpdated()}}const w=document.getElementById("preview-modal"),I=document.getElementById("preview-btn"),Gt=document.getElementById("close-modal-btn"),Xt=document.getElementById("preview-iframe"),P=document.querySelectorAll(".cfb-preview-switcher"),Qt=document.getElementById("cfb-preview-container"),Zt="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-blue-600 cfb:text-sm cfb:transition",ec="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-sm cfb:text-black cfb:transition",tc=e=>{const c=document.getElementById("csrf-input").value,s={form:e};fetch(Craft.getActionUrl("form-builder/forms/preview"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":c},body:JSON.stringify(s)}).then(n=>{if(!n.ok)throw new Error("Network response was not ok");return n.text()}).then(n=>{w.classList.remove("cfb:opacity-0","cfb:pointer-events-none"),w.classList.add("cfb:opacity-100","cfb:pointer-events-auto"),Xt.srcdoc=n}).catch(n=>{Craft.cp.displayError("Failed to send preview request")})},cc=e=>{I==null||I.addEventListener("click",()=>tc(e)),Gt.addEventListener("click",j),w.addEventListener("click",t=>{t.target===w&&j()}),P.forEach(t=>{t.addEventListener("click",c=>{P.forEach(n=>n.className=ec),t.className=Zt;const s=t.dataset.device;Qt.className=`cfb:preview-device-frame cfb:${s}`})})},j=()=>{w.classList.remove("cfb:opacity-100","cfb:pointer-events-auto"),w.classList.add("cfb:opacity-0","cfb:pointer-events-none")},nc=e=>{const c=document.getElementById("csrf-input").value,s={form:e};return fetch(Craft.getActionUrl("form-builder/forms/save"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":c,Accept:"application/json"},body:JSON.stringify(s)}).then(n).then(i).catch(r);async function n(l){const b=await l.json();if(!l.ok)throw o(b.message||"Unknown error",b);return b}function i(l){if(l.success===!1)throw o(l.message||"Unknown error",l);location.reload()}function r(l){throw Craft.cp.displayError(l.message),l}function o(l,b){const $=new Error(l);return $.data=b,$}};document.addEventListener("DOMContentLoaded",()=>{var n,i,r,o,l,b,$,T,A,M;const e=document.getElementById("form-container");let t={name:((n=window.FormBuilderData)==null?void 0:n.name)||"Form",handle:((i=window.FormBuilderData)==null?void 0:i.handle)||"",id:((r=window.FormBuilderData)==null?void 0:r.id)||null,settings:(o=window.FormBuilderData)==null?void 0:o.settings,adminNotif:{enabled:((l=window.FormBuilderData)==null?void 0:l.adminNotif.enabled)||!1,subject:((b=window.FormBuilderData)==null?void 0:b.adminNotif.subject)||"",recipients:(($=window.FormBuilderData)==null?void 0:$.adminNotif.recipients)||"",message:((T=window.FormBuilderData)==null?void 0:T.adminNotif.message)||""},fields:((A=window.FormBuilderData)==null?void 0:A.fields)||[],integrations:((M=window.FormBuilderData)==null?void 0:M.integrations)||[]};const c=new Yt(t,S=>{});new Wt(t,()=>{c.renderForm(),c.renderSettings()}),c.setupEventListeners(),Jt(c,t,e),c.checkEmptyState(),c.renderForm(),c.renderSettings(),cc(t),document.getElementById("save-form").addEventListener("click",()=>{nc(t).then(S=>{console.log("Form saved successfully, formState updated:",S),c.renderForm(),c.renderSettings(),s(t.settings.name)}).catch(S=>{console.error("Failed to save form:",S)})});function s(S){const N=document.querySelector("h1, .page-title");N&&S&&(N.textContent=S),document.title=S}});
