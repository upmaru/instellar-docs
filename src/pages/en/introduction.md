---
title: Introduction
description: An introduction to Instellar
layout: ../../layouts/MainLayout.astro
---

**Welcome to Instellar!**

Instellar is a continuous deployment platform that will allow developers to manage deployments without relying on DevOps Engineer. It enables developers to setup their own *Platform as a Service* in a consistent manner without needing any complex tools. This documentation will guide any developer to quickly setup their own servers for simple single server deployments all the way to multi machine cluster that can scale to infinity and beyond.

## Getting Started

You'll need to setup an instellar account. You can do this by heading over to [sign up](https://web.instellar.app/auth/registrations/new) or [sign in](https://web.instellar.app/auth/sessions/new) if you already have an account.

## Platform as a Service

Parts of the following guide will be done through the UI of the various providers, however some of them will also be done using [terraform](https://terraform.io). You will need to sign up for [terraform cloud](https://cloud.hashicorp.com/products/terraform) (it's free) to successfully follow along.

> Following this guide you will have a secure by default, production grade platform as a service on your own infrastructure. By the end of this guide you will have a git push deployment powered by [instellar.app](https://instellar.app)

1. [Object Storage](/en/object-storage)
2. [Infrastructure](/en/infrastructure)
3. [LXD Cluster](/en/lxd-cluster)


