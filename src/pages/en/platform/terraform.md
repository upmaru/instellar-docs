---
title: Setup Terraform Cloud
description: Setup your terraform cloud account
layout: ../../../layouts/MainLayout.astro
---

> First you'll need a [terraform cloud account](https://cloud.hashicorp.com/products/terraform) (it's free).

Once you sign up for terraform cloud you'll need to setup an organization and a workspace.

![new organization](/assets/terraform/new-organization.png)

## Repository

Before we begin creating a workspace on terraform cloud let's first create the repository that will host our configuration for creating the infrastructure.

![new github repository](/assets/github/new-repository.png)

We recommend naming the project by the prefixing with `instellar` so you know this is your cluster configuration repo. Then the provider in this case we'll be using `digitalocean` and using a name of stars or some show you like. In this case we'll use `orion`. Coming together to make `instellar-digitalocean-orion`. 

Ultimately you are free to name this however you wish.

## Workspaces

Workspaces are where all your infrastructure state and any other data statuses of terraform runs are going to go. After setting your organization you should see the the create workspace button. Go ahead and click the `Create Workspace`.

![workspaces](/assets/terraform/create-workspace.png)

You will see the following screen. On this screen you'll be able to choose how you setup your workspace. You have a few options to choose from here. Select the `version control workflow`.

![configure workspace](/assets/terraform/new-workspace.png)

In this page you'll select your version control. We'll use github for our setup.

![select vcs](/assets/terraform/select-vcs.png)

Then you'll need to select your repository. If you haven't already authenticated your github account with terraform cloud you will have the opporunity to do so. Click on the `Add another organization` button.

![select vcs](/assets/terraform/select-repository.png)

You'll be prompted to make the connection with your github account. Select the organization you wish to use.

![select organization from github](/assets/github/select-organization.png)

Next you can either grant access to all repositories or select some specific repositories. We recommend being selective.

![select repository from github](/assets/github/select-repository-for-terraform.png)

Once you are happy with your selection simply click `Install`. You'll be taken back to terraform cloud. You should now see your repository listed in terraform cloud UI.

![select repository from terraform](/assets/terraform/select-repository-from-terraform.png)

Once you select you'll see the following form. Click on the advanced options

![new workspace form](/assets/terraform/new-workspace-form.png)

You will need to enter the VCS branch option it should be either `master` or `main` depending on how your repository is configured.

![input vcs branch](/assets/terraform/vcs-branch.png)

Once you entered the branch name go ahead and click `Create workspace`

![workspace created](/assets/terraform/workspace-created.png)

Congratulations! You've created your workspace. Next we will show you how to create your instellar cluster configuration based on this [terraform module](https://registry.terraform.io/modules/upmaru/instellar/digitalocean/latest). You can choose which cloud provider you are using below:

+ [Digital Ocean](/en/platform/digital-ocean)
+ [Google Cloud](/en/platform/google-cloud)






