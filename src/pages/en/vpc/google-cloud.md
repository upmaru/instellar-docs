---
title: Googld Cloud VPC
description: Setup Google Cloud VPC
layout: ../../../layouts/MainLayout.astro
---

The section below outlines how to configure VPC using google cloud platform. Let's begin by heading over to the `VPC Network` section in the main nav bar.

![vpc network section](/assets/google-cloud/vpc-network-section.png)

You should be taken to a page that looks like the following. Let's begin by clicking on the `Create VPC Network`.

![vpc landing page](/assets/google-cloud/vpc-landing-page.png)

Go ahead and give your vpc a name. You can name this anything you feel like I recommend something meaningful.

![create vpc form](/assets/google-cloud/create-vpc-form.png)

## Subnet

As you scroll down you will be met with the `subnet` section. You'll want to select the `Custom` section and click on `Add Subnet`.

![subnet](/assets/google-cloud/subnet-section.png)

Once the `New Subnet` form opens up. You'll want to input the following as an example. For the region you'll need to select the region where you want to run your VMs.

### IP Range

For IP range you can use something like `10.0.1.0/24` or even `192.168.0.0/24`

![new subnet](/assets/google-cloud/new-subnet.png)

## Firewall Config

For now you can go ahead and create the VPC we will configure the firewall in a different section. Go ahead and click `Create`.

![firewall config](/assets/google-cloud/vpc-firewall-rules.png)



