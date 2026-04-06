---
title: "The Cloud Bridge — Chapter 1: Password Attack"
chain: "cloud-bridge"
chainOrder: 1
role: "red-teamer"
attack: "password-attack"
choices:
  - label: "Harvest session tokens from the compromised endpoints"
    next: "pass-the-cookie"
  - label: "Extract browser cookies before the blue team resets passwords"
    next: "pass-the-cookie"
isDebrief: false
---

You have spent two weeks on OSINT. LinkedIn gave you the organizational chart, press releases yielded the CEO's dog's name, and a quick search of breach databases returned credentials for three executives who reused passwords across personal and corporate accounts. Time to operationalize.

You configure your password spraying tool with a distributed proxy chain — three hundred residential IPs rotating every five attempts to stay below smart lockout thresholds. Your wordlist combines breach credentials, company-specific terms, and common mutation rules. You target the Azure AD tenant's OAuth endpoint, which conveniently returns different error codes for "user exists" versus "user does not exist." Within ninety minutes, three accounts authenticate successfully. You immediately request OAuth tokens and begin establishing persistence before the SOC notices the anomaly in their sign-in logs.

---

## What Is a Password Attack?

A password attack is any technique used to compromise authentication credentials. From an offensive perspective, the key variants are credential stuffing (replaying breach dumps), password spraying (testing common passwords across many accounts while staying below lockout thresholds), brute-force (exhaustive character-space searches), and targeted guessing using OSINT-derived wordlists. Modern cloud identity providers offer rich error responses and OAuth endpoints that can be abused for user enumeration. Effective password attacks combine multiple data sources, distribute requests across IP ranges, and target authentication endpoints that lack adequate rate limiting or anomaly detection.
