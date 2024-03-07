import { IssueStatusBadge } from "@/app/components/";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const details = await prisma!.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!details) return notFound();

  return (
    <Grid columns={{initial: '1', md: '2'}} gap="5">
      <Box >
      <Heading>{details.title}</Heading>
      <Flex gap={"2"} my={"3"}>
        <IssueStatusBadge status={details.status} />
        <p>{details.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{details.description}</ReactMarkdown>
      </Card>
      </Box>
      <Box>
      <Link href={`/issues/${details.id}/edit`}><Button><Pencil2Icon/>Edit Issue </Button></Link>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
