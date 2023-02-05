---
sidebar_position: 2
---

# Notes

Using ``value:getValue()`` on the client
:::note
When you use ``value:getValue()`` on the client, it will not return immediately, so if you are looking to get the value when it is available, consider using either ``subscribe`` or ``onReady``.
:::

Repli recognises what enviorment it is running in
:::note
When you require Repli, it will automatically detect if it is running on the client or server, and will return the correct object.
:::