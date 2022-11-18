---
title: Digital Ocean Firewall
description: Configure firewall for digital ocean droplets.
layout: ../../../layouts/MainLayout.astro
---

Once you have setup your droplets the next thing we need to do is put them behind firewalls. Head over to the `Networking` section on your dashboard and find the `Firewall` tab.

![firewall tab](/assets/digital-ocean/networking-firewall.png)

## Create Firewall

We will create a new firewall. Go ahed and click `Create Firewall`. You'll be brought to the Create Firewall page. Go ahead and give it a name.

The next section you'll see is the `Inbound Rules`. This section allows you to control what `Inbound` traffic can reach your nodes. You will see `22` there as the default. This is the default port for SSH.

![create firewall](/assets/digital-ocean/create-firewall.png)

## Create Inbound Rule

Go ahead and add a new rule enabling port `8443`. This is the port that will enable `instellar` to connect to your LXD instance.

Click on the `New rule` dropdown box and select `custom`.

![new rule](/assets/digital-ocean/new-firewall-rule.png)

Your configuration should look like the following.

![add lxd rule](/assets/digital-ocean/add-lxd-rule.png)

It's safe to enable source from all ip address since your lxd instance should be setup with the trust password. This is why you need to store your cluster password in a secure location.

## Outbound Rule

For the outbound rule you can keep the default configuration for now. This rule simply enables your node to ping other nodes and also enables all outgoing traffic. If you wish to restrict outbound traffic feel free to customize these rules.

![outbound rule](/assets/digital-ocean/outbound-rule-default.png)

## Droplet Selection

In the next section you'll be able to choose which droplet to apply these firewall rules to. You can type the name of your droplet. They should show up in the list.

![apply to droplet](/assets/digital-ocean/apply-to-droplets.png)

Simply select the nodes you want to apply the rule to and click `Create Firewall`. 

You can now go to the firewall page and you should see the 2 nodes assigned.

![apply to droplet](/assets/digital-ocean/firewall-node-settings.png)




