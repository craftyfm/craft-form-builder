# 🧾 How to Render the Form

The **Form Builder** plugin integrates seamlessly with Craft CMS, allowing you to select and render forms using custom fields or template code.

---

## 🧱 Form Selection via Custom Field

This plugin provides a **custom field type** to easily select and render a form on entries or other elements.

### Steps:

1. Go to **Settings → Fields** in the Control Panel.
2. Create a new field using the **“Form Builder | Form Select”** field type.
3. Assign this field to an Entry Type (e.g., Contact Page, Landing Page).
4. Use the field in your entry to select a specific form.

---

## 🖼 Rendering the Form in Templates

You can render a form in two ways:

---

###  Option 1: Render by Handle

Use this when you know the form handle:

```twig
{% set form = craft.formBuilder.renderForm('yourFormHandle') %}
{{ form }}
```

---

###  Option 2: Render via Field Selection

If you’ve added the **Form Select** field to an entry:

```twig
{% if entry.form %}
    {{ entry.form.render() }}
{% endif %}
```
Sure! Here's the **Markdown** version you can copy directly into your documentation (e.g. README or Craft CMS docs):

---

##  Option 3: Manual Render

If you prefer to **manually render the form fields**, you can fetch the form using its handle and build your own HTML structure.

```twig
{% set form = craft.formBuilder.getForm('yourFormHandle') %}

<form id="{{ form.uid }}" method="POST" enctype="multipart/form-data" accept-charset="UTF-8">
    <input type="hidden" name="action" value="form-builder/submissions/submit">
    <input type="hidden" name="formId" value="{{ form.id }}">
    {{ redirectInput(craft.app.request.absoluteUrl ~ "#wrapper-" ~ form.uid) }}
    {{ csrfInput() }}

    {# Example fields #}
    <div class="mb-4">
        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
        <input
            type="text"
            id="firstName"
            name="fields[firstName]"
            class="mt-1 block w-full border rounded-md p-2"
        >
    </div>

    <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
            type="email"
            id="email"
            name="fields[email]"
            class="mt-1 block w-full border rounded-md p-2"
        >
    </div>

    <div class="mb-4">
        <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
        <textarea
            id="message"
            name="fields[message]"
            class="mt-1 block w-full border rounded-md p-2"
        ></textarea>
    </div>

    <button type="submit" class="px-4 py-2 bg-[#115045] text-white rounded-md">
        Submit
    </button>
</form>
```

### Explanation

* **`craft.formBuilder.getForm('yourFormHandle')`** — Retrieves the form by handle.
* **Hidden inputs** (`action`, `formId`, `redirectInput`, `csrfInput`) are required for proper form submission.
* **Custom fields** use the `fields[fieldHandle]` naming convention.
* This approach gives you **full control** over layout and styling — ideal for custom designs or Tailwind-based UIs.

---

Would you like me to include **Option 1** and **Option 2** in the same markdown for a complete section (so all rendering options are shown together)?
