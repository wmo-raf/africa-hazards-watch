import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Loader } from "@erick-otenyo/hw-components";

import Modal from "components/modal";
import ProfileForm from "components/forms/profile";
import LoginForm from "components/forms/login";
import MyDataForm from "components/forms/my-data";

import { checkUserProfileFilled } from "utils/user";

import "./styles.scss";

const MyDataModal = ({
  loading,
  userData,
  canDelete,
  viewAfterSave,
  myDatasets,
  setMenuSettings,
  setMyDataModalSettings,
}) => {
  const {
    query: { myDatasetId },
  } = useRouter();

  const activeDataset = myDatasets?.find((a) => a.id === myDatasetId);

  const { loggedIn } = userData || {};

  const profileComplete = checkUserProfileFilled(userData);

  const handleCloseModal = () => {
    setMyDataModalSettings(null);
    setMenuSettings({ menuSection: "my-hw" });
  };

  return (
    <Modal
      open={!!myDatasetId}
      contentLabel={`${activeDataset ? "Edit" : "Add"} Dataset`}
      onRequestClose={handleCloseModal}
      className="c-area-of-interest-modal"
    >
      {loading && <Loader />}
      <div className="save-aoi-body">
        {!loading && !loggedIn && <LoginForm />}
        {!loading && loggedIn && !profileComplete && (
          <ProfileForm source="MyDataModal" />
        )}
        {!loading && loggedIn && profileComplete && <MyDataForm />}
      </div>
    </Modal>
  );
};

MyDataModal.propTypes = {
  userData: PropTypes.object,
  loading: PropTypes.bool,
  canDelete: PropTypes.bool,
  setMenuSettings: PropTypes.func,
  viewAfterSave: PropTypes.bool,
  myDatasets: PropTypes.array,
  setMyDataModalSettings: PropTypes.func,
};

export default MyDataModal;
