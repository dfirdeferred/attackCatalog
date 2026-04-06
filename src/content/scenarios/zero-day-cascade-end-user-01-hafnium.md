---
title: "The Zero-Day Cascade — Chapter 1: HAFNIUM"
chain: "zero-day-cascade"
chainOrder: 1
role: "end-user"
attack: "hafnium"
choices:
  - label: "Check your email for anything unusual and report it"
    next: "powershell-attacks"
  - label: "Ask IT whether your mailbox was affected"
    next: "powershell-attacks"
isDebrief: false
---

You arrive at work on Tuesday morning and cannot log into your email. Outlook keeps spinning, and the web portal returns a generic error page. An urgent message on the company intranet says the email system is "undergoing emergency maintenance." Colleagues are huddled in the break room speculating — some say it is a hack, others think a server crashed.

By noon, your manager forwards a message from the IT department through a personal email address: the company's Exchange servers have been compromised by a sophisticated threat group. No email should be trusted until further notice. Any unusual emails received in the past two weeks should be reported immediately.

You check your sent folder on your phone — the cached messages show three emails you never wrote, all sent to an external address at 3:00 AM last Saturday. Someone was in your mailbox.

---

## What Is the HAFNIUM Attack?

HAFNIUM was a state-sponsored cyber attack that targeted Microsoft Exchange email servers using previously unknown vulnerabilities. The attackers could break into email systems without needing any username or password, read anyone's email, and install hidden backdoors. Because the vulnerabilities were "zero-day" — unknown to Microsoft until they were already being exploited — no patch or protection existed when the attacks began. Tens of thousands of organizations worldwide were affected, from small businesses to government agencies.
