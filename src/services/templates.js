// import Classic from "./Classic";
import Classic from "../components/classic";
import ModernTemplate from "../components/modren";
// import Modern from "./Modern";

export const templates = [
  { id: "classic", name: "Classic", component: Classic, preview: "/previews/classic.png" },
  { id: "modern",  name: "Modern",  component: ModernTemplate,  preview: "/previews/modern.png" },
];