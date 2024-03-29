import { Issue, Status } from "@prisma/client";
import GetIssue from "./GetIssue";
import IssueActions from "./IssueActions";
import { Metadata } from "next";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sort: "asc" | "desc";
    page: string;
  };
}

const IssuesPage = ({ searchParams }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <IssueActions />
      <GetIssue
        curstatus={searchParams.status}
        orderBy={searchParams.orderBy}
        sort={searchParams.sort}
        page={searchParams.page}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker -Issue List",
  description: "View all issues of the project",
};
