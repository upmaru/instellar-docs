---
title: Setup LXD Cluster
description: Let's setup your LXD cluster
layout: ../../layouts/MainLayout.astro
---

Your applications need to run on some kind of machine. LXD is a system container and virtual machine manager. You can setup a LXD cluster on any cloud provider of your choosing. Below are some choices. If you wish to learn more about LXD you can visit [this page](https://linuxcontainers.org/lxd/introduction/).

## Why LXD?

Why did we choose LXD vs another more popular container management system? The answer is LXD is very simple yet capable. It's simplicity enables anyone to setup a multi-node cluster very quickly and get up and running very quickly.

LXD is extremely easy to get your head wrapped around. You run `sudo lxd init` on your `Ubuntu` instance. The guide pretty much takes you through the process, and sets everything up for you out of the box.

This simplicity is why we chose LXD as the primary container manager. You can choose any of the following providers to see a step-by-step guide of how to setup a production grade cluster.

You can setup a single node cluster for hosting simple applications or go all the way up to multi-node / multi-zone setup for more complex deployments. This guide has you covered.

+ [Digital Ocean](/en/lxd-cluster/digital-ocean)
+ [Amazon AWS](/en/lxd-cluster/amazon-aws)
+ [Google Cloud](/en/lxd-cluster/google-cloud)