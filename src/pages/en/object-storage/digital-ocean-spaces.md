---
title: Digital Ocean Spaces
description: Setup a digital ocean spaces
layout: ../../../layouts/MainLayout.astro
---

Digital Ocean spaces provide s3 compatible object storage. Below is how you can set one up. Login to your Digital Ocean account and click create and choose spaces. 

![spaces](/assets/digital-ocean/spaces.png)

### Settings

Choose a data center closest to your servers.

![choose a region](/assets/digital-ocean/choose-data-center.png)

Also be sure to restrict listings

![restrict file listing](/assets/digital-ocean/restrict-file-listing.png)

You can proceed to choose a unique name for your space. Once ready click Create. You'll need to record the following information.

![settings page](/assets/digital-ocean/settings-page.png)

```shell
# unique name you chose
bucket: instellar-docs-example 
host: sgp1.digitaloceanspaces.com
# host contains the region
region: sgp1
```

### Credentials

You will need to generate the credentials. Navigate over to the `API` link. You'll come to the Applications & API page. Scoll to the `Spaces access keys` section. You will find the `Generate New Key` button.

![generate api key](/assets/digital-ocean/generate-api-key.png)

Give it a name and click the tick box. Once the key is generated you will see the `key` and `secret`

```shell
key: [generated]
secret: [generated]
```

You will need these values when [setting up an organization](/en/setup-an-organization)