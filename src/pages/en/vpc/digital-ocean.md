---
title: Digital Ocean VPC
description: Setup Digital Ocean VPC
layout: ../../../layouts/MainLayout.astro
---

Before we do anything we need to configure a VPC for our instances. VPC stands for `virtual private cloud` it allows you to create a secure environment where nodes within VPC can communicate with one another via private ip addresses. 

LXD will uses fan networking to allow members in the cluster to privately communicate with one another securely. To setup your VPC go over to the `Networking` page.

![networking button](/assets/digital-ocean/networking-button.png)

Next you'll look for the `VPC` tab on the page.

![vpc tab](/assets/digital-ocean/networking-vpc-tab.png)

Click the `Create VPC Network` button.

![create vpc network](/assets/digital-ocean/create-vpc-network.png)

## Region Selection

You will need to select a region where you want to use your instances.

![choose vpc region](/assets/digital-ocean/choose-vpc-region.png)

I've chosen `SGP1` for my use case. I recommend choosing the region closest to your users. 

## IP Range

Next we'll define and `IP range`. For the `Address Range Prefix` you can use `10.0.1.0`. In my case I've already used `10.0.1.0` in another VPC so for this demonstration I'll use `10.0.2.0`.

Make sure you select `24` for the `Network Size`. For LXD you can choose between `24` or `16`. 

With `24` you can have up to 251 virtual machines in your network. Which is plenty.

![configure ip range](/assets/digital-ocean/configure-ip-range.png)

Give your VPC a name and description and click `Create VPC Network`

![configure ip range](/assets/digital-ocean/vpc-name-description.png)

That concludes setting up your VPC.