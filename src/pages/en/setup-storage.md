---
title: Setup Object Storage
description: Setup a S3 compatible bucket
layout: ../../layouts/MainLayout.astro
---

Instellar stores all of your build artifacts for your packages in S3 compatible buckets. You will need to set one up. This page will show you the various vendors you can use and how to configure your bucket.

## Digital Ocean Spaces

Digital Ocean spaces provide s3 compatible object storage. Below is how you can set one up. Login to your Digital Ocean account and click create and choose spaces. 

![spaces](/assets/digital-ocean/spaces.png)

### Settings

Choose a data center closest to your servers.

![choose a region](/assets/digital-ocean/choose-data-center.png)

Also be sure to restrict listings

![restrict file listing](/assets/digital-ocean/restrict-file-listing.png)


## Amazon AWS


