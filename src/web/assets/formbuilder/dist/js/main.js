var J=Object.defineProperty;var K=(e,t,n)=>t in e?J(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var E=(e,t,n)=>K(e,typeof t!="symbol"?t+"":t,n);const Y=e=>JSON.parse(JSON.stringify(e)),a=(e,t,n=!1)=>`
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
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Label<span class="cfb:text-red-500 cfb:ml-1">*</span></label>
        <input type="text" id="setting-label" value="${e.label}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
    </div>
    <div>
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Description</label>
        <input type="text" id="setting-desc" value="${e.desc}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
    </div>
`,f=e=>`
    <div>
        <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Handle<span class="cfb:text-red-500 cfb:ml-1">*</span></label>
        <input type="text" id="setting-handle" value="${e.handle}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
`,p=e=>`
    <div>
        <label class="cfb:flex cfb:items-center cfb:gap-2">
            <input type="checkbox" id="setting-required" ${e.required?"checked":""} class="cfb:text-blue-600 cfb:border-gray-300 cfb:rounded">
            <span class="cfb:text-sm cfb:font-medium cfb:text-gray-700">Required Field</span>
        </label>
    </div>
`,h=e=>{var t;(t=document.getElementById("setting-required"))==null||t.addEventListener("change",n=>e("required",n.target.checked))},W=()=>`
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
    `),F=(e,t)=>[...e.querySelectorAll(".form-field-wrapper")].reduce((s,c)=>{const i=c.getBoundingClientRect(),r=t-i.top-i.height/2;return r<0&&r>s.offset?{offset:r,element:c}:s},{offset:Number.NEGATIVE_INFINITY}).element,G=()=>{const e=document.createElement("div");e.className="cfb:relative cfb:my-4";const t=document.createElement("div");t.className="cfb:absolute cfb:inset-0 cfb:flex cfb:items-center";const n=document.createElement("div");n.className="cfb:w-full cfb:border-t cfb:border-blue-500",t.appendChild(n);const s=document.createElement("div");s.className="cfb:relative cfb:flex cfb:justify-center";const c=document.createElement("span");return c.className="cfb:bg-white cfb:px-3 cfb:text-sm cfb:text-blue-500 cfb:font-medium",c.textContent="Drop here",s.appendChild(c),e.appendChild(t),e.appendChild(s),e},m=(e,t)=>{e.forEach(n=>{var s;(s=document.getElementById(`setting-${n}`))==null||s.addEventListener("input",c=>t(n,c.target.value))})},B=e=>{var t;(t=document.getElementById("setting-options"))==null||t.addEventListener("input",n=>{const s=n.target.value.split(`
`).filter(c=>c.trim()!=="").map(c=>({name:c.trim(),value:c.trim(),isDefault:!1}));e("options",s)})},X=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),Q=e=>e.toLowerCase().trim().replace(/[^a-z0-9\s]/g,"").replace(/\s+(.)/g,(t,n)=>n.toUpperCase()).replace(/\s/g,""),x=e=>{const t=document.getElementById("setting-label"),n=document.getElementById("setting-handle");if(!t||!n||n.value!=="")return;let s=!1;n.addEventListener("input",()=>{s=!0}),t.addEventListener("input",()=>{s||(n.value=Q(t.value),e("handle",n.value))})},Z={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter text...",icon:"",iconSvg:null,required:!1}},ee=e=>!(!e.handle||!e.label),te=(e,t)=>`
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

`,ne=(e,t)=>{let n=`
        ${g(e)}
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
        </div>`),a("Property",n)+a("Validation",p(e))+a("Advanced",f(e))},ce=(e,t)=>{m(["label","handle","desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),x(e)},se={config:Z,validate:ee,render:te,renderSettings:ne,initSettings:ce},ie={defaultData:{handle:"",label:"",placeholder:"Enter your message...",desc:"",rows:4,required:!1,minlength:0,maxlength:0}},ae=e=>!(!e.handle||!e.label),re=(e,t)=>`
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
`,le=e=>{const t=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Rows</label>
            <input type="number" id="setting-rows" value="${e.rows}" min="1" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `,n=`
        ${p(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Min Length</label>
            <input type="number" id="setting-minlength" value="${e.minlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max Length</label>
            <input type="number" id="setting-maxlength" value="${e.maxlength}" min="0" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>
    `;return a("Property",t)+a("Validation",n)+a("Advanced",f(e))},oe=e=>{var t,n,s;m(["label","handle","desc","placeholder"],e),(t=document.getElementById("setting-rows"))==null||t.addEventListener("input",c=>e("rows",parseInt(c.target.value,10))),h(e),(n=document.getElementById("setting-minlength"))==null||n.addEventListener("input",c=>e("minlength",parseInt(c.target.value,10))),(s=document.getElementById("setting-maxlength"))==null||s.addEventListener("input",c=>e("maxlength",parseInt(c.target.value,10))),d(),x(e)},be={config:ie,validate:ae,render:re,renderSettings:le,initSettings:oe},de={defaultData:{handle:"",label:"",desc:"",placeholder:"Choose an option...",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},fe=e=>!(!e.handle||!e.label),me=(e,t)=>{const n=e.options.map(s=>`<option value="${s.value}">${s.name}</option>`).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                ${v(e)}
                <select class="cfb:flex-3 cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:bg-gray-50" disabled>
                    <option value="">${e.placeholder}</option>
                    ${n}
                </select>
                ${y(e)}
            </div>
        </div>
    `},ue=e=>{const t=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return a("Property",t)+a("Validation",p(e))+a("Advanced",f(e))},ge=e=>{m(["label","handle","desc","placeholder"],e),B(e),h(e),d(),x(e)},pe={config:de,validate:fe,render:me,renderSettings:ue,initSettings:ge},he={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},ve=e=>!(!e.handle||!e.label),ye=(e,t)=>{const n=e.options.map((s,c)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${c}" name="${e.id}[]" value="${s.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${c}" class="cfb:text-sm cfb:text-gray-700">${s.name}</label>
        </div>
    `).join("");return`
         <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
             <div class="${t==="horizontal"?"cfb:w-3/4":""}">
                <div class="cfb:w-3/4">
                    ${v(e)}
                    <div class="cfb:space-y-2 cfb:flex-3">
                        ${n}
                    </div>
                    ${y(e)}
                </div>
            </div>
        </div>
    `},xe=e=>{const t=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return a("Property",t)+a("Validation",p(e))+a("Advanced",f(e))},$e=e=>{m(["label","handle","desc"],e),B(e),h(e),d(),x(e)},Se={config:he,validate:ve,render:ye,renderSettings:xe,initSettings:$e},we={defaultData:{handle:"",label:"",desc:"",options:[{name:"Option 1",value:"Option 1",isDefault:!1},{name:"Option 2",value:"Option 2",isDefault:!1}],required:!1}},Ee=e=>!(!e.handle||!e.label),Le=(e,t)=>{const n=e.options.map((s,c)=>`
        <div class="cfb:flex cfb:items-center cfb:gap-2 ">
            <input type="checkbox" id="${e.id}_${c}" name="${e.id}[]" value="${s.value}" class="cfb:border-gray-300 cfb:rounded" disabled>
            <label for="${e.id}_${c}" class="cfb:text-sm cfb:text-gray-700">${s.name}</label>
        </div>
    `).join("");return`
        <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
            ${v(e)}
            <div>
                <div class="cfb:space-y-2 cfb:flex-3">
                    ${n}
                </div>
                ${y(e)}
            </div>
            
            
        </div>
    `},ke=e=>{const t=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Options (one per line)</label>
            <textarea id="setting-options" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md" rows="4" placeholder="Enter one option per line">${e.options.map(n=>n.name).join(`
`)}</textarea>
        </div>
    `;return a("Property",t)+a("Validation",p(e))+a("Advanced",f(e))},Ce=e=>{m(["label","handle","desc"],e),B(e),h(e),d(),x(e)},Ie={config:we,validate:Ee,render:Le,renderSettings:ke,initSettings:Ce},Be={defaultData:{handle:"",label:"",desc:"",allowedExtensions:"",limit:1,required:!1,maxSize:0}},Te=e=>!0,Ae=(e,t)=>`
    <div class="cfb:flex ${t==="horizontal"?"cfb:flex-row":"cfb:flex-col"}">
        ${v(e)}
        <div class="${t==="horizontal"?"cfb:w-3/4":""}">
            <div class="cfb:flex cfb:items-center cfb:justify-center cfb:w-full cfb:flex-3">
              <input type="file"
                       class="cfb:w-full cfb:text-slate-500 cfb:font-medium cfb:text-sm cfb:bg-gray-100
                       cfb:file:cursor-pointer cfb:cursor-pointer cfb:file:border-0 cfb:file:py-2 cfb:file:px-4 cfb:file:mr-4
                       cfb:file:bg-blue-500 cfb:file:hover:bg-gray-700 cfb:file:text-white cfb:rounded" disabled/>
            </div>
        </div>
        ${y(e)}
    </div>
`,Me=e=>{const t=`
        ${g(e)}
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
        ${p(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Max File Size in MBs</label>
            <input type="number" id="setting-maxSize" value="${e.maxSize?e.maxSize:""}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return a("Property",t)+a("Validation",n)+a("Advanced",f(e))},Ne=e=>{var t;m(["label","allowedExtensions","limit","handle","desc"],e),h(e),(t=document.getElementById("setting-maxSize"))==null||t.addEventListener("input",n=>e("maxSize",n.target.value)),d(),x(e)},qe={config:Be,validate:Te,render:Ae,renderSettings:Me,initSettings:Ne},Pe={defaultData:{handle:"submit",submitText:"Submit",resetText:"Reset",submitStyle:"primary",resetStyle:"secondary",spacing:"wide"}},je=e=>!!e.handle,ze=(e,t)=>{const n=e.submitStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":"cfb:bg-gray-600 cfb:text-white",s=e.resetStyle==="primary"?"cfb:bg-blue-600 cfb:text-white":e.resetStyle==="secondary"?"cfb:bg-gray-500 cfb:text-white":"cfb:bg-red-500 cfb:text-white";return`
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
    `},De=e=>{const t=`
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
    `;return a("Property",t)+a("Advanced",f(e))},Oe=e=>{var t,n,s,c,i;m(["handle"],e),(t=document.getElementById("setting-submit-text"))==null||t.addEventListener("input",r=>e("submitText",r.target.value)),(n=document.getElementById("setting-reset-text"))==null||n.addEventListener("input",r=>e("resetText",r.target.value)),(s=document.getElementById("setting-submit-style"))==null||s.addEventListener("change",r=>e("submitStyle",r.target.value)),(c=document.getElementById("setting-reset-style"))==null||c.addEventListener("change",r=>e("resetStyle",r.target.value)),(i=document.getElementById("setting-spacing"))==null||i.addEventListener("change",r=>e("spacing",r.target.value)),d()},He={config:Pe,validate:je,render:ze,renderSettings:De,initSettings:Oe},Fe={defaultData:{handle:"title",text:"Title Text",level:"h2",alignment:"start"}},Re=e=>!!e.handle,Ue=(e,t)=>{const n=e.level,s=`cfb:text-${e.alignment}`;return`
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <${n} class="${s} cfb:w-full cfb:font-bold">${e.text}</${n}>
        </div>
    `},Ve=e=>{const t=`
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
    `;return a("Property",t)+a("Advanced",f(e))},_e=e=>{var t,n,s,c;(t=document.getElementById("setting-handle"))==null||t.addEventListener("input",i=>e("handle",i.target.value)),(n=document.getElementById("setting-text"))==null||n.addEventListener("input",i=>e("text",i.target.value)),(s=document.getElementById("setting-level"))==null||s.addEventListener("change",i=>e("level",i.target.value)),(c=document.getElementById("setting-alignment"))==null||c.addEventListener("change",i=>e("alignment",i.target.value)),d()},Je={config:Fe,validate:Re,render:Ue,renderSettings:Ve,initSettings:_e},Ke={defaultData:{handle:"image",src:"",alt:"",width:null,height:null,alignment:"start"}},Ye=e=>!!e.handle,We=(e,t)=>{const n=e.width?`${e.width}px`:"auto",s=e.height?`${e.height}px`:"auto",c=e.width?`width="${e.width}"`:"",i=e.height?`height="${e.height}"`:"";return`
    <div class="cfb:flex cfb:justify-${e.alignment} cfb:items-start">
        <img 
            ${c} ${i}
            src="${e.src}" 
            alt="${e.alt||""}" 
            style="width: ${n}; height: ${s};"
            class="cfb:object-fill" 
        />
    </div>
`},Ge=e=>{const t=`
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
    `;return a("Property",t)+a("Advanced",f(e))},Xe=e=>{var t;m(["handle","src","alt","width","height"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",n=>e("alignment",n.target.value)),d()},Qe={config:Ke,validate:Ye,render:We,renderSettings:Ge,initSettings:Xe},Ze={defaultData:{handle:"paragraph",text:"This is a paragraph of text. You can edit it in the settings panel.",alignment:"start"}},et=e=>!!e.handle,tt=e=>`
        <div class="cfb:flex cfb:justify-between cfb:items-start">
            <p class="${`cfb:text-${e.alignment}`} cfb:w-full">${e.text}</p>
        </div>
    `,nt=e=>{const t=`
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
    `;return a("Property",t)+a("Advanced",f(e))},ct=e=>{var t;m(["text","handle"],e),(t=document.getElementById("setting-alignment"))==null||t.addEventListener("change",n=>e("alignment",n.target.value)),d()},st={config:Ze,validate:et,render:tt,renderSettings:nt,initSettings:ct},it={defaultData:{html:"",handle:"html"}},at=e=>!!e.handle,rt=e=>`
    <div class="cfb:flex cfb:justify-between cfb:items-start">
        <div class="cfb:w-full cfb:prose">
            <code class="cfb:line-clamp-3">${X(e.html)}</code>
        </div>
    </div>
`,lt=e=>{const t=`
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">HTML Content</label>
            <textarea id="setting-html" placeholder="Put your HTML code here"
                class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:font-mono" rows="10">${e.html}</textarea>
            <small class="cfb:text-sm cfb:font-light">Please ensure your code contains only HTML and no scripts.</small>
        </div>
    `;return a("Property",t)+a("Advanced",f(e))},ot=e=>{m(["html","handle"],e),d()},bt={config:it,validate:at,render:rt,renderSettings:lt,initSettings:ot},dt={defaultData:{handle:"hcaptcha",siteKey:"",privateKey:"",required:!0}},ft=e=>!0,mt=e=>`
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
`,ut=e=>a("Advanced",f(e)),gt=e=>{m(["handle"],e),d()},pt={config:dt,validate:ft,render:mt,renderSettings:ut,initSettings:gt},ht={defaultData:{handle:"recaptcha"}},vt=e=>!!e.handle,yt=(e,t)=>`
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
`,xt=e=>a("Advanced",f(e)),$t=e=>{m(["handle"],e),d()},St={config:ht,validate:vt,render:yt,renderSettings:xt,initSettings:$t},wt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter email...",icon:"",iconSvg:null,required:!1}},Et=e=>!(!e.handle||!e.label),Lt=(e,t)=>`
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

`,kt=(e,t)=>{let n=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${k(e)}`),a("Property",n)+a("Validation",p(e))+a("Advanced",f(e))},Ct=(e,t)=>{m(["label","handle","desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),x(e)},It={config:wt,validate:Et,render:Lt,renderSettings:kt,initSettings:Ct},Bt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter url...",icon:"",iconSvg:null,required:!1}},Tt=e=>!(!e.handle||!e.label),At=(e,t)=>`
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

`,Mt=(e,t)=>{let n=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${k(e)}`),a("Property",n)+a("Validation",p(e))+a("Advanced",f(e))},Nt=(e,t)=>{m(["label","handle","desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),x(e)},qt={config:Bt,validate:Tt,render:At,renderSettings:Mt,initSettings:Nt},Pt={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter phone number...",icon:"",iconSvg:null,required:!1}},jt=e=>!(!e.handle||!e.label),zt=(e,t)=>`
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

`,Dt=(e,t)=>{let n=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${k(e)}`),a("Property",n)+a("Validation",p(e))+a("Advanced",f(e))},Ot=(e,t)=>{m(["label","handle","desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),x(e)},Ht={config:Pt,validate:jt,render:zt,renderSettings:Dt,initSettings:Ot},Ft={defaultData:{handle:"",label:"",desc:"",placeholder:"Enter number...",icon:"",iconSvg:null,required:!1}},Rt=e=>!(!e.handle||!e.label),Ut=(e,t)=>`
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

`,Vt=(e,t)=>{let n=`
        ${g(e)}
        <div>
            <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Placeholder</label>
            <input type="text" id="setting-placeholder" value="${e.placeholder}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
        </div>  
    `;return t.settings.icons!==""&&(n+=`${k(e)}`),a("Property",n)+a("Validation",p(e))+a("Advanced",f(e))},_t=(e,t)=>{m(["label","handle","desc","placeholder"],e),h(e),d(),t.formState.settings.icons!==""&&t.iconPicker.init("setting-icon",t.formState.settings.icons),x(e)},Jt={config:Ft,validate:Rt,render:Ut,renderSettings:Vt,initSettings:_t},Kt={defaultData:{handle:"",label:"",checkboxLabel:"",desc:"",required:!1}},Yt=e=>!(!e.handle||!e.label),Wt=(e,t)=>`
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
    `,Gt=e=>{const t=`
        ${g(e)}
            <div>
                <label class="cfb:block cfb:text-sm cfb:font-medium cfb:text-gray-700 cfb:mb-2">Checkbox Label</label>
                <input type="text" id="setting-checkboxLabel" value="${e.checkboxLabel}" class="cfb:w-full cfb:px-3 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md">
            </div>
    `;return a("Property",t)+a("Validation",p(e))+a("Advanced",f(e))},Xt=(e,t)=>{m(["label","handle","desc","checkboxLabel"],e),h(e),d(),x(e)},Qt={config:Kt,validate:Yt,render:Wt,renderSettings:Gt,initSettings:Xt},C={text:se,email:It,url:qt,phone:Ht,number:Jt,textarea:be,select:pe,radio:Se,checkbox:Qt,checkboxes:Ie,fileUpload:qe,submitButton:He,title:Je,image:Qe,paragraph:st,html:bt,hcaptcha:pt,recaptcha:St};let u=null,L=null;function V(e){L=this,this.classList.add("dragging"),u=G()}const _=e=>{L.classList.remove("dragging"),u&&u.parentNode&&u.parentNode.removeChild(u),L=null,u=null},Zt=(e,t,n)=>{document.querySelectorAll(".form-element").forEach(c=>{c.addEventListener("dragstart",i=>{i.dataTransfer.setData("text/plain",c.dataset.type)}),c.addEventListener("dragstart",V),c.addEventListener("dragend",_)}),n.addEventListener("dragover",c=>{if(c.preventDefault(),!u||e.formState.fields.length===0)return;const i=100,r=20;c.clientY<i?window.scrollBy(0,-r):c.clientY>window.innerHeight-i&&window.scrollBy(0,r);const o=F(n,c.clientY);u.parentNode&&u.parentNode.removeChild(u),o?n.insertBefore(u,o):n.appendChild(u)}),n.addEventListener("drop",c=>{if(c.preventDefault(),!u)return;const i=F(n,c.clientY),r=c.dataTransfer.getData("text/plain"),o=i?i.dataset.index:null;if(r)e.addField(r,o);else{const l=L.dataset.index;e.moveField(l,o,t,e)}})};class en{constructor(t){this.currentPage=1,this.modal=null,this.cancelToken=null,this.searchInput=null,this.iconListContainer=null,this.iconList=null,this.hasMore=!0,this.loading=!1,this.set=null,this.spinner=null,this.updateFieldData=t}get listLength(){return this.iconListContainer.querySelectorAll("button").length}init(t,n){this.set!==n&&(this.set=n,this.cleanState()),this.container=document.getElementById(t),this.preview=this.container.querySelector(".icon-picker--icon"),this.chooseBtn=this.container.querySelector(".icon-picker--choose-btn"),this.removeBtn=this.container.querySelector(".icon-picker--remove-btn"),this.inputName=this.container.querySelector('input[name="name"]'),this.chooseBtn.addEventListener("click",()=>{this.showModal()}),this.removeBtn.addEventListener("click",()=>{this.removeIcon()})}cleanState(){this.currentPage=1,this.hasMore=!0,this.modal&&this.updateIcons()}showModal(){this.set&&(this.modal?this.modal.style.display="flex":this.createModal())}createModal(){const t=document.createElement("div");t.className="cfb:bg-white cfb:shadow-lg cfb:rounded-lg cfb:p-6";const n=document.createElement("div");n.className="body",t.appendChild(n);const s=document.createElement("div");s.className="cfb:relative cfb:w-full",n.appendChild(s);const c=document.createElement("span");c.className="cfb:iconify-[mdi--magnify] cfb:absolute cfb:inset-y-2 cfb:left-3 cfb:flex cfb:items-center cfb:pointer-events-none",c.setAttribute("aria-hidden","true"),s.appendChild(c),this.searchInput=document.createElement("input"),this.searchInput.type="text",this.searchInput.name="search",this.searchInput.className="cfb:w-full cfb:pl-10 cfb:py-2 cfb:border cfb:border-gray-300 cfb:rounded-md cfb:focus:ring-blue-500 cfb:focus:border-blue-500",this.searchInput.placeholder="Search",this.searchInput.setAttribute("aria-label","Search"),s.appendChild(this.searchInput);const i=document.createElement("button");i.className="clear-btn  cfb:absolute cfb:inset-y-0 cfb:right-3 cfb:flex cfb:items-center cfb:justify-center cfb:text-gray-400 cfb:hover:text-gray-600 cfb:focus:outline-none hidden",i.title="Clear search",i.setAttribute("aria-label","Clear search"),s.appendChild(i),this.iconListContainer=document.createElement("div"),this.iconListContainer.className="cfb:grid cfb:grid-cols-8 cfb:gap-2 cfb:max-h-96 cfb:overflow-y-auto cfb:p-4 border cfb:rounded-lg cfb:bg-gray-50 icon-picker-modal--list",n.appendChild(this.iconListContainer),this.updateLangAttribute(this.iconList),this.spinner=document.createElement("div"),this.spinner.className="spinner spinner-absolute",this.spinner.style.display="none",this.iconListContainer.appendChild(this.spinner),this.iconListContainer.addEventListener("scroll",this.onScroll.bind(this));let r;this.searchInput.addEventListener("input",()=>{clearTimeout(r),r=setTimeout(()=>{this.updateIcons()},300),this.searchInput.value?i.classList.remove("hidden"):i.classList.add("hidden")}),i.addEventListener("click",()=>{this.searchInput.value="",this.searchInput.dispatchEvent(new Event("input"))}),this.iconListContainer.addEventListener("click",l=>{let b;if(l.target.nodeName==="BUTTON")b=l.target;else if(b=l.target.closest("button"),!b)return;this.selectIcon(b)}),this.modal=document.createElement("div"),this.modal.className="cfb:fixed cfb:z-50 cfb:inset-0 cfb:flex cfb:items-center cfb:justify-center cfb:bg-white/50";const o=document.createElement("div");o.className="cfb:w-full cfb:max-w-2xl",o.appendChild(t),this.modal.appendChild(o),document.body.appendChild(this.modal),this.modal.addEventListener("click",l=>{l.target===this.modal&&(this.modal.style.display="none")}),this.updateIcons()}async onScroll(){if(this.loading||!this.hasMore)return;const t=this.iconListContainer.scrollTop,n=this.iconListContainer.scrollHeight,s=this.iconListContainer.clientHeight;t+s>=n-200&&this.loadMore()}async updateIcons(){this.iconListContainer.innerHTML=await this.loadIcons()}async loadMore(){this.currentPage+=1;const t=await this.loadIcons();if(t.length<=0){this.hasMore=!1;return}this.iconListContainer.innerHTML+=t}async loadIcons(){this.cancelToken&&this.cancelToken.abort();const n=document.getElementById("csrf-input").value;this.loading=!0;const s=this.searchInput.value;this.spinner.style.display="block",this.cancelToken=new AbortController;try{return(await(await fetch(Craft.getActionUrl("form-builder/icons/picker"),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-Token":n},body:JSON.stringify({search:s,set:this.set,page:this.currentPage}),signal:this.cancelToken.signal})).json()).listHtml}catch(c){return c.name!=="AbortError"&&console.error("Error loading icons:",c),""}finally{this.spinner.style.display="none",this.cancelToken=null,this.loading=!1}}updateLangAttribute(t){document.documentElement.lang.startsWith("en")||t.setAttribute("lang","en")}selectIcon(t){this.modal.style.display="none";const n=t.getAttribute("title"),s=t.getAttribute("data-iconName");this.preview.innerHTML=t.innerHTML,this.preview.setAttribute("title",n),this.preview.setAttribute("aria-label",n),this.preview.setAttribute("role","img"),this.updateLangAttribute(this.preview),this.inputName.value=s;const c=this.chooseBtn.querySelector(".label");c&&(c.textContent="Change"),this.updateFieldData("icon",s),this.updateFieldData("iconSvg",t.innerHTML),this.chooseBtn.focus(),this.removeBtn.classList.remove("hidden"),this.container.classList.contains("small")&&this.chooseBtn.classList.add("hidden")}removeIcon(){this.preview.innerHTML="",this.preview.removeAttribute("title"),this.preview.removeAttribute("aria-label"),this.inputName.value="",this.updateFieldData("icon",""),this.updateFieldData("iconSvg",null);const t=this.chooseBtn.querySelector(".label");t&&(t.textContent="Choose"),this.removeBtn.classList.add("hidden"),this.container.classList.contains("small")?(this.chooseBtn.classList.remove("hidden"),this.chooseBtn.focus()):this.chooseBtn.focus()}}class tn{constructor(t,n){E(this,"updateFieldData",(t,n)=>{const s=this.formState.fields.find(c=>c.id===this.selectedFieldId);s&&(s[t]=n,this.renderForm())});E(this,"deleteField",t=>{this.formState.fields=this.formState.fields.filter(n=>n.id!==t),this.selectedFieldId===t?(this.selectedFieldId=null,this.selectField(null)):this.renderForm()});E(this,"addField",(t,n)=>{const s=C[t];if(s){if(["recaptcha","hcaptcha","captcha"].includes(t)&&!this.checkOnlyCaptchaActive())return alert("Only one captcha field can be active at a time"),!1;let i={id:crypto.randomUUID(),type:t,...Y(s.config.defaultData)};return(s.config.defaultData.handle!==void 0||s.config.defaultData.handle!=="")&&(i.handle=this.generateUniqueHandle(s.config.defaultData.handle)),n!==null?this.formState.fields.splice(Math.max(n,0),0,i):this.formState.fields.push(i),this.selectField(i.id),!0}return!1});E(this,"moveField",(t,n)=>{n===null&&(n=this.formState.fields.length),n=Math.max(n-1,0),[this.formState.fields[t],this.formState.fields[n]]=[this.formState.fields[n],this.formState.fields[t]],this.renderForm(),this.renderSettings()});this.formContainer=document.getElementById("form-container"),this.settingsContainer=document.getElementById("settings-container"),this.formState=t,this.selectedFieldId=null,this.selectionCallback=n,this.iconPicker=new en(this.updateFieldData)}checkEmptyState(){this.formState.fields.length===0&&(this.formContainer.innerHTML=` <div class="empty-state cfb:flex cfb:flex-col cfb:items-center cfb:justify-center cfb:h-full cfb:text-gray-500 cfb:text-center"
                 id="emptyState">
                <span class="cfb:iconify-[mdi--add-bold] cfb:text-5xl cfb:mb-4"></span>
                <p class="cfb:text-lg">Drag components here to build your form</p>
            </div>`)}renderForm(){this.formContainer.innerHTML="",this.formState.fields.forEach((t,n)=>{const s=C[t.type];if(s){const c=s.validate(t)===!1,i=document.createElement("div");i.classList.add("form-field-wrapper","cfb:group","cfb:px-4","cfb:pb-4","cfb:pt-2","cfb:border","cfb:hover:border-blue-500","cfb:rounded-md","cfb:cursor-pointer"),t.id===this.selectedFieldId?i.classList.add("cfb:border-blue-500","cfb:bg-blue-50"):c?i.classList.add("cfb:border-red-500","cfb:bg-red-50"):i.classList.add("cfb:border-transparent"),i.dataset.id=t.id,i.dataset.index=n.toString();const r=W();i.innerHTML=`<div>${r}</div>
                                            ${s.render(t,this.formState.settings.orientation)}`,i.draggable=!0,i.querySelector(".delete-container").innerHTML=`
                    <div class="cfb:relative">
                        <button class="delete-field cfb:text-gray-400 hover:cfb:text-red-500 cfb:transition-colors" data-id="${t.id}">
                            <span class="cfb:iconify-[mdi-light--delete] cfb:w-4 cfb:h-4 cfb:text-red-600"></span>
                        </button>
                        <span class="cfb:delete-tooltip">
                            Remove
                        </span>
                    </div>
                `,this.formContainer.appendChild(i),i.addEventListener("dragstart",V),i.addEventListener("dragend",_)}}),this.checkEmptyState()}renderSettings(){const t=this.formState.fields.find(n=>n.id===this.selectedFieldId);if(t){const n=C[t.type];n&&n.renderSettings?(this.settingsContainer.innerHTML=n.renderSettings(t,this.formState),n.initSettings&&n.initSettings(this.updateFieldData,this)):this.settingsContainer.innerHTML='<div class="cfb:p-4 cfb:text-gray-500">No settings available.</div>'}else this.settingsContainer.innerHTML=` <div class="no-selection cfb:text-center cfb:text-gray-500 cfb:mt-10">
                                                        <span class="cfb:iconify-[mdi--settings] cfb:text-5xl cfb:mb-4"></span>
                                                    <p>Select a component to edit</p>
                                                </div>`}selectField(t){this.selectedFieldId=t,this.renderForm(),this.renderSettings(),this.selectionCallback&&this.selectionCallback(t)}setupEventListeners(){this.formContainer.addEventListener("click",t=>{const n=t.target.closest(".form-field-wrapper");n&&this.selectField(n.dataset.id);const s=t.target.closest(".delete-field");if(s){t.stopPropagation();const c=s.dataset.id;this.deleteField(c)}})}generateUniqueHandle(t){if((i=>!this.formState.fields.some(r=>r.handle===i))(t))return t;const s=this.formState.fields.map(i=>i.handle).filter(i=>i&&i.startsWith(t)).map(i=>{const r=i.match(new RegExp(`^${t}(\\d+)$`));return r?parseInt(r[1],10):0}).filter(i=>!isNaN(i)).sort((i,r)=>i-r);let c=1;for(const i of s)if(i===c)c++;else if(i>c)break;return`${t}${c}`}checkOnlyCaptchaActive(t=null){const n=["recaptcha","hcaptcha","captcha"];return this.formState.fields.filter(c=>t&&c.id===t?!1:n.includes(c.type)).length<1}}class nn{initializeSettingsModal(){const t=document.querySelectorAll(".cfb-settings-tab"),n=document.querySelectorAll(".cfb-tab-content");t.forEach(r=>{r.addEventListener("click",o=>{const l=o.currentTarget.getAttribute("data-tab");t.forEach($=>{$.classList.remove("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),$.classList.add("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50")}),o.currentTarget.classList.remove("cfb:text-gray-500","cfb:hover:text-gray-700","cfb:hover:bg-gray-50"),o.currentTarget.classList.add("cfb:text-blue-600","cfb:border-blue-600","cfb:bg-blue-50","cfb-settings-tab-active"),n.forEach($=>{$.classList.add("cfb:hidden")});const b=document.querySelector(`.cfb-tab-${l}`);b&&b.classList.remove("cfb:hidden")})});const s=document.querySelectorAll('input[name="actionOnSubmit"]'),c=document.querySelector(".cfb-success-message-field"),i=document.querySelector(".cfb-redirect-url-field");s.forEach(r=>{r.addEventListener("change",o=>{const l=o.target.value;l==="message"?(c.style.display="block",i.style.display="none"):l==="redirect"&&(c.style.display="none",i.style.display="block")})}),this.initializeAdminNotifTab(),this.initializeIntegrationTab()}initializeIntegrationTab(){document.querySelectorAll("[data-integration]").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();const s=t.getAttribute("data-integration");document.querySelectorAll(".integration-settings").forEach(c=>{c.classList.add("cfb:hidden")}),document.getElementById(`integration-${s}`).classList.remove("cfb:hidden"),document.querySelectorAll("[data-integration]").forEach(c=>{c.classList.remove("cfb:bg-blue-100","cfb:text-blue-700")}),t.classList.add("cfb:bg-blue-100","cfb:text-blue-700")})})}initializeAdminNotifTab(){const t=this,n=document.getElementById("form-admin-notif-enabled");n.addEventListener("click",function(s){t.adminNotifCondition(n)}),t.adminNotifCondition(n)}adminNotifCondition(t){const s=t.getAttribute("aria-checked")==="true";document.querySelectorAll(".cfb-admin-notif").forEach(i=>{s===!1?i.style.display="none":i.style.display="block"})}constructor(t,n){this.formState=t,this.onSettingsUpdated=n,this.formSettingsModal=document.getElementById("main-settings-modal"),this.formSettingsButton=document.getElementById("main-settings-btn"),this.formSettings=document.getElementById("main-settings-form"),this.closeSettingModals=document.querySelectorAll(".cfb-close-main-settings-modal"),this.init(),this.initializeSettingsModal()}init(){this.formSettingsButton.addEventListener("click",()=>this.openSettingsModal()),this.formSettings.addEventListener("submit",t=>this.updateFormSetting(t)),this.closeSettingModals.forEach(t=>t.addEventListener("click",()=>this.closeSettingsModal())),this.formSettingsModal.addEventListener("click",t=>{t.target===this.formSettingsModal&&this.closeSettingsModal()})}openSettingsModal(){this.formSettingsModal.classList.remove("cfb:hidden")}closeSettingsModal(){this.formSettingsModal.classList.add("cfb:hidden")}updateFormSetting(t){t.preventDefault();const n=new FormData(t.target),s={};if(n.forEach((c,i)=>{const r=i.match(/^integrations\[(\w+)\]\[(\w+)\]$/);if(r){const l=r[1],b=r[2];s[l]||(s[l]={}),s[l][b]=c;return}const o=i.match(/^(\w+)\[(\w+)\]$/);if(o){const l=o[1],b=o[2];this.formState[l]||(this.formState[l]={}),this.formState[l][b]=c}else this.formState[i]=c}),Object.keys(s).length>0){this.formState.integrations={};for(const[c,i]of Object.entries(s))Object.keys(i).length>0&&(this.formState.integrations[c]=i)}console.log(this.formState),this.closeSettingsModal(),this.onSettingsUpdated&&this.onSettingsUpdated()}}const w=document.getElementById("preview-modal"),I=document.getElementById("preview-btn"),cn=document.getElementById("close-modal-btn"),sn=document.getElementById("preview-iframe"),R=document.querySelectorAll(".cfb-preview-switcher"),an=document.getElementById("cfb-preview-container"),rn="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-blue-600 cfb:text-sm cfb:transition",ln="cfb-preview-switcher cfb:hover:text-blue-400 cfb:text-sm cfb:text-black cfb:transition",on=e=>{const n=document.getElementById("csrf-input").value,s={form:e};fetch(Craft.getActionUrl("form-builder/forms/preview"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":n},body:JSON.stringify(s)}).then(c=>{if(!c.ok)throw new Error("Network response was not ok");return c.text()}).then(c=>{w.classList.remove("cfb:opacity-0","cfb:pointer-events-none"),w.classList.add("cfb:opacity-100","cfb:pointer-events-auto"),sn.srcdoc=c}).catch(c=>{Craft.cp.displayError("Failed to send preview request")})},bn=e=>{I==null||I.addEventListener("click",()=>on(e)),cn.addEventListener("click",U),w.addEventListener("click",t=>{t.target===w&&U()}),R.forEach(t=>{t.addEventListener("click",n=>{R.forEach(c=>c.className=ln),t.className=rn;const s=t.dataset.device;an.className=`cfb:preview-device-frame cfb:${s}`})})},U=()=>{w.classList.remove("cfb:opacity-100","cfb:pointer-events-auto"),w.classList.add("cfb:opacity-0","cfb:pointer-events-none")},dn=e=>{const n=document.getElementById("csrf-input").value,s={form:e};return fetch(Craft.getActionUrl("form-builder/forms/save"),{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-Token":n,Accept:"application/json"},body:JSON.stringify(s)}).then(c).then(i).catch(r);async function c(l){const b=await l.json();if(!l.ok)throw o(b.message||"Unknown error",b);return b}function i(l){if(l.success===!1)throw o(l.message||"Unknown error",l);location.reload()}function r(l){throw Craft.cp.displayError(l.message),l}function o(l,b){const $=new Error(l);return $.data=b,$}};document.addEventListener("DOMContentLoaded",()=>{var c,i,r,o,l,b,$,T,A,M,N,q,P,j,z,D,O;const e=document.getElementById("form-container");let t={name:((c=window.FormBuilderData)==null?void 0:c.name)||"Form",handle:((i=window.FormBuilderData)==null?void 0:i.handle)||"",id:((r=window.FormBuilderData)==null?void 0:r.id)||null,settings:{orientation:((o=window.FormBuilderData)==null?void 0:o.settings.orientation)||"vertical",icons:((l=window.FormBuilderData)==null?void 0:l.settings.icons)||"",framework:((b=window.FormBuilderData)==null?void 0:b.settings.framework)||"bootstrap",class:(($=window.FormBuilderData)==null?void 0:$.settings.class)||"",collectIp:((T=window.FormBuilderData)==null?void 0:T.settings.collectIp)||!1,actionOnSubmit:((A=window.FormBuilderData)==null?void 0:A.settings.actionOnSubmit)||"message",successMessage:((M=window.FormBuilderData)==null?void 0:M.settings.successMessage)||"Thank you for submitting the form.",redirectUrl:((N=window.FormBuilderData)==null?void 0:N.settings.redirectUrl)||""},adminNotif:{enabled:((q=window.FormBuilderData)==null?void 0:q.adminNotif.enabled)||!1,subject:((P=window.FormBuilderData)==null?void 0:P.adminNotif.subject)||"",recipients:((j=window.FormBuilderData)==null?void 0:j.adminNotif.recipients)||"",message:((z=window.FormBuilderData)==null?void 0:z.adminNotif.message)||""},fields:((D=window.FormBuilderData)==null?void 0:D.fields)||[],integrations:((O=window.FormBuilderData)==null?void 0:O.integrations)||[]};const n=new tn(t,S=>{});new nn(t,()=>{n.renderForm(),n.renderSettings()}),n.setupEventListeners(),Zt(n,t,e),n.checkEmptyState(),n.renderForm(),n.renderSettings(),bn(t),document.getElementById("save-form").addEventListener("click",()=>{dn(t).then(S=>{console.log("Form saved successfully, formState updated:",S),n.renderForm(),n.renderSettings(),s(t.settings.name)}).catch(S=>{console.error("Failed to save form:",S)})});function s(S){const H=document.querySelector("h1, .page-title");H&&S&&(H.textContent=S),document.title=S}});
