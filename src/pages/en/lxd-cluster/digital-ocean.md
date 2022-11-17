---
title: LXD on Digital Ocean
description: Setup LXD cluster on digital ocean's VPS
layout: ../../../layouts/MainLayout.astro
---

Here we will introduce you to how you can setup a LXD cluster on your digital ocean instance.

## VPC Setup

Before we do anything we need to configure a VPC for our instances. VPC stands for `virtual private cloud` it allows you to create a secure environment where nodes within VPC can communicate with one another via private ip addresses. 

LXD will uses fan networking to allow members in the cluster to privately communicate with one another securely. To setup your VPC go over to the `Networking` page.

![networking button](/assets/digital-ocean/networking-button.png)

Next you'll look for the `VPC` tab on the page.

![vpc tab](/assets/digital-ocean/networking-vpc-tab.png)

Click the `Create VPC Network` button.

![create vpc network](/assets/digital-ocean/create-vpc-network.png)

### Region Selection

You will need to select a region where you want to use your instances.

![choose vpc region](/assets/digital-ocean/choose-vpc-region.png)

I've chosen `SGP1` for my use case. I recommend choosing the region closest to your users. 

### IP Range

Next we'll define and `IP range`. For the `Address Range Prefix` you can use `10.0.1.0`. In my case I've already used `10.0.1.0` in another VPC so for this demonstration I'll use `10.0.2.0`.

Make sure you select `24` for the `Network Size`. For LXD you can choose between `24` or `16`. 

With `24` you can have up to 251 virtual machines in your network. Which is plenty.

![configure ip range](/assets/digital-ocean/configure-ip-range.png)

Give your VPC a name and description and click `Create VPC Network`

![configure ip range](/assets/digital-ocean/vpc-name-description.png)

That concludes setting up your VPC.

## Droplet Setup

In the next section we will configure our first LXD cluster member. Head on over to the green `Create` button. You should see a dropdown menu.

![configure ip range](/assets/digital-ocean/create-instance.png)

Select the `Droplets`. You will be taken to the `Create Droplets` page. Choose the region you want your droplet to be hosted in.

![create droplets](/assets/digital-ocean/create-droplet-choose-region.png)

Next you will choose the `VPC Network`. If you selected the same region as the `VPC` you created in the earlier steps you should see it in the options. In my case I will select `docs-demo`. You'll need to reference the one you created in the earlier step.

![select vpc network](/assets/digital-ocean/select-vpc-network.png)

### OS Selection

The next step involves selecting the right options for the operating system. I recommend ubuntu. However LXD is also know to work on other OSes like Debian.

For the most 'just works' experience I recommend `Ubuntu 22.04 (LTS)` or for whatever reason if you can't use `22.04` you can also opt for `20.04 (LTS)`.

![select vpc network](/assets/digital-ocean/os-selection.png)

### Instance Size

For the size of the instance you can choose based on your work load. If you are doing this for experimentation you can choose the cheapest one.

![select vpc network](/assets/digital-ocean/droplet-size-selection.png)

### Authentication Method

For all instances I generally recommend to stay away from password based authentication. In this case I would recommend selecting `SSH Key` as the method of authentication.

If you are new to ssh keys I would refer you to [this post](https://medium.com/risan/upgrade-your-ssh-key-to-ed25519-c6e8d60d3c54).

![select vpc network](/assets/digital-ocean/authentication-method.png)

### Naming Your Instance

Lastly you can set a name for your instance and hit `Create Droplet`.

![select vpc network](/assets/digital-ocean/finalize-and-create.png)

## Initialize LXD

Once you boot up your instance you can login by using the following command (assuming you've setup your ssh authentication correctly).

```shell
$ ssh root@<ip-address>
```

Let's initialize LXD. Since LXD comes install by default on Ubuntu all you'll need to do is run the following:

```shell
sudo lxd init
```

You'll be taken through the initialization steps.

```shell
Would you like to use LXD clustering? (yes/no) [default=no]: y
```

For the IP address or DNS name you should use the private IP of your instance.

```shell
What IP address or DNS name should be used to reach this node? [default=146.190.80.210]: 10.0.2.2
```

Since this is your first node the answer to the following is `n`

```shell
Are you joining an existing cluster? (yes/no) [default=no]: n
```

For your node name you can keep the default one 

```shell
What name should be used to identify this node in the cluster? [default=docs-example-01]: <enter to use default>
```

For the next one LXD will ask you to setup password authentication. Go ahead and type `y` and hit enter.

```shell
Setup password authentication on the cluster? (yes/no) [default=no]:
```

You'll be prompted to input the password. You can use a strong password generator to generate a password. Please make note of this password in a tool like 1password or dashlane or lastpass. You can copy and paste the password into the prompt.

```shell
Trust password for new clients: 
```

Paste in the same password and hit enter.

```shell
Again: 
```

Next LXD will prompt you to setup a storage pool. Simply hit enter to move forward.

```shell
Do you want to configure a new local storage pool? (yes/no) [default=yes]: <enter>
```

You can opt for `zfs` as the default. Simply hit enter to move forward.

```shell
Name of the storage backend to use (btrfs, dir, lvm, zfs) [default=zfs]:
```

When asked to create a new ZFS pool use the default `yes`. Hit enter to go to the next step.

```shell
Create a new ZFS pool? (yes/no) [default=yes]:
```

When asked if you would like to use an empty block device you can use the default answer `no`. Simply hit enter to move to the next.

```shell
Would you like to use an existing empty block device (e.g. a disk or partition)? (yes/no) [default=no]: 
```

You will be asked about the size of the loop device. Whatever your disk size is you can subtract 9 and use that. For example my disk had 24GB that gives me about `15`.

```shell
Size in GiB of the new loop device (1GiB minimum) [default=5GiB]: 15
```

Next up you'll be asked if you want to configure a new remote storage pool. For this one you can choose `no`. Hit enter to pass right through.

```shell
Do you want to configure a new remote storage pool? (yes/no) [default=no]:
```

When asked if you wish to connect MAAS server you can answer `no`. Hit enter and pass right through.

```shell
Would you like to connect to a MAAS server? (yes/no) [default=no]:
```

Next you'll be asked about setting up bridge or host interface for networking. For this one you can answer as the default `no`.

```shell
Would you like to configure LXD to use an existing bridge or host interface? (yes/no) [default=no]:
```

Next up is Fan overlay network. On this one you'll want to answer `yes`. Simply hit enter to move to the next setting.

```shell
Would you like to create a new Fan overlay network? (yes/no) [default=yes]:
```

Next is subnet Fan underlay configuration. On this one you'll want to enter what you used when you created the VPC on digital ocean. In our case if you have been following along you can enter `10.0.2.0/24`.

```shell
What subnet should be used as the Fan underlay? [default=auto]: 10.0.2.0/24
```

Next one is if you would like LXD to automatically update cached images. You can go ahead and answer the default which is `yes`.

```shell
Would you like stale cached images to be updated automatically? (yes/no) [default=yes]:
```

Next is the last LXD will ask if you wish to output the YAML config you can enter `no` as the default for now. If we need it we can generate the preseed later.

```shell
Would you like a YAML "lxd init" preseed to be printed? (yes/no) [default=no]:
```

This concludes the initialization process.

### Test Drive LXD

Once you have initialized lxd you can try launching a container. You can try the following commands.

```shell
$ lxc list

+------+-------+------+------+------+-----------+----------+
| NAME | STATE | IPV4 | IPV6 | TYPE | SNAPSHOTS | LOCATION |
+------+-------+------+------+------+-----------+----------+
```

Let's try launching a container

```shell
$ lxc launch images:alpine/3.16 test
Creating test
Starting test
```

If you run `lxc list` again you should see 

```shell
+------+---------+--------------------+------+-----------+-----------+-----------------+
| NAME |  STATE  |        IPV4        | IPV6 |   TYPE    | SNAPSHOTS |    LOCATION     |
+------+---------+--------------------+------+-----------+-----------+-----------------+
| test | RUNNING | 240.2.0.216 (eth0) |      | CONTAINER | 0         | docs-example-01 |
+------+---------+--------------------+------+-----------+-----------+-----------------+
```

The container has started and there is an ip address assigned. At this point your LXD initialization can be marked as a success.

At this point you have a choice. You can continue using a single instance setup or if you want a more scalable setup in the next section we will show you how to add more machines to your cluster.

### Multi Node LXD Cluster

To add more nodes to your cluster simply repeat the same steps on [Droplet Setup](/en/lxd-cluster/digital-ocean#droplet-setup). Be sure to number your node with `02` and `03` numbering suffix to make sure they're easily identifiable.

















