---
title: Setup Platform on Digital Ocean
description: Setup your platform as a service on digital ocean
layout: ../../../layouts/MainLayout.astro
---

In this section we show you how to use the [digitalocean terraform module](https://registry.terraform.io/modules/upmaru/instellar/digitalocean/latest) to setup your own infrastructure on digital ocean provider.

> First you'll need to go through the [terraform guide](/en/infrastructure/terraform). If you have already setup your workspace you can continue below.

## Setup Project

Let's begin by cloning our repository we created in the [terraform guide](/en/infrastructure/terraform#repository).

```shell
git clone git@github.com:<your-organization>/<your-repo>.git
```

Open the directory up in your favorite editor and create a `.gitignore` along with a `main.tf` file.

You should have the following files in your directory

```shell
.gitignore
main.tf
```

Let's cover the `.gitignore` first. You'll want to add the following content to your `.gitignore` file

```
.terraform
.DS_Store
```

Next we will need to delcare some variables in our `main.tf`. We'll start with `instellar_do_token`. This will enable input on terraform cloud. Terraform cloud will need to access your digital ocean api token. This will enable us to do just that.

```hcl
variable "instellar_do_token" {}
```

Next we'll define the `instellar` module. Below is an explanation of all the attributes

+ `source` - defines the module we will be using.

+ `do_token` - variable is where you'll use the variable that was defined previously. We will feed the token into the terraform cloud UI later.

+  `cluster_size` - parameter allows you to input how many nodes you wish to have in your cluster. The more nodes the more computing power you have. 

+  `cluster_name` - attribute is an arbitrary name you can use to name your cluster. This will also be prefixed to everything that is generated inside your infrastructure. 

+ `ssh_keys` - This represents the key id for the ssh key inside of your digital ocean account. If you have not setup your ssh key before see the [next section](#ssh-key).


```hcl
module "instellar" {
  source  = "upmaru/instellar/digitalocean"
  version = "0.1.1"

  do_token     = var.instellar_do_token
  cluster_size = 3
  cluster_name = "orion"
  vpc_ip_range = var.instellar_ip_range
  ssh_keys     = [
    "52:0d:1a:16:5e:64:22:28:1c:ec:3a:72:ce:2f:77:ba"
  ]
}
```

## SSH Key

This section assumes you already know how to generate the ssh-key. To add the ssh-key to digital ocean. Head to the `Settings` area.

![settings](/assets/digital-ocean/settings.png)

Find the `Security` tab.

![security tab](/assets/digital-ocean/security-tab.png)

Click on the `Add SSH Key` button.

![add ssh key](/assets/digital-ocean/add-ssh-key.png)

Copy your public key from the command line and paste it in the `SSH Key content area`. Give it a name and click `Add SSH Key`.

![new ssh key modal](/assets/digital-ocean/new-ssh-key-modal)

Once add the ssh key you can copy the finger print and use it in your `main.tf`.









