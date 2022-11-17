---
title: Digital Ocean Droplets
description: Setup Digital Ocean Droplets for Instellar
layout: ../../../layouts/MainLayout.astro
---

In the next section we will configure our first LXD cluster member. Head on over to the green `Create` button. You should see a dropdown menu.

![configure ip range](/assets/digital-ocean/create-instance.png)

Select the `Droplets`. You will be taken to the `Create Droplets` page. Choose the region you want your droplet to be hosted in.

![create droplets](/assets/digital-ocean/create-droplet-choose-region.png)

Next you will choose the `VPC Network`. If you selected the same region as the `VPC` you created in the earlier steps you should see it in the options. In my case I will select `docs-demo`. You'll need to reference the one you created in the earlier step.

![select vpc network](/assets/digital-ocean/select-vpc-network.png)

## OS Selection

The next step involves selecting the right options for the operating system. I recommend ubuntu. However LXD is also know to work on other OSes like Debian.

For the most 'just works' experience I recommend `Ubuntu 22.04 (LTS)` or for whatever reason if you can't use `22.04` you can also opt for `20.04 (LTS)`.

![select vpc network](/assets/digital-ocean/os-selection.png)

## Instance Size

For the size of the instance you can choose based on your work load. If you are doing this for experimentation you can choose the cheapest one.

![select vpc network](/assets/digital-ocean/droplet-size-selection.png)

## Authentication Method

For all instances I generally recommend to stay away from password based authentication. In this case I would recommend selecting `SSH Key` as the method of authentication.

If you are new to ssh keys I would refer you to [this post](https://medium.com/risan/upgrade-your-ssh-key-to-ed25519-c6e8d60d3c54).

![select vpc network](/assets/digital-ocean/authentication-method.png)

## Naming Your Instance

Lastly you can set a name for your instance and hit `Create Droplet`.

![select vpc network](/assets/digital-ocean/finalize-and-create.png)
