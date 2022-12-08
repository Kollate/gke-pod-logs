This service is meant to be used as an external log service for Tekton Dashboard to fetch log from GCP

## Things to note before deployment

You need `GOOGLE_APPLICATION_CREDENTIALS` environment variable that points to a key file for a GCP service account with Logs/Viewer role.

Please change the cluster name in `src/handlers` file. Currently it's `truetaste-1`.

Current deployment file (`k8s/deployment.yaml`) deploys a service with name in `tekton-log-viewer` in `devops` namespace. Therefore, we use `http://tekton-log-viewer.devops.svc.cluster.local/logs` as the `--external-logs` parameter in tekton dashboard.

## Deployment Steps

Make sure to make changes to k8s/deployment.yaml with right service name and secret and use that to patch in step 2 below.

1. Run `./script/deploy.sh`. Note that this script uses Skaffold for deployment.

2. After deployment, patch the tekton-dashboard manifest.

```
kubectl patch deployment tekton-dashboard -n tekton-pipelines --type='json' --patch='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--external-logs=http://tekton-log-viewer.devops.svc.cluster.local/logs"}]'
```
