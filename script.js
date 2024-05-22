"use client";

// Get the Mintlify search containers, going to reuse them as the triggers for Inkeep
const searchButtonContainerIds = [
  "search-bar-entry",
  "search-bar-entry-mobile",
];

// Clone and replace, needed to remove existing event listeners
const clonedSearchButtonContainers = searchButtonContainerIds.map((id) => {
  const originalElement = document.getElementById(id);
  const clonedElement = originalElement.cloneNode(true);

  originalElement.parentNode.replaceChild(clonedElement, originalElement);

  return clonedElement;
});

// Load the Inkeep script
const inkeepScript = document.createElement("script");
inkeepScript.type = "module";
inkeepScript.src =
  "https://unpkg.com/@inkeep/widgets-embed@0.2.265/dist/embed.js";
document.body.appendChild(inkeepScript);

// Once the Inkeep script has loaded, load the Inkeep chat components
inkeepScript.addEventListener("load", function () {
  // Customization settings
  const sharedConfig = {
    baseSettings: {
      apiKey: "a58574ddc0e41c75990d1c0e890ad3c8725dc9e7c8ee3d3e",
      integrationId: "clthv1rgg000sdjil26l2vg03",
      organizationId: "org_SGvQFUfKzrYkf8z8",
      primaryBrandColor: "#5DFECA",
    },
    aiChatSettings: {
      chatSubjectName: "Vapi",
      botAvatarSrcUrl:
        "https://storage.googleapis.com/organization-image-assets/vapi-botAvatarSrcUrl-1709929183314.png",
      botAvatarDarkSrcUrl:
        "https://storage.googleapis.com/organization-image-assets/vapi-botAvatarDarkSrcUrl-1709929110474.png",
      getHelpCallToActions: [
        {
          name: "Contact Us",
          url: "mailto:support@vapi.ai",
          icon: {
            builtIn: "IoMail",
          },
        },
      ],
      quickQuestions: [
        "What voices are supported?",
        "What languages are supported?",
        "How do I connect a custom LLM?",
        "How do I fetch the prompt dynamically?",
      ],
    },
  };

  // for syncing with dark mode
  const colorModeSettings = {
    observedElement: document.documentElement,
    isDarkModeCallback: (el) => {
      return el.classList.contains("dark");
    },
    colorModeAttribute: "class",
  };

  // add the "Ask AI" pill chat button
  Inkeep().embed({
    componentType: "ChatButton",
    colorModeSync: colorModeSettings,
    properties: sharedConfig,
  });

  // instantiate Inkeep "custom trigger" component
  const inkeepSearchModal = Inkeep({
    ...sharedConfig.baseSettings,
  }).embed({
    componentType: "CustomTrigger",
    colorModeSync: colorModeSettings,
    properties: {
      ...sharedConfig,
      isOpen: false,
      onClose: () => {
        inkeepSearchModal.render({
          isOpen: false,
        });
      },
      modalSettings: {
        onShortcutKeyPressed: () => {
          inkeepSearchModal.render({
            isOpen: true,
          });
        },
        shortcutKey: "k",
      }
    },
  });

  // When the Mintlify search bar clone is clicked, open the Inkeep search modal
  clonedSearchButtonContainers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      inkeepSearchModal.render({
        isOpen: true,
      });
    });
  });
});
