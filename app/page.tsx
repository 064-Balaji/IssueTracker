import dynamic from "next/dynamic";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import prisma from "@/prisma/client";

const IssueChart = dynamic(() => import("@/app/IssueChart"), {
  ssr: false,
});

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction={"column"} gap={"5"} align={"stretch"}>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker -Dashboard",
  description: "View a summary of project issues",
};
