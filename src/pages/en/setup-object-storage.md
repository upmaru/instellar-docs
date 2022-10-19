---
title: Setup Object Storage
description: Setup a S3 compatible bucket
layout: ../../layouts/MainLayout.astro
---

Instellar stores all of your build artifacts for your packages in S3 compatible buckets of your choice. You will need to set one up. This page will show you the various vendors you can use and how to configure your bucket.

## Digital Ocean Spaces

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

## Amazon S3

You can configure S3 bucket in the following way.

### Creating a Bucket

Simply (I know it's not simple when you click the AWS menu and it covers your whole screen, but bear with me.) head over to the S3 screen

![s3 button](/assets/aws/s3-button.png)

Head over to the `Create bucket` button.

![create bucket](/assets/aws/create-bucket-button.png)

This will open up the `Create a bucket` form. Simply put in the bucket name you want to use and select the region closes to the servers you'll deploy your applications.

![create a bucket form](/assets/aws/create-a-bucket-form.png)

For access you can use the below configuration.

![bucket permissions](/assets/aws/bucket-permission-settings.png)

For encryption you can enable it if you want. Next we will need to create a policy to attach to a user with an api key which we will use in instellar.

### Creating a Policy

Head on over to the search bar and search for `iam` the following should show up.

![iam button](/assets/aws/iam-button.png)

Once you head over to the `iam` page look for the `policies` link on the left hand side.

![policies link](/assets/aws/policies-link.png)

Once you land on the `policies` page you'll see a `Create policy` button.

![create policy](/assets/aws/create-policy-button.png)

When creating the policy switch to the `json` tab and use the following policy.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": [
          "arn:aws:s3:::your-bucket-name",
          "arn:aws:s3:::*/*",
          "arn:aws:s3:*:*:accesspoint/*",
          "arn:aws:s3:*:*:job/*"
      ]
    }
  ]
}
```

Simply hit `Next` to the tags page. Add any tag you like or just skip and move to the next page. Finally enter the name of the policy something you'll easily search, maybe suffix / prefix the name with `instellar` so you know what it's for. Go a head and finish the creation process.

### Create a User

Once you have a policy you'll need to create a user and assign the policy to it.

![users menu item](/assets/aws/users-menu-item.png)

Find the button `Add user` and click it.

![add user](/assets/aws/add-user-button.png)

Simply choose a name you want and choose `access key` option for programatic access.

![create user form](/assets/aws/create-user-form.png)

Once you've set all the options click `Next`. On the next page you'll have the opportunity to select your policy.

![set user permissions](/assets/aws/set-user-permissions.png)

Search for the policy you created and select it and head to the `Next` page. Once you reach the last step you will see `Create user`. In the last step you will see a screen like this.

![user create success](/assets/aws/user-create-success.png)

You should copy the output of the `access key id` and `secret access key`

```shell
key: [generated]
secret: [generated]
```

This info combined with the bucket config should give you enough info to input into instellar.

```shell
bucket: your-bucket-name
host: [see below link ]
region: [see below link]
```

You can retrieve the s3 `host` and `region` from [this page](https://docs.aws.amazon.com/general/latest/gr/s3.html). As an example I use singapore region bucket. My host and region are

```shell
host: s3.ap-southeast-1.amazonaws.com
region: ap-southeast-1
```


