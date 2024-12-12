async function loadServer() {
  const serverModule = await import("../dist/test-angular/server/server.mjs");
  return serverModule.app;
}

export default loadServer().then((app) => app());
