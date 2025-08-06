# ⚙️ How to Configure Settings

The **Form Builder** plugin provides a centralized settings page to manage core features like file uploads, rate limiting, CAPTCHA, and integrations.

To access settings, go to:

**Control Panel → Form Builder → Settings**

---

## 🗂 File Uploads

To enable file upload fields in your forms:

1. Go to **Settings → General**.
2. Under **Upload Volume**, select the volume where uploaded files will be stored.
3. Save the settings.

> 📁 Without a volume selected, upload fields will not function correctly.

---

## 🛡️ Rate Limiting

Prevent users from submitting forms too frequently:

1. Go to **Settings → General**.
2. Enable the **Rate Limiting** option.
3. Optionally, customize the time window between allowed submissions (if configurable).

> 🔒 Rate limiting is based on the user's IP address.

---

## ✅ Feature Statuses (Submission Status)

You can define **statuses** that reflect the state of each submission (e.g., pending review, approved, rejected):

1. Go to **Settings → Statuses**.
2. Create new statuses with:

   * A name (e.g., “Pending”, “Reviewed”, “Spam”)
   * A handle (used internally)
   * A default color label (for visual clarity in the control panel)
3. Set one status as the **default** for new submissions.

> 🏷 This feature is useful for moderating or processing form submissions internally.


---

## 🤖 CAPTCHA Configuration

Protect your forms using CAPTCHA services:

1. Go to **Settings → Captcha**.
2. Configure **reCAPTCHA** and/or **hCaptcha** by entering:
    * Site Key
    * Secret Key
3. Save the settings.

> You can enable CAPTCHA per form when editing the form.

---

## 🔗 Integrations

Send submitted form data to external services using integrations:

1. Go to **Settings → Integrations**.
2. Add a new integration.
3. Currently supported integration: **Generic Webhook**
    * Define the endpoint URL.





