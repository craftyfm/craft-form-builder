var ee=Object.defineProperty;var te=(e,t,n)=>t in e?ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var C=(e,t,n)=>te(e,typeof t!="symbol"?t+"":t,n);const ne=e=>JSON.parse(JSON.stringify(e)),l=(e,t,n=!1)=>`
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
    `,B=e=>`
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
    `,f=()=>{document.querySelectorAll(".toggle-button-setting-group").forEach(t=>{t.addEventListener("click",n=>{const s=t.dataset.content;t.dataset.open==="0"?(t.dataset.open="1",t.querySelector("span").classList.replace("cfb:iconify-[mdi--add]","cfb:iconify-[mdi--minus]"),document.getElementById(s).classList.remove("cfb:hidden")):(t.dataset.open="0",t.querySelector("span").classList.replace("cfb:iconify-[mdi--minus]","cfb:iconify-[mdi--add]"),document.getElementById(s).classList.add("cfb:hidden"))})})},v=e=>`
    <div>
        <label class="cfb:flex cfb:items-center cfb:gap-2">
            <input type="checkbox" id="setting-required" ${e.required?"checked":""} class="cfb:text-blue-600 cfb:border-gray-300 cfb:rounded">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-700">Required Field</span>
        </label>
    </div>
`,y=e=>{var t;(t=document.getElementById("setting-required"))==null||t.addEventListener("change",n=>e("required",n.target.checked))},ce=()=>`
        <div class="cfb:flex cfb:opacity-0 cfb:group-hover:opacity-100 cfb:transition-opacity cfb:justify-between">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-500 cfb:w-4 cfb:h-4 cfb:iconify-[mdi--drag-variant]"></span>
            <span class="delete-container cfb:delete-btn-wrapper cfb:mb-1"></span>
        </div>
`,x=e=>{const t=e.required??!1;return`
        <div class="cfb:mb-2 cfb:font-light cfb:flex-1">
            <div class="cfb:flex cfb:justify-between cfb:items-center">
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700">
                    ${e.label}
                    ${t?'<span class="cfb:text-red-500 cfb:ml-1">*</span>':""}
                </label>
            </div>
        </div>
    `},$=e=>(e.required,`
        <div class="">
            <p class="cfb:text-sm cfb:font-light">${e.desc??""}</p>
        </div>
    `),N=(e,t,n=".form-field-wrapper")=>[...e.querySelectorAll(n)].reduce((c,i)=>{const r=i.getBoundingClientRect(),o=t-r.top-r.height/2;return o<0&&o>c.offset?{offset:o,element:i}:c},{offset:Number.NEGATIVE_INFINITY}).element,se=()=>{const e=document.createElement("div");e.className="cfb:relative cfb:my-4";const t=document.createElement("div");t.className="cfb:absolute cfb:inset-0 cfb:flex cfb:items-center";const n=document.createElement("div");n.className="cfb:w-full cfb:border-t cfb:border-blue-500",t.appendChild(n);const s=document.createElement("div");s.className="cfb:relative cfb:flex cfb:justify-center";const c=document.createElement("span");return c.className="cfb:bg-white cfb:px-3 cfb:text-sm cfb:text-blue-500 cfb:font-medium",c.textContent="Drop here",s.appendChild(c),e.appendChild(t),e.appendChild(s),e},M=e=>{var t;(t=document.getElementById("setting-options"))==null||t.addEventListener("input",n=>{const s=n.target.value.split(`
`).filter(c=>c.trim()!=="").map(c=>({name:c.trim(),value:c.trim(),isDefault:!1}));e("options",s)})},ie=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),S=e=>`
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
`,u=e=>`
    <div>
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Handle<span class="cfb:text-red-500 cfb:ml-1">*</span></label>
        <input type="text" id="setting-handle" value="${e.handle}" class="cfb:peer cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:invalid:border-red-500 cfb:focus:invalid:border-transparent">
        <p class="cfb:hidden cfb:peer-invalid:block cfb:font-light cfb:text-sm cfb:text-red-500 cfb:pt-0 cfb:mt-0">
            This field is required.
        </p>   
    </div>     
`,p=(e,t)=>{e.forEach(n=>{var s;(s=document.getElementById(`setting-${n}`))==null||s.addEventListener("input",c=>t(n,c.target.value))})},m=e=>{const t=document.getElementById("setting-label"),n=document.getElementById("setting-handle");let s=n.value!=="";const c=i=>{i.setCustomValidity(i.value.trim()===""?"This field is required.":"")};t&&c(t),c(n),t&&t.addEventListener("input",()=>{c(t),e("label",t.value),s||(n.value=ae(t.value),e("handle",n.value,!1),c(n))}),n.addEventListener("input",()=>{s=!0,e("handle",n.value),c(n)})},ae=e=>e.toLowerCase().trim().replace(/[^a-z0-9\s]/g,"").replace(/\s+(.)/g,(t,n)=>n.toUpperCase()).replace(/\s/g,""),re={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter text...",icon:"",iconSvg:null,required:!1}},le=e=>!(!e.handle||!e.label),oe=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${x(e)}
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
                ${$(e)}
            </div>
        </div>

`,de=(e,t)=>{let n=`
        ${S(e)}
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
        </div>`),l("Property",n)+l("Validation",v(e))+l("Advanced",u(e))},be=(e,t)=>{p(["desc","placeholder"],e),y(e),f(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},fe={config:re,validate:le,render:oe,renderSettings:de,initSettings:be},ue={defaultData:{handle:"",label:"",placeholder:"Enter your message...",desc:"",rows:4,required:!1,minlength:0,maxlength:0}},me=e=>!(!e.handle||!e.label),pe=(e,t)=>`
     <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
        ${x(e)}
        <div class="${t==="horizontal"?"cfb:w-3/4":""}">
            <textarea placeholder="${e.placeholder}" 
                      rows="${e.rows}" 
                      class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50 cfb:resize-none" 
                      disabled></textarea>
            ${$(e)}
        </div>
    </div>
`,ge=e=>{const t=`
        ${S(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Rows</label>
            <input type="number" id="setting-rows" value="${e.rows}" min="1" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `,n=`
        ${v(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Min Length</label>
            <input type="number" id="setting-minlength" value="${e.minlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max Length</label>
            <input type="number" id="setting-maxlength" value="${e.maxlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `;return l("Property",t)+l("Validation",n)+l("Advanced",u(e))},he=e=>{var t,n,s;p(["desc","placeholder"],e),(t=document.getElementById("setting-rows"))==null||t.addEventListener("input",c=>e("rows",parseInt(c.target.value,10))),y(e),(n=document.getElementById("setting-minlength"))==null||n.addEventListener("input",c=>e("minlength",parseInt(c.target.value,10))),(s=document.getElementById("setting-maxlength"))==null||s.addEventListener("input",c=>e("maxlength",parseInt(c.target.value,10))),f(),m(e)},ve={config:ue,validate:me,render:pe,renderSettings:ge,initSettings:he},ye={defaultData:{handle:"",label:"",desc:"",placeholder:"Choose an option...",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},xe=e=>!(!e.handle||!e.label),$e=(e,t)=>{const n=e.options.map(s=>`<option value="${s.value}">${s.name}</option>`).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${x(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <select class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" disabled>
                    <option value="">${e.placeholder}</option>
                    ${n}
                </select>
                ${$(e)}
            </div>
        </div>
    `},Se=e=>{const t=`
        ${S(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return l("Property",t)+l("Validation",v(e))+l("Advanced",u(e))},we=e=>{p(["desc","placeholder"],e),M(e),y(e),f(),m(e)},Ee={config:ye,validate:xe,render:$e,renderSettings:Se,initSettings:we},Le={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},Ce=e=>!(!e.handle||!e.label),ke=(e,t)=>{const n=e.options.map((s,c)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${c}" name="${e.id}[]" value="${s.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${c}" class="cfb:text-sm cfb:text-gray-700">${s.name}</label>
        </div>
    `).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
          ${x(e)}
             <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:w-full">
                    <div class="cfb:space-y-2 cfb:flex-3">
                        ${n}
                    </div>
                    ${$(e)}
                </div>
            </div>
        </div>
    `},Ie=e=>{const t=`
        ${S(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return l("Property",t)+l("Validation",v(e))+l("Advanced",u(e))},Be=e=>{p(["desc"],e),M(e),y(e),f(),m(e)},Te={config:Le,validate:Ce,render:ke,renderSettings:Ie,initSettings:Be},Ae={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},Ne=e=>!(!e.handle||!e.label),Me=(e,t)=>{const n=e.options.map((s,c)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${c}" name="${e.id}[]" value="${s.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${c}" class="cfb:text-sm cfb:text-gray-700">${s.name}</label>
        </div>
    `).join("");return`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${x(e)}
             <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:space-y-2 cfb:flex-3">
                    ${n}
                </div>
                ${$(e)}
            </div>
            
            
        </div>
    `},qe=e=>{const t=`
        ${S(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return l("Property",t)+l("Validation",v(e))+l("Advanced",u(e))},Fe=e=>{p(["desc"],e),M(e),y(e),f(),m(e)},je={config:Ae,validate:Ne,render:Me,renderSettings:qe,initSettings:Fe},He={defaultData:{handle:"",label:"",desc:"",allowedExtensions:"",limit:1,required:!1,maxSize:0}},Pe=e=>!(!e.handle||!e.label),ze=(e,t)=>`
    <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
        ${x(e)}
        <div class="${t==="horizontal"?"cfb:w-3/4":""}">
            <div class="">
                <div class="cfb:flex cfb:items-center cfb:justify-center cfb:w-full cfb:flex-3">
                  <input type="file"
                           class="cfb:w-full cfb:text-slate-500 cfb:font-medium cfb:text-sm cfb:bg-gray-100
                           cfb:file:cursor-pointer cfb:cursor-pointer cfb:file:border-0 cfb:file:py-2 cfb:file:px-4 cfb:file:mr-4
                           cfb:file:bg-blue-500 cfb:file:hover:bg-gray-700 cfb:file:text-white cfb:rounded" disabled/>
                </div>
            </div>
            ${$(e)}
        </div>
    </div>
`,De=e=>{const t=`
        ${S(e)}
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
        ${v(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max File Size in MBs</label>
            <input type="number" id="setting-maxSize" value="${e.maxSize?e.maxSize:""}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return l("Property",t)+l("Validation",n)+l("Advanced",u(e))},Oe=e=>{var t;p(["allowedExtensions","limit","desc"],e),y(e),(t=document.getElementById("setting-maxSize"))==null||t.addEventListener("input",n=>e("maxSize",n.target.value)),f(),m(e)},Re={config:He,validate:Pe,render:ze,renderSettings:De,initSettings:Oe},Ve={defaultData:{handle:"submit",submitText:"Submit",resetText:"Reset",submitStyle:"primary",resetStyle:"secondary",spacing:"wide"}},Ue=e=>!!e.handle,_e=(e,t)=>{const n=e.submitStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":"cfb:bg-gray-600 cfb:text-white",s=e.resetStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":e.resetStyle==="secondary"?"cfb:bg-gray-500 cfb:text-white":"cfb:bg-red-500 cfb:text-white";return`
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
    `},Ke=e=>{const t=`
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
    `;return l("Property",t)+l("Advanced",u(e))},Ge=e=>{var t,n,s,c,i;(t=document.getElementById("setting-submit-text"))==null||t.addEventListener("input",r=>e("submitText",r.target.value)),(n=document.getElementById("setting-reset-text"))==null||n.addEventListener("input",r=>e("resetText",r.target.value)),(s=document.getElementById("setting-submit-style"))==null||s.addEventListener("change",r=>e("submitStyle",r.target.value)),(c=document.getElementById("setting-reset-style"))==null||c.addEventListener("change",r=>e("resetStyle",r.target.value)),(i=document.getElementById("setting-spacing"))==null||i.addEventListener("change",r=>e("spacing",r.target.value)),f(),m(e)},Je={config:Ve,validate:Ue,render:_e,renderSettings:Ke,initSettings:Ge},We={defaultData:{handle:"title",text:"Title Text",level:"h2",alignment:"start"}},Ye=e=>!!e.handle,Xe=(e,t)=>{const n=e.level,s=`cfb:text-${e.alignment}`;return`
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <${n} class="${s} cfb:w-full cfb:font-bold">${e.text}</${n}>
        </div>
    `},Qe=e=>{const t=`
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
    `;return l("Property",t)+l("Advanced",u(e))},Ze=e=>{var t,n,s;(t=document.getElementById("setting-text"))==null||t.addEventListener("input",c=>e("text",c.target.value)),(n=document.getElementById("setting-level"))==null||n.addEventListener("change",c=>e("level",c.target.value)),(s=document.getElementById("setting-alignment"))==null||s.addEventListener("change",c=>e("alignment",c.target.value)),f(),m(e)},et={config:We,validate:Ye,render:Xe,renderSettings:Qe,initSettings:Ze},tt={defaultData:{handle:"image",src:"",alt:"",width:null,height:null,alignment:"start"}},nt=e=>!!e.handle,ct=(e,t)=>{const n=e.width?`${e.width}px`:"auto",s=e.height?`${e.height}px`:"auto",c=e.width?`width="${e.width}"`:"",i=e.height?`height="${e.height}"`:"";return`
    <div class="cfb:flex cfb:justify-${e.alignment} cfb:items-start">
        <img 
            ${c} ${i}
            src="${e.src}" 
            alt="${e.alt||""}" 
            style="width: ${n}; height: ${s};"
            class="cfb:object-fill" 
        />
    </div>
`},st=e=>{const t=`
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
    `;return l("Property",t)+l("Advanced",u(e))},it=e=>{var t;p(["handle","src","alt","width","height"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",n=>e("alignment",n.target.value)),f(),m(e)},at={config:tt,validate:nt,render:ct,renderSettings:st,initSettings:it},rt={defaultData:{handle:"paragraph",text:"This is a paragraph of text.",alignment:"start"}},lt=e=>!!e.handle,ot=e=>`
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <p class="${`cfb:text-${e.alignment}`} cfb:w-full">${e.text}</p>
        </div>
    `,dt=e=>{const t=`
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
    `;return l("Property",t)+l("Advanced",u(e))},bt=e=>{var t;p(["text"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",n=>e("alignment",n.target.value)),f(),m(e)},ft={config:rt,validate:lt,render:ot,renderSettings:dt,initSettings:bt},ut={defaultData:{html:"",handle:"html"}},mt=e=>!!e.handle,pt=e=>`
    <div class="cfb:flex cfb:justify-between cfb:items-start">
        <div class="cfb:w-full cfb:prose">
            <code class="cfb:line-clamp-3">${ie(e.html)}</code>
        </div>
    </div>
`,gt=e=>{const t=`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">HTML Content</label>
            <textarea id="setting-html" placeholder="Put your HTML code here"
                class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:font-mono" rows="10">${e.html}</textarea>
            <small class="cfb:text-sm cfb:font-light">Please ensure your code contains only HTML and no scripts.</small>
        </div>
    `;return l("Property",t)+l("Advanced",u(e))},ht=e=>{p(["html"],e),f(),m(e)},vt={config:ut,validate:mt,render:pt,renderSettings:gt,initSettings:ht},yt={defaultData:{handle:"hcaptcha",siteKey:"",privateKey:"",required:!0}},xt=e=>!0,$t=e=>`
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
`,St=e=>l("Advanced",u(e)),wt=e=>{f(),m(e)},Et={config:yt,validate:xt,render:$t,renderSettings:St,initSettings:wt},Lt={defaultData:{handle:"recaptcha"}},Ct=e=>!!e.handle,kt=(e,t)=>`
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
`,It=e=>l("Advanced",u(e)),Bt=e=>{f(),m(e)},Tt={config:Lt,validate:Ct,render:kt,renderSettings:It,initSettings:Bt},At={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter email...",icon:"",iconSvg:null,required:!1}},Nt=e=>!(!e.handle||!e.label),Mt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${x(e)}
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
                    ${$(e)}
            </div>
        </div>

`,qt=(e,t)=>{let n=`
        ${S(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${B(e)}`),l("Property",n)+l("Validation",v(e))+l("Advanced",u(e))},Ft=(e,t)=>{p(["desc","placeholder"],e),y(e),f(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},jt={config:At,validate:Nt,render:Mt,renderSettings:qt,initSettings:Ft},Ht={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter url...",icon:"",iconSvg:null,required:!1}},Pt=e=>!(!e.handle||!e.label),zt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${x(e)}
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
                ${$(e)}
            </div>
        </div>

`,Dt=(e,t)=>{let n=`
        ${S(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${B(e)}`),l("Property",n)+l("Validation",v(e))+l("Advanced",u(e))},Ot=(e,t)=>{p(["desc","placeholder"],e),y(e),f(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},Rt={config:Ht,validate:Pt,render:zt,renderSettings:Dt,initSettings:Ot},Vt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter phone number...",icon:"",iconSvg:null,required:!1}},Ut=e=>!(!e.handle||!e.label),_t=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${x(e)}
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
                ${$(e)}
            </div>
        </div>

`,Kt=(e,t)=>{let n=`
        ${S(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${B(e)}`),l("Property",n)+l("Validation",v(e))+l("Advanced",u(e))},Gt=(e,t)=>{p(["desc","placeholder"],e),y(e),f(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},Jt={config:Vt,validate:Ut,render:_t,renderSettings:Kt,initSettings:Gt},Wt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter number...",icon:"",iconSvg:null,required:!1}},Yt=e=>!(!e.handle||!e.label),Xt=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${x(e)}
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
                ${$(e)}
            </div>
        </div>

`,Qt=(e,t)=>{let n=`
        ${S(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${B(e)}`),l("Property",n)+l("Validation",v(e))+l("Advanced",u(e))},Zt=(e,t)=>{p(["desc","placeholder"],e),y(e),f(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),m(e)},en={config:Wt,validate:Yt,render:Xt,renderSettings:Qt,initSettings:Zt},tn={defaultData:{handle:"",label:"",checkboxLabel:"",desc:"",required:!1}},nn=e=>!(!e.handle||!e.label),cn=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row cfb:gap-3":"cfb:flex-col"}">
            ${x(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:flex cfb:items-center cfb:gap-2 ">
                    <input type="checkbox" id="${e.id}" name="${e.id}" value="1" class="cfb:border-gray-300 cfb:rounded" disabled>
                    <label for="${e.id}" class="cfb:text-sm cfb:text-gray-700">${e.checkboxLabel}</label>
                </div>
                ${$(e)}
            </div>
        </div>
    `,sn=e=>{const t=`
        ${S(e)}
            <div>
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Checkbox Label</label>
                <input type="text" id="setting-checkboxLabel" value="${e.checkboxLabel}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
            </div>
    `;return l("Property",t)+l("Validation",v(e))+l("Advanced",u(e))},an=(e,t)=>{p(["desc","checkboxLabel"],e),y(e),f(),m(e)},rn={config:tn,validate:nn,render:cn,renderSettings:sn,initSettings:an},ln={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter Date...",required:!1}},on=e=>!(!e.handle||!e.label),dn=(e,t)=>`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${x(e)}
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <input type="date" 
                           placeholder="${e.placeholder}" 
                           class="cfb:pl-3 cfb:pr-3 cfb:py-2 cfb:w-full cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" 
                           disabled>
                ${$(e)}
            </div>
        </div>

`,bn=(e,t)=>{let n=`
        ${S(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
       
    `;return l("Property",n)+l("Validation",v(e))+l("Advanced",u(e))},fn=(e,t)=>{p(["desc","placeholder"],e),y(e),f(),m(e)},un={config:ln,validate:on,render:dn,renderSettings:bn,initSettings:fn},T={text:fe,date:un,email:jt,url:Rt,phone:Jt,number:en,textarea:ve,select:Ee,radio:Te,checkbox:rn,checkboxes:je,fileUpload:Re,submitButton:Je,title:et,image:at,paragraph:ft,html:vt,hcaptcha:Et,recaptcha:Tt};let g=null,I=null;function Q(e){I=this,this.classList.add("dragging"),g=se()}const Z=e=>{I.classList.remove("dragging"),g&&g.parentNode&&g.parentNode.removeChild(g),I=null,g=null},mn=(e,t,n)=>{document.querySelectorAll(".form-element").forEach(c=>{c.addEventListener("dragstart",i=>{i.dataTransfer.setData("text/plain",c.dataset.type)}),c.addEventListener("dragstart",Q),c.addEventListener("dragend",Z)}),n.addEventListener("dragover",c=>{if(c.preventDefault(),!g||e.formState.fields.length===0)return;const i=200,r=20;c.clientY<i?n.scrollBy(0,-r):c.clientY>window.innerHeight-i&&n.scrollBy(0,r);const o=N(n,c.clientY);g.parentNode&&g.parentNode.removeChild(g),o?n.insertBefore(g,o):n.appendChild(g)}),n.addEventListener("drop",c=>{if(c.preventDefault(),!g)return;const i=N(n,c.clientY),r=c.dataTransfer.getData("text/plain"),o=i?i.dataset.index:null;if(r)e.addField(r,o);else{const a=I.dataset.index;e.moveField(a,o,t,e)}})};class pn{constructor(t){this.currentPage=1,this.modal=null,this.cancelToken=null,this.searchInput=null,this.iconListContainer=null,this.iconList=null,this.hasMore=!0,this.loading=!1,this.set=null,this.spinner=null,this.updateFieldData=t}get listLength(){return this.iconListContainer.querySelectorAll("button").length}init(t,n){this.set!==n&&(this.set=n,this.cleanState()),this.container=document.getElementById(t),this.preview=this.container.querySelector(".icon-picker--icon"),this.chooseBtn=this.container.querySelector(".icon-picker--choose-btn"),this.removeBtn=this.container.querySelector(".icon-picker--remove-btn"),this.inputName=this.container.querySelector('input[name="name"]'),this.chooseBtn.addEventListener("click",()=>{this.showModal()}),this.removeBtn.addEventListener("click",()=>{this.removeIcon()})}cleanState(){this.currentPage=1,this.hasMore=!0,this.modal&&this.updateIcons()}showModal(){this.set&&(this.modal?this.modal.style.display="flex":this.createModal())}createModal(){const t=document.createElement("div");t.className="cfb:bg-white cfb:shadow-lg cfb:rounded-lg cfb:p-6";const n=document.createElement("div");n.className="body",t.appendChild(n);const s=document.createElement("div");s.className="cfb:relative cfb:w-full",n.appendChild(s);const c=document.createElement("span");c.className="cfb:iconify-[mdi--magnify] cfb:absolute cfb:inset-y-2 cfb:left-3 cfb:flex cfb:items-center cfb:pointer-events-none",c.setAttribute("aria-hidden","true"),s.appendChild(c),this.searchInput=document.createElement("input"),this.searchInput.type="text",this.searchInput.name="search",this.searchInput.className="cfb:w-full cfb:pl-10 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:focus:ring-blue-500 cfb:focus:border-blue-500",this.searchInput.placeholder="Search",this.searchInput.setAttribute("aria-label","Search"),s.appendChild(this.searchInput);const i=document.createElement("button");i.className="clear-btn  cfb:absolute cfb:inset-y-0 cfb:right-3 cfb:flex cfb:items-center cfb:justify-center cfb:text-gray-400 cfb:hover:text-gray-600 cfb:focus:outline-none hidden",i.title="Clear search",i.setAttribute("aria-label","Clear search"),s.appendChild(i),this.iconListContainer=document.createElement("div"),this.iconListContainer.className="cfb:grid cfb:grid-cols-8 cfb:gap-2 cfb:max-h-96 cfb:overflow-y-auto cfb:p-4 border cfb:rounded-lg cfb:bg-gray-50 icon-picker-modal--list",n.appendChild(this.iconListContainer),this.updateLangAttribute(this.iconList),this.spinner=document.createElement("div"),this.spinner.className="spinner spinner-absolute",this.spinner.style.display="none",this.iconListContainer.appendChild(this.spinner),this.iconListContainer.addEventListener("scroll",this.onScroll.bind(this));let r;this.searchInput.addEventListener("input",()=>{clearTimeout(r),r=setTimeout(()=>{this.updateIcons()},300),this.searchInput.value?i.classList.remove("hidden"):i.classList.add("hidden")}),i.addEventListener("click",()=>{this.searchInput.value="",this.searchInput.dispatchEvent(new Event("input"))}),this.iconListContainer.addEventListener("click",a=>{let d;if(a.target.nodeName==="BUTTON")d=a.target;else if(d=a.target.closest("button"),!d)return;this.selectIcon(d)}),this.modal=document.createElement("div"),this.modal.className="cfb:fixed cfb:z-50 cfb:inset-0 cfb:flex cfb:items-center cfb:justify-center cfb:bg-white/50";const o=document.createElement("div");o.className="cfb:w-full cfb:max-w-2xl",o.appendChild(t),this.modal.appendChild(o),document.body.appendChild(this.modal),this.modal.addEventListener("click",a=>{a.target===this.modal&&(this.modal.style.display="none")}),this.updateIcons()}async onScroll(){if(this.loading||!this.hasMore)return;const t=this.iconListContainer.scrollTop,n=this.iconListContainer.scrollHeight,s=this.iconListContainer.clientHeight;t+s>=n-200&&this.loadMore()}async updateIcons(){this.iconListContainer.innerHTML=await this.loadIcons()}async loadMore(){this.currentPage+=1;const t=await this.loadIcons();if(t.length<=0){this.hasMore=!1;return}this.iconListContainer.innerHTML+=t}async loadIcons(){this.cancelToken&&this.cancelToken.abort();const n=document.getElementById("csrf-input").value;this.loading=!0;const s=this.searchInput.value;this.spinner.style.display="block",this.cancelToken=new AbortController;try{return(await(await fetch(Craft.getActionUrl("form-builder/icons/picker"),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":n},body:JSON.stringify({search:s,set:this.set,page:this.currentPage}),signal:this.cancelToken.signal})).json()).listHtml}catch(c){return c.name!=="AbortError"&&console.error("Error loading icons:",c),""}finally{this.spinner.style.display="none",this.cancelToken=null,this.loading=!1}}updateLangAttribute(t){document.documentElement.lang.startsWith("en")||t.setAttribute("lang","en")}selectIcon(t){this.modal.style.display="none";const n=t.getAttribute("title"),s=t.getAttribute("data-iconName");this.preview.innerHTML=t.innerHTML,this.preview.setAttribute("title",n),this.preview.setAttribute("aria-label",n),this.preview.setAttribute("role","img"),this.updateLangAttribute(this.preview),this.inputName.value=s;const c=this.chooseBtn.querySelector(".label");c&&(c.textContent="Change"),this.updateFieldData("icon",s),this.updateFieldData("iconSvg",t.innerHTML),this.chooseBtn.focus(),this.removeBtn.classList.remove("hidden"),this.container.classList.contains("small")&&this.chooseBtn.classList.add("hidden")}removeIcon(){this.preview.innerHTML="",this.preview.removeAttribute("title"),this.preview.removeAttribute("aria-label"),this.inputName.value="",this.updateFieldData("icon",""),this.updateFieldData("iconSvg",null);const t=this.chooseBtn.querySelector(".label");t&&(t.textContent="Choose"),this.removeBtn.classList.add("hidden"),this.container.classList.contains("small")?(this.chooseBtn.classList.remove("hidden"),this.chooseBtn.focus()):this.chooseBtn.focus()}}class gn{constructor(t,n){C(this,"updateFieldData",(t,n,s=!0)=>{const c=this.formState.fields.find(i=>i.id===this.selectedFieldId);c&&(c[t]=n,s&&this.renderForm())});C(this,"deleteField",t=>{this.formState.fields=this.formState.fields.filter(n=>n.id!==t),this.selectedFieldId===t?(this.selectedFieldId=null,this.selectField(null)):this.renderForm()});C(this,"addField",(t,n)=>{const s=T[t];if(s){if(["recaptcha","hcaptcha","captcha"].includes(t)&&!this.checkOnlyCaptchaActive())return alert("Only one captcha field can be active at a time"),!1;let i={id:Craft.uuid(),type:t,...ne(s.config.defaultData)};return s.config.defaultData.handle!==void 0&&s.config.defaultData.handle!==""&&(i.handle=this.generateUniqueHandle(s.config.defaultData.handle)),n!==null?this.formState.fields.splice(Math.max(n,0),0,i):this.formState.fields.push(i),this.selectField(i.id),!0}return!1});C(this,"moveField",(t,n)=>{if(n===null&&(n=this.formState.fields.length),n=Math.max(Math.min(n,this.formState.fields.length),0),t===n||t<0||t>=this.formState.fields.length)return;const s=this.formState.fields,[c]=s.splice(t,1);t<n&&n--,s.splice(n,0,c),this.renderForm(),this.renderSettings()});this.formContainer=document.getElementById("form-container"),this.settingsContainer=document.getElementById("settings-container"),this.formState=t,this.selectedFieldId=null,this.selectionCallback=n,this.iconPicker=new pn(this.updateFieldData)}checkEmptyState(){this.formState.fields.length===0&&(this.formContainer.innerHTML=` <div class="empty-state cfb:flex cfb:flex-col cfb:items-center cfb:justify-center cfb:h-full cfb:text-gray-500 cfb:text-center"
                 id="emptyState">
                <span class="cfb:iconify-[mdi--add-bold] cfb:text-5xl cfb:mb-4"></span>
                <p class="cfb:text-lg">Drag components here to build your form</p>
            </div>`)}renderForm(){this.formContainer.innerHTML="",this.formState.fields.forEach((t,n)=>{const s=T[t.type];if(s){const c=s.validate(t)===!1,i=document.createElement("div");i.classList.add("form-field-wrapper","cfb:group","cfb:px-4","cfb:pb-4","cfb:pt-2","cfb:border","cfb:hover:border-blue-500","cfb:rounded-md","cfb:cursor-pointer"),t.id===this.selectedFieldId?i.classList.add("cfb:border-blue-500","cfb:bg-blue-50"):c?i.classList.add("cfb:border-red-500","cfb:bg-red-50"):i.classList.add("cfb:border-transparent"),i.dataset.id=t.id,i.dataset.index=n.toString();const r=ce();i.innerHTML=`<div>${r}</div>
                                            ${s.render(t,this.formState.settings.orientation)}`,i.draggable=!0,i.querySelector(".delete-container").innerHTML=`
                    <div class="cfb:relative">
                        <button class="delete-field cfb:text-gray-400 hover:cfb:text-red-500 cfb:transition-colors" data-id="${t.id}">
                            <span class="cfb:iconify-[mdi-light--delete] cfb:w-4 cfb:h-4 cfb:text-red-600"></span>
                        </button>
                        <span class="cfb:delete-tooltip">
                            Remove
                        </span>
                    </div>
                `,this.formContainer.appendChild(i),i.addEventListener("dragstart",Q),i.addEventListener("dragend",Z)}}),this.checkEmptyState()}renderSettings(){const t=this.formState.fields.find(n=>n.id===this.selectedFieldId);if(t){const n=T[t.type];n&&n.renderSettings?(this.settingsContainer.innerHTML=`<div class="cfb:mb-4 cfb:inline-flex cfb:items-center cfb:rounded-full cfb:bg-gray-100 cfb:px-2.5 cfb:py-0.5 cfb:text-xs cfb:font-medium cfb:text-gray-700 cfb:capitalize">${t.type}</div>`+n.renderSettings(t,this.formState),n.initSettings&&n.initSettings(this.updateFieldData,this)):this.settingsContainer.innerHTML='<div class="cfb:p-4 cfb:text-gray-500">No settings available.</div>'}else this.settingsContainer.innerHTML=` <div class="no-selection cfb:text-center cfb:text-gray-500 cfb:mt-10">
                                                        <span class="cfb:iconify-[mdi--settings] cfb:text-5xl cfb:mb-4"></span>
                                                    <p>Select a component to edit</p>
                                                </div>`}selectField(t){this.selectedFieldId=t,this.renderForm(),this.renderSettings(),this.selectionCallback&&this.selectionCallback(t)}setupEventListeners(){this.formContainer.addEventListener("click",t=>{const n=t.target.closest(".form-field-wrapper");n&&this.selectField(n.dataset.id);const s=t.target.closest(".delete-field");if(s){t.stopPropagation();const c=s.dataset.id;this.deleteField(c)}})}generateUniqueHandle(t){if((i=>!this.formState.fields.some(r=>r.handle===i))(t))return t;const s=this.formState.fields.map(i=>i.handle).filter(i=>i&&i.startsWith(t)).map(i=>{const r=i.match(new RegExp(`^${t}(\\d+)$`));return r?parseInt(r[1],10):0}).filter(i=>!isNaN(i)).sort((i,r)=>i-r);let c=1;for(const i of s)if(i===c)c++;else if(i>c)break;return`${t}${c}`}checkOnlyCaptchaActive(t=null){const n=["recaptcha","hcaptcha","captcha"];return this.formState.fields.filter(c=>t&&c.id===t?!1:n.includes(c.type)).length<1}}const k="cfb-column-row-dragging",hn=()=>Object.entries(window.FormBuilderBuiltInColumns||{}).map(([e,t])=>({key:e,title:t}));class vn{initializeSettingsModal(){const t=document.querySelectorAll(".cfb-settings-tab"),n=document.querySelectorAll(".cfb-tab-content");t.forEach(r=>{r.addEventListener("click",o=>{const a=o.currentTarget.getAttribute("data-tab");t.forEach(b=>{b.classList.remove("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),b.classList.add("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50")}),o.currentTarget.classList.remove("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50"),o.currentTarget.classList.add("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),n.forEach(b=>{b.classList.add("cfb:hidden")});const d=document.querySelector(`.cfb-tab-${a}`);d&&d.classList.remove("cfb:hidden")})});const s=document.querySelectorAll('input[name="settings\\[actionOnSubmit\\]"]'),c=document.querySelector(".cfb-success-message-field"),i=document.querySelector(".cfb-redirect-url-field");s.forEach(r=>{r.addEventListener("change",o=>{const a=o.target.value;a==="message"?(c.style.display="block",i.style.display="none"):a==="redirect"&&(c.style.display="none",i.style.display="block")})}),this.initializeNotificationTab(),this.initializeIntegrationTab()}initializeIntegrationTab(){document.querySelectorAll("[data-integration]").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const s=t.getAttribute("data-integration");document.querySelectorAll(".integration-settings").forEach(c=>{c.classList.add("cfb:hidden")}),document.getElementById(`integration-${s}`).classList.remove("cfb:hidden"),document.querySelectorAll("[data-integration]").forEach(c=>{c.classList.remove("cfb:bg-blue-100","cfb:text-blue-700")}),t.classList.add("cfb:bg-blue-100","cfb:text-blue-700")})})}initializeNotificationTab(){document.querySelectorAll("[data-notification]").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const s=t.getAttribute("data-notification");document.querySelectorAll(".notifications-settings").forEach(c=>{c.classList.add("cfb:hidden")}),document.getElementById(`notifications-${s}`).classList.remove("cfb:hidden"),document.querySelectorAll("[data-notification]").forEach(c=>{c.classList.remove("cfb:bg-blue-100","cfb:text-blue-700")}),t.classList.add("cfb:bg-blue-100","cfb:text-blue-700")})}),this.initializeAdminNotif(),this.initializeUserNotif()}initializeAdminNotif(){const t=this,n=document.getElementById("form-admin-notif-enabled");n.addEventListener("click",function(s){t.adminNotifCondition(n)}),t.adminNotifCondition(n)}adminNotifCondition(t){const s=t.getAttribute("aria-checked")==="true";document.querySelectorAll(".cfb-admin-notif").forEach(i=>{s===!1?i.style.display="none":i.style.display="block"})}initializeUserNotif(){const t=this,n=document.getElementById("form-user-notif-enabled");n.addEventListener("click",function(s){t.userNotifCondition(n)}),t.userNotifCondition(n)}userNotifCondition(t){const s=t.getAttribute("aria-checked")==="true";document.querySelectorAll(".cfb-user-notif").forEach(i=>{s===!1?i.style.display="none":i.style.display="block"})}renderUserNotifTargetField(){const t=document.getElementById("form-userEmail"),n=this.formState.fields||[],s=this.formState.userNotif.recipients||null;console.log(n),t.innerHTML='<option value="">Select an option</option>',n.forEach(c=>{if(c.type!=="email"||c.handle==="")return;const i=document.createElement("option");i.value=c.id,i.textContent=c.label,c.id===s&&(i.selected=!0),t.appendChild(i)})}renderSubmissionTableColumnsField(){var o;const t=document.getElementById("form-submission-table-columns");if(!t)return;const n=hn(),s=((o=this.formState.settings)==null?void 0:o.submissionTableColumns)||[],c=s.length?s:n.map(a=>a.key),i=[...n,...(this.formState.fields||[]).filter(a=>a.isSubmissionField&&a.handle!=="").map(a=>({key:a.id,title:a.label||a.handle}))],r=a=>{const d=c.indexOf(a.key);return d===-1?1/0:d};i.sort((a,d)=>r(a)-r(d)),t.innerHTML="",i.forEach(a=>{const d=document.createElement("div");d.className="cfb-column-row cfb:flex cfb:items-center cfb:gap-2 cfb:px-2 cfb:py-1 cfb:border cfb:border-gray-200 cfb:rounded cfb:bg-white",d.draggable=!0;const b=document.createElement("span");b.className="cfb:iconify-[mdi--drag] cfb:text-gray-400 cfb:cursor-move";const h=document.createElement("label");h.className="cfb:flex cfb:items-center cfb:gap-2 cfb:text-sm cfb:text-gray-700 cfb:flex-1";const L=document.createElement("input");L.type="checkbox",L.name="settings[submissionTableColumns][]",L.value=a.key,L.checked=c.includes(a.key);const q=document.createElement("span");q.textContent=a.title,h.appendChild(L),h.appendChild(q),d.appendChild(b),d.appendChild(h),t.appendChild(d)}),this.initSubmissionTableColumnsDragDrop(t)}initSubmissionTableColumnsDragDrop(t){t.dataset.dragInitialized||(t.dataset.dragInitialized="true",t.addEventListener("dragstart",n=>{var s;(s=n.target.closest(".cfb-column-row"))==null||s.classList.add(k)}),t.addEventListener("dragend",n=>{var s;(s=n.target.closest(".cfb-column-row"))==null||s.classList.remove(k)}),t.addEventListener("dragover",n=>{n.preventDefault();const s=t.querySelector(`.${k}`);if(!s)return;const c=N(t,n.clientY,`.cfb-column-row:not(.${k})`);t.insertBefore(s,c??null)}))}constructor(t,n){this.formState=t,this.onSettingsUpdated=n,this.formSettingsModal=document.getElementById("main-settings-modal"),this.formSettingsButton=document.getElementById("main-settings-btn"),this.formSettings=document.getElementById("main-settings-form"),this.closeSettingModals=document.querySelectorAll(".cfb-close-main-settings-modal"),this.init(),this.initializeSettingsModal()}init(){this.formSettingsButton.addEventListener("click",()=>this.openSettingsModal()),this.formSettings.addEventListener("submit",t=>this.updateFormSetting(t)),this.closeSettingModals.forEach(t=>t.addEventListener("click",()=>this.closeSettingsModal())),this.formSettingsModal.addEventListener("click",t=>{t.target===this.formSettingsModal&&this.closeSettingsModal()})}openSettingsModal(){this.formSettingsModal.classList.remove("cfb:hidden"),this.renderUserNotifTargetField(),this.renderSubmissionTableColumnsField()}closeSettingsModal(){this.formSettingsModal.classList.add("cfb:hidden")}updateFormSetting(t){t.preventDefault();const n=new FormData(t.target),s={};if(t.target.querySelectorAll('[name$="][]"]').forEach(c=>{const[,i,r]=c.name.match(/^(\w+)\[(\w+)]\[]$/)??[];i&&(this.formState[i]=this.formState[i]||{},this.formState[i][r]=n.getAll(c.name))}),n.forEach((c,i)=>{if(i.endsWith("[]"))return;if(i.match(/^integrations(\[[^\]]+])+$/)){const a=[...i.matchAll(/\[([^\]]+)]/g)].map(h=>h[1]),d=a[0];s[d]||(s[d]={});let b=s[d];for(let h=1;h<a.length-1;h++)b[a[h]]||(b[a[h]]={}),b=b[a[h]];b[a[a.length-1]]=c;return}const o=i.match(/^(\w+)\[(\w+)\]$/);if(o){const a=o[1],d=o[2];this.formState[a]||(this.formState[a]={}),this.formState[a][d]=c}else this.formState[i]=c}),Object.keys(s).length>0){this.formState.integrations={};for(const[c,i]of Object.entries(s))Object.keys(i).length>0&&(this.formState.integrations[c]=i)}this.closeSettingsModal(),this.onSettingsUpdated&&this.onSettingsUpdated()}}const E=document.getElementById("preview-modal"),A=document.getElementById("preview-btn"),yn=document.getElementById("close-modal-btn"),xn=document.getElementById("preview-iframe"),F=document.querySelectorAll(".cfb-preview-switcher"),$n=document.getElementById("cfb-preview-container"),Sn="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-blue-600 cfb:text-sm cfb:transition",wn="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-sm cfb:text-black cfb:transition",En=e=>{const n=document.getElementById("csrf-input").value,s={form:e};fetch(Craft.getActionUrl("form-builder/forms/preview"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":n},body:JSON.stringify(s)}).then(c=>{if(!c.ok)throw new Error("Network response was not ok");return c.text()}).then(c=>{E.classList.remove("cfb:opacity-0","cfb:pointer-events-none"),E.classList.add("cfb:opacity-100","cfb:pointer-events-auto"),xn.srcdoc=c}).catch(c=>{Craft.cp.displayError("Failed to send preview request")})},Ln=e=>{A==null||A.addEventListener("click",()=>En(e)),yn.addEventListener("click",j),E.addEventListener("click",t=>{t.target===E&&j()}),F.forEach(t=>{t.addEventListener("click",n=>{F.forEach(c=>c.className=wn),t.className=Sn;const s=t.dataset.device;$n.className=`cfb:preview-device-frame cfb:${s}`})})},j=()=>{E.classList.remove("cfb:opacity-100","cfb:pointer-events-auto"),E.classList.add("cfb:opacity-0","cfb:pointer-events-none")},Cn=e=>{const n=document.getElementById("csrf-input").value,s={form:e};return fetch(Craft.getActionUrl("form-builder/forms/save"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":n,Accept:"application/json"},body:JSON.stringify(s)}).then(c).then(i).catch(r);async function c(a){const d=await a.json();if(!a.ok)throw o(d.message||"Unknown error",d);return d}function i(a){if(a.success===!1)throw o(a.message||"Unknown error",a);location.reload()}function r(a){throw Craft.cp.displayError(a.message),a}function o(a,d){const b=new Error(a);return b.data=d,b}};class kn{constructor({listDropdownContainer:t,fieldMappingContainerEl:n,listEndpoint:s,integrationHandle:c,selectedListId:i,enabled:r}){if(!t||!n||!s||!c)throw new Error("Missing required parameters.");this.refreshBtn=t.querySelector("button"),this.listDropdownEl=t.querySelector("select"),this.fieldMappingContainerEl=n,this.listEndpoint=s,this.globalFieldsVar=Craft.FormBuilder.formState,this.integrationHandle=c,this.selectedListId=i===void 0?null:i,this.enabled=r!==!1,this.lists=[],this.init()}async init(){this.enabled?await this.loadLists():this.listDropdownEl.innerHTML='<option value="">Enable this integration to load lists</option>',this.listDropdownEl.addEventListener("change",()=>{this.selectedListId=this.listDropdownEl.value,this.generateFieldMapping()}),document.getElementById("main-settings-btn").addEventListener("click",()=>{this.generateFieldMapping()}),this.refreshBtn.addEventListener("click",async t=>{t.preventDefault(),await this.loadLists()})}loading(){this.refreshBtn.classList.add("cfb:loading")}finishedLoading(){this.refreshBtn.classList.contains("cfb:loading")&&this.refreshBtn.classList.remove("cfb:loading")}async loadLists(){this.loading();try{const t=await fetch(this.listEndpoint,{headers:{Accept:"application/json"}}),n=await t.json();if(!t.ok)throw new Error(n.message||`Failed to load lists: ${t.statusText}`);this.lists=n.lists,this.populateListDropdown(),this.selectedListId&&this.generateFieldMapping()}catch(t){console.error("Error loading lists:",t),typeof Craft<"u"&&Craft.cp&&typeof Craft.cp.displayError=="function"&&Craft.cp.displayError(t.message)}this.finishedLoading()}currentList(){return this.lists.find(t=>t.id===this.selectedListId)}populateListDropdown(){this.listDropdownEl.innerHTML='<option value="">Select a list</option>',this.lists.forEach(t=>{const n=document.createElement("option");n.value=t.id,n.textContent=t.name,t.id===this.selectedListId&&(n.selected=!0),this.listDropdownEl.appendChild(n)})}generateFieldNameHandle(t){return"integrations["+this.integrationHandle+"][fieldMapping]["+t+"]"}generateFieldMapping(){this.fieldMappingContainerEl.innerHTML="",this.fieldMappingContainerEl.className="";const t=this.currentList();if(!t)return;this.fieldMappingContainerEl.className="cfb:border cfb:border-gray-200 cfb:rounded";const n=this.globalFieldsVar.integrations[this.integrationHandle].fieldMapping??{};t.fields.forEach(s=>{const c=document.createElement("div");c.className="cfb:grid cfb:grid-cols-2 cfb:border-b cfb:border-gray-100 cfb:hover:bg-gray-50 cfb:transition-colors";const i=document.createElement("div");i.className="cfb:px-6 cfb:border-r cfb:border-gray-200 cfb:flex cfb:items-center",i.innerHTML=`<span class="cfb:text-gray-800">${s.label}</span>${s.required?'<span class="cfb:text-red-500 cfb:ml-1">*</span>':""}`;const r=document.createElement("div");r.className="cfb:px-6 cfb:py-2";const o=document.createElement("select");o.name=this.generateFieldNameHandle(s.handle),o.className="cfb:px-3 cfb:py-2 cfb:w-64 cfb:border cfb:border-gray-300 cfb:rounded-lg focus:cfb:outline-none focus:cfb:ring-2 focus:cfb:ring-blue-500 focus:cfb:border-blue-500",o.innerHTML='<option value="">Select an option</option>';const a=n[s.handle]??null;this.getFieldOptions(s).forEach(d=>{const b=document.createElement("option");b.value=d.id,b.textContent=d.label,d.id===a&&(b.selected=!0),o.appendChild(b)}),r.appendChild(o),c.appendChild(i),c.appendChild(r),this.fieldMappingContainerEl.appendChild(c)})}getFieldOptions(t){const n=this.globalFieldsVar.fields;return n?n.filter(s=>t.handle===""?!1:t.type==="string"?["text","url","textarea","email","phone"].includes(s.type):t.type==="date"?s.type==="date":!1):[]}refreshLists(){return this.loadLists()}}class In{constructor(t,n){this.selectEl=t,this.integrationHandle=n,this.globalVar=Craft.FormBuilder.formState,document.getElementById("main-settings-btn").addEventListener("click",s=>{this.renderOptions()})}renderOptions(){var s;this.selectEl.innerHTML="";const t=this.globalVar.fields||[],n=((s=this.globalVar.integrations[this.integrationHandle])==null?void 0:s.optIn)||"";this.selectEl.innerHTML='<option value="">Select an option</option>',t.forEach(c=>{if(c.type!=="checkbox"||c.handle==="")return;const i=document.createElement("option");i.value=c.id,i.textContent=c.label,c.id===n&&(i.selected=!0),this.selectEl.appendChild(i)})}}typeof Craft.FormBuilder>"u"&&(Craft.FormBuilder={});Craft.FormBuilder.IntegrationMappingManager=kn;Craft.FormBuilder.OptInDropdown=In;var H,P,z,D,O,R,V,U,_,K,G,J,W,Y,X;let w={name:((H=window.FormBuilderData)==null?void 0:H.name)||"Form",handle:((P=window.FormBuilderData)==null?void 0:P.handle)||"",id:((z=window.FormBuilderData)==null?void 0:z.id)||null,settings:(D=window.FormBuilderData)==null?void 0:D.settings,adminNotif:{enabled:((O=window.FormBuilderData)==null?void 0:O.adminNotif.enabled)||!1,subject:((R=window.FormBuilderData)==null?void 0:R.adminNotif.subject)||"",recipients:((V=window.FormBuilderData)==null?void 0:V.adminNotif.recipients)||"",message:((U=window.FormBuilderData)==null?void 0:U.adminNotif.message)||""},userNotif:{enabled:((_=window.FormBuilderData)==null?void 0:_.userNotif.enabled)||!1,subject:((K=window.FormBuilderData)==null?void 0:K.userNotif.subject)||"",templateId:((G=window.FormBuilderData)==null?void 0:G.userNotif.templateId)||"",recipients:((J=window.FormBuilderData)==null?void 0:J.userNotif.recipients)||"",message:((W=window.FormBuilderData)==null?void 0:W.userNotif.message)||""},fields:((Y=window.FormBuilderData)==null?void 0:Y.fields)||[],integrations:((X=window.FormBuilderData)==null?void 0:X.integrations)||[]};Object.defineProperty(Craft.FormBuilder,"formState",{get(){return w},configurable:!1,enumerable:!0});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("form-container"),t=new gn(w,n=>{});new vn(w,()=>{t.renderForm(),t.renderSettings()}),t.setupEventListeners(),mn(t,w,e),t.checkEmptyState(),t.renderForm(),t.renderSettings(),Ln(w),document.getElementById("save-form").addEventListener("click",()=>{Cn(w).then(n=>{}).catch(n=>{console.error("Failed to save form:",n)})})});
