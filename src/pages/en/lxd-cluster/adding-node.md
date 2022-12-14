---
title: Adding a Node
description: This section shows you how to add a node to your cluster
layout: ../../../layouts/MainLayout.astro
---

To add more nodes to your cluster simply repeat the same steps on [Droplet Setup](/en/lxd-cluster/digital-ocean#droplet-setup). Be sure to number your node with `02` and `03` numbering suffix to make sure they're easily identifiable.

Once you setup your node. You can run `lxd init` on the new node. This time we will answer certain questions differently. Let's begin!

```shell
Would you like to use LXD clustering? (yes/no) [default=no]: yes
What IP address or DNS name should be used to reach this node? [default=146.190.89.52]: 10.0.2.3
Are you joining an existing cluster? (yes/no) [default=no]: yes
Do you have a join token? (yes/no/[token]) [default=no]: no
What name should be used to identify this node in the cluster? [default=docs-example-02]:
```

## Joining an existing Cluster

In the next step LXD will ask you for the address of the previous node you created. Enter the private IP of the node.

```shell
IP address or FQDN of an existing cluster member (may include port): 10.0.2.2
```

Once you hit enter LXD will ask you to verify the client fingerprint simply type yes and move to the next step. It will ask you for the password that you entered when you created your first node

```shell
Cluster fingerprint: 7f8a78fa793f59b77c916f0ed74182ac4fd869eb2d92624e250f86c5e27f5aac
You can validate this fingerprint by running "lxc info" locally on an existing node.
Is this the correct fingerprint? (yes/no/[fingerprint]) [default=no]: yes
Cluster trust password: <paste your password here>
```

If the password you entered is correct you will be asked to confirm that you are ok that all data will be deleted. Anser `yes` this is ok because you booted up a new node so there was nothing in there to begin with.

```shell
All existing data is lost when joining a cluster, continue? (yes/no) [default=no] yes
```

Next you'll be asked some basic configuration for the node for the most part you can enter through them.

```shell
Choose "zfs.pool_name" property for storage pool "local":
```

When you reach the "size" property for the storage pool enter the same value you entered when you setup the first node `15GB`. If your current node has less storage adjust the size accordingly. For this setting make sure you enter the `GB`

```shell
Choose "size" property for storage pool "local": 15GB
Choose "source" property for storage pool "local":
Would you like a YAML "lxd init" preseed to be printed? (yes/no) [default=no]:
```

For the rest of the options you can enter right through. If everything worked you'll be returned to the prompt. If you run `lxd list` you will see the `test` container running on the previous node pop up.

```shell
+------+---------+--------------------+------+-----------+-----------+-----------------+
| NAME |  STATE  |        IPV4        | IPV6 |   TYPE    | SNAPSHOTS |    LOCATION     |
+------+---------+--------------------+------+-----------+-----------+-----------------+
| test | RUNNING | 240.2.0.216 (eth0) |      | CONTAINER | 0         | docs-example-01 |
+------+---------+--------------------+------+-----------+-----------+-----------------+
```

To see the list of nodes in the cluster you can use the `lxc cluster list`

```shell
+-----------------+-----------------------+------------------+--------------+----------------+-------------+--------+-------------------+
|      NAME       |          URL          |      ROLES       | ARCHITECTURE | FAILURE DOMAIN | DESCRIPTION | STATE  |      MESSAGE      |
+-----------------+-----------------------+------------------+--------------+----------------+-------------+--------+-------------------+
| docs-example-01 | https://10.0.2.2:8443 | database-leader  | x86_64       | default        |             | ONLINE | Fully operational |
|                 |                       | database         |              |                |             |        |                   |
+-----------------+-----------------------+------------------+--------------+----------------+-------------+--------+-------------------+
| docs-example-02 | https://10.0.2.3:8443 | database-standby | x86_64       | default        |             | ONLINE | Fully operational |
+-----------------+-----------------------+------------------+--------------+----------------+-------------+--------+-------------------+
```

You can now repeat the same steps for the 3rd node. The size of the cluster depends on your needs.

## Verifying Networking

Once you have joined 2 nodes in your cluster successfully It's time to test the cross node networking. This is simple to do.

Let's launch another container. This time we will use the `--target` flag to make sure the container is launched on a different node from `test`

```shell
$ lxc launch images:alpine/3.16 test2 --target docs-example-02
Creating test2
Starting test2
```

Running `lxc list` should return 2 containers.

```shell
+-------+---------+--------------------+------+-----------+-----------+-----------------+
| NAME  |  STATE  |        IPV4        | IPV6 |   TYPE    | SNAPSHOTS |    LOCATION     |
+-------+---------+--------------------+------+-----------+-----------+-----------------+
| test  | RUNNING | 240.2.0.216 (eth0) |      | CONTAINER | 0         | docs-example-01 |
+-------+---------+--------------------+------+-----------+-----------+-----------------+
| test2 | RUNNING | 240.3.0.209 (eth0) |      | CONTAINER | 0         | docs-example-02 |
+-------+---------+--------------------+------+-----------+-----------+-----------------+
```

Let's go inside the container.

```shell
$ lxc exec test2 -- ash
```

You should now be inside the container. The prompt should look different. Something like this

```shell
~ #
```

Let's try pining `test` by running `ping test` from inside the container. You should see the output below. It should successfully resolve the IP of `test` and return the `time=` parameter. That time is the latency between the nodes.

```shell
~ # ping test
PING test (240.2.0.216): 56 data bytes
64 bytes from 240.2.0.216: seq=0 ttl=64 time=1.588 ms
64 bytes from 240.2.0.216: seq=1 ttl=64 time=1.102 ms
64 bytes from 240.2.0.216: seq=2 ttl=64 time=1.130 ms
64 bytes from 240.2.0.216: seq=3 ttl=64 time=1.078 ms
64 bytes from 240.2.0.216: seq=4 ttl=64 time=1.000 ms
64 bytes from 240.2.0.216: seq=5 ttl=64 time=1.028 ms
^C
--- test ping statistics ---
```

At this point your setup is a success. You have multiple nodes running in your cluster and they can communicate with one another within the VPC.

