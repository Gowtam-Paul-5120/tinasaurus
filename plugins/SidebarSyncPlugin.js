import { useCMS } from "tinacms";

// API call to trigger sidebar update
const updateSidebar = async () => {
  await fetch("./api/updateSidebar", {
    method: "POST",
  });
  console.log("Sidebar updated via Tina Cloud");
};

export const SidebarSyncPlugin = () => {
  const cms = useCMS();

  cms.events.subscribe("forms:submit", (event) => {
    if (event.formId.startsWith("docs")) {
      updateSidebar();
    }
  });
};
