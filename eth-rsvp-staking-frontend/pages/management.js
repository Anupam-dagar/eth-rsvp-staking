import Event from "../components/Event";
import ManagementMessage from "../components/ManagementMessage";
import CommonLayout from "../layouts/CommonLayout";

const Management = () => {
  return (
    <>
      <ManagementMessage />
      <Event pageType={"RSVP"} />
    </>
  );
};

Management.getLayout = (page) => {
  return <CommonLayout>{page}</CommonLayout>;
};

export default Management;
