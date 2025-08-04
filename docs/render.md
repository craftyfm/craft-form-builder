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

### ✅ Option 1: Render by Handle (Manual)

Use this when you know the form handle:

```twig
{% set form = craft.formBuilder.renderForm('yourFormHandle') %}
{{ form }}
```

You can also control whether to load the framework assets (CSS, JS):

```twig
{% set form = craft.formBuilder.renderForm('yourFormHandle', false) %}
{{ form }}
```

* `true` (default): Loads CSS/JS assets.
* `false`: Skips asset loading (useful if you load styles manually).

---

### ✅ Option 2: Render via Field Selection

If you’ve added the **Form Select** field to an entry:

```twig
{% if entry.form %}
    {{ entry.form.render() }}
{% endif %}
```

To disable automatic asset loading here:

```twig
{% if entry.form %}
    {{ entry.form.render(false) }}
{% endif %}
```

> This gives you full control over when the plugin’s assets are loaded in your templates.
