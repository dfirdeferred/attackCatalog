---
title: "The Physical Vector — Chapter 1: MouseJacking"
chain: "physical-vector"
chainOrder: 1
role: "end-user"
attack: "mousejacking"
choices:
  - label: "Unplug your wireless mouse and switch to a wired one"
    next: "rainbow-table"
  - label: "Report the strange cursor behavior to IT support"
    next: "rainbow-table"
isDebrief: false
---

You are working on a spreadsheet when your mouse cursor starts behaving oddly. It jitters, then freezes for a moment. A command window flashes on your screen — a black box with white text that appears and disappears faster than you can read it. Your mouse works fine again afterward.

You mention it to your deskmate. "Mine did that last week," she says with a shrug. "I figured it was a low battery." But your mouse batteries are fresh — you replaced them yesterday. And your mouse is wireless, connected through a small USB dongle plugged into the back of your computer.

Over lunch, you notice a white van parked in the garage across the street. It has been there all week with no visible company markings. You think nothing of it — until the IT department sends an urgent email that afternoon asking all employees to immediately unplug wireless mouse and keyboard receivers from their computers.

---

## What Is MouseJacking?

MouseJacking is an attack that targets wireless mice and keyboards — the kind that use a small USB dongle plugged into your computer. These devices send signals through the air, and some of them do not encrypt those signals. An attacker with a special radio device can intercept these signals from up to 100 meters away and send fake signals back to your computer. When they send fake keyboard signals, it is as if an invisible person is typing on your computer. They can type commands that download malicious software, steal your files, or take control of your machine — all without you clicking or typing anything yourself.
