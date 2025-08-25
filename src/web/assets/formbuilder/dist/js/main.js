var X=Object.defineProperty;var Q=(e,t,n)=>t in e?X(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var L=(e,t,n)=>Q(e,typeof t!="symbol"?t+"":t,n);const Z=e=>JSON.parse(JSON.stringify(e)),a=(e,t,n=!1)=>`
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
    `,C=e=>`
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
    `,b=()=>{document.querySelectorAll(".toggle-button-setting-group").forEach(t=>{t.addEventListener("click",n=>{const i=t.dataset.content;t.dataset.open==="0"?(t.dataset.open="1",t.querySelector("span").classList.replace("cfb:iconify-[mdi--add]","cfb:iconify-[mdi--minus]"),document.getElementById(i).classList.remove("cfb:hidden")):(t.dataset.open="0",t.querySelector("span").classList.replace("cfb:iconify-[mdi--minus]","cfb:iconify-[mdi--add]"),document.getElementById(i).classList.add("cfb:hidden"))})})},h=e=>`
    <div>
        <label class="cfb:flex cfb:items-center cfb:gap-2">
            <input type="checkbox" id="setting-required" ${e.required?"checked":""} class="cfb:text-blue-600 cfb:border-gray-300 cfb:rounded">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-700">Required Field</span>
        </label>
    </div>
`,v=e=>{var t;(t=document.getElementById("setting-required"))==null||t.addEventListener("change",n=>e("required",n.target.checked))},ee=()=>`
        <div class="cfb:flex cfb:opacity-0 cfb:group-hover:opacity-100 cfb:transition-opacity cfb:justify-between">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-500 cfb:w-4 cfb:h-4 cfb:iconify-[mdi--drag-variant]"></span>
            <span class="delete-container cfb:delete-btn-wrapper cfb:mb-1"></span>
        </div>
`,y=e=>{const t=e.required??!1;return`
        <div class="cfb:mb-2 cfb:font-light cfb:flex-1">
            <div class="cfb:flex cfb:justify-between cfb:items-center">
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">
                    ${e.label}
                    ${t?'<span class="cfb:text-red-500 cfb:ml-1">*</span>':""}
                </label>
            </div>
        </div>
    `},x=e=>(e.required,`
        <div class="">
            <p class="cfb:text-sm cfb:font-light">${e.desc??""}</p>
        </div>
    `),A=(e,t)=>[...e.querySelectorAll(".form-field-wrapper")].reduce((i,c)=>{const s=c.getBoundingClientRect(),r=t-s.top-s.height/2;return r<0&&r>i.offset?{offset:r,element:c}:i},{offset:Number.NEGATIVE_INFINITY}).element,te=()=>{const e=document.createElement("div");e.className="cfb:relative cfb:my-4";const t=document.createElement("div");t.className="cfb:absolute cfb:inset-0 cfb:flex cfb:items-center";const n=document.createElement("div");n.className="cfb:w-full cfb:border-t cfb:border-blue-500",t.appendChild(n);const i=document.createElement("div");i.className="cfb:relative cfb:flex cfb:justify-center";const c=document.createElement("span");return c.className="cfb:bg-white cfb:px-3 cfb:text-sm cfb:text-blue-500 cfb:font-medium",c.textContent="Drop here",i.appendChild(c),e.appendChild(t),e.appendChild(i),e},T=e=>{var t;(t=document.getElementById("setting-options"))==null||t.addEventListener("input",n=>{const i=n.target.value.split(`
`).filter(c=>c.trim()!=="").map(c=>({name:c.trim(),value:c.trim(),isDefault:!1}));e("options",i)})},ne=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),$=e=>`
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
`,p=(e,t)=>{e.forEach(n=>{var i;(i=document.getElementById(`setting-${n}`))==null||i.addEventListener("input",c=>t(n,c.target.value))})},u=e=>{const t=document.getElementById("setting-label"),n=document.getElementById("setting-handle");let i=n.value!=="";const c=s=>{s.setCustomValidity(s.value.trim()===""?"This field is required.":"")};t&&c(t),c(n),t&&t.addEventListener("input",()=>{c(t),e("label",t.value),i||(n.value=ce(t.value),e("handle",n.value,!1),c(n))}),n.addEventListener("input",()=>{i=!0,e("handle",n.value),c(n)})},ce=e=>e.toLowerCase().trim().replace(/[^a-z0-9\s]/g,"").replace(/\s+(.)/g,(t,n)=>n.toUpperCase()).replace(/\s/g,""),ie={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter text...",icon:"",iconSvg:null,required:!1}},se=e=>!(!e.handle||!e.label),ae=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${y(e)}
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
                ${x(e)}
            </div>
        </div>

`,re=(e,t)=>{let n=`
        ${$(e)}
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
        </div>`),a("Property",n)+a("Validation",h(e))+a("Advanced",f(e))},le=(e,t)=>{p(["desc","placeholder"],e),v(e),b(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),u(e)},oe={config:ie,validate:se,render:ae,renderSettings:re,initSettings:le},de={defaultData:{handle:"",label:"",placeholder:"Enter your message...",desc:"",rows:4,required:!1,minlength:0,maxlength:0}},be=e=>!(!e.handle||!e.label),fe=(e,t)=>`
     <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
        ${y(e)}
        <div class="${t==="horizontal"?"cfb:w-3/4":""}">
            <textarea placeholder="${e.placeholder}" 
                      rows="${e.rows}" 
                      class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50 cfb:resize-none" 
                      disabled></textarea>
            ${x(e)}
        </div>
    </div>
`,ue=e=>{const t=`
        ${$(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Rows</label>
            <input type="number" id="setting-rows" value="${e.rows}" min="1" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `,n=`
        ${h(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Min Length</label>
            <input type="number" id="setting-minlength" value="${e.minlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max Length</label>
            <input type="number" id="setting-maxlength" value="${e.maxlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `;return a("Property",t)+a("Validation",n)+a("Advanced",f(e))},me=e=>{var t,n,i;p(["desc","placeholder"],e),(t=document.getElementById("setting-rows"))==null||t.addEventListener("input",c=>e("rows",parseInt(c.target.value,10))),v(e),(n=document.getElementById("setting-minlength"))==null||n.addEventListener("input",c=>e("minlength",parseInt(c.target.value,10))),(i=document.getElementById("setting-maxlength"))==null||i.addEventListener("input",c=>e("maxlength",parseInt(c.target.value,10))),b(),u(e)},pe={config:de,validate:be,render:fe,renderSettings:ue,initSettings:me},ge={defaultData:{handle:"",label:"",desc:"",placeholder:"Choose an option...",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},he=e=>!(!e.handle||!e.label),ve=(e,t)=>{const n=e.options.map(i=>`<option value="${i.value}">${i.name}</option>`).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${y(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <select class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" disabled>
                    <option value="">${e.placeholder}</option>
                    ${n}
                </select>
                ${x(e)}
            </div>
        </div>
    `},ye=e=>{const t=`
        ${$(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return a("Property",t)+a("Validation",h(e))+a("Advanced",f(e))},xe=e=>{p(["desc","placeholder"],e),T(e),v(e),b(),u(e)},$e={config:ge,validate:he,render:ve,renderSettings:ye,initSettings:xe},Se={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},we=e=>!(!e.handle||!e.label),Ee=(e,t)=>{const n=e.options.map((i,c)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${c}" name="${e.id}[]" value="${i.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${c}" class="cfb:text-sm cfb:text-gray-700">${i.name}</label>
        </div>
    `).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
          ${y(e)}
             <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:w-full">
                    <div class="cfb:space-y-2 cfb:flex-3">
                        ${n}
                    </div>
                    ${x(e)}
                </div>
            </div>
        </div>
    `},Le=e=>{const t=`
        ${$(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return a("Property",t)+a("Validation",h(e))+a("Advanced",f(e))},ke=e=>{p(["desc"],e),T(e),v(e),b(),u(e)},Ce={config:Se,validate:we,render:Ee,renderSettings:Le,initSettings:ke},Ie={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},Be=e=>!(!e.handle||!e.label),Te=(e,t)=>{const n=e.options.map((i,c)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${c}" name="${e.id}[]" value="${i.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${c}" class="cfb:text-sm cfb:text-gray-700">${i.name}</label>
        </div>
    `).join("");return`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${y(e)}
             <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:space-y-2 cfb:flex-3">
                    ${n}
                </div>
                ${x(e)}
            </div>
            
            
        </div>
    `},Ae=e=>{const t=`
        ${$(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return a("Property",t)+a("Validation",h(e))+a("Advanced",f(e))},Ne=e=>{p(["desc"],e),T(e),v(e),b(),u(e)},Me={config:Ie,validate:Be,render:Te,renderSettings:Ae,initSettings:Ne},qe={defaultData:{handle:"",label:"",desc:"",allowedExtensions:"",limit:1,required:!1,maxSize:0}},je=e=>!(!e.handle||!e.label),Fe=(e,t)=>`
    <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
        ${y(e)}
        <div class="${t==="horizontal"?"cfb:w-3/4":""}">
            <div class="">
                <div class="cfb:flex cfb:items-center cfb:justify-center cfb:w-full cfb:flex-3">
                  <input type="file"
                           class="cfb:w-full cfb:text-slate-500 cfb:font-medium cfb:text-sm cfb:bg-gray-100
                           cfb:file:cursor-pointer cfb:cursor-pointer cfb:file:border-0 cfb:file:py-2 cfb:file:px-4 cfb:file:mr-4
                           cfb:file:bg-blue-500 cfb:file:hover:bg-gray-700 cfb:file:text-white cfb:rounded" disabled/>
                </div>
            </div>
            ${x(e)}
        </div>
    </div>
`,Pe=e=>{const t=`
        ${$(e)}
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
        ${h(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max File Size in MBs</label>
            <input type="number" id="setting-maxSize" value="${e.maxSize?e.maxSize:""}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return a("Property",t)+a("Validation",n)+a("Advanced",f(e))},He=e=>{var t;p(["allowedExtensions","limit","desc"],e),v(e),(t=document.getElementById("setting-maxSize"))==null||t.addEventListener("input",n=>e("maxSize",n.target.value)),b(),u(e)},ze={config:qe,validate:je,render:Fe,renderSettings:Pe,initSettings:He},Oe={defaultData:{handle:"submit",submitText:"Submit",resetText:"Reset",submitStyle:"primary",resetStyle:"secondary",spacing:"wide"}},De=e=>!!e.handle,Ve=(e,t)=>{const n=e.submitStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":"cfb:bg-gray-600 cfb:text-white",i=e.resetStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":e.resetStyle==="secondary"?"cfb:bg-gray-500 cfb:text-white":"cfb:bg-red-500 cfb:text-white";return`
        <div>
            <div class="cfb:flex cfb:justify-between cfb:items-center cfb:mb-3">
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">Submit Button</label>
            </div>
            <div class="cfb:flex ${e.spacing==="wide"?"cfb:justify-between":e.spacing==="tight"?"cfb:gap-2":"cfb:gap-4"}">
                <button type="reset" class="cfb:px-3 cfb:py-1 cfb:rounded-sm cfb:text-sm cfb:cursor-not-allowed ${i}" disabled>
                    ${e.resetText}
                </button>
                <button type="submit" class="cfb:px-3 cfb:py-1 cfb:rounded-sm cfb:text-sm cfb:cursor-not-allowed ${n}" disabled>
                    ${e.submitText}
                </button>
            </div>
        </div>
    `},Re=e=>{const t=`
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
    `;return a("Property",t)+a("Advanced",f(e))},Ue=e=>{var t,n,i,c,s;(t=document.getElementById("setting-submit-text"))==null||t.addEventListener("input",r=>e("submitText",r.target.value)),(n=document.getElementById("setting-reset-text"))==null||n.addEventListener("input",r=>e("resetText",r.target.value)),(i=document.getElementById("setting-submit-style"))==null||i.addEventListener("change",r=>e("submitStyle",r.target.value)),(c=document.getElementById("setting-reset-style"))==null||c.addEventListener("change",r=>e("resetStyle",r.target.value)),(s=document.getElementById("setting-spacing"))==null||s.addEventListener("change",r=>e("spacing",r.target.value)),b(),u(e)},_e={config:Oe,validate:De,render:Ve,renderSettings:Re,initSettings:Ue},Je={defaultData:{handle:"title",text:"Title Text",level:"h2",alignment:"start"}},Ye=e=>!!e.handle,Ke=(e,t)=>{const n=e.level,i=`cfb:text-${e.alignment}`;return`
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <${n} class="${i} cfb:w-full cfb:font-bold">${e.text}</${n}>
        </div>
    `},We=e=>{const t=`
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
    `;return a("Property",t)+a("Advanced",f(e))},Ge=e=>{var t,n,i;(t=document.getElementById("setting-text"))==null||t.addEventListener("input",c=>e("text",c.target.value)),(n=document.getElementById("setting-level"))==null||n.addEventListener("change",c=>e("level",c.target.value)),(i=document.getElementById("setting-alignment"))==null||i.addEventListener("change",c=>e("alignment",c.target.value)),b(),u(e)},Xe={config:Je,validate:Ye,render:Ke,renderSettings:We,initSettings:Ge},Qe={defaultData:{handle:"image",src:"",alt:"",width:null,height:null,alignment:"start"}},Ze=e=>!!e.handle,et=(e,t)=>{const n=e.width?`${e.width}px`:"auto",i=e.height?`${e.height}px`:"auto",c=e.width?`width="${e.width}"`:"",s=e.height?`height="${e.height}"`:"";return`
    <div class="cfb:flex cfb:justify-${e.alignment} cfb:items-start">
        <img 
            ${c} ${s}
            src="${e.src}" 
            alt="${e.alt||""}" 
            style="width: ${n}; height: ${i};"
            class="cfb:object-fill" 
        />
    </div>
`},tt=e=>{const t=`
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
    `;return a("Property",t)+a("Advanced",f(e))},nt=e=>{var t;p(["handle","src","alt","width","height"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",n=>e("alignment",n.target.value)),b(),u(e)},ct={config:Qe,validate:Ze,render:et,renderSettings:tt,initSettings:nt},it={defaultData:{handle:"paragraph",text:"This is a paragraph of text. You can edit it in the settings panel.",alignment:"start"}},st=e=>!!e.handle,at=e=>`
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <p class="${`cfb:text-${e.alignment}`} cfb:w-full">${e.text}</p>
        </div>
    `,rt=e=>{const t=`
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
    `;return a("Property",t)+a("Advanced",f(e))},lt=e=>{var t;p(["text"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",n=>e("alignment",n.target.value)),b(),u(e)},ot={config:it,validate:st,render:at,renderSettings:rt,initSettings:lt},dt={defaultData:{html:"",handle:"html"}},bt=e=>!!e.handle,ft=e=>`
    <div class="cfb:flex cfb:justify-between cfb:items-start">
        <div class="cfb:w-full cfb:prose">
            <code class="cfb:line-clamp-3">${ne(e.html)}</code>
        </div>
    </div>
`,ut=e=>{const t=`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">HTML Content</label>
            <textarea id="setting-html" placeholder="Put your HTML code here"
                class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:font-mono" rows="10">${e.html}</textarea>
            <small class="cfb:text-sm cfb:font-light">Please ensure your code contains only HTML and no scripts.</small>
        </div>
    `;return a("Property",t)+a("Advanced",f(e))},mt=e=>{p(["html"],e),b(),u(e)},pt={config:dt,validate:bt,render:ft,renderSettings:ut,initSettings:mt},gt={defaultData:{handle:"hcaptcha",siteKey:"",privateKey:"",required:!0}},ht=e=>!0,vt=e=>`
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
`,yt=e=>a("Advanced",f(e)),xt=e=>{b(),u(e)},$t={config:gt,validate:ht,render:vt,renderSettings:yt,initSettings:xt},St={defaultData:{handle:"recaptcha"}},wt=e=>!!e.handle,Et=(e,t)=>`
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
`,Lt=e=>a("Advanced",f(e)),kt=e=>{b(),u(e)},Ct={config:St,validate:wt,render:Et,renderSettings:Lt,initSettings:kt},It={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter email...",icon:"",iconSvg:null,required:!1}},Bt=e=>!(!e.handle||!e.label),Tt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${y(e)}
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
                    ${x(e)}
            </div>
        </div>

`,At=(e,t)=>{let n=`
        ${$(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${C(e)}`),a("Property",n)+a("Validation",h(e))+a("Advanced",f(e))},Nt=(e,t)=>{p(["desc","placeholder"],e),v(e),b(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),u(e)},Mt={config:It,validate:Bt,render:Tt,renderSettings:At,initSettings:Nt},qt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter url...",icon:"",iconSvg:null,required:!1}},jt=e=>!(!e.handle||!e.label),Ft=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${y(e)}
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
                ${x(e)}
            </div>
        </div>

`,Pt=(e,t)=>{let n=`
        ${$(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${C(e)}`),a("Property",n)+a("Validation",h(e))+a("Advanced",f(e))},Ht=(e,t)=>{p(["desc","placeholder"],e),v(e),b(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),u(e)},zt={config:qt,validate:jt,render:Ft,renderSettings:Pt,initSettings:Ht},Ot={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter phone number...",icon:"",iconSvg:null,required:!1}},Dt=e=>!(!e.handle||!e.label),Vt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${y(e)}
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
                ${x(e)}
            </div>
        </div>

`,Rt=(e,t)=>{let n=`
        ${$(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${C(e)}`),a("Property",n)+a("Validation",h(e))+a("Advanced",f(e))},Ut=(e,t)=>{p(["desc","placeholder"],e),v(e),b(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),u(e)},_t={config:Ot,validate:Dt,render:Vt,renderSettings:Rt,initSettings:Ut},Jt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter number...",icon:"",iconSvg:null,required:!1}},Yt=e=>!(!e.handle||!e.label),Kt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${y(e)}
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
                ${x(e)}
            </div>
        </div>

`,Wt=(e,t)=>{let n=`
        ${$(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${C(e)}`),a("Property",n)+a("Validation",h(e))+a("Advanced",f(e))},Gt=(e,t)=>{p(["desc","placeholder"],e),v(e),b(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),u(e)},Xt={config:Jt,validate:Yt,render:Kt,renderSettings:Wt,initSettings:Gt},Qt={defaultData:{handle:"",label:"",checkboxLabel:"",desc:"",required:!1}},Zt=e=>!(!e.handle||!e.label),en=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row cfb:gap-3":"cfb:flex-col"}">
            ${y(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:flex cfb:items-center cfb:gap-2 ">
                    <input type="checkbox" id="${e.id}" name="${e.id}" value="1" class="cfb:border-gray-300 cfb:rounded" disabled>
                    <label for="${e.id}" class="cfb:text-sm cfb:text-gray-700">${e.checkboxLabel}</label>
                </div>
                ${x(e)}
            </div>
        </div>
    `,tn=e=>{const t=`
        ${$(e)}
            <div>
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Checkbox Label</label>
                <input type="text" id="setting-checkboxLabel" value="${e.checkboxLabel}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
            </div>
    `;return a("Property",t)+a("Validation",h(e))+a("Advanced",f(e))},nn=(e,t)=>{p(["desc","checkboxLabel"],e),v(e),b(),u(e)},cn={config:Qt,validate:Zt,render:en,renderSettings:tn,initSettings:nn},sn={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter Date...",required:!1}},an=e=>!(!e.handle||!e.label),rn=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${y(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <input type="date" 
                           placeholder="${e.placeholder}" 
                           class="cfb:pl-3 cfb:pr-3 cfb:py-2 cfb:w-full cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" 
                           disabled>
                ${x(e)}
            </div>
        </div>

`,ln=(e,t)=>{let n=`
        ${$(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
       
    `;return a("Property",n)+a("Validation",h(e))+a("Advanced",f(e))},on=(e,t)=>{p(["desc","placeholder"],e),v(e),b(),u(e)},dn={config:sn,validate:an,render:rn,renderSettings:ln,initSettings:on},I={text:oe,date:dn,email:Mt,url:zt,phone:_t,number:Xt,textarea:pe,select:$e,radio:Ce,checkbox:cn,checkboxes:Me,fileUpload:ze,submitButton:_e,title:Xe,image:ct,paragraph:ot,html:pt,hcaptcha:$t,recaptcha:Ct};let g=null,k=null;function W(e){k=this,this.classList.add("dragging"),g=te()}const G=e=>{k.classList.remove("dragging"),g&&g.parentNode&&g.parentNode.removeChild(g),k=null,g=null},bn=(e,t,n)=>{document.querySelectorAll(".form-element").forEach(c=>{c.addEventListener("dragstart",s=>{s.dataTransfer.setData("text/plain",c.dataset.type)}),c.addEventListener("dragstart",W),c.addEventListener("dragend",G)}),n.addEventListener("dragover",c=>{if(c.preventDefault(),!g||e.formState.fields.length===0)return;const s=200,r=20;c.clientY<s?n.scrollBy(0,-r):c.clientY>window.innerHeight-s&&n.scrollBy(0,r);const o=A(n,c.clientY);g.parentNode&&g.parentNode.removeChild(g),o?n.insertBefore(g,o):n.appendChild(g)}),n.addEventListener("drop",c=>{if(c.preventDefault(),!g)return;const s=A(n,c.clientY),r=c.dataTransfer.getData("text/plain"),o=s?s.dataset.index:null;if(r)e.addField(r,o);else{const l=k.dataset.index;e.moveField(l,o,t,e)}})};class fn{constructor(t){this.currentPage=1,this.modal=null,this.cancelToken=null,this.searchInput=null,this.iconListContainer=null,this.iconList=null,this.hasMore=!0,this.loading=!1,this.set=null,this.spinner=null,this.updateFieldData=t}get listLength(){return this.iconListContainer.querySelectorAll("button").length}init(t,n){this.set!==n&&(this.set=n,this.cleanState()),this.container=document.getElementById(t),this.preview=this.container.querySelector(".icon-picker--icon"),this.chooseBtn=this.container.querySelector(".icon-picker--choose-btn"),this.removeBtn=this.container.querySelector(".icon-picker--remove-btn"),this.inputName=this.container.querySelector('input[name="name"]'),this.chooseBtn.addEventListener("click",()=>{this.showModal()}),this.removeBtn.addEventListener("click",()=>{this.removeIcon()})}cleanState(){this.currentPage=1,this.hasMore=!0,this.modal&&this.updateIcons()}showModal(){this.set&&(this.modal?this.modal.style.display="flex":this.createModal())}createModal(){const t=document.createElement("div");t.className="cfb:bg-white cfb:shadow-lg cfb:rounded-lg cfb:p-6";const n=document.createElement("div");n.className="body",t.appendChild(n);const i=document.createElement("div");i.className="cfb:relative cfb:w-full",n.appendChild(i);const c=document.createElement("span");c.className="cfb:iconify-[mdi--magnify] cfb:absolute cfb:inset-y-2 cfb:left-3 cfb:flex cfb:items-center cfb:pointer-events-none",c.setAttribute("aria-hidden","true"),i.appendChild(c),this.searchInput=document.createElement("input"),this.searchInput.type="text",this.searchInput.name="search",this.searchInput.className="cfb:w-full cfb:pl-10 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:focus:ring-blue-500 cfb:focus:border-blue-500",this.searchInput.placeholder="Search",this.searchInput.setAttribute("aria-label","Search"),i.appendChild(this.searchInput);const s=document.createElement("button");s.className="clear-btn  cfb:absolute cfb:inset-y-0 cfb:right-3 cfb:flex cfb:items-center cfb:justify-center cfb:text-gray-400 cfb:hover:text-gray-600 cfb:focus:outline-none hidden",s.title="Clear search",s.setAttribute("aria-label","Clear search"),i.appendChild(s),this.iconListContainer=document.createElement("div"),this.iconListContainer.className="cfb:grid cfb:grid-cols-8 cfb:gap-2 cfb:max-h-96 cfb:overflow-y-auto cfb:p-4 border cfb:rounded-lg cfb:bg-gray-50 icon-picker-modal--list",n.appendChild(this.iconListContainer),this.updateLangAttribute(this.iconList),this.spinner=document.createElement("div"),this.spinner.className="spinner spinner-absolute",this.spinner.style.display="none",this.iconListContainer.appendChild(this.spinner),this.iconListContainer.addEventListener("scroll",this.onScroll.bind(this));let r;this.searchInput.addEventListener("input",()=>{clearTimeout(r),r=setTimeout(()=>{this.updateIcons()},300),this.searchInput.value?s.classList.remove("hidden"):s.classList.add("hidden")}),s.addEventListener("click",()=>{this.searchInput.value="",this.searchInput.dispatchEvent(new Event("input"))}),this.iconListContainer.addEventListener("click",l=>{let d;if(l.target.nodeName==="BUTTON")d=l.target;else if(d=l.target.closest("button"),!d)return;this.selectIcon(d)}),this.modal=document.createElement("div"),this.modal.className="cfb:fixed cfb:z-50 cfb:inset-0 cfb:flex cfb:items-center cfb:justify-center cfb:bg-white/50";const o=document.createElement("div");o.className="cfb:w-full cfb:max-w-2xl",o.appendChild(t),this.modal.appendChild(o),document.body.appendChild(this.modal),this.modal.addEventListener("click",l=>{l.target===this.modal&&(this.modal.style.display="none")}),this.updateIcons()}async onScroll(){if(this.loading||!this.hasMore)return;const t=this.iconListContainer.scrollTop,n=this.iconListContainer.scrollHeight,i=this.iconListContainer.clientHeight;t+i>=n-200&&this.loadMore()}async updateIcons(){this.iconListContainer.innerHTML=await this.loadIcons()}async loadMore(){this.currentPage+=1;const t=await this.loadIcons();if(t.length<=0){this.hasMore=!1;return}this.iconListContainer.innerHTML+=t}async loadIcons(){this.cancelToken&&this.cancelToken.abort();const n=document.getElementById("csrf-input").value;this.loading=!0;const i=this.searchInput.value;this.spinner.style.display="block",this.cancelToken=new AbortController;try{return(await(await fetch(Craft.getActionUrl("form-builder/icons/picker"),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":n},body:JSON.stringify({search:i,set:this.set,page:this.currentPage}),signal:this.cancelToken.signal})).json()).listHtml}catch(c){return c.name!=="AbortError"&&console.error("Error loading icons:",c),""}finally{this.spinner.style.display="none",this.cancelToken=null,this.loading=!1}}updateLangAttribute(t){document.documentElement.lang.startsWith("en")||t.setAttribute("lang","en")}selectIcon(t){this.modal.style.display="none";const n=t.getAttribute("title"),i=t.getAttribute("data-iconName");this.preview.innerHTML=t.innerHTML,this.preview.setAttribute("title",n),this.preview.setAttribute("aria-label",n),this.preview.setAttribute("role","img"),this.updateLangAttribute(this.preview),this.inputName.value=i;const c=this.chooseBtn.querySelector(".label");c&&(c.textContent="Change"),this.updateFieldData("icon",i),this.updateFieldData("iconSvg",t.innerHTML),this.chooseBtn.focus(),this.removeBtn.classList.remove("hidden"),this.container.classList.contains("small")&&this.chooseBtn.classList.add("hidden")}removeIcon(){this.preview.innerHTML="",this.preview.removeAttribute("title"),this.preview.removeAttribute("aria-label"),this.inputName.value="",this.updateFieldData("icon",""),this.updateFieldData("iconSvg",null);const t=this.chooseBtn.querySelector(".label");t&&(t.textContent="Choose"),this.removeBtn.classList.add("hidden"),this.container.classList.contains("small")?(this.chooseBtn.classList.remove("hidden"),this.chooseBtn.focus()):this.chooseBtn.focus()}}class un{constructor(t,n){L(this,"updateFieldData",(t,n,i=!0)=>{const c=this.formState.fields.find(s=>s.id===this.selectedFieldId);c&&(c[t]=n,i&&this.renderForm())});L(this,"deleteField",t=>{this.formState.fields=this.formState.fields.filter(n=>n.id!==t),this.selectedFieldId===t?(this.selectedFieldId=null,this.selectField(null)):this.renderForm()});L(this,"addField",(t,n)=>{const i=I[t];if(i){if(["recaptcha","hcaptcha","captcha"].includes(t)&&!this.checkOnlyCaptchaActive())return alert("Only one captcha field can be active at a time"),!1;let s={id:Craft.uuid(),type:t,...Z(i.config.defaultData)};return(i.config.defaultData.handle!==void 0||i.config.defaultData.handle!=="")&&(s.handle=this.generateUniqueHandle(i.config.defaultData.handle)),n!==null?this.formState.fields.splice(Math.max(n,0),0,s):this.formState.fields.push(s),this.selectField(s.id),!0}return!1});L(this,"moveField",(t,n)=>{if(n===null&&(n=this.formState.fields.length),n=Math.max(Math.min(n,this.formState.fields.length),0),t===n||t<0||t>=this.formState.fields.length)return;const i=this.formState.fields,[c]=i.splice(t,1);t<n&&n--,i.splice(n,0,c),this.renderForm(),this.renderSettings()});this.formContainer=document.getElementById("form-container"),this.settingsContainer=document.getElementById("settings-container"),this.formState=t,this.selectedFieldId=null,this.selectionCallback=n,this.iconPicker=new fn(this.updateFieldData)}checkEmptyState(){this.formState.fields.length===0&&(this.formContainer.innerHTML=` <div class="empty-state cfb:flex cfb:flex-col cfb:items-center cfb:justify-center cfb:h-full cfb:text-gray-500 cfb:text-center"
                 id="emptyState">
                <span class="cfb:iconify-[mdi--add-bold] cfb:text-5xl cfb:mb-4"></span>
                <p class="cfb:text-lg">Drag components here to build your form</p>
            </div>`)}renderForm(){this.formContainer.innerHTML="",this.formState.fields.forEach((t,n)=>{const i=I[t.type];if(i){const c=i.validate(t)===!1,s=document.createElement("div");s.classList.add("form-field-wrapper","cfb:group","cfb:px-4","cfb:pb-4","cfb:pt-2","cfb:border","cfb:hover:border-blue-500","cfb:rounded-md","cfb:cursor-pointer"),t.id===this.selectedFieldId?s.classList.add("cfb:border-blue-500","cfb:bg-blue-50"):c?s.classList.add("cfb:border-red-500","cfb:bg-red-50"):s.classList.add("cfb:border-transparent"),s.dataset.id=t.id,s.dataset.index=n.toString();const r=ee();s.innerHTML=`<div>${r}</div>
                                            ${i.render(t,this.formState.settings.orientation)}`,s.draggable=!0,s.querySelector(".delete-container").innerHTML=`
                    <div class="cfb:relative">
                        <button class="delete-field cfb:text-gray-400 hover:cfb:text-red-500 cfb:transition-colors" data-id="${t.id}">
                            <span class="cfb:iconify-[mdi-light--delete] cfb:w-4 cfb:h-4 cfb:text-red-600"></span>
                        </button>
                        <span class="cfb:delete-tooltip">
                            Remove
                        </span>
                    </div>
                `,this.formContainer.appendChild(s),s.addEventListener("dragstart",W),s.addEventListener("dragend",G)}}),this.checkEmptyState()}renderSettings(){const t=this.formState.fields.find(n=>n.id===this.selectedFieldId);if(t){const n=I[t.type];n&&n.renderSettings?(this.settingsContainer.innerHTML=n.renderSettings(t,this.formState),n.initSettings&&n.initSettings(this.updateFieldData,this)):this.settingsContainer.innerHTML='<div class="cfb:p-4 cfb:text-gray-500">No settings available.</div>'}else this.settingsContainer.innerHTML=` <div class="no-selection cfb:text-center cfb:text-gray-500 cfb:mt-10">
                                                        <span class="cfb:iconify-[mdi--settings] cfb:text-5xl cfb:mb-4"></span>
                                                    <p>Select a component to edit</p>
                                                </div>`}selectField(t){this.selectedFieldId=t,this.renderForm(),this.renderSettings(),this.selectionCallback&&this.selectionCallback(t)}setupEventListeners(){this.formContainer.addEventListener("click",t=>{const n=t.target.closest(".form-field-wrapper");n&&this.selectField(n.dataset.id);const i=t.target.closest(".delete-field");if(i){t.stopPropagation();const c=i.dataset.id;this.deleteField(c)}})}generateUniqueHandle(t){if((s=>!this.formState.fields.some(r=>r.handle===s))(t))return t;const i=this.formState.fields.map(s=>s.handle).filter(s=>s&&s.startsWith(t)).map(s=>{const r=s.match(new RegExp(`^${t}(\\d+)$`));return r?parseInt(r[1],10):0}).filter(s=>!isNaN(s)).sort((s,r)=>s-r);let c=1;for(const s of i)if(s===c)c++;else if(s>c)break;return`${t}${c}`}checkOnlyCaptchaActive(t=null){const n=["recaptcha","hcaptcha","captcha"];return this.formState.fields.filter(c=>t&&c.id===t?!1:n.includes(c.type)).length<1}}class mn{initializeSettingsModal(){const t=document.querySelectorAll(".cfb-settings-tab"),n=document.querySelectorAll(".cfb-tab-content");t.forEach(r=>{r.addEventListener("click",o=>{const l=o.currentTarget.getAttribute("data-tab");t.forEach(m=>{m.classList.remove("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),m.classList.add("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50")}),o.currentTarget.classList.remove("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50"),o.currentTarget.classList.add("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),n.forEach(m=>{m.classList.add("cfb:hidden")});const d=document.querySelector(`.cfb-tab-${l}`);d&&d.classList.remove("cfb:hidden")})});const i=document.querySelectorAll('input[name="settings\\[actionOnSubmit\\]"]'),c=document.querySelector(".cfb-success-message-field"),s=document.querySelector(".cfb-redirect-url-field");i.forEach(r=>{r.addEventListener("change",o=>{const l=o.target.value;l==="message"?(c.style.display="block",s.style.display="none"):l==="redirect"&&(c.style.display="none",s.style.display="block")})}),this.initializeNotificationTab(),this.initializeIntegrationTab()}initializeIntegrationTab(){document.querySelectorAll("[data-integration]").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const i=t.getAttribute("data-integration");document.querySelectorAll(".integration-settings").forEach(c=>{c.classList.add("cfb:hidden")}),document.getElementById(`integration-${i}`).classList.remove("cfb:hidden"),document.querySelectorAll("[data-integration]").forEach(c=>{c.classList.remove("cfb:bg-blue-100","cfb:text-blue-700")}),t.classList.add("cfb:bg-blue-100","cfb:text-blue-700")})})}initializeNotificationTab(){document.querySelectorAll("[data-notification]").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const i=t.getAttribute("data-notification");document.querySelectorAll(".notifications-settings").forEach(c=>{c.classList.add("cfb:hidden")}),document.getElementById(`notifications-${i}`).classList.remove("cfb:hidden"),document.querySelectorAll("[data-notification]").forEach(c=>{c.classList.remove("cfb:bg-blue-100","cfb:text-blue-700")}),t.classList.add("cfb:bg-blue-100","cfb:text-blue-700")})}),this.initializeAdminNotif(),this.initializeUserNotif()}initializeAdminNotif(){const t=this,n=document.getElementById("form-admin-notif-enabled");n.addEventListener("click",function(i){t.adminNotifCondition(n)}),t.adminNotifCondition(n)}adminNotifCondition(t){const i=t.getAttribute("aria-checked")==="true";document.querySelectorAll(".cfb-admin-notif").forEach(s=>{i===!1?s.style.display="none":s.style.display="block"})}initializeUserNotif(){const t=this,n=document.getElementById("form-user-notif-enabled");n.addEventListener("click",function(i){t.userNotifCondition(n)}),t.userNotifCondition(n)}userNotifCondition(t){const i=t.getAttribute("aria-checked")==="true";document.querySelectorAll(".cfb-user-notif").forEach(s=>{i===!1?s.style.display="none":s.style.display="block"})}renderUserNotifTargetField(){const t=document.getElementById("form-userEmail"),n=this.formState.fields||[],i=this.formState.userNotif.recipients||null;console.log(n),t.innerHTML='<option value="">Select an option</option>',n.forEach(c=>{if(c.type!=="email"||c.handle==="")return;const s=document.createElement("option");s.value=c.id,s.textContent=c.label,c.id===i&&(s.selected=!0),t.appendChild(s)})}constructor(t,n){this.formState=t,this.onSettingsUpdated=n,this.formSettingsModal=document.getElementById("main-settings-modal"),this.formSettingsButton=document.getElementById("main-settings-btn"),this.formSettings=document.getElementById("main-settings-form"),this.closeSettingModals=document.querySelectorAll(".cfb-close-main-settings-modal"),this.init(),this.initializeSettingsModal()}init(){this.formSettingsButton.addEventListener("click",()=>this.openSettingsModal()),this.formSettings.addEventListener("submit",t=>this.updateFormSetting(t)),this.closeSettingModals.forEach(t=>t.addEventListener("click",()=>this.closeSettingsModal())),this.formSettingsModal.addEventListener("click",t=>{t.target===this.formSettingsModal&&this.closeSettingsModal()})}openSettingsModal(){this.formSettingsModal.classList.remove("cfb:hidden"),this.renderUserNotifTargetField()}closeSettingsModal(){this.formSettingsModal.classList.add("cfb:hidden")}updateFormSetting(t){t.preventDefault();const n=new FormData(t.target),i={};if(n.forEach((c,s)=>{if(s.match(/^integrations(\[[^\]]+])+$/)){const l=[...s.matchAll(/\[([^\]]+)]/g)].map(S=>S[1]),d=l[0];i[d]||(i[d]={});let m=i[d];for(let S=1;S<l.length-1;S++)m[l[S]]||(m[l[S]]={}),m=m[l[S]];m[l[l.length-1]]=c;return}const o=s.match(/^(\w+)\[(\w+)\]$/);if(o){const l=o[1],d=o[2];this.formState[l]||(this.formState[l]={}),this.formState[l][d]=c}else this.formState[s]=c}),Object.keys(i).length>0){this.formState.integrations={};for(const[c,s]of Object.entries(i))Object.keys(s).length>0&&(this.formState.integrations[c]=s)}this.closeSettingsModal(),this.onSettingsUpdated&&this.onSettingsUpdated()}}const E=document.getElementById("preview-modal"),B=document.getElementById("preview-btn"),pn=document.getElementById("close-modal-btn"),gn=document.getElementById("preview-iframe"),N=document.querySelectorAll(".cfb-preview-switcher"),hn=document.getElementById("cfb-preview-container"),vn="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-blue-600 cfb:text-sm cfb:transition",yn="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-sm cfb:text-black cfb:transition",xn=e=>{const n=document.getElementById("csrf-input").value,i={form:e};fetch(Craft.getActionUrl("form-builder/forms/preview"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":n},body:JSON.stringify(i)}).then(c=>{if(!c.ok)throw new Error("Network response was not ok");return c.text()}).then(c=>{E.classList.remove("cfb:opacity-0","cfb:pointer-events-none"),E.classList.add("cfb:opacity-100","cfb:pointer-events-auto"),gn.srcdoc=c}).catch(c=>{Craft.cp.displayError("Failed to send preview request")})},$n=e=>{B==null||B.addEventListener("click",()=>xn(e)),pn.addEventListener("click",M),E.addEventListener("click",t=>{t.target===E&&M()}),N.forEach(t=>{t.addEventListener("click",n=>{N.forEach(c=>c.className=yn),t.className=vn;const i=t.dataset.device;hn.className=`cfb:preview-device-frame cfb:${i}`})})},M=()=>{E.classList.remove("cfb:opacity-100","cfb:pointer-events-auto"),E.classList.add("cfb:opacity-0","cfb:pointer-events-none")},Sn=e=>{const n=document.getElementById("csrf-input").value,i={form:e};return fetch(Craft.getActionUrl("form-builder/forms/save"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":n,Accept:"application/json"},body:JSON.stringify(i)}).then(c).then(s).catch(r);async function c(l){const d=await l.json();if(!l.ok)throw o(d.message||"Unknown error",d);return d}function s(l){if(l.success===!1)throw o(l.message||"Unknown error",l);location.reload()}function r(l){throw Craft.cp.displayError(l.message),l}function o(l,d){const m=new Error(l);return m.data=d,m}};class wn{constructor({listDropdownContainer:t,fieldMappingContainerEl:n,listEndpoint:i,integrationHandle:c,selectedListId:s}){if(!t||!n||!i||!c)throw new Error("Missing required parameters.");this.refreshBtn=t.querySelector("button"),this.listDropdownEl=t.querySelector("select"),this.fieldMappingContainerEl=n,this.listEndpoint=i,this.globalFieldsVar=Craft.FormBuilder.formState,this.integrationHandle=c,this.selectedListId=s===void 0?null:s,this.lists=[],this.init()}async init(){await this.loadLists(),this.listDropdownEl.addEventListener("change",()=>{this.selectedListId=this.listDropdownEl.value,this.generateFieldMapping()}),document.getElementById("main-settings-btn").addEventListener("click",()=>{this.generateFieldMapping()}),this.refreshBtn.addEventListener("click",async t=>{t.preventDefault(),await this.loadLists()})}loading(){this.refreshBtn.classList.add("cfb:loading")}finishedLoading(){this.refreshBtn.classList.contains("cfb:loading")&&this.refreshBtn.classList.remove("cfb:loading")}async loadLists(){this.loading();try{const t=await fetch(this.listEndpoint,{headers:{Accept:"application/json"}});if(!t.ok)throw new Error(`Failed to load lists: ${t.statusText}`);const n=await t.json();this.lists=n.lists,this.populateListDropdown(),this.selectedListId&&this.generateFieldMapping()}catch(t){console.error("Error loading lists:",t)}this.finishedLoading()}currentList(){return this.lists.find(t=>t.id===this.selectedListId)}populateListDropdown(){this.listDropdownEl.innerHTML='<option value="">Select a list</option>',this.lists.forEach(t=>{const n=document.createElement("option");n.value=t.id,n.textContent=t.name,t.id===this.selectedListId&&(n.selected=!0),this.listDropdownEl.appendChild(n)})}generateFieldNameHandle(t){return"integrations["+this.integrationHandle+"][fieldMapping]["+t+"]"}generateFieldMapping(){this.fieldMappingContainerEl.innerHTML="",this.fieldMappingContainerEl.className="";const t=this.currentList();if(!t)return;this.fieldMappingContainerEl.className="cfb:border cfb:border-gray-200 cfb:rounded";const n=this.globalFieldsVar.integrations[this.integrationHandle].fieldMapping??{};t.fields.forEach(i=>{const c=document.createElement("div");c.className="cfb:grid cfb:grid-cols-2 cfb:border-b cfb:border-gray-100 cfb:hover:bg-gray-50 cfb:transition-colors";const s=document.createElement("div");s.className="cfb:px-6 cfb:border-r cfb:border-gray-200 cfb:flex cfb:items-center",s.innerHTML=`<span class="cfb:text-gray-800">${i.label}</span>${i.required?'<span class="cfb:text-red-500 cfb:ml-1">*</span>':""}`;const r=document.createElement("div");r.className="cfb:px-6 cfb:py-2";const o=document.createElement("select");o.name=this.generateFieldNameHandle(i.handle),o.className="cfb:px-3 cfb:py-2 cfb:w-64 cfb:border cfb:border-gray-300 cfb:rounded-lg focus:cfb:outline-none focus:cfb:ring-2 focus:cfb:ring-blue-500 focus:cfb:border-blue-500",o.innerHTML='<option value="">Select an option</option>';const l=n[i.handle]??null;this.getFieldOptions(i).forEach(d=>{const m=document.createElement("option");m.value=d.id,m.textContent=d.label,d.id===l&&(m.selected=!0),o.appendChild(m)}),r.appendChild(o),c.appendChild(s),c.appendChild(r),this.fieldMappingContainerEl.appendChild(c)})}getFieldOptions(t){const n=this.globalFieldsVar.fields;return n?n.filter(i=>t.handle===""?!1:t.type==="string"?["text","url","textarea","email","phone"].includes(i.type):t.type==="date"?i.type==="date":!1):[]}refreshLists(){return this.loadLists()}}class En{constructor(t,n){this.selectEl=t,this.integrationHandle=n,this.globalVar=Craft.FormBuilder.formState,document.getElementById("main-settings-btn").addEventListener("click",i=>{this.renderOptions()})}renderOptions(){var i;this.selectEl.innerHTML="";const t=this.globalVar.fields||[],n=((i=this.globalVar.integrations[this.integrationHandle])==null?void 0:i.optIn)||"";this.selectEl.innerHTML='<option value="">Select an option</option>',t.forEach(c=>{if(c.type!=="checkbox"||c.handle==="")return;const s=document.createElement("option");s.value=c.id,s.textContent=c.label,c.id===n&&(s.selected=!0),this.selectEl.appendChild(s)})}}typeof Craft.FormBuilder>"u"&&(Craft.FormBuilder={});Craft.FormBuilder.IntegrationMappingManager=wn;Craft.FormBuilder.OptInDropdown=En;var q,j,F,P,H,z,O,D,V,R,U,_,J,Y,K;let w={name:((q=window.FormBuilderData)==null?void 0:q.name)||"Form",handle:((j=window.FormBuilderData)==null?void 0:j.handle)||"",id:((F=window.FormBuilderData)==null?void 0:F.id)||null,settings:(P=window.FormBuilderData)==null?void 0:P.settings,adminNotif:{enabled:((H=window.FormBuilderData)==null?void 0:H.adminNotif.enabled)||!1,subject:((z=window.FormBuilderData)==null?void 0:z.adminNotif.subject)||"",recipients:((O=window.FormBuilderData)==null?void 0:O.adminNotif.recipients)||"",message:((D=window.FormBuilderData)==null?void 0:D.adminNotif.message)||""},userNotif:{enabled:((V=window.FormBuilderData)==null?void 0:V.userNotif.enabled)||!1,subject:((R=window.FormBuilderData)==null?void 0:R.userNotif.subject)||"",templateId:((U=window.FormBuilderData)==null?void 0:U.userNotif.templateId)||"",recipients:((_=window.FormBuilderData)==null?void 0:_.userNotif.recipients)||"",message:((J=window.FormBuilderData)==null?void 0:J.userNotif.message)||""},fields:((Y=window.FormBuilderData)==null?void 0:Y.fields)||[],integrations:((K=window.FormBuilderData)==null?void 0:K.integrations)||[]};Object.defineProperty(Craft.FormBuilder,"formState",{get(){return w},configurable:!1,enumerable:!0});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("form-container"),t=new un(w,i=>{});new mn(w,()=>{t.renderForm(),t.renderSettings()}),t.setupEventListeners(),bn(t,w,e),t.checkEmptyState(),t.renderForm(),t.renderSettings(),$n(w),document.getElementById("save-form").addEventListener("click",()=>{Sn(w).then(i=>{console.log("Form saved successfully, formState updated:",i),t.renderForm(),t.renderSettings(),n(w.settings.name)}).catch(i=>{console.error("Failed to save form:",i)})});function n(i){const c=document.querySelector("h1, .page-title");c&&i&&(c.textContent=i),document.title=i}});
