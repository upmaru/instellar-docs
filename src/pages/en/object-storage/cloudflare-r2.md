---
title: Cloudflare R2
description: Setup an Cloudflare R2 bucket
layout: ../../../layouts/MainLayout.astro
---

Cloudflare R2 is another option that provides S3 compatible API. You can choose to use this service as an object storage option. Below is how you configure this service.

Head on over to the R2 section in your cloudflare dashboard.

![cloudflare r2](/assets/cloudflare/r2-button.png)

### Creating a Bucket

You may be asked to activate the service before you see the `Create Bucket` button. Go ahead and activate the service it doesn't cost anything.

Once you've activated the R2 service on your account you should be taken to a page and see something like this.

![create r2 bucket](/assets/cloudflare/create-bucket.png)

Once you click on the `Create Bucket` you'll be taken to the create bucket form. It looks something like this.

![create r2 bucket form](/assets/cloudflare/create-bucket-form.png)

Enter the bucket name you wish to use and hit `Create bucket`. Once your bucket is created you'll be able to retrieve the following configurations.

![bucket details](/assets/cloudflare/bucket-details.png)

```shell
bucket: your-bucket-name
host: your-host-address.r2.cloudflarestorage.com
region: auto
```

### Creating a Token

> Note: Cloudflare R2 tokens will enable access to all buckets. At the time of writing it is not possible to scope the token to a given bucket. If this is not ok for you it might be worth it to consider another bucket provider.

Now that you have your bucket all setup. Next we will need to generate the S3 compatible token. Head back to the R2 dashboard in your account. Look for the `Manage R2 API Tokens`.

![manage r2 api tokens](/assets/cloudflare/manage-r2-api-tokens.png)

Find the `Create API Token` link.

![create api token](/assets/cloudflare/create-api-token.png)

Once you see the Create API token form go ahead and fill it out. You can name the token to something like `instellar r2` so you know that this token is used by instellar.

Also make sure you enable `Edit` permission. Set the TTL of the token to what you feel is appropriate but do remind yourself that you have to replace this token at some point.

![create api token form](/assets/cloudflare/r2-token-form.png)

Once you are ready hit the Create button. You should see the following.

![created api token](/assets/cloudflare/created-api-token.png)

You should now have the `key` and `secret`

```shell
key: [generated]
secret: [generated]
```
