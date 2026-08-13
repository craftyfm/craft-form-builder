# Features

The **Form Builder** plugin by CraftyFM offers a flexible and developer-friendly way to create and manage forms within Craft CMS. Here's what you can expect:

---

## Field Types

Build forms using a wide variety of field types to cover most use cases:

* **Input Fields**
* **Email**
* **URL**
* **File Upload**
* **Text Area**
* **Select Dropdown**
* **Radio Buttons**
* **Checkboxes**
* **Submit Button**

### Content Fields

* **Title Field** – Add titles h1 - h5.
* **Image Field** – Display image inside your form layout
* **Paragraph Field** – Insert text blocks 
* **HTML Field** – Add custom HTML for advanced flexibility

---

## 🛡 CForm Protection

Keep your forms secure and abuse-resistant with built-in protective features:
    
* **CAPTCHA Support**
    * **reCAPTCHA v3**
    * **hCaptcha**

* **Rate Limiting**
    * Limit how frequently a user (by IP) can submit a form
    * Configurable time windows to prevent spam or abuse


---

##  Layout Styling

Customize your form appearance with layout presets and utility classes:

* **Tailwind CSS**
* **Bootstrap** 

---

##  Email Notifications

Automatically notify admins and/or the form submitter when a form is submitted.

* Insert submitted form data directly into the email subject/body using tokens like `{email}` or `{submission}` — see [Notification](form-settings.md#7-notification) in the form settings docs.
* If an admin email fails to send, it can be resent from the submission's detail page in the Control Panel.
