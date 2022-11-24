---
title: Infrastructure Setup
description: Setup your own Platform as a service on your infrastructure
layout: ../../layouts/MainLayout.astro
---

The infrastructure is the main part that will be used by [instellar.app](https://instellar.app). It serves as the foundation and will run all of your apps. To give a brief idea of what it is we will be achieving here is a design diagram.

![infrastructure design](/assets/infrastructure/design.jpg)

This setup will enable you to run any kind of apps written in almost any language and framework! We'll go through each component to explain the reasoning behind the existence of each component.

We will be setting this up using [terraform](/en/platform/terraform).

## Bastion

The `bastion` node is the node that will be the main entry into the cluster. This will be the only node exposed directly on the internet. This is the node the developer will use to access all other nodes. This node is also known as a `jump host`.

## VPC

VPC stands for virtual private cloud. This is the network that all the virtual machines / database and any other components that run your apps will live in.

## Nodes

In the design above they're labeled as `node-X`. These are the actual virtual machines that run your apps. These can be scaled up / down to serve as many apps as you wish. If you are a solo developer with just a basic website and a few other utilities you wish to hose a single node might be enough. You can scale up to 3, 5, 7 nodes as your product grows.

## Database

The default database we will be setting up is PostgreSQL. This is the database you will also be able to host data for your application.

If you wish to introduce other database to your cluster, you can also do that with [terraform](/en/infrastructure/terraform).

