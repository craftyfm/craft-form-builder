var O=Object.defineProperty;var F=(e,t,n)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var E=(e,t,n)=>F(e,typeof t!="symbol"?t+"":t,n);const D=e=>JSON.parse(JSON.stringify(e)),r=(e,t,n=!1)=>`
        <div class="cfb:mb-7">
            <div class="cfb:flex cfb:justify-between cfb:text-gray-800 cfb:mb-3 cfb:border-b">
                <h4 class="cfb:text-lg cfb:font-semibold ">${e}</h4>
                <button data-open="${n?"0":"1"}" class="toggle-button-setting-group" id="toggle-${e.toLowerCase()}" data-content="group-settings-${e.toLowerCase()}">
                    ${n?'<span class="cfb:iconify-[mdi--add]"></span>':'<span class="cfb:iconify-[mdi--minus]"></span>'}
                </button>
            </div>
            <div class="cfb:flex-col cfb:gap-3  cfb:flex cfb:transition-all cfb:duration-500 ${n?"cfb:hidden":""}" id="group-settings-${e.toLowerCase()}">
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
    `,d=()=>{document.querySelectorAll(".toggle-button-setting-group").forEach(t=>{t.addEventListener("click",n=>{const s=t.dataset.content;t.dataset.open==="0"?(t.dataset.open="1",t.querySelector("span").classList.replace("cfb:iconify-[mdi--add]","cfb:iconify-[mdi--minus]"),document.getElementById(s).classList.remove("cfb:hidden")):(t.dataset.open="0",t.querySelector("span").classList.replace("cfb:iconify-[mdi--minus]","cfb:iconify-[mdi--add]"),document.getElementById(s).classList.add("cfb:hidden"))})})},g=e=>`
    <div>
        <label class="cfb:flex cfb:items-center cfb:gap-2">
            <input type="checkbox" id="setting-required" ${e.required?"checked":""} class="cfb:text-blue-600 cfb:border-gray-300 cfb:rounded">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-700">Required Field</span>
        </label>
    </div>
`,h=e=>{var t;(t=document.getElementById("setting-required"))==null||t.addEventListener("change",n=>e("required",n.target.checked))},R=()=>`
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
    `),q=(e,t)=>[...e.querySelectorAll(".form-field-wrapper")].reduce((s,c)=>{const i=c.getBoundingClientRect(),a=t-i.top-i.height/2;return a<0&&a>s.offset?{offset:a,element:c}:s},{offset:Number.NEGATIVE_INFINITY}).element,V=()=>{const e=document.createElement("div");e.className="cfb:relative cfb:my-4";const t=document.createElement("div");t.className="cfb:absolute cfb:inset-0 cfb:flex cfb:items-center";const n=document.createElement("div");n.className="cfb:w-full cfb:border-t cfb:border-blue-500",t.appendChild(n);const s=document.createElement("div");s.className="cfb:relative cfb:flex cfb:justify-center";const c=document.createElement("span");return c.className="cfb:bg-white cfb:px-3 cfb:text-sm cfb:text-blue-500 cfb:font-medium",c.textContent="Drop here",s.appendChild(c),e.appendChild(t),e.appendChild(s),e},B=e=>{var t;(t=document.getElementById("setting-options"))==null||t.addEventListener("input",n=>{const s=n.target.value.split(`
`).filter(c=>c.trim()!=="").map(c=>({name:c.trim(),value:c.trim(),isDefault:!1}));e("options",s)})},U=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),x=e=>`
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
`,u=(e,t)=>{e.forEach(n=>{var s;(s=document.getElementById(`setting-${n}`))==null||s.addEventListener("input",c=>t(n,c.target.value))})},m=e=>{const t=document.getElementById("setting-label"),n=document.getElementById("setting-handle");let s=n.value!=="";const c=i=>{i.setCustomValidity(i.value.trim()===""?"This field is required.":"")};t&&c(t),c(n),t&&t.addEventListener("input",()=>{c(t),e("label",t.value),s||(n.value=_(t.value),e("handle",n.value,!1),c(n))}),n.addEventListener("input",()=>{s=!0,e("handle",n.value),c(n)})},_=e=>e.toLowerCase().trim().replace(/[^a-z0-9\s]/g,"").replace(/\s+(.)/g,(t,n)=>n.toUpperCase()).replace(/\s/g,""),J={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter text...",icon:"",iconSvg:null,required:!1}},K=e=>!(!e.handle||!e.label),Y=(e,t)=>`
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

`,W=(e,t)=>{let n=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
       
    `;return t.settings.icons!==""&&(n+=`<div>
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
        </div>`),r("Property",n)+r("Validation",g(e))+r("Advanced",f(e))},G=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},X={config:J,validate:K,render:Y,renderSettings:W,initSettings:G},Q={defaultData:{handle:"",label:"",placeholder:"Enter your message...",desc:"",rows:4,required:!1,minlength:0,maxlength:0}},Z=e=>!(!e.handle||!e.label),ee=(e,t)=>`
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
    `,n=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Min Length</label>
            <input type="number" id="setting-minlength" value="${e.minlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max Length</label>
            <input type="number" id="setting-maxlength" value="${e.maxlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `;return r("Property",t)+r("Validation",n)+r("Advanced",f(e))},ne=e=>{var t,n,s;u(["desc","placeholder"],e),(t=document.getElementById("setting-rows"))==null||t.addEventListener("input",c=>e("rows",parseInt(c.target.value,10))),h(e),(n=document.getElementById("setting-minlength"))==null||n.addEventListener("input",c=>e("minlength",parseInt(c.target.value,10))),(s=document.getElementById("setting-maxlength"))==null||s.addEventListener("input",c=>e("maxlength",parseInt(c.target.value,10))),d(),m(e)},ce={config:Q,validate:Z,render:ee,renderSettings:te,initSettings:ne},se={defaultData:{handle:"",label:"",desc:"",placeholder:"Choose an option...",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},ie=e=>!(!e.handle||!e.label),ae=(e,t)=>{const n=e.options.map(s=>`<option value="${s.value}">${s.name}</option>`).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <select class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" disabled>
                    <option value="">${e.placeholder}</option>
                    ${n}
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
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return r("Property",t)+r("Validation",g(e))+r("Advanced",f(e))},oe=e=>{u(["desc","placeholder"],e),B(e),h(e),d(),m(e)},le={config:se,validate:ie,render:ae,renderSettings:re,initSettings:oe},be={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},de=e=>!(!e.handle||!e.label),fe=(e,t)=>{const n=e.options.map((s,c)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${c}" name="${e.id}[]" value="${s.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${c}" class="cfb:text-sm cfb:text-gray-700">${s.name}</label>
        </div>
    `).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
          ${v(e)}
             <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:w-full">
                    <div class="cfb:space-y-2 cfb:flex-3">
                        ${n}
                    </div>
                    ${y(e)}
                </div>
            </div>
        </div>
    `},me=e=>{const t=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return r("Property",t)+r("Validation",g(e))+r("Advanced",f(e))},ue=e=>{u(["desc"],e),B(e),h(e),d(),m(e)},pe={config:be,validate:de,render:fe,renderSettings:me,initSettings:ue},ge={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},he=e=>!(!e.handle||!e.label),ve=(e,t)=>{const n=e.options.map((s,c)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${c}" name="${e.id}[]" value="${s.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${c}" class="cfb:text-sm cfb:text-gray-700">${s.name}</label>
        </div>
    `).join("");return`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
             <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:space-y-2 cfb:flex-3">
                    ${n}
                </div>
                ${y(e)}
            </div>
            
            
        </div>
    `},ye=e=>{const t=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return r("Property",t)+r("Validation",g(e))+r("Advanced",f(e))},xe=e=>{u(["desc"],e),B(e),h(e),d(),m(e)},$e={config:ge,validate:he,render:ve,renderSettings:ye,initSettings:xe},Se={defaultData:{handle:"",label:"",desc:"",allowedExtensions:"",limit:1,required:!1,maxSize:0}},we=e=>!(!e.handle||!e.label),Ee=(e,t)=>`
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
    `,n=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max File Size in MBs</label>
            <input type="number" id="setting-maxSize" value="${e.maxSize?e.maxSize:""}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return r("Property",t)+r("Validation",n)+r("Advanced",f(e))},ke=e=>{var t;u(["allowedExtensions","limit","desc"],e),h(e),(t=document.getElementById("setting-maxSize"))==null||t.addEventListener("input",n=>e("maxSize",n.target.value)),d(),m(e)},Ce={config:Se,validate:we,render:Ee,renderSettings:Le,initSettings:ke},Ie={defaultData:{handle:"submit",submitText:"Submit",resetText:"Reset",submitStyle:"primary",resetStyle:"secondary",spacing:"wide"}},Be=e=>!!e.handle,Te=(e,t)=>{const n=e.submitStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":"cfb:bg-gray-600 cfb:text-white",s=e.resetStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":e.resetStyle==="secondary"?"cfb:bg-gray-500 cfb:text-white":"cfb:bg-red-500 cfb:text-white";return`
        <div>
            <div class="cfb:flex cfb:justify-between cfb:items-center cfb:mb-3">
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">Submit Button</label>
            </div>
            <div class="cfb:flex ${e.spacing==="wide"?"cfb:justify-between":e.spacing==="tight"?"cfb:gap-2":"cfb:gap-4"}">
                <button type="reset" class="cfb:px-3 cfb:py-1 cfb:rounded-sm cfb:text-sm cfb:cursor-not-allowed ${s}" disabled>
                    ${e.resetText}
                </button>
                <button type="submit" class="cfb:px-3 cfb:py-1 cfb:rounded-sm cfb:text-sm cfb:cursor-not-allowed ${n}" disabled>
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
    `;return r("Property",t)+r("Advanced",f(e))},Me=e=>{var t,n,s,c,i;(t=document.getElementById("setting-submit-text"))==null||t.addEventListener("input",a=>e("submitText",a.target.value)),(n=document.getElementById("setting-reset-text"))==null||n.addEventListener("input",a=>e("resetText",a.target.value)),(s=document.getElementById("setting-submit-style"))==null||s.addEventListener("change",a=>e("submitStyle",a.target.value)),(c=document.getElementById("setting-reset-style"))==null||c.addEventListener("change",a=>e("resetStyle",a.target.value)),(i=document.getElementById("setting-spacing"))==null||i.addEventListener("change",a=>e("spacing",a.target.value)),d(),m(e)},Ne={config:Ie,validate:Be,render:Te,renderSettings:Ae,initSettings:Me},qe={defaultData:{handle:"title",text:"Title Text",level:"h2",alignment:"start"}},je=e=>!!e.handle,Pe=(e,t)=>{const n=e.level,s=`cfb:text-${e.alignment}`;return`
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <${n} class="${s} cfb:w-full cfb:font-bold">${e.text}</${n}>
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
    `;return r("Property",t)+r("Advanced",f(e))},He=e=>{var t,n,s;(t=document.getElementById("setting-text"))==null||t.addEventListener("input",c=>e("text",c.target.value)),(n=document.getElementById("setting-level"))==null||n.addEventListener("change",c=>e("level",c.target.value)),(s=document.getElementById("setting-alignment"))==null||s.addEventListener("change",c=>e("alignment",c.target.value)),d(),m(e)},Oe={config:qe,validate:je,render:Pe,renderSettings:ze,initSettings:He},Fe={defaultData:{handle:"image",src:"",alt:"",width:null,height:null,alignment:"start"}},De=e=>!!e.handle,Re=(e,t)=>{const n=e.width?`${e.width}px`:"auto",s=e.height?`${e.height}px`:"auto",c=e.width?`width="${e.width}"`:"",i=e.height?`height="${e.height}"`:"";return`
    <div class="cfb:flex cfb:justify-${e.alignment} cfb:items-start">
        <img 
            ${c} ${i}
            src="${e.src}" 
            alt="${e.alt||""}" 
            style="width: ${n}; height: ${s};"
            class="cfb:object-fill" 
        />
    </div>
`},Ve=e=>{const t=`
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
    `;return r("Property",t)+r("Advanced",f(e))},Ue=e=>{var t;u(["handle","src","alt","width","height"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",n=>e("alignment",n.target.value)),d(),m(e)},_e={config:Fe,validate:De,render:Re,renderSettings:Ve,initSettings:Ue},Je={defaultData:{handle:"paragraph",text:"This is a paragraph of text. You can edit it in the settings panel.",alignment:"start"}},Ke=e=>!!e.handle,Ye=e=>`
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
    `;return r("Property",t)+r("Advanced",f(e))},Ge=e=>{var t;u(["text"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",n=>e("alignment",n.target.value)),d(),m(e)},Xe={config:Je,validate:Ke,render:Ye,renderSettings:We,initSettings:Ge},Qe={defaultData:{html:"",handle:"html"}},Ze=e=>!!e.handle,et=e=>`
    <div class="cfb:flex cfb:justify-between cfb:items-start">
        <div class="cfb:w-full cfb:prose">
            <code class="cfb:line-clamp-3">${U(e.html)}</code>
        </div>
    </div>
`,tt=e=>{const t=`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">HTML Content</label>
            <textarea id="setting-html" placeholder="Put your HTML code here"
                class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:font-mono" rows="10">${e.html}</textarea>
            <small class="cfb:text-sm cfb:font-light">Please ensure your code contains only HTML and no scripts.</small>
        </div>
    `;return r("Property",t)+r("Advanced",f(e))},nt=e=>{u(["html"],e),d(),m(e)},ct={config:Qe,validate:Ze,render:et,renderSettings:tt,initSettings:nt},st={defaultData:{handle:"hcaptcha",siteKey:"",privateKey:"",required:!0}},it=e=>!0,at=e=>`
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
`,rt=e=>r("Advanced",f(e)),ot=e=>{d(),m(e)},lt={config:st,validate:it,render:at,renderSettings:rt,initSettings:ot},bt={defaultData:{handle:"recaptcha"}},dt=e=>!!e.handle,ft=(e,t)=>`
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
`,mt=e=>r("Advanced",f(e)),ut=e=>{d(),m(e)},pt={config:bt,validate:dt,render:ft,renderSettings:mt,initSettings:ut},gt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter email...",icon:"",iconSvg:null,required:!1}},ht=e=>!(!e.handle||!e.label),vt=(e,t)=>`
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

`,yt=(e,t)=>{let n=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${k(e)}`),r("Property",n)+r("Validation",g(e))+r("Advanced",f(e))},xt=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},$t={config:gt,validate:ht,render:vt,renderSettings:yt,initSettings:xt},St={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter url...",icon:"",iconSvg:null,required:!1}},wt=e=>!(!e.handle||!e.label),Et=(e,t)=>`
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

`,Lt=(e,t)=>{let n=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${k(e)}`),r("Property",n)+r("Validation",g(e))+r("Advanced",f(e))},kt=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},Ct={config:St,validate:wt,render:Et,renderSettings:Lt,initSettings:kt},It={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter phone number...",icon:"",iconSvg:null,required:!1}},Bt=e=>!(!e.handle||!e.label),Tt=(e,t)=>`
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

`,At=(e,t)=>{let n=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${k(e)}`),r("Property",n)+r("Validation",g(e))+r("Advanced",f(e))},Mt=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},Nt={config:It,validate:Bt,render:Tt,renderSettings:At,initSettings:Mt},qt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter number...",icon:"",iconSvg:null,required:!1}},jt=e=>!(!e.handle||!e.label),Pt=(e,t)=>`
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

`,zt=(e,t)=>{let n=`
        ${x(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${k(e)}`),r("Property",n)+r("Validation",g(e))+r("Advanced",f(e))},Ht=(e,t)=>{u(["desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},Ot={config:qt,validate:jt,render:Pt,renderSettings:zt,initSettings:Ht},Ft={defaultData:{handle:"",label:"",checkboxLabel:"",desc:"",required:!1}},Dt=e=>!(!e.handle||!e.label),Rt=(e,t)=>`
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
    `,Vt=e=>{const t=`
        ${x(e)}
            <div>
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Checkbox Label</label>
                <input type="text" id="setting-checkboxLabel" value="${e.checkboxLabel}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
            </div>
    `;return r("Property",t)+r("Validation",g(e))+r("Advanced",f(e))},Ut=(e,t)=>{u(["desc","checkboxLabel"],e),h(e),d(),m(e)},_t={config:Ft,validate:Dt,render:Rt,renderSettings:Vt,initSettings:Ut},C={text:X,email:$t,url:Ct,phone:Nt,number:Ot,textarea:ce,select:le,radio:pe,checkbox:_t,checkboxes:$e,fileUpload:Ce,submitButton:Ne,title:Oe,image:_e,paragraph:Xe,html:ct,hcaptcha:lt,recaptcha:pt};let p=null,L=null;function z(e){L=this,this.classList.add("dragging"),p=V()}const H=e=>{L.classList.remove("dragging"),p&&p.parentNode&&p.parentNode.removeChild(p),L=null,p=null},Jt=(e,t,n)=>{document.querySelectorAll(".form-element").forEach(c=>{c.addEventListener("dragstart",i=>{i.dataTransfer.setData("text/plain",c.dataset.type)}),c.addEventListener("dragstart",z),c.addEventListener("dragend",H)}),n.addEventListener("dragover",c=>{if(c.preventDefault(),!p||e.formState.fields.length===0)return;const i=200,a=20;c.clientY<i?n.scrollBy(0,-a):c.clientY>window.innerHeight-i&&n.scrollBy(0,a);const l=q(n,c.clientY);p.parentNode&&p.parentNode.removeChild(p),l?n.insertBefore(p,l):n.appendChild(p)}),n.addEventListener("drop",c=>{if(c.preventDefault(),!p)return;const i=q(n,c.clientY),a=c.dataTransfer.getData("text/plain"),l=i?i.dataset.index:null;if(a)e.addField(a,l);else{const o=L.dataset.index;e.moveField(o,l,t,e)}})};class Kt{constructor(t){this.currentPage=1,this.modal=null,this.cancelToken=null,this.searchInput=null,this.iconListContainer=null,this.iconList=null,this.hasMore=!0,this.loading=!1,this.set=null,this.spinner=null,this.updateFieldData=t}get listLength(){return this.iconListContainer.querySelectorAll("button").length}init(t,n){this.set!==n&&(this.set=n,this.cleanState()),this.container=document.getElementById(t),this.preview=this.container.querySelector(".icon-picker--icon"),this.chooseBtn=this.container.querySelector(".icon-picker--choose-btn"),this.removeBtn=this.container.querySelector(".icon-picker--remove-btn"),this.inputName=this.container.querySelector('input[name="name"]'),this.chooseBtn.addEventListener("click",()=>{this.showModal()}),this.removeBtn.addEventListener("click",()=>{this.removeIcon()})}cleanState(){this.currentPage=1,this.hasMore=!0,this.modal&&this.updateIcons()}showModal(){this.set&&(this.modal?this.modal.style.display="flex":this.createModal())}createModal(){const t=document.createElement("div");t.className="cfb:bg-white cfb:shadow-lg cfb:rounded-lg cfb:p-6";const n=document.createElement("div");n.className="body",t.appendChild(n);const s=document.createElement("div");s.className="cfb:relative cfb:w-full",n.appendChild(s);const c=document.createElement("span");c.className="cfb:iconify-[mdi--magnify] cfb:absolute cfb:inset-y-2 cfb:left-3 cfb:flex cfb:items-center cfb:pointer-events-none",c.setAttribute("aria-hidden","true"),s.appendChild(c),this.searchInput=document.createElement("input"),this.searchInput.type="text",this.searchInput.name="search",this.searchInput.className="cfb:w-full cfb:pl-10 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:focus:ring-blue-500 cfb:focus:border-blue-500",this.searchInput.placeholder="Search",this.searchInput.setAttribute("aria-label","Search"),s.appendChild(this.searchInput);const i=document.createElement("button");i.className="clear-btn  cfb:absolute cfb:inset-y-0 cfb:right-3 cfb:flex cfb:items-center cfb:justify-center cfb:text-gray-400 cfb:hover:text-gray-600 cfb:focus:outline-none hidden",i.title="Clear search",i.setAttribute("aria-label","Clear search"),s.appendChild(i),this.iconListContainer=document.createElement("div"),this.iconListContainer.className="cfb:grid cfb:grid-cols-8 cfb:gap-2 cfb:max-h-96 cfb:overflow-y-auto cfb:p-4 border cfb:rounded-lg cfb:bg-gray-50 icon-picker-modal--list",n.appendChild(this.iconListContainer),this.updateLangAttribute(this.iconList),this.spinner=document.createElement("div"),this.spinner.className="spinner spinner-absolute",this.spinner.style.display="none",this.iconListContainer.appendChild(this.spinner),this.iconListContainer.addEventListener("scroll",this.onScroll.bind(this));let a;this.searchInput.addEventListener("input",()=>{clearTimeout(a),a=setTimeout(()=>{this.updateIcons()},300),this.searchInput.value?i.classList.remove("hidden"):i.classList.add("hidden")}),i.addEventListener("click",()=>{this.searchInput.value="",this.searchInput.dispatchEvent(new Event("input"))}),this.iconListContainer.addEventListener("click",o=>{let b;if(o.target.nodeName==="BUTTON")b=o.target;else if(b=o.target.closest("button"),!b)return;this.selectIcon(b)}),this.modal=document.createElement("div"),this.modal.className="cfb:fixed cfb:z-50 cfb:inset-0 cfb:flex cfb:items-center cfb:justify-center cfb:bg-white/50";const l=document.createElement("div");l.className="cfb:w-full cfb:max-w-2xl",l.appendChild(t),this.modal.appendChild(l),document.body.appendChild(this.modal),this.modal.addEventListener("click",o=>{o.target===this.modal&&(this.modal.style.display="none")}),this.updateIcons()}async onScroll(){if(this.loading||!this.hasMore)return;const t=this.iconListContainer.scrollTop,n=this.iconListContainer.scrollHeight,s=this.iconListContainer.clientHeight;t+s>=n-200&&this.loadMore()}async updateIcons(){this.iconListContainer.innerHTML=await this.loadIcons()}async loadMore(){this.currentPage+=1;const t=await this.loadIcons();if(t.length<=0){this.hasMore=!1;return}this.iconListContainer.innerHTML+=t}async loadIcons(){this.cancelToken&&this.cancelToken.abort();const n=document.getElementById("csrf-input").value;this.loading=!0;const s=this.searchInput.value;this.spinner.style.display="block",this.cancelToken=new AbortController;try{return(await(await fetch(Craft.getActionUrl("form-builder/icons/picker"),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":n},body:JSON.stringify({search:s,set:this.set,page:this.currentPage}),signal:this.cancelToken.signal})).json()).listHtml}catch(c){return c.name!=="AbortError"&&console.error("Error loading icons:",c),""}finally{this.spinner.style.display="none",this.cancelToken=null,this.loading=!1}}updateLangAttribute(t){document.documentElement.lang.startsWith("en")||t.setAttribute("lang","en")}selectIcon(t){this.modal.style.display="none";const n=t.getAttribute("title"),s=t.getAttribute("data-iconName");this.preview.innerHTML=t.innerHTML,this.preview.setAttribute("title",n),this.preview.setAttribute("aria-label",n),this.preview.setAttribute("role","img"),this.updateLangAttribute(this.preview),this.inputName.value=s;const c=this.chooseBtn.querySelector(".label");c&&(c.textContent="Change"),this.updateFieldData("icon",s),this.updateFieldData("iconSvg",t.innerHTML),this.chooseBtn.focus(),this.removeBtn.classList.remove("hidden"),this.container.classList.contains("small")&&this.chooseBtn.classList.add("hidden")}removeIcon(){this.preview.innerHTML="",this.preview.removeAttribute("title"),this.preview.removeAttribute("aria-label"),this.inputName.value="",this.updateFieldData("icon",""),this.updateFieldData("iconSvg",null);const t=this.chooseBtn.querySelector(".label");t&&(t.textContent="Choose"),this.removeBtn.classList.add("hidden"),this.container.classList.contains("small")?(this.chooseBtn.classList.remove("hidden"),this.chooseBtn.focus()):this.chooseBtn.focus()}}class Yt{constructor(t,n){E(this,"updateFieldData",(t,n,s=!0)=>{const c=this.formState.fields.find(i=>i.id===this.selectedFieldId);c&&(c[t]=n,s&&this.renderForm())});E(this,"deleteField",t=>{this.formState.fields=this.formState.fields.filter(n=>n.id!==t),this.selectedFieldId===t?(this.selectedFieldId=null,this.selectField(null)):this.renderForm()});E(this,"addField",(t,n)=>{const s=C[t];if(s){if(["recaptcha","hcaptcha","captcha"].includes(t)&&!this.checkOnlyCaptchaActive())return alert("Only one captcha field can be active at a time"),!1;let i={id:crypto.randomUUID(),type:t,...D(s.config.defaultData)};return(s.config.defaultData.handle!==void 0||s.config.defaultData.handle!=="")&&(i.handle=this.generateUniqueHandle(s.config.defaultData.handle)),n!==null?this.formState.fields.splice(Math.max(n,0),0,i):this.formState.fields.push(i),this.selectField(i.id),!0}return!1});E(this,"moveField",(t,n)=>{if(n===null&&(n=this.formState.fields.length),n=Math.max(Math.min(n,this.formState.fields.length),0),t===n||t<0||t>=this.formState.fields.length)return;const s=this.formState.fields,[c]=s.splice(t,1);t<n&&n--,s.splice(n,0,c),this.renderForm(),this.renderSettings()});this.formContainer=document.getElementById("form-container"),this.settingsContainer=document.getElementById("settings-container"),this.formState=t,this.selectedFieldId=null,this.selectionCallback=n,this.iconPicker=new Kt(this.updateFieldData)}checkEmptyState(){this.formState.fields.length===0&&(this.formContainer.innerHTML=` <div class="empty-state cfb:flex cfb:flex-col cfb:items-center cfb:justify-center cfb:h-full cfb:text-gray-500 cfb:text-center"
                 id="emptyState">
                <span class="cfb:iconify-[mdi--add-bold] cfb:text-5xl cfb:mb-4"></span>
                <p class="cfb:text-lg">Drag components here to build your form</p>
            </div>`)}renderForm(){this.formContainer.innerHTML="",this.formState.fields.forEach((t,n)=>{const s=C[t.type];if(s){const c=s.validate(t)===!1,i=document.createElement("div");i.classList.add("form-field-wrapper","cfb:group","cfb:px-4","cfb:pb-4","cfb:pt-2","cfb:border","cfb:hover:border-blue-500","cfb:rounded-md","cfb:cursor-pointer"),t.id===this.selectedFieldId?i.classList.add("cfb:border-blue-500","cfb:bg-blue-50"):c?i.classList.add("cfb:border-red-500","cfb:bg-red-50"):i.classList.add("cfb:border-transparent"),i.dataset.id=t.id,i.dataset.index=n.toString();const a=R();i.innerHTML=`<div>${a}</div>
                                            ${s.render(t,this.formState.settings.orientation)}`,i.draggable=!0,i.querySelector(".delete-container").innerHTML=`
                    <div class="cfb:relative">
                        <button class="delete-field cfb:text-gray-400 hover:cfb:text-red-500 cfb:transition-colors" data-id="${t.id}">
                            <span class="cfb:iconify-[mdi-light--delete] cfb:w-4 cfb:h-4 cfb:text-red-600"></span>
                        </button>
                        <span class="cfb:delete-tooltip">
                            Remove
                        </span>
                    </div>
                `,this.formContainer.appendChild(i),i.addEventListener("dragstart",z),i.addEventListener("dragend",H)}}),this.checkEmptyState()}renderSettings(){const t=this.formState.fields.find(n=>n.id===this.selectedFieldId);if(t){const n=C[t.type];n&&n.renderSettings?(this.settingsContainer.innerHTML=n.renderSettings(t,this.formState),n.initSettings&&n.initSettings(this.updateFieldData,this)):this.settingsContainer.innerHTML='<div class="cfb:p-4 cfb:text-gray-500">No settings available.</div>'}else this.settingsContainer.innerHTML=` <div class="no-selection cfb:text-center cfb:text-gray-500 cfb:mt-10">
                                                        <span class="cfb:iconify-[mdi--settings] cfb:text-5xl cfb:mb-4"></span>
                                                    <p>Select a component to edit</p>
                                                </div>`}selectField(t){this.selectedFieldId=t,this.renderForm(),this.renderSettings(),this.selectionCallback&&this.selectionCallback(t)}setupEventListeners(){this.formContainer.addEventListener("click",t=>{const n=t.target.closest(".form-field-wrapper");n&&this.selectField(n.dataset.id);const s=t.target.closest(".delete-field");if(s){t.stopPropagation();const c=s.dataset.id;this.deleteField(c)}})}generateUniqueHandle(t){if((i=>!this.formState.fields.some(a=>a.handle===i))(t))return t;const s=this.formState.fields.map(i=>i.handle).filter(i=>i&&i.startsWith(t)).map(i=>{const a=i.match(new RegExp(`^${t}(\\d+)$`));return a?parseInt(a[1],10):0}).filter(i=>!isNaN(i)).sort((i,a)=>i-a);let c=1;for(const i of s)if(i===c)c++;else if(i>c)break;return`${t}${c}`}checkOnlyCaptchaActive(t=null){const n=["recaptcha","hcaptcha","captcha"];return this.formState.fields.filter(c=>t&&c.id===t?!1:n.includes(c.type)).length<1}}class Wt{initializeSettingsModal(){const t=document.querySelectorAll(".cfb-settings-tab"),n=document.querySelectorAll(".cfb-tab-content");t.forEach(a=>{a.addEventListener("click",l=>{const o=l.currentTarget.getAttribute("data-tab");t.forEach($=>{$.classList.remove("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),$.classList.add("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50")}),l.currentTarget.classList.remove("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50"),l.currentTarget.classList.add("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),n.forEach($=>{$.classList.add("cfb:hidden")});const b=document.querySelector(`.cfb-tab-${o}`);b&&b.classList.remove("cfb:hidden")})});const s=document.querySelectorAll('input[name="settings\\[actionOnSubmit\\]"]'),c=document.querySelector(".cfb-success-message-field"),i=document.querySelector(".cfb-redirect-url-field");s.forEach(a=>{a.addEventListener("change",l=>{const o=l.target.value;o==="message"?(c.style.display="block",i.style.display="none"):o==="redirect"&&(c.style.display="none",i.style.display="block")})}),this.initializeAdminNotifTab(),this.initializeIntegrationTab()}initializeIntegrationTab(){document.querySelectorAll("[data-integration]").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const s=t.getAttribute("data-integration");document.querySelectorAll(".integration-settings").forEach(c=>{c.classList.add("cfb:hidden")}),document.getElementById(`integration-${s}`).classList.remove("cfb:hidden"),document.querySelectorAll("[data-integration]").forEach(c=>{c.classList.remove("cfb:bg-blue-100","cfb:text-blue-700")}),t.classList.add("cfb:bg-blue-100","cfb:text-blue-700")})})}initializeAdminNotifTab(){const t=this,n=document.getElementById("form-admin-notif-enabled");n.addEventListener("click",function(s){t.adminNotifCondition(n)}),t.adminNotifCondition(n)}adminNotifCondition(t){const s=t.getAttribute("aria-checked")==="true";document.querySelectorAll(".cfb-admin-notif").forEach(i=>{s===!1?i.style.display="none":i.style.display="block"})}constructor(t,n){this.formState=t,this.onSettingsUpdated=n,this.formSettingsModal=document.getElementById("main-settings-modal"),this.formSettingsButton=document.getElementById("main-settings-btn"),this.formSettings=document.getElementById("main-settings-form"),this.closeSettingModals=document.querySelectorAll(".cfb-close-main-settings-modal"),this.init(),this.initializeSettingsModal()}init(){this.formSettingsButton.addEventListener("click",()=>this.openSettingsModal()),this.formSettings.addEventListener("submit",t=>this.updateFormSetting(t)),this.closeSettingModals.forEach(t=>t.addEventListener("click",()=>this.closeSettingsModal())),this.formSettingsModal.addEventListener("click",t=>{t.target===this.formSettingsModal&&this.closeSettingsModal()})}openSettingsModal(){this.formSettingsModal.classList.remove("cfb:hidden")}closeSettingsModal(){this.formSettingsModal.classList.add("cfb:hidden")}updateFormSetting(t){t.preventDefault();const n=new FormData(t.target),s={};if(n.forEach((c,i)=>{const a=i.match(/^integrations\[(\w+)\]\[(\w+)\]$/);if(a){const o=a[1],b=a[2];s[o]||(s[o]={}),s[o][b]=c;return}const l=i.match(/^(\w+)\[(\w+)\]$/);if(l){const o=l[1],b=l[2];this.formState[o]||(this.formState[o]={}),this.formState[o][b]=c}else this.formState[i]=c}),Object.keys(s).length>0){this.formState.integrations={};for(const[c,i]of Object.entries(s))Object.keys(i).length>0&&(this.formState.integrations[c]=i)}console.log(this.formState),this.closeSettingsModal(),this.onSettingsUpdated&&this.onSettingsUpdated()}}const w=document.getElementById("preview-modal"),I=document.getElementById("preview-btn"),Gt=document.getElementById("close-modal-btn"),Xt=document.getElementById("preview-iframe"),j=document.querySelectorAll(".cfb-preview-switcher"),Qt=document.getElementById("cfb-preview-container"),Zt="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-blue-600 cfb:text-sm cfb:transition",en="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-sm cfb:text-black cfb:transition",tn=e=>{const n=document.getElementById("csrf-input").value,s={form:e};fetch(Craft.getActionUrl("form-builder/forms/preview"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":n},body:JSON.stringify(s)}).then(c=>{if(!c.ok)throw new Error("Network response was not ok");return c.text()}).then(c=>{w.classList.remove("cfb:opacity-0","cfb:pointer-events-none"),w.classList.add("cfb:opacity-100","cfb:pointer-events-auto"),Xt.srcdoc=c}).catch(c=>{Craft.cp.displayError("Failed to send preview request")})},nn=e=>{I==null||I.addEventListener("click",()=>tn(e)),Gt.addEventListener("click",P),w.addEventListener("click",t=>{t.target===w&&P()}),j.forEach(t=>{t.addEventListener("click",n=>{j.forEach(c=>c.className=en),t.className=Zt;const s=t.dataset.device;Qt.className=`cfb:preview-device-frame cfb:${s}`})})},P=()=>{w.classList.remove("cfb:opacity-100","cfb:pointer-events-auto"),w.classList.add("cfb:opacity-0","cfb:pointer-events-none")},cn=e=>{const n=document.getElementById("csrf-input").value,s={form:e};return fetch(Craft.getActionUrl("form-builder/forms/save"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":n,Accept:"application/json"},body:JSON.stringify(s)}).then(c).then(i).catch(a);async function c(o){const b=await o.json();if(!o.ok)throw l(b.message||"Unknown error",b);return b}function i(o){if(o.success===!1)throw l(o.message||"Unknown error",o);location.reload()}function a(o){throw Craft.cp.displayError(o.message),o}function l(o,b){const $=new Error(o);return $.data=b,$}};class sn{constructor({listDropdownEl:t,fieldMappingContainerEl:n,listEndpoint:s,globalFieldsVar:c}){if(!t||!n||!s||!c)throw new Error("Missing required parameters.");this.listDropdownEl=t,this.fieldMappingContainerEl=n,this.listEndpoint=s,this.globalFieldsVar=c,this.init()}async init(){await this.loadLists(),this.listDropdownEl.addEventListener("change",()=>{this.generateFieldMapping()})}async loadLists(){try{const t=await fetch(this.listEndpoint);if(!t.ok)throw new Error(`Failed to load lists: ${t.statusText}`);const n=await t.json();this.populateListDropdown(n)}catch(t){console.error("Error loading lists:",t)}}populateListDropdown(t){this.listDropdownEl.innerHTML='<option value="">Select a list</option>',t.forEach(n=>{const s=document.createElement("option");s.value=n.id,s.textContent=n.name,this.listDropdownEl.appendChild(s)})}generateFieldMapping(){if(this.fieldMappingContainerEl.innerHTML="",!window[this.globalFieldsVar]||!Array.isArray(window[this.globalFieldsVar])){console.warn(`Global variable ${this.globalFieldsVar} is missing or not an array.`);return}window[this.globalFieldsVar].forEach(t=>{const n=document.createElement("div");n.className="cfb:grid cfb:grid-cols-2 cfb:border-b cfb:border-gray-100 cfb:hover:bg-gray-50 cfb:transition-colors";const s=document.createElement("div");s.className="cfb:px-6 cfb:border-r cfb:border-gray-200 cfb:flex cfb:items-center",s.innerHTML=`<span class="cfb:text-gray-800">${t.label}</span>${t.required?'<span class="cfb:text-red-500 cfb:ml-1">*</span>':""}`;const c=document.createElement("div");c.className="cfb:px-6 cfb:py-2";const i=document.createElement("select");i.id=`${t.name}Map`,i.className="cfb:px-3 cfb:py-2 cfb:w-64 cfb:border cfb:border-gray-300 cfb:rounded-lg focus:cfb:outline-none focus:cfb:ring-2 focus:cfb:ring-blue-500 focus:cfb:border-blue-500",i.innerHTML='<option value="">Select an option</option>',(t.options||[]).forEach(a=>{const l=document.createElement("option");l.value=a.value,l.textContent=a.label,i.appendChild(l)}),c.appendChild(i),n.appendChild(s),n.appendChild(c),this.fieldMappingContainerEl.appendChild(n)})}refreshLists(){return this.loadLists()}}typeof Craft.FormBuilder>"u"&&(Craft.FormBuilder={});Craft.FormBuilder.IntegrationMappingManager=sn;document.addEventListener("DOMContentLoaded",()=>{var c,i,a,l,o,b,$,T,A,M;const e=document.getElementById("form-container");let t={name:((c=window.FormBuilderData)==null?void 0:c.name)||"Form",handle:((i=window.FormBuilderData)==null?void 0:i.handle)||"",id:((a=window.FormBuilderData)==null?void 0:a.id)||null,settings:(l=window.FormBuilderData)==null?void 0:l.settings,adminNotif:{enabled:((o=window.FormBuilderData)==null?void 0:o.adminNotif.enabled)||!1,subject:((b=window.FormBuilderData)==null?void 0:b.adminNotif.subject)||"",recipients:(($=window.FormBuilderData)==null?void 0:$.adminNotif.recipients)||"",message:((T=window.FormBuilderData)==null?void 0:T.adminNotif.message)||""},fields:((A=window.FormBuilderData)==null?void 0:A.fields)||[],integrations:((M=window.FormBuilderData)==null?void 0:M.integrations)||[]};Object.defineProperty(Craft.FormBuilder,"formState",{get(){return t},configurable:!1,enumerable:!0});const n=new Yt(t,S=>{});new Wt(t,()=>{n.renderForm(),n.renderSettings()}),n.setupEventListeners(),Jt(n,t,e),n.checkEmptyState(),n.renderForm(),n.renderSettings(),nn(t),document.getElementById("save-form").addEventListener("click",()=>{cn(t).then(S=>{console.log("Form saved successfully, formState updated:",S),n.renderForm(),n.renderSettings(),s(t.settings.name)}).catch(S=>{console.error("Failed to save form:",S)})});function s(S){const N=document.querySelector("h1, .page-title");N&&S&&(N.textContent=S),document.title=S}});
