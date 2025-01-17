import React from "react";
import Layout from "@theme/Layout";
import { TinaEditProvider } from "tinacms";
import { Blocks } from "../components/Blocks";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { SidebarSyncPlugin } from "../../plugins/SidebarSyncPlugin";

const pageData = require("../../config/homepage/index.json");

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <TinaEditProvider showToolbar={true}>
      <SidebarSyncPlugin />
      <Layout
        title={pageData && pageData.title ? pageData.title : siteConfig.title}
        description={
          pageData && pageData.description
            ? pageData.description
            : siteConfig.tagline
        }
      >
        {pageData && pageData.blocks ? (
          <Blocks blocks={pageData.blocks} />
        ) : null}
      </Layout>
    </TinaEditProvider>
  );
}
