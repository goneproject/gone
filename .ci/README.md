# Concourse CI Setup

## Configuration

01. Create a new `default.yml` configuration file with the following content in the <project_root>/.ci/config/ directory:

> **Note:** To proceed please sign-up on [Docker Hub](https://hub.docker.com).

```yaml
---
"docker_hub":
    "username": MY_USERNAME
    "email": MY_EMAIL
    "password": MY_SUPER_SECRET_PASSWORD
    "repository": MY_REPOSITORY
```

02. Execute the `setup.sh` in your <project_root>/.ci/setup.sh directory:

```shell
.ci/setup.sh
```