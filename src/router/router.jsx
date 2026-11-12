import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const m = await import("../pages/Home");
      return { Component: m.default };
    },
  },
  {
    path: "/scanner",
    lazy: async () => {
      const m = await import("../pages/ScannerPage");
      return { Component: m.default };
    },
  },
  {
    path: "/home",
    lazy: async () => {
      const m = await import("../pages/ScannerPage");
      return { Component: m.default };
    },
  },
  {
    path: "/dashboard",
    lazy: async () => {
      const m = await import("../pages/DashboardPage");
      return { Component: m.default };
    },
  },
  {
    path: "/tools/:toolId",
    lazy: async () => {
      const m = await import("../pages/ToolPage");
      return { Component: m.default };
    },
  },
  {
    path: "/tools/keyword-gap",
    lazy: async () => {
      const m = await import("../pages/ToolPage");
      return { Component: () => <m.default toolId="keyword-gap" /> };
    },
  },
  {
    path: "/tools/bullet-rewriter",
    lazy: async () => {
      const m = await import("../pages/ToolPage");
      return { Component: () => <m.default toolId="bullet-rewriter" /> };
    },
  },
  {
    path: "/tools/format-check",
    lazy: async () => {
      const m = await import("../pages/ToolPage");
      return { Component: () => <m.default toolId="format-check" /> };
    },
  },
  {
    path: "/tools/live-demo",
    lazy: async () => {
      const m = await import("../pages/ToolPage");
      return { Component: () => <m.default toolId="live-demo" /> };
    },
  },
  {
    path: "/blog",
    lazy: async () => {
      const m = await import("../pages/BlogPage");
      return { Component: m.default };
    },
  },
  {
    path: "/blog/:slug",
    lazy: async () => {
      const m = await import("../pages/BlogArticlePage");
      return { Component: m.default };
    },
  },
  {
    path: "/about",
    lazy: async () => {
      const m = await import("../pages/AboutPage");
      return { Component: m.default };
    },
  },
  {
    path: "/contact",
    lazy: async () => {
      const m = await import("../pages/ContactPage");
      return { Component: m.default };
    },
  },
  {
    path: "/login",
    lazy: async () => {
      const m = await import("../pages/user.pages/Userlogin");
      return { Component: m.default };
    },
  },
  {
    path: "/signin",
    lazy: async () => {
      const m = await import("../pages/user.pages/Userlogin");
      return { Component: m.default };
    },
  },
  {
    path: "/signup",
    lazy: async () => {
      const m = await import("../pages/user.pages/Usersignup");
      return { Component: m.default };
    },
  },
  {
    path: "/verifyOTP",
    lazy: async () => {
      const m = await import("../pages/otp.page/otp.page");
      return { Component: m.default };
    },
  },
  {
    path: "/policy",
    lazy: async () => {
      const m = await import("../pages/LegalPage");
      return { Component: () => <m.default type="privacy" /> };
    },
  },
  {
    path: "/privacy",
    lazy: async () => {
      const m = await import("../pages/LegalPage");
      return { Component: () => <m.default type="privacy" /> };
    },
  },
  {
    path: "/terms",
    lazy: async () => {
      const m = await import("../pages/LegalPage");
      return { Component: () => <m.default type="terms" /> };
    },
  },
  {
    path: "/disclaimer",
    lazy: async () => {
      const m = await import("../pages/LegalPage");
      return { Component: () => <m.default type="disclaimer" /> };
    },
  },
  {
    path: "*",
    lazy: async () => {
      const m = await import("../pages/NotFoundPage");
      return { Component: m.default };
    },
  },
]);

export default router;
