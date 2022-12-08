After deployment, patch the tekton-dashboard manifest.

```
kubectl patch deployment tekton-dashboard -n tekton-pipelines --type='json' --patch='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--external-logs=http://tekton-log-viewer.devops.svc.cluster.local/logs"}]'
```
