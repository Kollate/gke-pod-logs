import { Logging } from "@google-cloud/logging";

const logging = new Logging({});

type Params = {
  namespace: string;
  pod: string;
  container: string;
};

export const fetchLogs = async (params: Params) => {
  const logs = await logging.getEntries({
    filter: [
      "resource.type=k8s_container",
      `resource.labels.pod_name=${params.pod}`,
      `resource.labels.container_name=${params.container}`,
      `resource.labels.namespace_name=${params.namespace}`,
      `resource.labels.cluster_name=truetaste-1`,
    ].join(" "),
    maxResults: 10000,
  });
  return logs[0]
    .reverse()
    .map((a) => {
      if (typeof a.data === "object") {
        return JSON.stringify(a.data);
      }
      return a.data;
    })
    .join("\n");
};

if (require.main === module) {
  void fetchLogs({
    container: "step-clone",
    namespace: "devops",
    pod: "truetaste-cms-pr-run-z2kts-src-clone-nostatus-pod",
  });
}
