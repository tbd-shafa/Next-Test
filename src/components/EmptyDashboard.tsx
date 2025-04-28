import Link from "next/link";

const EmptyDashboard = () => {
  return (
    <div className="empty-dashboard">
      <img
        className="empty-icon"
        src="/images/empty-heart-icon.svg"
        alt="logo"
      />
      <p>
        Please add a patient profile first <br />
        to start adding all the medical records.
      </p>

      <button className="btn btn-patient-left-icon">Add Patient Profile</button>

      <Link href="" className="mt-5 learn-video">
        <img src="/images/youtube-paly.svg" alt="" /> Learn How
      </Link>
    </div>
  );
};

export default EmptyDashboard;
