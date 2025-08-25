# 📝 How to Use the Form Builder

Each form created with the **Form Builder** plugin comes with customizable settings to control appearance, behavior, email notifications, and integrations.

You can configure these settings by editing a form inside the plugin’s control panel.

---

## ⚙️ Per-Form Settings

Below are the available configuration options for each individual form:

### 1. **Form Name & Handle**

* **Name**: The display name of the form.
* **Handle**: A unique identifier used for rendering the form in templates.

> ⚠️ **Do not change the handle** after the form has been created, as it may break your form rendering or submissions.

---

### 2. **Collect IP**

* Enable this to **log the IP address** of each submission.
* Useful for audits, abuse detection, or tracking user behavior.

---

### 3. **Framework Styling**

* Choose your preferred frontend framework:

    * **Tailwind CSS**
    * **Bootstrap**
* This determines the default layout and class structure of your form and fields.
* Configure to output the framework's assets (JS/CSS).
---

### 4. **Field Orientation**

* Controls the layout direction of form fields:

    * **Vertical** – Labels are above inputs.
    * **Horizontal** – Labels and inputs are side-by-side.

---

### 5. **Custom CSS Class**

* Add one or more custom CSS classes to the `<form>` tag.
* Useful for targeting or styling your form via your site’s stylesheet.

---

### 6. **Submit Behavior**

* Choose what happens after the form is submitted:

    * **Display a Success Message** – Set a custom message that shows after submission.
    * **Redirect to Another Page** – Enter a URL to redirect the user.

> Only one of the two behaviors can be selected per form.

---

### 7. **Admin Email Notification**

Configure email notifications for each submission:

* **Recipients**: One or more email addresses (comma-separated).
* **Subject**: The subject line for the email.
* **Message Body**: The message content.

> 🔗 At the end of the message, the plugin will automatically append a **submission URL** so you can quickly view the entry in the Control Panel.

---

### 8. **Integrations**

Enable or disable any integrations connected to this form:

* Currently supported: **Generic Webhook**
* Only enabled integrations will be triggered when the form is submitted.
