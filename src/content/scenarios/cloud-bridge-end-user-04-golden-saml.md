---
title: "The Cloud Bridge — Chapter 4: Golden SAML"
chain: "cloud-bridge"
chainOrder: 4
role: "end-user"
attack: "golden-saml"
choices:
  - label: "Follow IT's instructions and reauthenticate to all company services"
    next: "lateral-movement"
  - label: "Ask IT why the password reset is needed and comply with the process"
    next: "lateral-movement"
isDebrief: false
---

On Thursday afternoon, an urgent email arrives from IT: "All employees must reauthenticate to all company services by end of day. Your current sessions will be terminated at 5:00 PM. This is not a drill." You are confused and frustrated — you just changed your password three days ago.

Behind the scenes, something far worse than a stolen password has happened. The attackers have compromised the system that your company uses to verify identities across all its cloud services. They can now impersonate anyone in the company — including you — without needing your password at all. It is as if someone made a master key that opens every lock in the building. The company-wide reauthentication is IT's way of changing all the locks at once. Your role right now is simple but critical: follow the instructions precisely and do not skip any steps.

---

## What Is a Golden SAML Attack?

A Golden SAML attack is a sophisticated technique where attackers steal a special security certificate that your company uses to verify employee identities across cloud services. Think of it as forging the signature of the person who stamps everyone's ID badge. With this forged stamp, the attacker can create fake identity badges for any employee and walk into any cloud service your company uses — email, file storage, business applications — all without knowing anyone's actual password. This attack is rare but extremely serious, which is why when IT asks everyone to reauthenticate, it is critical to follow their instructions promptly.
