import Classic from "../components/classic";
import ModernTemplate from "../components/modren";

export const templates = [
  { id: "classic", name: "Classic", component: Classic, preview: "/previews/classic.png" },
  { id: "modern",  name: "Modern",  component: ModernTemplate, preview: "/previews/modern.png", supportsPhoto: true },
];