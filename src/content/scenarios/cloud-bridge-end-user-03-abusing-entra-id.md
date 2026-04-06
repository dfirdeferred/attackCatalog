---
title: "The Cloud Bridge — Chapter 3: Abusing Entra ID"
chain: "cloud-bridge"
chainOrder: 3
role: "end-user"
attack: "abusing-entra-id"
choices:
  - label: "Review and remove any unfamiliar apps connected to your account"
    next: "golden-saml"
  - label: "Report the suspicious app permission request to IT"
    next: "golden-saml"
isDebrief: false
---

A few days after the initial incident, you receive a pop-up while browsing your company's Microsoft 365 portal. An application called "DocSync Pro" is requesting permission to read your email and access your files. The interface looks legitimate — it has a professional logo and claims to help synchronize documents across teams. You almost click "Accept" without thinking. After all, your company uses dozens of apps.

But something feels off. You never requested this application, and no one from IT mentioned it. What you do not realize is that the attacker who compromised your account registered this fake application in your company's directory. If anyone clicks "Accept," the app gains ongoing access to their email and files — even after passwords are changed. The attacker is counting on busy employees clicking through consent prompts without reading them carefully.

---

## What Is Abusing Entra ID Application Permissions?

When you use apps connected to your work account — like calendar tools, file-sharing services, or productivity add-ons — they ask for permission to access certain data. This is normally safe when the app is legitimate and approved by your IT team. But attackers can create fake apps that mimic real ones and trick you into granting them access to your email, files, or contacts. Once you approve a malicious app, it can read your data continuously in the background, even if you change your password. Always verify that an app is approved by your organization before granting permissions, and report any unexpected permission requests to your IT department.
