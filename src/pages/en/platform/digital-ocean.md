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

### Cluster Bootstrap

Next we will need to delcare some variables in our `main.tf`. We'll start with `instellar_do_token`. This will enable input on terraform cloud. Terraform cloud will need to access your digital ocean api token. This will enable us to do just that.

```hcl
variable "instellar_do_token" {}
```

Next we'll define the `instellar` module. Below is an explanation of all the attributes

+ `source` - defines the module we will be using.

+ `version` - check for the latest version [here](https://registry.terraform.io/modules/upmaru/instellar/digitalocean/latest)

+ `do_token` - variable is where you'll use the variable that was defined previously. We will feed the token into the terraform cloud UI later.

+  `cluster_size` - parameter allows you to input how many nodes you wish to have in your cluster. The more nodes the more computing power you have. 

+  `cluster_name` - attribute is an arbitrary name you can use to name your cluster. This will also be prefixed to everything that is generated inside your infrastructure. 

+ `ssh_keys` - This represents the key id for the ssh key inside of your digital ocean account. If you have not setup your ssh key before see the [next section](#ssh-key).


```hcl
module "instellar" {
  source  = "upmaru/instellar/digitalocean"
  version = "0.1.2"

  do_token     = var.instellar_do_token
  cluster_size = 3
  cluster_name = "orion"
  vpc_ip_range = var.instellar_ip_range
  ssh_keys     = [
    "52:0d:1a:16:5e:64:22:28:1c:ec:3a:72:ce:2f:77:ba"
  ]
}
```

### SSH Key

This section assumes you already know how to generate the ssh-key. If you don't know how to do this I recommend [this post](https://medium.com/risan/upgrade-your-ssh-key-to-ed25519-c6e8d60d3c54). To add the ssh-key to digital ocean. Head to the `Settings` area.

![settings](/assets/digital-ocean/settings.png)

Find the `Security` tab.

![security tab](/assets/digital-ocean/security-tab.png)

Click on the `Add SSH Key` button.

![add ssh key](/assets/digital-ocean/add-ssh-key.png)

Copy your public key from the command line and paste it in the `SSH Key content` area. Give it a name and click `Add SSH Key`.

![new ssh key modal](/assets/digital-ocean/new-ssh-key-modal)

Once add the ssh key you can copy the finger print and use it in your `main.tf`.

## Database Setup

Next up step we'll configure our database. Below is an explanation for all the attributes

+ `cluster_vpc_id` - This is the VPC that was setup in the bootstrap step. We want to put the database in the same VPC so we'll reference it from the `instellar` module.

+ `cluster_name` - We want the same `cluster_name` as the cluster bootstrap stage. So we're inheriting from the module

+ `region` - We want the database to be in the same region as the cluster bootstrap.

+ `db_cluster_suffix` - This is an arbitrary name you can use to identify your database cluster.

+ `db_access_tag_id` - This is the id of the tag which all the nodes in your cluster that should be able to access the database has. It will be used in teh firewall rule for the database to control the specific nodes that have access to the database.

+ `db_cluster_size` - This is the size of the database please reference [this page](https://docs.digitalocean.com/reference/api/api-reference/#tag/Databases) to see the list of available sizes.

+ `engine` - Digital ocean supports a few types of database engine, the default is `pg`. You can create multiple databases in your cluster. Available options are `pg`, `mysql`, `redis`, `mongodb`.

+ `engine_version` - This is the version of the database engine you wish to use.

  + `pg` - at the time of writing this doc `11`, `12`, `13`, `14`
  
  + `mysql` - at the time of writing `8`
  
  + `redis` - at the time of writing `6`
  
  + `mongodb` - at the time of writing `4.4`, `5.0`
  
+ `project_id` - Referene to the project_id as a part of boostrapping in the first module. This will put the database cluster under the same digital ocean project as the nodes and bastion. 


```hcl
module "instellar_database" {
  source  = "upmaru/instellar/digitalocean//modules/database"
  version = "0.1.2"

  do_token          = var.instellar_do_token
  cluster_vpc_id    = module.instellar.cluster_vpc_id
  cluster_name      = module.instellar.cluster_name
  region            = module.instellar.region
  db_cluster_suffix = "alpha"
  db_access_tag_id  = module.instellar.db_access_tag_id
  db_cluster_size   = "db-s-2vcpu-4gb"
  engine            = "pg"
  engine_version    = "14"
  project_id        = module.instellar.project_id
}
```

## Final File

Putting everthing together your `main.tf` should look like the following.

```hcl
variable "instellar_do_token" {}

module "instellar" {
  source  = "upmaru/instellar/digitalocean"
  version = "0.1.2"

  do_token     = var.instellar_do_token
  cluster_size = 3
  cluster_name = "orion"
  vpc_ip_range = var.instellar_ip_range
  ssh_keys     = [
    "52:0d:1a:16:5e:64:22:28:1c:ec:3a:72:ce:2f:77:ba"
  ]
}

module "instellar_database" {
  source  = "upmaru/instellar/digitalocean//modules/database"
  version = "0.1.2"

  do_token          = var.instellar_do_token
  cluster_vpc_id    = module.instellar.cluster_vpc_id
  cluster_name      = module.instellar.cluster_name
  region            = module.instellar.region
  db_cluster_suffix = "alpha"
  db_access_tag_id  = module.instellar.db_access_tag_id
  db_cluster_size   = "db-s-2vcpu-4gb"
  engine            = "pg"
  engine_version    = "14"
  project_id        = module.instellar.project_id
}
```

Once you've made your edits according to your liking commit the code, however before you push in the next step we will make sure the `instellar_do_token` is in place.

## API Token

Before you push to your repository let's look at how we can retrieve the API token to be used with digital ocean on terraform cloud.

Head over to the `API` section on the main navigation.

![api nav](/assets/digital-ocean/api-nav.png)

You'll see the personal access token area. Click on the `Generate New Token` button.

![personal access tokens](/assets/digital-ocean/personal-access-tokens.png)

Give your token a name. I suggest naming it with your cluster name and prefix it with `terraform`. So you know this token is being utilized by terraform cloud.

For expiration you can use `90 days` or longer. Do remember to change this token in terraform cloud. 

Once you've entered the name and chosen the expiration time for the token click `Generate Token`.

![new personal access token](/assets/digital-ocean/new-personal-access-token.png)

You'll get to see the token once. Copy it and head over to terraform cloud. Click on `Configure variables`.

![configure workspace](/assets/terraform/configure-workspace.png)

You'll reach the `Variables` page. Click on `+ Add variable`.

![configure variables](/assets/terraform/configure-variables.png)

For the `Key` field enter `instellar_do_token`, and for the `Value` enter the token you copied from digital ocean.

![enter digital ocean token](/assets/digital-ocean/enter-your-token.png)

Once you've entered the token you can do a `git push origin master` to your repository. Terraform cloud will automatically start running your modules.

You can also trigger runs using the terraform cloud ui.





 







