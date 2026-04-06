---
title: "The Service Account Heist — Chapter 1: LDAP Reconnaissance"
chain: "service-account-heist"
chainOrder: 1
role: "end-user"
attack: "ldap-reconnaissance"
choices:
  - label: "Report the unusual IT survey email to your security team"
    next: "as-rep-roasting"
  - label: "Delete the suspicious email and warn your teammates about it"
    next: "as-rep-roasting"
isDebrief: false
---

You receive an email that appears to come from your IT department: "We are updating our internal directory. Please confirm your team name, your manager's name, and which applications you use daily." The email looks professional, with the company logo and a link to what appears to be an internal survey form. Several of your colleagues have already responded.

What you do not know is that this email is from an attacker who has already gained basic access to your company's network. They are not asking these questions because they need the answers — they already have them from the company directory. The real purpose is to cross-reference the automated data they have harvested with human confirmation, identify which service accounts map to which business applications, and figure out which systems are most valuable. Your innocent response about using "the SAP system and the backup portal" just told the attacker exactly which service accounts to target.

---

## What Is LDAP Reconnaissance?

LDAP reconnaissance is when an attacker explores your company's internal directory — think of it as the corporate phone book that lists every employee, their department, their role, and the systems they have access to. In most organizations, anyone with a basic network login can browse this directory freely. Attackers use this information to map out the organization, identify important accounts, and plan their next moves. While you may not directly encounter LDAP queries, you might see the social engineering that supplements it — emails or messages asking you to confirm organizational details. If you receive unusual requests for information about your team structure, the applications you use, or your IT setup, report them to your security team.
