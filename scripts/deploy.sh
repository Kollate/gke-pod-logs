#!/bin/sh
set -x
set -o pipefail

kubectx truetaste

skaffold run -f ./skaffold.yaml