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

## 🗂 Frameworks

Configure one or more frameworks to use.

1. Go to **Settings → General**.
2. Under **Frameworks**,
3. Save the settings.

> Currently only support bootstrap and tailwind.
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


Got it 👍
Here’s a clean **Markdown documentation draft** for your Form Builder **Email Template** feature. I also improved your HTML example so it looks more like a proper, reusable template:

---

# 📧 Email Templates — Form Builder

Email templates let you define the layout and content of messages sent from your forms. You can create reusable templates and attach them to form notifications.

---

## ➕ Adding a New Email Template

1. Navigate to **Settings → Email Templates**.
2. Click **Add New Template**.
3. Fill in the following fields:

   * **Title** → A descriptive name for your template.
   * **Template Path** → The location of your email template file (e.g., `email/contact.html`).


## 📝 Template Example

Here’s a simple, improved example of an email template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Email Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f9f9f9;
            padding: 20px;
        }
        .container {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 20px;
            max-width: 600px;
            margin: auto;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>You’ve got a new message</h2>
        <div>{{ message }}</div>
    </div>
    <div class="footer">
        This email was sent automatically from your website form.
    </div>
</body>
</html>
```


## 🔑Template Variables

* `{{ message }}` → The submitted message content.

You can include this placeholder anywhere in your template to dynamically insert the user’s message.



## Using the Template in a Form

1. Go to your **Form** settings.
2. Edit the **User Notification Template**.
3. Select the email template you created.
4. Save your form — it will now use your custom email template for notifications.


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





