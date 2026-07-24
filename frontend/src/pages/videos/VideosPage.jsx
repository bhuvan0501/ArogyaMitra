import { EmptyState } from "../../components/common/EmptyState.jsx";
import { PageHeader } from "../../components/common/PageHeader.jsx";

export function VideosPage() {
  return (
    <>
      <PageHeader title="Videos" description="YouTube fitness video search route placeholder." />
      <EmptyState title="No videos loaded" description="YouTube API integration will be added later." />
    </>
  );
}
